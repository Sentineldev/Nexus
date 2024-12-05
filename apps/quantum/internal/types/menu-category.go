package types

type MenuCategory struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Menu Menu   `json:"menu"`
}

func NewMenuCategory(id, name string, menu Menu) *MenuCategory {

	return &MenuCategory{
		Id:   id,
		Name: name,
		Menu: menu,
	}
}
