package auth

import (
	"quantum/internal"
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
		Repository: users.NewDatabaseRepository(),
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
		user.ShortName,
		user.Employee,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(internal.LOGIN_TIME)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte(internal.SECRET_KEY))

	if err != nil {
		return "", echo.ErrInternalServerError
	}
	return t, nil
}
