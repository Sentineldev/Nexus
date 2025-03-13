package clients

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type ClientHandler struct {
	Service ClientService
}

func NewClientHandler() *ClientHandler {
	return &ClientHandler{
		Service: *NewClientService(),
	}
}

func (handler ClientHandler) Save(context echo.Context) error {
	body := SaveClientDto{}

	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Save(body); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, nil)
}

func (handler ClientHandler) Update(context echo.Context) error {
	id := context.Param("id")
	body := SaveClientDto{}

	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Update(id, body); err != nil {
		return err
	}

	return context.JSON(http.StatusOK, nil)
}

func (handler ClientHandler) Delete(context echo.Context) error {
	id := context.Param("id")

	if err := handler.Service.Delete(id); err != nil {
		return err
	}

	return context.JSON(http.StatusOK, nil)
}

func (handler ClientHandler) GetByIdentification(context echo.Context) error {
	id := context.Param("identification")
	client, err := handler.Service.GetByIdentification(id)
	if err != nil {
		return err
	}

	return context.JSON(http.StatusOK, client)
}

func (handler ClientHandler) GetPage(context echo.Context) error {

	body := ClientPageFilterDto{}

	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, handler.Service.GetPage(body.Parse()))
}
