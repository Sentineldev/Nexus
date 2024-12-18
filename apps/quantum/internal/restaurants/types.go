package restaurants

type SaveRestaurantDto struct {
	Name string `json:"name"`
}

func (dto SaveRestaurantDto) Validate() bool {
	return len(dto.Name) != 0
}

type UpdateRestaurantDto struct {
	Name     string `json:"name"`
	IsActive bool   `json:"isActive"`
}

func (dto UpdateRestaurantDto) Validate() bool {
	return len(dto.Name) != 0
}
