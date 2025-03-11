package restaurants

import (
	"net/http"
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type SaveRestaurantDto struct {
	Name string `json:"name"`
}

func (dto SaveRestaurantDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Name) {
		err = "Name cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

type UpdateRestaurantBodyDto struct {
	Name     string `json:"name"`
	IsActive string `json:"isActive"`
}

func (dto UpdateRestaurantBodyDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Name) {
		err = "Name cant be empty"
	}

	if utils.IsStringEmpty(dto.IsActive) {
		err = "IsActive cant be empty"
	}

	if !utils.IsStringBoolean(dto.IsActive) {
		err = "IsActive should be bool"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

func (dto UpdateRestaurantBodyDto) Parse() UpdateRestaurantServiceBodyDto {
	return UpdateRestaurantServiceBodyDto{
		Name:     dto.Name,
		IsActive: utils.ParseStringToBoolean(dto.IsActive),
	}
}

type UpdateRestaurantServiceBodyDto struct {
	Name     string `json:"name"`
	IsActive bool   `json:"isActive"`
}

type RestaurantPageFilterDto struct {
	Page     string `json:"page"`
	PageSize string `json:"pageSize"`
}

func (filter RestaurantPageFilterDto) Validate() error {

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

func (filter RestaurantPageFilterDto) Parse() types.PageFilter[any] {

	return types.PageFilter[any]{
		Page:     utils.ParseStringToInt64(filter.Page),
		PageSize: utils.ParseStringToInt64(filter.PageSize),
	}
}
