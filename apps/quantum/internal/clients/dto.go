package clients

import (
	"net/http"
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type SaveClientDto struct {
	FullName           string `json:"fullName"`
	Email              string `json:"email"`
	Identification     string `json:"identification"`
	IdentificationType string `json:"identificationType"`
}

func (dto SaveClientDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.FullName) {
		err = "FullName cant be empty"
	}

	if utils.IsStringEmpty(dto.Email) {
		err = "Email cant be empty"
	}

	if utils.IsStringEmpty(dto.Identification) {
		err = "Identification cant be empty"
	}

	if utils.IsStringEmpty(dto.IdentificationType) {
		err = "IdentificationType cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	return nil
}

type ClientPageFilterDto struct {
	Page     string `query:"page"`
	PageSize string `query:"pageSize"`
}

func (filter ClientPageFilterDto) Validate() error {
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

func (filter ClientPageFilterDto) Parse() types.PageFilter[any] {

	return types.PageFilter[any]{
		Page:     utils.ParseStringToInt64(filter.Page),
		PageSize: utils.ParseStringToInt64(filter.PageSize),
	}
}
