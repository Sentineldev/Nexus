package feed_stock

import (
	"net/http"
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type SaveFeedStockDto struct {
	Name string `json:"name"`
	Unit string `json:"unit"`
}

func (dto SaveFeedStockDto) Validate() error {

	err := ""
	if utils.IsStringEmpty(dto.Name) {
		err = "Name cant be empty"
	}

	if utils.IsStringEmpty(dto.Unit) {
		err = "Unit cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

type UpdateFeedStockDto struct {
	Name string `json:"name"`
	Unit string `json:"unit"`
	Id   string `param:"id"`
}

func (dto UpdateFeedStockDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Id) {
		err = "Id cant be empty"
	}
	if utils.IsStringEmpty(dto.Name) {
		err = "Name cant be empty"
	}

	if utils.IsStringEmpty(dto.Unit) {
		err = "Unit cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

type FeedStockPageQueryDto struct {
	Page     string `query:"page"`
	PageSize string `query:"pageSize"`
}

func (dto FeedStockPageQueryDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Page) {
		err = "Page cant be empty"
	}

	if utils.IsStringEmpty(dto.PageSize) {
		err = "PageSize cant be empty"
	}

	if !utils.IsStringNumberIntenger(dto.Page) {
		err = "Page should be a number"
	}

	if !utils.IsStringNumberIntenger(dto.PageSize) {
		err = "PageSize should be a number"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	return nil
}

func (dto FeedStockPageQueryDto) Parse() types.PageFilter[any] {

	return types.PageFilter[any]{
		Page:     utils.ParseStringToInt64(dto.Page),
		PageSize: utils.ParseStringToInt64(dto.PageSize),
	}

}
