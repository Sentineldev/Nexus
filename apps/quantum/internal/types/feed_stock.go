package types

type FeedStock struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Unit        string `json:"unit"`
}

func NeedFeedStock(id, name, description, unit string) *FeedStock {
	return &FeedStock{
		id,
		name,
		description,
		unit,
	}
}
