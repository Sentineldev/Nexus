package employee

import (
	"net/http"
	"quantum/internal/types"

	"github.com/labstack/echo/v4"
)

type EmployeeHandler struct {
	Service EmployeeService
}

func NewEmployeeHandler() *EmployeeHandler {

	return &EmployeeHandler{
		Service: *NewEmployeeService(),
	}
}

func (handler EmployeeHandler) Save(context echo.Context) error {

	body := SaveEmployeeDto{}

	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}
	if err := handler.Service.Save(body); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, nil)
}

func (handler EmployeeHandler) Update(context echo.Context) error {
	id := context.Param("id")

	body := SaveEmployeeDto{}

	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}
	if err := handler.Service.Update(id, body); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, nil)
}

func (handler EmployeeHandler) Delete(context echo.Context) error {

	id := context.Param("id")

	if err := handler.Service.Delete(id); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, nil)
}

func (handler EmployeeHandler) GetPage(context echo.Context) error {

	filter := types.PageFilter[any]{
		Page:     1,
		PageSize: 5,
	}
	page := handler.Service.GetPage(filter)
	return context.JSON(http.StatusOK, page)
}
