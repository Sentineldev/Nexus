package types

type MenuCategoryShort struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type Menu struct {
	Id         string              `json:"id"`
	Name       string              `json:"name"`
	Restaurant Restaurant          `json:"restaurant"`
	Categories []MenuCategoryShort `json:"categories"`
}

func NewMenu1(id, name string, restaurant Restaurant, categories []MenuCategoryShort) *Menu {
	return &Menu{
		Id:         id,
		Name:       name,
		Restaurant: restaurant,
		Categories: categories,
	}
}

func NewMenu2(id, name string, restaurant Restaurant) *Menu {
	return &Menu{
		Id:         id,
		Name:       name,
		Restaurant: restaurant,
		Categories: []MenuCategoryShort{},
	}
}
