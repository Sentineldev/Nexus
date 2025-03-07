package employee

import "quantum/internal/utils"

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

func (dto SaveEmployeeDto) Validate() bool {

	if utils.IsStringEmpty(dto.Identification) {
		return false
	}
	if utils.IsStringEmpty(dto.FirstNames) || utils.IsStringEmpty(dto.LastNames) {
		return false
	}
	// Need to check for a valid email.
	if utils.IsStringEmpty(dto.PersonalEmail) {
		return false
	}
	if utils.IsStringEmpty(dto.CorporativeEmail) {
		return false
	}
	if utils.IsStringEmpty(dto.JobEntryDate) {
		return false
	}
	if utils.IsStringEmpty(dto.JobDepartureDate) {
		return false
	}

	if utils.IsStringEmpty(dto.Department) {
		return false
	}

	if utils.IsStringEmpty(dto.Position) {
		return false
	}
	return true
}
