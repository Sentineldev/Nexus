package main

import (
	"quantum/internal/routes"

	"github.com/labstack/echo/v4"
)

func main() {

	server := echo.New()
	routes.ApiGroup(server)

	server.Logger.Fatal(server.Start(":3000"))
}
