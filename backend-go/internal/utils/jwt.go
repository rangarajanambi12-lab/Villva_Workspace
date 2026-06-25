package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/villva/backend/config"
)

type JWTClaim struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	OrgID  string `json:"org_id"`
	jwt.RegisteredClaims
}

func GenerateTokens(userID, email, role, orgID string) (string, string, error) {
	cfg := config.LoadConfig()
	jwtSecret := []byte(cfg.JWTSecret)

	// Access Token (15 minutes)
	accessExpirationTime := time.Now().Add(15 * time.Minute)
	accessClaims := &JWTClaim{
		UserID: userID,
		Email:  email,
		Role:   role,
		OrgID:  orgID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(accessExpirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessString, err := accessToken.SignedString(jwtSecret)
	if err != nil {
		return "", "", err
	}

	// Refresh Token (7 days)
	refreshExpirationTime := time.Now().Add(7 * 24 * time.Hour)
	refreshClaims := &JWTClaim{
		UserID: userID,
		Email:  email,
		Role:   role,
		OrgID:  orgID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(refreshExpirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshString, err := refreshToken.SignedString(jwtSecret)
	if err != nil {
		return "", "", err
	}

	return accessString, refreshString, nil
}

func ValidateToken(signedToken string) (*JWTClaim, error) {
	cfg := config.LoadConfig()
	jwtSecret := []byte(cfg.JWTSecret)

	token, err := jwt.ParseWithClaims(
		signedToken,
		&JWTClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		},
	)
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(*JWTClaim)
	if !ok {
		return nil, errors.New("could not parse claims")
	}
	if claims.ExpiresAt.Time.Before(time.Now()) {
		return nil, errors.New("token expired")
	}
	return claims, nil
}
