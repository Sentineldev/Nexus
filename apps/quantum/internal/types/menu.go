package types

type MenuCategoryShort struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type Menu struct {
	Id         string     `json:"id"`
	Name       string     `json:"name"`
	Restaurant Restaurant `json:"restaurant"`
}

func NewMenu(id, name string, restaurant Restaurant) *Menu {
	return &Menu{
		Id:         id,
		Name:       name,
		Restaurant: restaurant,
	}
}
