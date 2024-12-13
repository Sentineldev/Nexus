package types

type MenuCategory struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Menu Menu   `json:"menu"`
}

func NewCategory(id, name string, menu Menu) *MenuCategory {

	return &MenuCategory{
		Id:   id,
		Name: name,
		Menu: menu,
	}
}
