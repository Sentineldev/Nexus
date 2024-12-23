package auth

import "github.com/labstack/echo/v4"

func AuthRoutes(server *echo.Group) {

	handler := NewAuthHandler()

	group := server.Group("/auth")

	group.POST("", handler.LogIn)
}
