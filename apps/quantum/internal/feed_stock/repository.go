package feed_stock

import (
	"database/sql"
	"quantum/internal/database"
	"quantum/internal/types"
)

type LocalFeedStockRepository struct {
	DataSource *sql.DB
}

func NewLocalFeedStockRepository() *LocalFeedStockRepository {
	return &LocalFeedStockRepository{
		DataSource: database.GetConnection(),
	}
}

func (repository LocalFeedStockRepository) Save(body types.FeedStock) error {

	sql := `INSERT INTO feed_stock(id, name, unit) VALUES (?,?,?)`

	_, err := repository.DataSource.Exec(sql, body.Id, body.Name, body.Unit)

	return err
}

func (repository LocalFeedStockRepository) Update(body types.FeedStock) error {

	sql := `UPDATE feed_stock SET name = ?, unit = ? WHERE id = ?`

	_, err := repository.DataSource.Exec(sql, body.Name, body.Unit, body.Id)

	return err
}

func (repository LocalFeedStockRepository) Delete(body string) error {

	sql := `DELETE FROM feed_stock WHERE id = ?`

	_, err := repository.DataSource.Exec(sql, body)

	return err
}

func (repository LocalFeedStockRepository) GetById(body string) (types.FeedStock, error) {
	result := types.FeedStock{}
	sql := `SELECT * FROM feed_stock WHERE id = ?`

	row := repository.DataSource.QueryRow(sql, body)

	err := row.Scan(
		&result.Id,
		&result.Name,
		&result.Unit,
	)
	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository LocalFeedStockRepository) GetByName(body string) (types.FeedStock, error) {
	result := types.FeedStock{}
	sql := `SELECT * FROM feed_stock WHERE name = ?`

	row := repository.DataSource.QueryRow(sql, body)

	err := row.Scan(
		&result.Id,
		&result.Name,
		&result.Unit,
	)
	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository LocalFeedStockRepository) GetPage(body types.PageFilter[any]) types.PageData[types.FeedStock] {

	data := types.PageData[types.FeedStock]{}
	data.Data = []types.FeedStock{}
	offset := (body.Page - 1) * body.PageSize
	sql := `
	SELECT * FROM feed_stock
	LIMIT ? OFFSET ?
	`
	rows, err := repository.DataSource.Query(sql, body.PageSize, offset)

	if err != nil {
		return data
	}
	defer rows.Close()

	for rows.Next() {

		record := types.FeedStock{}
		err := rows.Scan(
			&record.Id,
			&record.Name,
			&record.Unit,
		)
		if err != nil {
			return data
		}
		data.Data = append(data.Data, record)
	}

	data.Meta.Page = body.Page
	data.Meta.PageSize = body.PageSize

	row := repository.DataSource.QueryRow(`SELECT count(*) FROM feed_stock`)

	err = row.Scan(
		&data.Meta.DataSize,
	)
	if err != nil {
		return data
	}
	return data
}
