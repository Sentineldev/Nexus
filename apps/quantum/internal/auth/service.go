package auth

import (
	"fmt"
	"quantum/internal/users"
	"quantum/internal/utils"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type AuthService struct {
	Repository users.UserRepository
}

func NewAuthService() *AuthService {
	return &AuthService{
		Repository: users.NewLocalUserRepository(),
	}
}

func (service AuthService) LogIn(body LogInDto) (string, error) {

	user, err := service.Repository.GetByUsername(body.Username)

	if err != nil {
		return "", echo.ErrNotFound
	}
	if err := utils.CheckPasswordHash(body.Password, user.Password); err != nil {
		return "", echo.ErrUnauthorized
	}

	claims := &TokenData{
		user.Id,
		user.Username,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 1)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte("sasdasdasdkasjfsdlkfjsdkl"))

	if err != nil {
		fmt.Printf("%s\n", err)
		return "", echo.ErrInternalServerError
	}
	return t, nil
}
