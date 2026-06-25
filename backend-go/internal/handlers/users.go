package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/villva/backend/internal/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserHandler struct {
	DB *gorm.DB
}

type CreateUserRequest struct {
	Name        string `json:"name" binding:"required"`
	EmpID       string `json:"empId" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Mobile      string `json:"mobile"`
	Department  string `json:"department"`
	Designation string `json:"designation"`
	Role        string `json:"role" binding:"required"`
	TemporaryPassword string `json:"temporaryPassword" binding:"required"`
}

func (h *UserHandler) CreateUser(c *gin.Context) {
	var req CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	orgID, _ := c.Get("org_id")
	creatorID, _ := c.Get("user_id")

	// Check if user exists
	var count int64
	h.DB.Model(&models.User{}).Where("email = ?", req.Email).Count(&count)
	if count > 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "User with this email already exists"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.TemporaryPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
		return
	}

	orgIDStr := orgID.(string)
	user := models.User{
		ID:                  uuid.NewString(),
		OrgID:               &orgIDStr,
		Name:                req.Name,
		EmpID:               req.EmpID,
		Email:               req.Email,
		Mobile:              req.Mobile,
		Department:          req.Department,
		Designation:         req.Designation,
		Role:                req.Role,
		PasswordHash:        string(hash),
		Status:              "ACTIVE",
		OrgSetupDone:        true, // Employees don't do org setup
		ForcePasswordChange: true,
	}

	if err := h.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
		return
	}

	// Log Action
	h.DB.Create(&models.AuditLog{
		UserID:    creatorID.(string),
		Action:    "EMPLOYEE_CREATED",
		IPAddress: c.ClientIP(),
	})

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully", "user": user})
}

func (h *UserHandler) GetUsers(c *gin.Context) {
	orgID, _ := c.Get("org_id")

	var users []models.User
	if err := h.DB.Where("org_id = ?", orgID).Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch users"})
		return
	}

	c.JSON(http.StatusOK, users)
}
