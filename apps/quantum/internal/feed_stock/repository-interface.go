package feed_stock

import "quantum/internal/types"

type FeedStockRepository interface {
	Save(types.FeedStock) error
	Update(types.FeedStock) error
	Delete(string) error
	GetById(string) (types.FeedStock, error)
	GetByName(string) (types.FeedStock, error)
	GetPage(types.PageFilter[any]) types.PageData[types.FeedStock]
}
