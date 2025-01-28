package feed_stock

import (
	"quantum/internal/types"
	"quantum/internal/utils"
)

type UpdateFeedStockDto struct {
	Body SaveFeedStockDto
	Id   string
}

func (dto UpdateFeedStockDto) IsValid() bool {

	if !dto.Body.IsValid() {
		return false
	}

	if len(dto.Id) == 0 {
		return false
	}

	return true
}

type SaveFeedStockDto struct {
	Name string `json:"name"`
	Unit string `json:"unit"`
}

func (dto SaveFeedStockDto) IsValid() bool {

	if len(dto.Name) == 0 {
		return false
	}

	if len(dto.Unit) == 0 {
		return false
	}

	return true
}

type FeedStockPageQueryDto struct {
	Page     string `json:"page"`
	PageSize string `json:"pageSize"`
}

func (dto FeedStockPageQueryDto) IsValid() bool {

	if len(dto.Page) == 0 && !utils.IsStringNumber(dto.Page) {
		return false
	}

	if len(dto.PageSize) == 0 && !utils.IsStringNumber(dto.PageSize) {
		return false
	}

	return true
}

func (dto FeedStockPageQueryDto) Parse() types.PageFilter[any] {

	return types.PageFilter[any]{
		Page:     utils.ParseStringToInt64(dto.Page),
		PageSize: utils.ParseStringToInt64(dto.PageSize),
	}

}
