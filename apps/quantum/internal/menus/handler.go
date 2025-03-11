package menus

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type MenuHandler struct {
	Service MenuService
}

func NewMenuHandler() *MenuHandler {
	return &MenuHandler{
		Service: *NewMenuService(),
	}
}

func (handler MenuHandler) Save(context echo.Context) error {

	body := SaveMenuDto{}
	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Save(body); err != nil {
		return err
	}
	return context.JSON(http.StatusCreated, "")

}

func (handler MenuHandler) Update(context echo.Context) error {

	id := context.Param("id")
	body := UpdateMenuDto{}

	context.Bind(&body)
	if err := body.Validate(); err != nil {
		return err
	}
	if err := handler.Service.Update(id, body.Parse()); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, "")

}

func (handler MenuHandler) Delete(context echo.Context) error {

	id := context.Param("id")

	if err := handler.Service.Delete(id); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, "")

}

func (handler MenuHandler) getById(context echo.Context) error {

	menuId := context.Param("menuId")

	result, err := handler.Service.getById(menuId)

	if err != nil {
		return err
	}
	return context.JSON(http.StatusOK, result)

}

func (handler MenuHandler) GetAll(context echo.Context) error {

	restaurantId := context.Param("restaurantId")

	return context.JSON(http.StatusOK, handler.Service.GetAll(restaurantId))

}
