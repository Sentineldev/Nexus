package internal

import "quantum/internal/types"

var (
	CATEGORY_PRODUCTS = []types.CategoryProduct{}
	CATEGORIES        = []types.MenuCategory{}
	RESTAURANTS       = []types.Restaurant{}
	MENUS             = []types.Menu{}
	USERS             = []types.User{}
	PRODUCTS          = []types.Product{
		{
			Id:          "id-2",
			Name:        "Ensalada César con Camarones",
			Description: "Lechuga romana, crotones, camarones, aderezado con salsa césar y queso parmesano",
		},
		{
			Id:          "id-2",
			Name:        "Ensalada César con Pollo",
			Description: "Lechuga romana, crotones, pollo, aderezado con salsa césar y queso parmesano.",
		},
		{
			Id:          "id-3",
			Name:        "Capresa con tomate Margariteño ",
			Description: "Queso, aderezado con vinagreta de albahaca ",
		},
		{
			Id:          "id-4",
			Name:        "Ensalada Cesar Tradicional ",
			Description: "Lechuga Romana, croutones, queso parmesano aderezado con Salsa Cesar ",
		},
		{
			Id:          "id-5",
			Name:        "Ensalada de berro, Rugula, Queso Manchego",
			Description: "Ensalada de berros, rúgula, queso manchego, tomate cherry marinado con balsámico y aceite de oliva",
		},
		{
			Id:          "id-6",
			Name:        "Ensalada de Atún con Wakame ",
			Description: "Atún, wakame, aguacate, tomate, pimienta y aceite de oliva.",
		},
	}
)
