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

	if err := handler.Service.Save(body); err != nil {
		return err
	}
	return context.JSON(http.StatusCreated, "")

}

func (handler MenuHandler) GetAll(context echo.Context) error {

	restaurantId := context.Param("restaurantId")

	return context.JSON(http.StatusOK, handler.Service.GetAll(restaurantId))

}