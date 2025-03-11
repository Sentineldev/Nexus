package feed_stock

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type FeedStockHandler struct {
	Service FeedStockService
}

func NewFeedStockHandler() *FeedStockHandler {

	return &FeedStockHandler{
		Service: *NewFeedStockService(),
	}
}

func (handler FeedStockHandler) Save(context echo.Context) error {

	body := SaveFeedStockDto{}

	context.Bind(&body)

	if err := body.Validate(); err != nil {
		return err
	}

	if err := handler.Service.Save(body); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, nil)
}

func (handler FeedStockHandler) Update(context echo.Context) error {

	body := UpdateFeedStockDto{}
	id := context.Param(("id"))
	body.Id = id
	context.Bind(&body.Body)

	if err := body.Validate(); err != nil {
		return err
	}
	if err := handler.Service.Update(body.Id, body.Body); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, nil)
}

func (handler FeedStockHandler) Delete(context echo.Context) error {

	id := context.Param(("id"))

	if err := handler.Service.Delete(id); err != nil {
		return err
	}
	return context.JSON(http.StatusOK, nil)
}

func (handler FeedStockHandler) GetPage(context echo.Context) error {

	page := context.QueryParam("page")
	pageSize := context.QueryParam("pageSize")

	query := FeedStockPageQueryDto{
		Page:     page,
		PageSize: pageSize,
	}

	if err := query.Validate(); err != nil {
		return err
	}

	data := handler.Service.GetPage(query.Parse())

	return context.JSON(http.StatusOK, data)
}
