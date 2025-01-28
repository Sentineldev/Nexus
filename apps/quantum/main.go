package main

import (
	"os"
	"quantum/internal/database"
	"quantum/internal/routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	server := echo.New()

	server.Use(middleware.CORS())

	routes.ApiGroup(server)
	connection := database.GetConnection()

	if len(os.Args) > 1 && os.Args[1] == "--migrate" {
		database.CreateTables()

	}

	server.Logger.Fatal(server.Start("0.0.0.0:3000"))

	defer connection.Close()
}
