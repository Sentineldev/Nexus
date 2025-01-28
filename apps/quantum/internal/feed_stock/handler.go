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

	if !body.IsValid() {
		return echo.ErrUnprocessableEntity
	}

	err := handler.Service.Save(body)

	if err != nil {
		return err
	}
	return context.JSON(http.StatusCreated, nil)
}

func (handler FeedStockHandler) Update(context echo.Context) error {

	params := UpdateFeedStockDto{}
	id := context.Param(("id"))
	params.Id = id
	context.Bind(&params.Body)

	if !params.IsValid() {
		return echo.ErrUnprocessableEntity
	}

	err := handler.Service.Update(params.Id, params.Body)
	if err != nil {
		return err
	}
	return context.JSON(http.StatusOK, nil)
}

func (handler FeedStockHandler) Delete(context echo.Context) error {

	id := context.Param(("id"))

	if len(id) == 0 {
		return echo.ErrUnprocessableEntity
	}

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

	if !query.IsValid() {
		return echo.ErrUnprocessableEntity
	}

	data := handler.Service.GetPage(query.Parse())

	return context.JSON(http.StatusOK, data)
}
