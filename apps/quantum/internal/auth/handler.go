package auth

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type AuthHandler struct {
	Service AuthService
}

func NewAuthHandler() *AuthHandler {
	return &AuthHandler{
		Service: *NewAuthService(),
	}
}

func (handler AuthHandler) LogIn(context echo.Context) error {

	body := LogInDto{}

	context.Bind(&body)

	token, err := handler.Service.LogIn(body)
	if err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, token)
}
