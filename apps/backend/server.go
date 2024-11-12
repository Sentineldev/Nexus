package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func MakeServer() *echo.Echo {

	server := echo.New()
	server.Use(middleware.CORS())

	return server
}
