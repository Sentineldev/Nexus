package feed_stock

import (
	"quantum/internal/types"

	"github.com/labstack/echo/v4"
)

type FeedStockService struct {
	Repository FeedStockRepository
}

func NewFeedStockService() *FeedStockService {
	return &FeedStockService{
		Repository: NewLocalFeedStockRepository(),
	}
}

func (service FeedStockService) Save(body any) error {

	return nil
}

func (service FeedStockService) Update(id string, body any) error {

	_, err := service.GetById(id)

	if err != nil {
		return err
	}

	return nil
}

func (service FeedStockService) Delete(id string) error {

	err := service.Repository.Delete(id)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service FeedStockService) GetById(id string) (types.FeedStock, error) {

	result, err := service.Repository.GetById(id)

	if err != nil {
		return result, echo.ErrNotFound
	}

	return result, nil
}

func (service FeedStockService) GetPage(body types.PageFilter[any]) types.PageData[types.FeedStock] {

	return service.Repository.GetPage(body)
}
