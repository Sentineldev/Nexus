package restaurants

import (
	"quantum/internal/utils"
)

type SaveRestaurantDto struct {
	Name string `json:"name"`
}

func (dto SaveRestaurantDto) Validate() bool {
	return !utils.IsStringEmpty(dto.Name)
}

type UpdateRestaurantHandlerBody struct {
	Name     string `json:"name"`
	IsActive string `json:"isActive"`
}

func (dto UpdateRestaurantHandlerBody) Validate() bool {

	if utils.IsStringEmpty(dto.Name) {
		return false
	}

	if !utils.IsStringEmpty(dto.Name) && !utils.IsStringBoolean(dto.IsActive) {
		return false
	}

	return true
}

func (dto UpdateRestaurantHandlerBody) Parse() UpdateRestaurantDto {
	return UpdateRestaurantDto{
		Name:     dto.Name,
		IsActive: utils.ParseStringToBoolean(dto.IsActive),
	}
}

type UpdateRestaurantDto struct {
	Name     string `json:"name"`
	IsActive bool   `json:"isActive"`
}
