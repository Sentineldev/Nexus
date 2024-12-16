package types

type Product struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func NewProduct(id, name, description string) *Product {
	return &Product{
		Id:          id,
		Name:        name,
		Description: description,
	}
}
