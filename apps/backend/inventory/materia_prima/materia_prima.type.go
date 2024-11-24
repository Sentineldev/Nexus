package materiaprima

import "backend/inventory/products"

type MateriaPrima struct {
	Name string
	Unit string
}

func NewMateriaPrima(name, unit string) *MateriaPrima {
	return &MateriaPrima{
		Name: name,
		Unit: unit,
	}
}

type Group struct {
	Name     string
	Products []products.Product
}
