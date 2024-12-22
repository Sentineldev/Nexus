package users

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type UserHandler struct {
	Service UserService
}

func NewUserHandler() *UserHandler {

	return &UserHandler{
		Service: *NewUserService(),
	}
}

func (handler UserHandler) Save(context echo.Context) error {

	body := SaveUserDto{}

	context.Bind(&body)

	err := handler.Service.Save(body)

	if err != nil {
		return err
	}
	return context.JSON(http.StatusCreated, nil)
}

func (handler UserHandler) Update(context echo.Context) error {

	id := context.Param("id")
	body := UpdateUserDto{}

	context.Bind(&body)

	err := handler.Service.Update(id, body)

	if err != nil {
		return err
	}

	return context.JSON(http.StatusOK, nil)
}

func (handler UserHandler) ChangePassword(context echo.Context) error {

	id := context.Param("id")
	body := UpdateUserPassword{}

	context.Bind(&body)

	err := handler.Service.ChangePassword(id, body)

	if err != nil {
		return err
	}

	return context.JSON(http.StatusOK, nil)
}

func (handler UserHandler) Delete(context echo.Context) error {

	id := context.Param("id")

	err := handler.Service.Delete(id)

	if err != nil {
		return err
	}

	return context.JSON(http.StatusOK, nil)
}

func (handler UserHandler) GetAll(context echo.Context) error {

	data := handler.Service.GetAll()

	body := []OutGoingUserDto{}

	for _, user := range data {
		body = append(body, OutGoingUserDto{
			Id:       user.Id,
			Username: user.Username,
		})
	}
	return context.JSON(http.StatusOK, body)
}
