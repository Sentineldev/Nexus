package orders

import (
	"database/sql"
	"fmt"
	"quantum/internal/database"
	"quantum/internal/types"
	"strings"
)

type DatabaseRepository struct {
	DataSource *sql.DB
}

func NewDatabaseRepository() *DatabaseRepository {

	return &DatabaseRepository{
		DataSource: database.GetConnection(),
	}

}

func (repository DatabaseRepository) Save(order types.Order, products []types.OrderProduct) error {

	sql := `
		INSERT INTO restaurant_order (id, client_id, order_type, location, total)
		VALUES (?,?,?,?,?)
	`
	_, err := repository.DataSource.Exec(sql, order.Id, order.Client.Id, order.Type, order.Location, order.Total)

	if err != nil {
		return err
	}

	placeholders := strings.Repeat("(?,?,?,?,?),", len(products)-1) + "(?,?,?,?,?)"

	args := []interface{}{}

	for _, product := range products {

		args = append(args,
			product.Id,
			product.Product.Id,
			product.Order.Id,
			product.Quantity,
			product.Total,
		)
	}

	sql = fmt.Sprintf(
		`
		INSERT INTO order_product(id, product_id, order_id, quantity, total) VALUES
		%s
	`, placeholders,
	)

	_, err = repository.DataSource.Exec(sql, args...)
	if err != nil {
		return err
	}

	return nil
}
func (repository DatabaseRepository) Update(order types.Order) error {

	return nil
}
