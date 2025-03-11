package types

type Product struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Group       string `json:"group"`
}

func NewProduct(id, name, description, group string) *Product {
	return &Product{
		Id:          id,
		Name:        name,
		Description: description,
		Group:       group,
	}
}
