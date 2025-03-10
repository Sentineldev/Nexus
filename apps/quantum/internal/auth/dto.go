package auth

import (
	"quantum/internal/types"

	"github.com/golang-jwt/jwt/v5"
)

type LogInDto struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type TokenData struct {
	Id        string         `json:"id"`
	Username  string         `json:"username"`
	ShortName string         `json:"shortName"`
	Employee  types.Employee `json:"employee"`
	jwt.RegisteredClaims
}
