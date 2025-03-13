package category_product

import (
	"net/http"
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/labstack/echo/v4"
)

type SaveCategoryProductDto struct {
	ProductId  string `json:"productId"`
	CategoryId string `json:"categoryId"`
	Price      string `json:"price"`
	Count      string `json:"count"`
}

func (dto SaveCategoryProductDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.ProductId) {
		err = "ProductId cant be empty"
	}

	if utils.IsStringEmpty(dto.CategoryId) {
		err = "CategoryId cant be empty"
	}

	if utils.IsStringEmpty(dto.Price) {
		err = "Price cant be empty"
	}

	if utils.IsStringEmpty(dto.Count) {
		err = "Count cant be empty"
	}

	if !utils.IsStringNumber(dto.Price) {
		err = "Price should be a number"
	}

	if !utils.IsStringNumberIntenger(dto.Count) {
		err = "Count should be a number integer"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

func (dto SaveCategoryProductDto) Parse() SaveCategoryProductServiceBodyDto {
	return SaveCategoryProductServiceBodyDto{
		ProductId:  dto.ProductId,
		CategoryId: dto.CategoryId,
		Price:      utils.ParseStringToFloat64(dto.Price),
		Count:      utils.ParseStringToInt64(dto.Count),
	}
}

type SaveCategoryProductServiceBodyDto struct {
	ProductId  string  `json:"productId"`
	CategoryId string  `json:"categoryId"`
	Price      float64 `json:"price"`
	Count      int64   `json:"count"`
}

type UpdateCategoryProductDto struct {
	Id       string `param:"id"`
	Price    string `json:"price"`
	Count    string `json:"count"`
	IsActive string `json:"isActive"`
}

func (dto UpdateCategoryProductDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Id) {
		err = "Id cant be empty"
	}
	if utils.IsStringEmpty(dto.Price) {
		err = "Price cant be empty"
	}
	if utils.IsStringEmpty(dto.Count) {
		err = "Count cant be empty"
	}
	if utils.IsStringEmpty(dto.IsActive) {
		err = "IsActive cant be empty"
	}

	if !utils.IsStringNumber(dto.Price) {
		err = "Price should be a number"
	}

	if !utils.IsStringNumberIntenger(dto.Count) {
		err = "Count should be a number integer"
	}

	if !utils.IsStringBoolean(dto.IsActive) {
		err = "IsActive should be boolean"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

func (dto UpdateCategoryProductDto) Parse() UpdateCategoryProductServiceBodyDto {
	return UpdateCategoryProductServiceBodyDto{
		Price:    utils.ParseStringToFloat64(dto.Price),
		Count:    utils.ParseStringToInt64(dto.Count),
		IsActive: utils.ParseStringToBoolean(dto.IsActive),
	}
}

type UpdateCategoryProductServiceBodyDto struct {
	Price    float64 `json:"price"`
	Count    int64   `json:"count"`
	IsActive bool    `json:"isActive"`
}

type CategoryPageFilterDto struct {
	Page       string `query:"page"`
	PageSize   string `query:"pageSize"`
	CategoryId string `param:"categoryId"`
}

func (dto CategoryPageFilterDto) Validate() error {
	err := ""

	if utils.IsStringEmpty(dto.Page) {
		err = "Page cant be empty"
	}

	if utils.IsStringEmpty(dto.PageSize) {
		err = "PageSize cant be empty"
	}

	if !utils.IsStringNumberIntenger(dto.Page) {
		err = "Page should be a integer number"
	}
	if !utils.IsStringNumberIntenger(dto.PageSize) {
		err = "PageSize should be a integer number"
	}
	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	return nil
}

func (dto CategoryPageFilterDto) Parse() types.PageFilter[CategoryPageFilter] {

	return types.PageFilter[CategoryPageFilter]{
		Page:     utils.ParseStringToInt64(dto.Page),
		PageSize: utils.ParseStringToInt64(dto.PageSize),
		Filter: CategoryPageFilter{
			CategoryId: dto.CategoryId,
		},
	}
}

type CategoryPageFilter struct {
	CategoryId string `json:"categoryId"`
}

type AllProductsFilterDto struct {
	Page         string `query:"page"`
	PageSize     string `query:"pageSize"`
	RestaurantId string `param:"restaurantId"`
	MenuId       string `query:"menuId"`
	Search       string `query:"search"`
}

func (dto AllProductsFilterDto) Validate() error {
	err := ""

	if utils.IsStringEmpty(dto.Page) {
		err = "Page cant be empty"
	}

	if utils.IsStringEmpty(dto.PageSize) {
		err = "PageSize cant be empty"
	}

	if !utils.IsStringNumberIntenger(dto.Page) {
		err = "Page should be a integer number"
	}

	if !utils.IsStringNumberIntenger(dto.PageSize) {
		err = "PageSize should be a integer number"
	}
	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	return nil
}

func (dto AllProductsFilterDto) Parse() types.PageFilter[AllProductsFilter] {

	return types.PageFilter[AllProductsFilter]{
		Page:     utils.ParseStringToInt64(dto.Page),
		PageSize: utils.ParseStringToInt64(dto.PageSize),
		Filter: AllProductsFilter{
			RestaurantId: dto.RestaurantId,
			MenuId:       dto.MenuId,
			Search:       dto.Search,
		},
	}
}

type AllProductsFilter struct {
	RestaurantId string `json:"restaurantId"`
	MenuId       string `json:"menuId"`
	Search       string `json:"search"`
}
