package users

import (
	"net/http"
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type SaveUserDto struct {
	Username               string `json:"username"`
	Password               string `json:"password"`
	EmployeeIdentification string `json:"employeeIdentification"`
}

func (dto SaveUserDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Username) {
		err = "Username cant be empty"
	}

	if utils.IsStringEmpty(dto.Password) {
		err = "Password cant be empty"
	}

	if utils.IsStringEmpty(dto.EmployeeIdentification) {
		err = "Employee Identification cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

type UpdateUserDto struct {
	Username string `json:"username"`
}

func (dto UpdateUserDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Username) {
		err = "Username cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	return nil
}

type UpdateUserPassword struct {
	Password string `json:"password"`
}

func (dto UpdateUserPassword) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Password) {
		err = "Password cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	return nil
}

type OutGoingUserDto struct {
	Id       string         `json:"id"`
	Username string         `json:"username"`
	Employee types.Employee `json:"employee"`
}
