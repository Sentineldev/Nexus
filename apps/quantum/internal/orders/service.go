package orders

type OrdersService struct {
	Repository OrdersRepository
}

func NewOrdersService() *OrdersService {

	return &OrdersService{
		Repository: NewOrdersLocalRepository(),
	}
}

func (service OrdersService) Save() {}
