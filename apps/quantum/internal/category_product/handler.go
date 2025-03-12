package category_product

import (
	"net/http"

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
	if err := body.Validate(); err != nil {
		return err
	}
	if err := handler.Service.Save(body.Parse()); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, "")

}

func (handler CategoryProductHandler) Update(context echo.Context) error {

	body := UpdateCategoryProductDto{}

	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Update(body.Id, body.Parse()); err != nil {
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

	filter := CategoryPageFilterDto{}

	context.Bind(&filter)

	if err := filter.Validate(); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, handler.Service.GetPage(filter.Parse()))
}

func (handler CategoryProductHandler) GetAllProductsPaginate(context echo.Context) error {

	filter := AllProductsFilterDto{}

	context.Bind(&filter)

	if err := filter.Validate(); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, handler.Service.GetAllProductsPaginate(filter.Parse()))
}
