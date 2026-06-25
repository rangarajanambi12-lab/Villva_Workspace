package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/villva/backend/config"
	"github.com/villva/backend/internal/handlers"
	"github.com/villva/backend/internal/middleware"
	"github.com/villva/backend/internal/models"
	"github.com/villva/backend/internal/services"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Load config
	cfg := config.LoadConfig()

	// Connect to Database
	dsn := "host=" + cfg.DBHost + " user=" + cfg.DBUser + " password=" + cfg.DBPassword + " dbname=" + cfg.DBName + " port=" + cfg.DBPort + " sslmode=disable TimeZone=UTC"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	log.Println("Database connected successfully")

	// Auto-Migrate
	err = models.AutoMigrate(db)
	if err != nil {
		log.Fatal("Failed to auto-migrate:", err)
	}

	// Seed Database
	if err := models.Seed(db); err != nil {
		log.Fatal("Failed to seed database:", err)
	}

	// Init Casbin
	if err := middleware.InitCasbin(db); err != nil {
		log.Fatal("Failed to init casbin:", err)
	}

	// Init MinIO
	if err := services.InitMinio("localhost:9000", "villva_minio", "villvapassword", false); err != nil {
		log.Println("Failed to init MinIO:", err)
	}

	// Initialize Gin
	r := gin.Default()

	// Simple CORS Middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Handlers
	authHandler := &handlers.AuthHandler{DB: db}
	orgHandler := &handlers.OrgHandler{DB: db}
	userHandler := &handlers.UserHandler{DB: db}
	dynamicSidebarHandler := &handlers.DynamicSidebarHandler{}
	settingsHandler := &handlers.SettingsHandler{DB: db}

	// Public Routes
	api := r.Group("/api")
	{
		authGroup := api.Group("/auth")
		{
			authGroup.POST("/login", authHandler.Login)
			authGroup.POST("/logout", authHandler.Logout)
		}
	}

	// Protected Routes
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/auth/me", authHandler.Me)
		protected.POST("/auth/change-password", authHandler.ChangePassword)
		protected.GET("/me/modules", dynamicSidebarHandler.GetModules)

		// Settings Routes
		protected.PUT("/users/profile", settingsHandler.UpdateProfile)
		protected.POST("/users/profile-picture", settingsHandler.UploadProfilePicture)
		protected.GET("/users/preferences", settingsHandler.GetPreferences)
		protected.PUT("/users/preferences", settingsHandler.UpdatePreferences)

		// Routes protected by Casbin RBAC
		rbac := protected.Group("")
		rbac.Use(middleware.Authorize())
		{
			rbac.POST("/organization", orgHandler.CreateOrUpdateOrganization)
			rbac.PUT("/organization", orgHandler.CreateOrUpdateOrganization)
			rbac.GET("/organization", orgHandler.GetOrganization)

			rbac.POST("/users", userHandler.CreateUser)
			rbac.GET("/users", userHandler.GetUsers)
		}
	}

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	// Serve Frontend React App
	r.Static("/assets", "../dist/assets")
	r.StaticFile("/vite.svg", "../dist/vite.svg")
	r.NoRoute(func(c *gin.Context) {
		// If it starts with /api, it's an API route that wasn't found
		if len(c.Request.URL.Path) >= 4 && c.Request.URL.Path[:4] == "/api" {
			c.JSON(404, gin.H{"error": "API route not found"})
			return
		}
		// Fallback to index.html for React Router
		c.File("../dist/index.html")
	})

	log.Printf("Server starting on port %s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
