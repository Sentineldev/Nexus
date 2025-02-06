package orders

type SaveOrderDto struct {
	Products []SaveOrderProductDto `json:"products"`
	Type     string                `json:"type"`
	Total    float64               `json:"total"`
	Location string                `json:"location"`
	ClientId string                `json:"clientId"`
}

type SaveOrderProductDto struct {
	ProductId string  `json:"productId"`
	Quantity  int64   `json:"quantity"`
	Total     float64 `json:"total"`
}
