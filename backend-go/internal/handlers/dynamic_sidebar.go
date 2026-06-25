package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type DynamicSidebarHandler struct{}

var RoleModulesMap = map[string][]string{
	"ADMIN": {
		"dashboard", "organization-settings", "employee-directory",
		"customer-master", "weekly-cam", "monthly-cam",
		"pending-enquiry", "general-work", "wam",
		"work-tracking", "reports", "user-management",
	},
	"MD": {
		"dashboard", "employee-directory",
		"customer-master", "weekly-cam", "monthly-cam",
		"pending-enquiry", "general-work", "wam",
		"work-tracking", "reports",
	},
	"MANAGER": {
		"dashboard", "employee-directory",
		"wam", "work-tracking", "reports",
	},
	"SALES_ENGINEER": {
		"customer-master", "weekly-cam", "monthly-cam", "reports",
	},
	"APPLICATION_ENGINEER": {
		"pending-enquiry", "general-work", "reports",
	},
	"PLANT_ENGINEER": {
		"wam", "work-tracking", "reports",
	},
}

func (h *DynamicSidebarHandler) GetModules(c *gin.Context) {
	role, exists := c.Get("role")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	modules, ok := RoleModulesMap[role.(string)]
	if !ok {
		modules = []string{}
	}

	c.JSON(http.StatusOK, gin.H{
		"role":    role,
		"modules": modules,
	})
}
