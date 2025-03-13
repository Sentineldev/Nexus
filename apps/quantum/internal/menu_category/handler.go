package menu_category

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type MenuCategoryHandler struct {
	Service MenuCategoryService
}

func NewMenuCategoryHandler() *MenuCategoryHandler {
	return &MenuCategoryHandler{
		Service: *NewMenuCategoryService(),
	}
}

func (handler MenuCategoryHandler) Save(context echo.Context) error {

	body := SaveMenuCategoryDto{}

	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Save(body); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, "")
}

func (handler MenuCategoryHandler) Update(context echo.Context) error {

	body := UpdateMenuCategoryDto{}
	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Update(body.Id, body.Parse()); err != nil {
		return err
	}

	return context.JSON(http.StatusOK, "")
}

func (handler MenuCategoryHandler) GetById(context echo.Context) error {

	id := context.Param("id")

	result, err := handler.Service.GetById(id)

	if err != nil {
		return err
	}

	return context.JSON(http.StatusOK, result)
}

func (handler MenuCategoryHandler) GetAll(context echo.Context) error {

	menuId := context.Param("menuId")

	result := handler.Service.GetAll(menuId)

	return context.JSON(http.StatusOK, result)
}
