package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/villva/backend/internal/models"
	"github.com/villva/backend/internal/utils"
	"gorm.io/gorm"
)

type OrgHandler struct {
	DB *gorm.DB
}

type OrgSetupRequest struct {
	Name      string `json:"name" binding:"required"`
	Code      string `json:"code" binding:"required"`
	Industry  string `json:"industry"`
	GST       string `json:"gst"`
	PAN       string `json:"pan"`
	CIN       string `json:"cin"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Address   string `json:"address"`
	City      string `json:"city"`
	State     string `json:"state"`
	Country   string `json:"country"`
	Pincode   string `json:"pincode"`
	LogoUrl   string `json:"logoUrl"`
	BannerUrl string `json:"bannerUrl"`
}

func (h *OrgHandler) CreateOrUpdateOrganization(c *gin.Context) {
	var req OrgSetupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, _ := c.Get("user_id")

	var user models.User
	if err := h.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if user.Role != "ADMIN" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only ADMIN can setup organization"})
		return
	}

	var org models.Organization
	err := h.DB.Where("code = ?", req.Code).First(&org).Error
	if err == gorm.ErrRecordNotFound {
		org = models.Organization{
			ID:        uuid.NewString(),
			Name:      req.Name,
			Code:      req.Code,
			Industry:  req.Industry,
			GST:       req.GST,
			PAN:       req.PAN,
			CIN:       req.CIN,
			Email:     req.Email,
			Phone:     req.Phone,
			Address:   req.Address,
			City:      req.City,
			State:     req.State,
			Country:   req.Country,
			Pincode:   req.Pincode,
			LogoUrl:   req.LogoUrl,
			BannerUrl: req.BannerUrl,
		}
		if err := h.DB.Create(&org).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create organization"})
			return
		}
	} else if err == nil {
		// Update existing org
		org.Name = req.Name
		org.Industry = req.Industry
		org.GST = req.GST
		org.PAN = req.PAN
		org.CIN = req.CIN
		org.Email = req.Email
		org.Phone = req.Phone
		org.Address = req.Address
		org.City = req.City
		org.State = req.State
		org.Country = req.Country
		org.Pincode = req.Pincode
		org.LogoUrl = req.LogoUrl
		org.BannerUrl = req.BannerUrl

		if err := h.DB.Save(&org).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update organization"})
			return
		}
	}

	user.OrgID = &org.ID
	user.OrgSetupDone = true
	h.DB.Save(&user)

	// Log Action
	h.DB.Create(&models.AuditLog{
		UserID:    user.ID,
		Action:    "ORGANIZATION_SETUP_COMPLETED",
		IPAddress: c.ClientIP(),
	})

	// Generate new token with org_id
	accessToken, _, _ := utils.GenerateTokens(user.ID, user.Email, user.Role, org.ID)

	c.JSON(http.StatusOK, gin.H{
		"message":      "Organization setup complete",
		"org":          org,
		"access_token": accessToken,
	})
}

func (h *OrgHandler) GetOrganization(c *gin.Context) {
	orgID, _ := c.Get("org_id")
	if orgID == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "Organization not found"})
		return
	}

	var org models.Organization
	if err := h.DB.Where("id = ?", orgID).First(&org).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Organization not found"})
		return
	}

	c.JSON(http.StatusOK, org)
}
