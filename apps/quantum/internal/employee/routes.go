package employee

import "github.com/labstack/echo/v4"

func EmployeesRoutes(server *echo.Group) {

	handler := NewEmployeeHandler()

	group := server.Group("/employee")

	group.GET("", handler.GetPage)
	group.POST("", handler.Save)
	group.PUT("/:id", handler.Update)
	group.DELETE("/:id", handler.Delete)
}
