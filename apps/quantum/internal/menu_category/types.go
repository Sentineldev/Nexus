package menu_category

type SaveMenuCategoryDto struct {
	MenuId string `json:"menuId"`
	Name   string `json:"name"`
}

type UpdateMenuCategoryDto struct {
	Name     string `json:"name"`
	IsActive bool   `json:"isActive"`
}
