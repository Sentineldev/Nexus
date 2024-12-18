package menus

type SaveMenuDto struct {
	RestaurantId string `json:"restaurantId"`
	Name         string `json:"name"`
}

type UpdateMenuDto struct {
	Name     string `json:"name"`
	IsActive bool   `json:"isActive"`
}
