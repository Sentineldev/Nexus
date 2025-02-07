package menus

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

func (repository DatabaseRepository) Save(menu types.Menu) error {

	sql := `
	
		INSERT INTO menu(id, restaurant_id, name, is_active)
		VALUES (?,?,?,?)
	`

	_, err := repository.DataSource.Exec(sql, menu.Id, menu.Restaurant.Id, menu.Name, menu.IsActive)

	if err != nil {
		return err
	}

	return nil
}

func (repository DatabaseRepository) Update(menu types.Menu) error {

	sql := `
	UPDATE menu
	SET name = ?, is_active = ? WHERE id = ?
	`

	_, err := repository.DataSource.Exec(sql, menu.Name, menu.IsActive, menu.Id)

	if err != nil {
		return err
	}

	return nil
}

func (repository DatabaseRepository) Delete(body string) error {

	sql := `
	DELETE FROM menu WHERE id = ?
	`

	_, err := repository.DataSource.Exec(sql, body)
	if err != nil {
		return err
	}

	return nil
}

func (repository DatabaseRepository) GetByName(body string) (types.Menu, error) {

	result := types.Menu{}
	sql := `
	SELECT 
		m.id, m.name, m.is_active,
		r.id, r.name, r.is_active
	FROM
		menu m
	JOIN restaurant r on r.id = m.restaurant_id
	WHERE m.name = ?
	`

	row := repository.DataSource.QueryRow(sql, body)

	err := row.Scan(
		&result.Id,
		&result.Name,
		&result.IsActive,
		&result.Restaurant.Id,
		&result.Restaurant.Name,
		&result.Restaurant.IsActive,
	)

	if err != nil {
		return result, err
	}
	return result, nil
}

func (repository DatabaseRepository) GetById(body string) (types.Menu, error) {

	result := types.Menu{}
	sql := `
	SELECT 
		m.id, m.name, m.is_active,
		r.id, r.name, r.is_active
	FROM
		menu m
	JOIN restaurant r on r.id = m.restaurant_id
	WHERE m.id = ?
	`

	row := repository.DataSource.QueryRow(sql, body)

	err := row.Scan(
		&result.Id,
		&result.Name,
		&result.IsActive,
		&result.Restaurant.Id,
		&result.Restaurant.Name,
		&result.Restaurant.IsActive,
	)

	if err != nil {
		return result, err
	}
	return result, nil
}

func (repository DatabaseRepository) GetAll(body string) []types.Menu {

	result := []types.Menu{}
	sql := `
	SELECT 
		m.id, m.name, m.is_active,
		r.id, r.name, r.is_active
	FROM
		menu m
	JOIN 
		restaurant r on r.id = m.restaurant_id
	WHERE 
		r.id = ?
	`

	rows, err := repository.DataSource.Query(sql, body)

	if err != nil {
		return result
	}

	for rows.Next() {

		record := types.Menu{}
		err := rows.Scan(
			&record.Id,
			&record.Name,
			&record.IsActive,
			&record.Restaurant.Id,
			&record.Restaurant.Name,
			&record.Restaurant.IsActive,
		)

		if err != nil {
			return result
		}

		result = append(result, record)
	}

	return result
}
