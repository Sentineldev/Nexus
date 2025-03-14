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

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Save(body); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, "")
}

func (handler RestaurantsHandler) Update(context echo.Context) error {

	body := UpdateRestaurantBodyDto{}
	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Update(body.Id, body.Parse()); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, "")
}

func (handler RestaurantsHandler) GetPage(context echo.Context) error {

	body := RestaurantPageFilterDto{}

	context.Bind(&body)
	if err := body.Validate(); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, handler.Service.GetPage(body.Parse()))
}

func (handler RestaurantsHandler) GetById(context echo.Context) error {

	id := context.Param("id")

	result, err := handler.Service.GetById(id)

	if err != nil {
		return err
	}
	return context.JSON(http.StatusOK, result)
}
