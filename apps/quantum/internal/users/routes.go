package users

import "github.com/labstack/echo/v4"

func UsersRoutes(server *echo.Group) {

	handler := NewUserHandler()

	group := server.Group("/users")

	// group.GET("/:id", handler.GetById)
	group.GET("", handler.GetAll)
	group.POST("", handler.Save)
	group.PUT("/change-password/:id", handler.ChangePassword)
	group.PUT("/:id", handler.Update)
	group.DELETE("/:id", handler.Delete)
}
