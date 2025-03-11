package products

import (
	"net/http"
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
