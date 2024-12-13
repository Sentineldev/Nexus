package products

import (
	"net/http"
	"quantum/internal/types"

	"github.com/labstack/echo/v4"
)

type ProductsHandler struct {
	Service ProductService
}

func NewProductsHandler() *ProductsHandler {
	return &ProductsHandler{
		Service: *NewProductService(),
	}
}

func (handler ProductsHandler) Save(context echo.Context) error {

	data := SaveProductDto{}
	context.Bind(&data)

	if err := handler.Service.Save(data); err != nil {
		return err
	}
	return context.JSON(http.StatusCreated, nil)
}

func (handler ProductsHandler) Update(context echo.Context) error {

	id := context.Param("id")
	body := SaveProductDto{}
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
