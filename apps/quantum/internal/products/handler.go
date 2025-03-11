package products

import (
	"net/http"

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

func (handler ProductsHandler) GetGroups(context echo.Context) error {

	groups := handler.Service.GetGroups()
	return context.JSON(http.StatusOK, groups)
}

func (handler ProductsHandler) GetPage(context echo.Context) error {

	page := context.QueryParam("page")
	pageSize := context.QueryParam("pageSize")

	body := ProductsPageFilterDto{
		Page:     page,
		PageSize: pageSize,
	}

	if err := body.Validate(); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, handler.Service.GetPage(body.Parse()))
}
