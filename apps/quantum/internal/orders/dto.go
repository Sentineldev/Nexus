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
	Count     int64   `json:"count"`
	Total     float64 `json:"total"`
}
