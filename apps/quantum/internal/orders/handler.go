package orders

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type OrdersHandler struct {
	Service OrdersService
}

func NewOrdersHandler() *OrdersHandler {
	return &OrdersHandler{
		Service: *NewOrdersService(),
	}
}

func (handler OrdersHandler) Save(context echo.Context) error {

	body := SaveOrderDto{}

	context.Bind(&body)

	if err := handler.Service.Save(body); err != nil {
		return err
	}
	return context.JSON(http.StatusCreated, nil)

}
