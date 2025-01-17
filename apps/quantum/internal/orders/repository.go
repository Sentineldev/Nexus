package orders

import (
	"quantum/internal"
	"quantum/internal/types"
)

type OrdersLocalRepository struct {
}

func NewOrdersLocalRepository() *OrdersLocalRepository {

	return &OrdersLocalRepository{}
}

func (repository OrdersLocalRepository) Save(order types.Order, products []types.OrderProduct) error {

	internal.ORDERS = append(internal.ORDERS, order)
	internal.ORDER_PRODUCTS = append(internal.ORDER_PRODUCTS, products...)

	return nil
}

func (repository OrdersLocalRepository) Update(order types.Order) error {
	return nil
}
