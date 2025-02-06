package types

type Order struct {
	Id string `json:"id"`
	// CreationLog UserLog `json:"creationLog"`
	// UpdateLog   UserLog `json:"updateLog"`
	Client   Client  `json:"client"`
	Type     string  `json:"type"`
	Location string  `json:"location"`
	Total    float64 `json:"total"`
}

func NewOrder(client Client, id, orderType, location string, total float64) *Order {

	return &Order{
		id,
		// creationLog,
		// updateLog,
		client,
		orderType,
		location,
		total,
	}
}

type OrderProduct struct {
	Id          string  `json:"id"`
	Order       Order   `json:"order"`
	Product     Product `json:"product"`
	Description string  `json:"description"`
	Quantity    int64   `json:"quantity"`
	Total       float64 `json:"total"`
}

func NewOrderProduct(id, description string, order Order, product Product, quantity int64, total float64) *OrderProduct {
	return &OrderProduct{
		id,
		order,
		product,
		description,
		quantity,
		total,
	}
}
