package restaurants

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type RestaurantsHandler struct {
	Service RestaurantService
}

func NewRestaurantHandler() *RestaurantsHandler {
	return &RestaurantsHandler{
		Service: *NewRestaurantService(),
	}
}
func (handler RestaurantsHandler) Save(context echo.Context) error {

	body := SaveRestaurantDto{}

	context.Bind(&body)

	if !body.Validate() {
		return echo.ErrUnprocessableEntity
	}

	if err := handler.Service.Save(body); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, "")
}

func (handler RestaurantsHandler) Update(context echo.Context) error {

	id := context.Param("id")
	body := UpdateRestaurantDto{}

	context.Bind(&body)

	if !body.Validate() {
		return echo.ErrUnprocessableEntity
	}

	if err := handler.Service.Update(id, body); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, "")
}

func (handler RestaurantsHandler) GetPage(context echo.Context) error {

	page := context.QueryParam("page")
	pageSize := context.QueryParam("pageSize")

	body := RestaurantPageFilter{
		Page:     page,
		PageSize: pageSize,
	}

	if filter, err := body.Validate(); err != nil {
		return err
	} else {
		result := handler.Service.GetPage(filter)
		return context.JSON(http.StatusOK, result)
	}
}

func (handler RestaurantsHandler) GetById(context echo.Context) error {

	id := context.Param("id")

	result, err := handler.Service.GetById(id)

	if err != nil {
		return err
	}
	return context.JSON(http.StatusOK, result)
}
