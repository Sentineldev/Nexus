package types

type Restaurant struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func NewRestaurant(id, name string) *Restaurant {
	return &Restaurant{
		Id:   id,
		Name: name,
	}
}
