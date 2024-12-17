package restaurants

type SaveRestaurantDto struct {
	Name string `json:"name"`
}

func (dto SaveRestaurantDto) Validate() bool {
	return len(dto.Name) != 0
}
