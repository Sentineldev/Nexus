package restaurants

import (
	"quantum/internal/types"
	"strconv"

	"github.com/labstack/echo/v4"
)

type RestaurantPageFilter struct {
	Page     string `json:"page"`
	PageSize string `json:"pageSize"`
}

func (filter RestaurantPageFilter) Validate() (types.PageFilter[any], error) {

	result := types.PageFilter[any]{}

	if value, err := strconv.ParseInt(filter.Page, 10, 64); err != nil {
		return result, echo.ErrUnprocessableEntity
	} else {
		result.Page = value
	}
	if value, err := strconv.ParseInt(filter.PageSize, 10, 64); err != nil {
		return result, echo.ErrUnprocessableEntity
	} else {
		result.PageSize = value
	}
	return result, nil
}
