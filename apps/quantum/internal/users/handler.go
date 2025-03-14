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

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Save(body); err != nil {
		return err
	}
	return context.JSON(http.StatusCreated, nil)
}

func (handler UserHandler) Update(context echo.Context) error {

	body := UpdateUserDto{}

	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Update(body.Id, body); err != nil {
		return err
	}

	return context.JSON(http.StatusOK, nil)
}

func (handler UserHandler) ChangePassword(context echo.Context) error {

	body := UpdateUserPassword{}
	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.ChangePassword(body.Id, body); err != nil {
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
			Id:        user.Id,
			Username:  user.Username,
			ShortName: user.ShortName,
			Employee:  user.Employee,
		})
	}
	return context.JSON(http.StatusOK, body)
}
