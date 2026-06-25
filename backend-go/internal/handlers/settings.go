package handlers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/villva/backend/internal/models"
	"github.com/villva/backend/internal/services"
	"gorm.io/gorm"
)

type SettingsHandler struct {
	DB *gorm.DB
}

func (h *SettingsHandler) UploadProfilePicture(c *gin.Context) {
	userID, _ := c.Get("user_id")

	file, header, err := c.Request.FormFile("profilePicture")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file"})
		return
	}
	defer file.Close()

	ext := filepath.Ext(header.Filename)
	objectName := fmt.Sprintf("profile_%s_%d%s", userID.(string), time.Now().Unix(), ext)

	url, err := services.UploadFile("villva-assets", objectName, file, header.Size, header.Header.Get("Content-Type"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload file to MinIO: " + err.Error()})
		return
	}

	// Update the user profile picture in DB
	if err := h.DB.Model(&models.User{}).Where("id = ?", userID).Update("profile_picture", url).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile picture in DB"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Profile picture uploaded successfully",
		"url":     url,
	})
}

type UpdateProfileRequest struct {
	Name           string `json:"name"`
	Mobile         string `json:"mobile"`
	ProfilePicture string `json:"profilePicture"`
}

type UpdatePreferencesRequest struct {
	Theme         string `json:"theme"`
	SidebarMode   string `json:"sidebarMode"`
	DashboardPref string `json:"dashboardPref"`
}

func (h *SettingsHandler) UpdateProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var req UpdateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updates := map[string]interface{}{}
	if req.Name != "" {
		updates["name"] = req.Name
	}
	if req.Mobile != "" {
		updates["mobile"] = req.Mobile
	}
	if req.ProfilePicture != "" {
		updates["profile_picture"] = req.ProfilePicture
	}

	if err := h.DB.Model(&models.User{}).Where("id = ?", userID).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}

func (h *SettingsHandler) GetPreferences(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var pref models.UserPreference
	if err := h.DB.Where("user_id = ?", userID).First(&pref).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// Return default preferences
			c.JSON(http.StatusOK, gin.H{
				"theme":         "system",
				"sidebarMode":   "auto",
				"dashboardPref": "",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch preferences"})
		return
	}

	c.JSON(http.StatusOK, pref)
}

func (h *SettingsHandler) UpdatePreferences(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var req UpdatePreferencesRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var pref models.UserPreference
	err := h.DB.Where("user_id = ?", userID).First(&pref).Error

	if err == gorm.ErrRecordNotFound {
		pref = models.UserPreference{
			ID:            uuid.NewString(),
			UserID:        userID.(string),
			Theme:         req.Theme,
			SidebarMode:   req.SidebarMode,
			DashboardPref: req.DashboardPref,
		}
		h.DB.Create(&pref)
	} else if err == nil {
		h.DB.Model(&pref).Updates(map[string]interface{}{
			"theme":          req.Theme,
			"sidebar_mode":   req.SidebarMode,
			"dashboard_pref": req.DashboardPref,
		})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update preferences"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Preferences updated successfully"})
}
