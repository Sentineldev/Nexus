package types

type Restaurant struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	IsActive bool   `json:"isActive"`
}

func NewRestaurant(id, name string) *Restaurant {
	return &Restaurant{
		Id:       id,
		Name:     name,
		IsActive: false,
	}
}
