package products

type Product struct {
	Id   string
	Name string
}

func NewProduct(id, name string) Product {

	return Product{
		Id:   id,
		Name: name,
	}
}
