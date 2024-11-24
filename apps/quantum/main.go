package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {

	server := echo.New()

	server.GET("/", func(c echo.Context) error {

		return c.String(http.StatusOK, "Hello, world!")
	})

	server.Logger.Fatal(server.Start(":3000"))

}
