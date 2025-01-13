package orders

import "quantum/internal/types"

type OrdersRepository interface {
	Save(order types.Order, products types.OrderProduct) error
	Update(order types.Order) error
}
