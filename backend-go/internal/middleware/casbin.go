package middleware

import (
	"log"
	"net/http"

	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var Enforcer *casbin.Enforcer

func InitCasbin(db *gorm.DB) error {
	adapter, err := gormadapter.NewAdapterByDB(db)
	if err != nil {
		return err
	}

	enforcer, err := casbin.NewEnforcer("config/authz_model.conf", adapter)
	if err != nil {
		return err
	}

	err = enforcer.LoadPolicy()
	if err != nil {
		return err
	}

	Enforcer = enforcer

	seedPolicies(enforcer)

	return nil
}

func seedPolicies(e *casbin.Enforcer) {
	// Format: sub, obj, act
	policies := [][]string{
		// ADMIN
		{"ADMIN", "/api/organization", "(GET)|(POST)|(PUT)"},
		{"ADMIN", "/api/users", "(GET)|(POST)|(PUT)|(DELETE)"},
		{"ADMIN", "/api/invitations/*", "(GET)|(POST)"},
		{"ADMIN", "/api/sales/*", "(GET)|(POST)|(PUT)|(DELETE)"},
		{"ADMIN", "/api/app-engineer/*", "(GET)|(POST)|(PUT)|(DELETE)"},
		{"ADMIN", "/api/plant/*", "(GET)|(POST)|(PUT)|(DELETE)"},
		{"ADMIN", "/api/reports/*", "(GET)"},

		// MD
		{"MD", "/api/users", "(GET)"},
		{"MD", "/api/sales/*", "(GET)"},
		{"MD", "/api/app-engineer/*", "(GET)"},
		{"MD", "/api/plant/*", "(GET)"},
		{"MD", "/api/reports/*", "(GET)"},

		// MANAGER
		{"MANAGER", "/api/users", "(GET)"},
		{"MANAGER", "/api/plant/*", "(GET)"},
		{"MANAGER", "/api/reports/*", "(GET)"},

		// SALES_ENGINEER
		{"SALES_ENGINEER", "/api/sales/*", "(GET)|(POST)|(PUT)|(DELETE)"},
		{"SALES_ENGINEER", "/api/reports/*", "(GET)"},

		// APPLICATION_ENGINEER
		{"APPLICATION_ENGINEER", "/api/app-engineer/*", "(GET)|(POST)|(PUT)|(DELETE)"},
		{"APPLICATION_ENGINEER", "/api/reports/*", "(GET)"},

		// PLANT_ENGINEER
		{"PLANT_ENGINEER", "/api/plant/*", "(GET)|(POST)|(PUT)|(DELETE)"},
		{"PLANT_ENGINEER", "/api/reports/*", "(GET)"},
	}

	for _, p := range policies {
		added, err := e.AddPolicy(p[0], p[1], p[2])
		if err != nil {
			log.Printf("Error adding policy %v: %v", p, err)
		} else if added {
			log.Printf("Added policy: %v", p)
		}
	}
}

func Authorize() gin.HandlerFunc {
	return func(c *gin.Context) {
		role, exists := c.Get("role")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			c.Abort()
			return
		}

		obj := c.Request.URL.Path
		act := c.Request.Method

		ok, err := Enforcer.Enforce(role, obj, act)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error occurred during authorization"})
			c.Abort()
			return
		}

		if !ok {
			c.JSON(http.StatusForbidden, gin.H{"message": "Access Denied"})
			c.Abort()
			return
		}

		c.Next()
	}
}
