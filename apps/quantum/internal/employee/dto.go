package employee

import (
	"net/http"
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type SaveEmployeeDto struct {
	FirstNames       string `json:"firstNames"`
	LastNames        string `json:"lastNames"`
	Identification   string `json:"identification"`
	PersonalEmail    string `json:"personalEmail"`
	CorporativeEmail string `json:"corporativeEmail"`
	JobEntryDate     string `json:"jobEntryDate"`
	JobDepartureDate string `json:"JobDepartureDate"`
	Department       string `json:"department"`
	Position         string `json:"position"`
}

func (dto SaveEmployeeDto) Validate() error {

	err := ""
	if utils.IsStringEmpty(dto.Identification) {
		err = "Identification can't be empty"

	}
	if utils.IsStringEmpty(dto.FirstNames) {
		err = "First Name cant be empty"
	}
	if utils.IsStringEmpty(dto.LastNames) {
		err = "Last Name cant be empty"
	}
	// Need to check for a valid email.
	if utils.IsStringEmpty(dto.PersonalEmail) {
		err = "Personal email cant be empty"
	}
	if utils.IsStringEmpty(dto.CorporativeEmail) {
		err = "Corporative email cant be empty"
	}
	if utils.IsStringEmpty(dto.JobEntryDate) {
		err = "Job entry date cant be empty"
	}
	if utils.IsStringEmpty(dto.JobDepartureDate) {
		err = "Job departure date cant be empty"
	}

	if utils.IsStringEmpty(dto.Department) {
		err = "Department cant be empty"
	}

	if utils.IsStringEmpty(dto.Position) {
		err = "Position cant be empty"
	}
	if utils.IsStringEmpty(err) {
		return nil
	}
	return echo.NewHTTPError(http.StatusUnprocessableEntity, err)

}

type EmployeePageFilterDto struct {
	Page     string `json:"page"`
	PageSize string `json:"pageSize"`
}

func (filter EmployeePageFilterDto) Validate() error {
	err := ""

	if utils.IsStringEmpty(filter.Page) {
		err = "Page cant be empty"
	}

	if utils.IsStringEmpty(filter.PageSize) {
		err = "PageSize cant be empty"
	}

	if !utils.IsStringNumberIntenger(filter.Page) {
		err = "Page should be integer number"
	}

	if !utils.IsStringNumberIntenger(filter.PageSize) {
		err = "PageSize should be integer number"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	return nil
}

func (filter EmployeePageFilterDto) Parse() types.PageFilter[any] {

	return types.PageFilter[any]{
		Page:     utils.ParseStringToInt64(filter.Page),
		PageSize: utils.ParseStringToInt64(filter.PageSize),
	}
}
