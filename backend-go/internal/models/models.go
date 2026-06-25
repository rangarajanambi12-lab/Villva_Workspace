package models

import (
	"time"

	"gorm.io/gorm"
)

type UserPreference struct {
	ID            string    `gorm:"type:uuid;primaryKey" json:"id"`
	UserID        string    `gorm:"type:uuid;index;unique" json:"userId"`
	Theme         string    `gorm:"default:'system'" json:"theme"`
	SidebarMode   string    `gorm:"default:'auto'" json:"sidebarMode"`
	DashboardPref string    `gorm:"type:text" json:"dashboardPref"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

type Organization struct {
	ID        string    `gorm:"type:uuid;primaryKey" json:"id"`
	Name      string    `gorm:"not null" json:"name"`
	Code      string    `gorm:"uniqueIndex;not null" json:"code"`
	Industry  string    `json:"industry"`
	GST       string    `json:"gst"`
	PAN       string    `json:"pan"`
	CIN       string    `json:"cin"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Address   string    `json:"address"`
	City      string    `json:"city"`
	State     string    `json:"state"`
	Country   string    `json:"country"`
	Pincode   string    `json:"pincode"`
	LogoUrl   string    `json:"logoUrl"`
	BannerUrl string    `json:"bannerUrl"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type User struct {
	ID           string    `gorm:"type:uuid;primaryKey" json:"id"`
	OrgID        *string   `gorm:"type:uuid;index" json:"orgId"`
	Name         string    `gorm:"not null" json:"name"`
	EmpID        string    `json:"empId"`
	Email        string    `gorm:"uniqueIndex;not null" json:"email"`
	Mobile              string    `json:"mobile"`
	Department          string    `json:"department"`
	Designation         string    `json:"designation"`
	ProfilePicture      string    `json:"profilePicture"`
	Role                string    `gorm:"not null" json:"role"`
	PasswordHash        string    `json:"-"`
	Status              string    `gorm:"default:'INVITED'" json:"status"` // INVITED, ACTIVE, INACTIVE
	OrgSetupDone        bool      `gorm:"default:false" json:"orgSetupDone"`
	ForcePasswordChange bool      `gorm:"default:true" json:"forcePasswordChange"`
	CreatedAt           time.Time `json:"createdAt"`
	UpdatedAt           time.Time `json:"updatedAt"`
}

type RefreshToken struct {
	ID        string    `gorm:"type:uuid;primaryKey"`
	UserID    string    `gorm:"type:uuid;index;not null"`
	Token     string    `gorm:"uniqueIndex;not null"`
	ExpiresAt time.Time `gorm:"not null"`
	CreatedAt time.Time
}

type AuditLog struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    string    `gorm:"type:uuid;index" json:"userId"`
	Action    string    `gorm:"not null" json:"action"`
	IPAddress string    `json:"ipAddress"`
	Timestamp time.Time `gorm:"autoCreateTime" json:"timestamp"`
}

type FileUpload struct {
	ID        string    `gorm:"type:uuid;primaryKey" json:"id"`
	OrgID     string    `gorm:"type:uuid;index" json:"orgId"`
	FileName  string    `gorm:"not null" json:"fileName"`
	Url       string    `gorm:"not null" json:"url"`
	CreatedAt time.Time `json:"createdAt"`
}

func AutoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&Organization{},
		&User{},
		&RefreshToken{},
		&AuditLog{},
		&FileUpload{},
		&UserPreference{},
	)
}
