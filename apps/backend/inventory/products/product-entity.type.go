package products

type ProductEntity struct {
	Name string
}

func NewProductEntity(name string) ProductEntity {

	return ProductEntity{
		Name: name,
	}
}
