package handlers

import (
	"net/http"
	"quantum/internal/dto"
	"quantum/internal/services"
	"quantum/internal/types"

	"github.com/labstack/echo/v4"
)

type ProductsHandler struct {
	Service services.ProductService
}

func NewProductsHandler() *ProductsHandler {
	return &ProductsHandler{
		Service: *services.NewProductService(),
	}
}

func (handler ProductsHandler) Save(context echo.Context) error {

	data := dto.SaveProductDto{}
	context.Bind(&data)

	if err := handler.Service.Save(data); err != nil {
		return err
	}
	return context.JSON(http.StatusCreated, nil)
}

func (handler ProductsHandler) Update(context echo.Context) error {

	id := context.Param("id")
	body := dto.SaveProductDto{}
	context.Bind(&body)

	return handler.Service.Update(id, body)
}

func (handler ProductsHandler) Delete(context echo.Context) error {

	id := context.Param("id")

	return handler.Service.Delete(id)
}

func (handler ProductsHandler) GetPage(context echo.Context) error {
	filter := types.PageFilter[any]{
		Page:     1,
		PageSize: 5,
	}
	return context.JSON(http.StatusOK, handler.Service.GetPage(filter))
}
