package restaurants

import (
	"database/sql"
	"quantum/internal/database"
	"quantum/internal/types"
)

type DatabaseRepository struct {
	DataSource *sql.DB
}

func NewDatabaseRepository() *DatabaseRepository {
	return &DatabaseRepository{
		DataSource: database.GetConnection(),
	}
}

func (repository DatabaseRepository) Save(body types.Restaurant) error {

	sql := `INSERT INTO restaurant(id, name, is_active) VALUES (?,?,?)`

	if _, err := repository.DataSource.Exec(sql, body.Id, body.Name, body.IsActive); err != nil {
		return err
	}

	return nil
}
func (repository DatabaseRepository) Update(body types.Restaurant) error {

	sql := `UPDATE restaurant SET name = ?, is_active = ? WHERE id = ?`

	if _, err := repository.DataSource.Exec(sql, body.Name, body.IsActive, body.Id); err != nil {
		return err
	}

	return nil
}
func (repository DatabaseRepository) Delete(id string) error {

	sql := `DELETE FROM restaurant WHERE id = ?`
	if _, err := repository.DataSource.Exec(sql, id); err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) GetById(id string) (types.Restaurant, error) {

	result := types.Restaurant{}

	sql := `SELECT * FROM restaurant WHERE id = ?`

	row := repository.DataSource.QueryRow(sql, id)

	err := row.Scan(
		&result.Id,
		&result.Name,
		&result.IsActive,
	)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetByName(name string) (types.Restaurant, error) {
	result := types.Restaurant{}

	sql := `SELECT * FROM restaurant WHERE name = ?`

	row := repository.DataSource.QueryRow(sql, name)

	err := row.Scan(
		&result.Id,
		&result.Name,
		&result.IsActive,
	)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetPage(body types.PageFilter[any]) types.PageData[types.Restaurant] {

	data := types.PageData[types.Restaurant]{}
	data.Data = []types.Restaurant{}
	offset := (body.Page - 1) * body.PageSize
	sql := `
	SELECT * FROM restaurant
	LIMIT ? OFFSET ?
	`
	rows, err := repository.DataSource.Query(sql, body.PageSize, offset)

	if err != nil {
		return data
	}
	defer rows.Close()

	for rows.Next() {

		record := types.Restaurant{}
		err := rows.Scan(
			&record.Id,
			&record.Name,
			&record.IsActive,
		)
		if err != nil {
			return data
		}
		data.Data = append(data.Data, record)
	}

	data.Meta.Page = body.Page
	data.Meta.PageSize = body.PageSize

	row := repository.DataSource.QueryRow(`SELECT count(*) FROM restaurant`)

	err = row.Scan(
		&data.Meta.DataSize,
	)
	if err != nil {
		return data
	}
	return data
}
