package main

import (
	"quantum/internal/routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	server := echo.New()

	server.Use(middleware.CORS())

	routes.ApiGroup(server)

	server.Logger.Fatal(server.Start(":3000"))
}
