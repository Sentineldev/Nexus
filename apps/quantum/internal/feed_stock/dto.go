package feed_stock

import (
	"net/http"
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type UpdateFeedStockDto struct {
	Body SaveFeedStockDto
	Id   string
}

func (dto UpdateFeedStockDto) Validate() error {

	err := ""
	if err := dto.Body.Validate(); err != nil {
		return err
	}

	if utils.IsStringEmpty(dto.Id) {
		err = "Id cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

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

type FeedStockPageQueryDto struct {
	Page     string `json:"page"`
	PageSize string `json:"pageSize"`
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
