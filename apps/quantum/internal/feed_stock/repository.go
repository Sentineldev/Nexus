package feed_stock

import "quantum/internal/types"

type LocalFeedStockRepository struct {
}

func NewLocalFeedStockRepository() *LocalFeedStockRepository {
	return &LocalFeedStockRepository{}
}

func (repository LocalFeedStockRepository) Save(body types.FeedStock) error {

	return nil
}

func (repository LocalFeedStockRepository) Update(body types.FeedStock) error {

	return nil
}

func (repository LocalFeedStockRepository) Delete(body string) error {

	return nil
}

func (repository LocalFeedStockRepository) GetById(body string) (types.FeedStock, error) {

	return types.FeedStock{}, nil
}

func (repository LocalFeedStockRepository) GetPage(body types.PageFilter[any]) types.PageData[types.FeedStock] {

	return types.PageData[types.FeedStock]{}
}
