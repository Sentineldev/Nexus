package products

import (
	"backend/types"
	"backend/utils"
	"net/http"

	"github.com/labstack/echo/v4"
)

type ProductsHandler struct {
	Service ProductsServiceInterface
}

func NewProductsHandler() *ProductsHandler {

	return &ProductsHandler{
		Service: NewProductsService(),
	}
}

func (handler ProductsHandler) GetPage(context echo.Context) error {

	page := context.QueryParam("Page")
	pageSize := context.QueryParam("PageSize")
	name := context.QueryParam("Name")

	filter := types.PageFilter[ProductPageFilter]{
		Page:     utils.ConvertToInt64(page),
		PageSize: utils.ConvertToInt64(pageSize),
		Filter: ProductPageFilter{
			Name: name,
		},
	}

	return context.JSON(http.StatusOK, handler.Service.GetPage(filter))
}

func (handler ProductsHandler) Save(context echo.Context) error {

	body := SaveProductDto{}

	context.Bind(&body)

	err := handler.Service.Save(body)
	if err != nil {

		return err
	}
	return context.JSON(http.StatusCreated, nil)
}

func (handler ProductsHandler) Update(context echo.Context) error {

	body := SaveProductDto{}

	id := context.Param("id")
	context.Bind(&body)

	err := handler.Service.Update(id, body)

	if err != nil {
		return err
	}

	return context.JSON(http.StatusOK, nil)
}

func (handler ProductsHandler) Delete(context echo.Context) error {
	id := context.Param("id")
	return handler.Service.Delete(id)
}
