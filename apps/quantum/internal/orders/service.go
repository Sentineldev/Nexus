package orders

import (
	"quantum/internal/clients"
	"quantum/internal/products"
	"quantum/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type OrdersService struct {
	Repository         OrdersRepository
	ClientService      clients.ClientService
	ProductsRepository products.ProductRepository
}

func NewOrdersService() *OrdersService {

	return &OrdersService{
		Repository:         NewOrdersLocalRepository(),
		ProductsRepository: products.NewDatabaseRepository(),
		ClientService:      *clients.NewClientService(),
	}
}

func (service OrdersService) Save(body SaveOrderDto) error {

	client, err := service.ClientService.Repository.GetByIdentification(body.ClientId)
	if err != nil {
		return err
	}

	productIds := []string{}
	for _, product := range body.Products {
		productIds = append(productIds, product.ProductId)
	}

	products := service.ProductsRepository.GetByIds(productIds)

	if len(products) != len(productIds) {
		return echo.ErrNotFound
	}

	newOrder := types.NewOrder(
		client,
		uuid.NewString(),
		body.Type,
		body.Location,
		body.Total,
	)

	newOrderProducts := []types.OrderProduct{}

	for index, product := range body.Products {
		auxProduct := products[index]
		types.NewOrderProduct(
			uuid.NewString(),
			auxProduct.Name,
			*newOrder,
			auxProduct,
			product.Count,
			body.Total,
		)
	}

	err = service.Repository.Save(*newOrder, newOrderProducts)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}
