package orders

import "quantum/internal/types"

type OrdersLocalRepository struct {
}

func NewOrdersLocalRepository() *OrdersLocalRepository {

	return &OrdersLocalRepository{}
}

func (repository OrdersLocalRepository) Save(order types.Order, products types.OrderProduct) error {
	return nil
}

func (repository OrdersLocalRepository) Update(order types.Order) error {
	return nil
}
