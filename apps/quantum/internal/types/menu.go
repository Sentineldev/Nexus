package types

type Menu struct {
	Id         string     `json:"id"`
	Name       string     `json:"name"`
	Restaurant Restaurant `json:"restaurant"`
	IsActive   bool       `json:"isActive"`
}

func NewMenu(id, name string, restaurant Restaurant) *Menu {
	return &Menu{
		Id:         id,
		Name:       name,
		Restaurant: restaurant,
		IsActive:   false,
	}
}
