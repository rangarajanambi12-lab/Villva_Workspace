package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port         string
	DBHost       string
	DBUser       string
	DBPassword   string
	DBName       string
	DBPort       string
	RedisHost    string
	RedisPass    string
	MinioEnd     string
	MinioAccess  string
	MinioSecret  string
	MinioUseSSL  string
	JWTSecret    string
	SMTPHost     string
	SMTPPort     string
	SMTPUser     string
	SMTPPass     string
	SMTPFrom     string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, relying on environment variables")
	}

	return &Config{
		Port:         getEnv("PORT", "8080"),
		DBHost:       getEnv("DB_HOST", "localhost"),
		DBUser:       getEnv("DB_USER", "villva"),
		DBPassword:   getEnv("DB_PASSWORD", "villvapassword"),
		DBName:       getEnv("DB_NAME", "villva_db"),
		DBPort:       getEnv("DB_PORT", "5432"),
		RedisHost:    getEnv("REDIS_HOST", "localhost:6379"),
		RedisPass:    getEnv("REDIS_PASSWORD", ""),
		MinioEnd:     getEnv("MINIO_ENDPOINT", "localhost:9000"),
		MinioAccess:  getEnv("MINIO_ACCESS_KEY", "villva_minio"),
		MinioSecret:  getEnv("MINIO_SECRET_KEY", "villvapassword"),
		MinioUseSSL:  getEnv("MINIO_USE_SSL", "false"),
		JWTSecret:    getEnv("JWT_SECRET", "supersecretvillvakey123!"),
		SMTPHost:     getEnv("SMTP_HOST", "smtp.ethereal.email"),
		SMTPPort:     getEnv("SMTP_PORT", "587"),
		SMTPUser:     getEnv("SMTP_USERNAME", "noreply@villva.com"),
		SMTPPass:     getEnv("SMTP_PASSWORD", "dummy_password"),
		SMTPFrom:     getEnv("SMTP_FROM", "noreply@villva.com"),
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
