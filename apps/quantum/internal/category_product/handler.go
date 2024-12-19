package category_product

import (
	"net/http"
	"quantum/internal/types"

	"github.com/labstack/echo/v4"
)

type CategoryProductHandler struct {
	Service CategoryProductService
}

func NewCategoryProductHandler() *CategoryProductHandler {

	return &CategoryProductHandler{
		Service: *NewCategoryProductService(),
	}
}

func (handler CategoryProductHandler) Save(context echo.Context) error {

	body := SaveCategoryProductDto{}

	context.Bind(&body)

	if err := handler.Service.Save(body); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, "")

}

func (handler CategoryProductHandler) Update(context echo.Context) error {

	id := context.Param("id")
	body := UpdateCategoryProductDto{}

	context.Bind(&body)

	if err := handler.Service.Update(id, body); err != nil {
		return err
	}

	return context.JSON(http.StatusOK, "")

}

func (handler CategoryProductHandler) Delete(context echo.Context) error {

	id := context.Param("id")

	if err := handler.Service.Delete(id); err != nil {
		return err
	}

	return context.JSON(http.StatusOK, "")

}

func (handler CategoryProductHandler) GetPage(context echo.Context) error {

	categoryId := context.Param("categoryId")
	filter := types.PageFilter[CategoryPageFilter]{
		Page:     1,
		PageSize: 5,
		Filter: CategoryPageFilter{
			CategoryId: categoryId,
		},
	}
	return context.JSON(http.StatusOK, handler.Service.getPage(filter))
}
