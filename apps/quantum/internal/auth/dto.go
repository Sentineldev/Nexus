package auth

import "github.com/golang-jwt/jwt/v5"

type LogInDto struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type TokenData struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}
