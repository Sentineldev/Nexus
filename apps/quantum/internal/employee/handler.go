package employee

import "github.com/labstack/echo/v4"

type EmployeeHandler struct {
	Service EmployeeService
}

func NewEmployeeHandler() *EmployeeHandler {

	return &EmployeeHandler{
		Service: *NewEmployeeService(),
	}
}

func (handler EmployeeHandler) Save(context echo.Context) error {

	return nil
}

func (handler EmployeeHandler) Update(context echo.Context) error {

	return nil
}

func (handler EmployeeHandler) Delete(context echo.Context) error {

	return nil
}

func (handler EmployeeHandler) GetPage(context echo.Context) error {

	return nil
}
