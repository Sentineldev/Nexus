package clients

import (
	"quantum/internal/types"
	"strconv"

	"github.com/labstack/echo/v4"
)

type SaveClientDto struct {
	FullName           string `json:"fullName"`
	Email              string `json:"email"`
	Identification     string `json:"identification"`
	IdentificationType string `json:"identificationType"`
}

type ClientPageFilter struct {
	Page     string `json:"page"`
	PageSize string `json:"pageSize"`
}

func (filter ClientPageFilter) Validate() (types.PageFilter[any], error) {

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
