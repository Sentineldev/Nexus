package types

type FeedStock struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Unit string `json:"unit"`
}

func NeedFeedStock(id, name, unit string) *FeedStock {
	return &FeedStock{
		id,
		name,
		unit,
	}
}
