package menu_category

import (
	"net/http"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type SaveMenuCategoryDto struct {
	MenuId string `json:"menuId"`
	Name   string `json:"name"`
}

func (dto SaveMenuCategoryDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Name) {
		err = "Name cant be empty"
	}

	if utils.IsStringEmpty(dto.MenuId) {
		err = "MenuId cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

type UpdateMenuCategoryDto struct {
	Name     string `json:"name"`
	IsActive string `json:"isActive"`
}

func (dto UpdateMenuCategoryDto) Validate() error {

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

func (dto UpdateMenuCategoryDto) Parse() UpdateMenuCategoryBodyServiceDto {

	return UpdateMenuCategoryBodyServiceDto{
		Name:     dto.Name,
		IsActive: utils.ParseStringToBoolean(dto.IsActive),
	}
}

type UpdateMenuCategoryBodyServiceDto struct {
	Name     string `json:"name"`
	IsActive bool   `json:"isActive"`
}
