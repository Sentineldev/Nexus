package types

type Order struct {
	Id          string  `json:"id"`
	CreationLog UserLog `json:"creationLog"`
	UpdateLog   UserLog `json:"updateLog"`
	Client      Client  `json:"client"`
}

func NewOrder(id string, creationLog, updateLog UserLog, client Client) *Order {

	return &Order{
		id,
		creationLog,
		updateLog,
		client,
	}
}

type OrderProduct struct {
	Id          string  `json:"id"`
	Order       Order   `json:"order"`
	Product     Product `json:"product"`
	Description string  `json:"description"`
	Count       int64   `json:"count"`
}

func NewOrderProduct(id, description string, order Order, product Product, count int64) *OrderProduct {
	return &OrderProduct{
		id,
		order,
		product,
		description,
		count,
	}
}
