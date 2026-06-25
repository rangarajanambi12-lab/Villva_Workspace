package models

import (
	"log"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Seed(db *gorm.DB) error {
	var adminCount int64
	db.Model(&User{}).Where("email = ?", "admin@villva.com").Count(&adminCount)

	if adminCount == 0 {
		hash, err := bcrypt.GenerateFromPassword([]byte("villva123"), bcrypt.DefaultCost)
		if err != nil {
			return err
		}

		admin := User{
			ID:           uuid.NewString(),
			Name:         "Super Admin",
			Email:        "admin@villva.com",
			PasswordHash: string(hash),
			Role:                "ADMIN",
			Status:              "ACTIVE",
			OrgSetupDone:        false,
			ForcePasswordChange: false,
		}

		if err := db.Create(&admin).Error; err != nil {
			return err
		}
		log.Println("Default Admin Account seeded.")
	} else {
		log.Println("Admin Account already exists.")
	}

	// Seed Requested Users
	usersToSeed := []User{
		{Name: "Manoharan Sakthivel", Email: "Manoharansakthivel@flowtech.in", Role: "MD", EmpID: "EMP-01", Department: "Management"},
		{Name: "Premnath", Email: "premnathprakasam@flowtech.in", Role: "MANAGER", EmpID: "EMP-02", Department: "Plant"},
		{Name: "Sharmila", Email: "csharmila@flowtech.in", Role: "ADMIN", EmpID: "EMP-03", Department: "Admin"},
		{Name: "Sreemathi", Email: "rsreemathi@flowtech.in", Role: "APPLICATION_ENGINEER", EmpID: "EMP-04", Department: "App Engineering"},
		{Name: "Gowri", Email: "dgowri@flowtech.in", Role: "APPLICATION_ENGINEER", EmpID: "EMP-05", Department: "App Engineering"},
		{Name: "Thilak Surya", Email: "rthilaksuray@flowtech.in", Role: "SALES_ENGINEER", EmpID: "EMP-06", Department: "Sales"},
		{Name: "Yesuvadiyan Rajan", Email: "pyesuvadianrajan@flowtech.in", Role: "SALES_ENGINEER", EmpID: "EMP-07", Department: "Sales"},
		{Name: "Mouli", Email: "gmouli@flowteh.in", Role: "SALES_ENGINEER", EmpID: "EMP-08", Department: "Sales"},
		{Name: "Madhusudhan", Email: "madhusudhanan@flowtech.in", Role: "SALES_ENGINEER", EmpID: "EMP-09", Department: "Sales"},
		{Name: "Selvaraj", Email: "aselvaraj@flowtech.in", Role: "PLANT_ENGINEER", EmpID: "EMP-10", Department: "Plant"},
		{Name: "Sivakumar", Email: "sivakumar.factory@flowtech.in", Role: "PLANT_ENGINEER", EmpID: "EMP-11", Department: "Plant"},
		{Name: "Gopinath", Email: "dgopinath@flowtech.in", Role: "PLANT_ENGINEER", EmpID: "EMP-12", Department: "Plant"},
		{Name: "Chandrasekar", Email: "chandrasekar.factory@flowtech.in", Role: "PLANT_ENGINEER", EmpID: "EMP-13", Department: "Plant"},
		{Name: "Parthipan", Email: "mparthipan@flowtech.in", Role: "PLANT_ENGINEER", EmpID: "EMP-14", Department: "Plant"},
		{Name: "Rajesh", Email: "brajesh@flowtech.in", Role: "PLANT_ENGINEER", EmpID: "EMP-15", Department: "Plant"},
		{Name: "Iliyas", Email: "asmohammediliyas@villva.com", Role: "PLANT_ENGINEER", EmpID: "EMP-16", Department: "Plant"},
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte("villva123"), bcrypt.DefaultCost)
	hashedPassword := string(hash)

	for _, u := range usersToSeed {
		var count int64
		db.Model(&User{}).Where("email = ?", u.Email).Count(&count)
		if count == 0 {
			u.ID = uuid.NewString()
			u.PasswordHash = hashedPassword
			u.Status = "ACTIVE"
			u.OrgSetupDone = true // Only the main admin needs to do org setup
			u.ForcePasswordChange = false

			if err := db.Create(&u).Error; err != nil {
				log.Printf("Failed to seed user %s: %v\n", u.Email, err)
			} else {
				log.Printf("Seeded user: %s\n", u.Email)
			}
		}
	}

	return nil
}
