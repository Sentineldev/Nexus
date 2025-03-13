package products

import (
	"net/http"
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type SaveProductDto struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Group       string `json:"group"`
}

func (dto SaveProductDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Name) {
		err = "Name cant be empty"
	}

	if utils.IsStringEmpty(dto.Description) {
		err = "Description cant be empty"
	}
	if utils.IsStringEmpty(dto.Group) {
		err = "Group cant be empty"
	}
	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

type ProductsPageFilterDto struct {
	Page     string `query:"page"`
	PageSize string `query:"PageSize"`
}

func (filter ProductsPageFilterDto) Validate() error {

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

func (filter ProductsPageFilterDto) Parse() types.PageFilter[any] {

	return types.PageFilter[any]{
		Page:     utils.ParseStringToInt64(filter.Page),
		PageSize: utils.ParseStringToInt64(filter.PageSize),
	}
}
