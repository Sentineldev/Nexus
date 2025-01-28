package feed_stock

import (
	"quantum/internal/types"

	"github.com/google/uuid"
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

func (service FeedStockService) Save(body SaveFeedStockDto) error {

	if _, err := service.Repository.GetByName(body.Name); err == nil {
		return echo.ErrConflict
	}
	newFeedStock := types.NeedFeedStock(
		uuid.NewString(),
		body.Name,
		body.Unit,
	)

	if err := service.Repository.Save(*newFeedStock); err != nil {

		return echo.ErrInternalServerError
	}
	return nil
}

func (service FeedStockService) Update(id string, body SaveFeedStockDto) error {

	current, err := service.GetById(id)

	if err != nil {
		return err
	}

	if current.Name != body.Name {

		if _, err := service.Repository.GetByName(body.Name); err == nil {
			return echo.ErrConflict
		}
	}

	current.Name = body.Name
	current.Unit = body.Unit

	err = service.Repository.Update(current)

	if err != nil {
		return echo.ErrInternalServerError
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
