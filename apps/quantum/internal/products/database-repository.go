package products

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

func (repository DatabaseRepository) Save(body types.Product) error {

	sql := `INSERT INTO product(id, name, description) VALUES (?,?,?)`

	if _, err := repository.DataSource.Exec(sql, body.Id, body.Name, body.Description); err != nil {
		return err
	}

	return nil
}

func (repository DatabaseRepository) Update(body types.Product) error {

	sql := `UPDATE product SET name = ?, description = ? WHERE id = ?`

	if _, err := repository.DataSource.Exec(sql, body.Name, body.Description, body.Id); err != nil {
		return err
	}

	return nil
}

func (repository DatabaseRepository) Delete(body string) error {

	sql := `DELETE FROM product WHERE id = ?`

	if _, err := repository.DataSource.Exec(sql, body); err != nil {
		return err
	}

	return nil
}

func (repository DatabaseRepository) GetById(body string) (types.Product, error) {

	result := types.Product{}
	sql := `SELECT * FROM product WHERE id = ?`

	row := repository.DataSource.QueryRow(sql, body)

	err := row.Scan(
		&result.Id,
		&result.Name,
		&result.Description,
	)

	if err != nil {
		return result, err
	}
	return result, nil
}

func (repository DatabaseRepository) GetByIds(body []string) []types.Product {

	result := []types.Product{}

	placeHolder := strings.Repeat("?,", len(body)-1) + "?"

	sql := fmt.Sprintf("SELECT * FROM product WHERE id IN (%s)", placeHolder)

	args := []interface{}{}
	for _, element := range body {
		args = append(args, element)
	}
	rows, err := repository.DataSource.Query(sql, args...)
	if err != nil {
		return result
	}

	for rows.Next() {
		record := types.Product{}
		err := rows.Scan(
			&record.Id,
			&record.Name,
			&record.Description,
		)
		if err != nil {
			return result
		}
		result = append(result, record)
	}
	return result
}

func (repository DatabaseRepository) GetPage(body types.PageFilter[any]) types.PageData[types.Product] {

	data := types.PageData[types.Product]{}
	data.Data = []types.Product{}
	offset := (body.Page - 1) * body.PageSize
	sql := `
	SELECT * FROM product
	LIMIT ? OFFSET ?
	`
	rows, err := repository.DataSource.Query(sql, body.PageSize, offset)

	if err != nil {
		return data
	}
	defer rows.Close()

	for rows.Next() {

		record := types.Product{}
		err := rows.Scan(
			&record.Id,
			&record.Name,
			&record.Description,
		)
		if err != nil {
			return data
		}
		data.Data = append(data.Data, record)
	}

	data.Meta.Page = body.Page
	data.Meta.PageSize = body.PageSize

	row := repository.DataSource.QueryRow(`SELECT count(*) FROM product`)

	err = row.Scan(
		&data.Meta.DataSize,
	)
	if err != nil {
		return data
	}
	return data
}
