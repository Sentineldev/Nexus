package orders

type SaveOrderDto struct {
	Products []SaveOrderProductDto `json:"products"`
	ClientId string                `json:"clientId"`
}

type SaveOrderProductDto struct {
	ProductId string `json:"productId"`
	Count     string `json:"count"`
}
