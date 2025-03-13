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
	ShortName              string `json:"shortName"`
}

func (dto SaveUserDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Username) {
		err = "Username cant be empty"
	}

	if utils.IsStringEmpty(dto.ShortName) {
		err = "ShortName cant be empty"
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
	Id        string `param:"id"`
	Username  string `json:"username"`
	ShortName string `json:"shortName"`
}

func (dto UpdateUserDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Username) {
		err = "Username cant be empty"
	}

	if utils.IsStringEmpty(dto.ShortName) {
		err = "ShortName cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	return nil
}

type UpdateUserPassword struct {
	Id       string `param:"id"`
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
	Id        string         `json:"id"`
	Username  string         `json:"username"`
	ShortName string         `json:"shortName"`
	Employee  types.Employee `json:"employee"`
}
