package employee

import (
	"net/http"
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
