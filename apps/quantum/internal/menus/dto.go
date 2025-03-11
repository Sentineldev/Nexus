package menus

import (
	"net/http"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type SaveMenuDto struct {
	RestaurantId string `json:"restaurantId"`
	Name         string `json:"name"`
}

func (dto SaveMenuDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Name) {
		err = "Name cant be empty"
	}

	if utils.IsStringEmpty(dto.RestaurantId) {
		err = "RestaurantId cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

type UpdateMenuDto struct {
	Name     string `json:"name"`
	IsActive string `json:"isActive"`
}

func (dto UpdateMenuDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Name) {
		err = "Name cant be empty"
	}

	if utils.IsStringEmpty(dto.IsActive) {
		err = "IsActive cant be empty"
	}

	if !utils.IsStringBoolean(dto.IsActive) {
		err = "IsActive should be boolean"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	return nil
}

func (dto UpdateMenuDto) Parse() UpdateMenuServiceBodyDto {

	return UpdateMenuServiceBodyDto{
		Name:     dto.Name,
		IsActive: utils.ParseStringToBoolean(dto.IsActive),
	}
}

type UpdateMenuServiceBodyDto struct {
	Name     string `json:"name"`
	IsActive bool   `json:"isActive"`
}
