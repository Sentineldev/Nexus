package menu_category

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

func (repository DatabaseRepository) Save(body types.MenuCategory) error {

	sql := `
		INSERT INTO menu_category (id, menu_id, name, is_active) VALUES (?,?,?,?)
	`

	_, err := repository.DataSource.Exec(sql, body.Id, body.Menu.Id, body.Name, body.IsActive)

	if err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) Update(body types.MenuCategory) error {

	sql := `
	UPDATE menu_category
	SET name = ?, is_active = ?
	WHERE id = ?
	`

	_, err := repository.DataSource.Exec(sql, body.Name, body.IsActive, body.Id)

	if err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) GetById(body string) (types.MenuCategory, error) {

	result := types.MenuCategory{}
	sql := `

	SELECT 
		mc.id, mc.name, mc.is_active,
		m.id, m.name, m.is_active,
		r.id, r.name, r.is_active
	FROM	
		menu_category mc
	JOIN menu m ON m.id = mc.menu_id
	JOIN restaurant r ON r.id = m.restaurant_id
	WHERE mc.id = ?
	`

	row := repository.DataSource.QueryRow(sql, body)

	err := row.Scan(
		&result.Id,
		&result.Name,
		&result.IsActive,
		&result.Menu.Id,
		&result.Menu.Name,
		&result.Menu.IsActive,
		&result.Menu.Restaurant.Id,
		&result.Menu.Restaurant.Name,
		&result.Menu.Restaurant.IsActive,
	)
	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetByName(menuId, name string) (types.MenuCategory, error) {

	result := types.MenuCategory{}
	sql := `

	SELECT 
		mc.id, mc.name, mc.is_active,
		m.id, m.name, m.is_active,
		r.id, r.name, r.is_active
	FROM	
		menu_category mc
	JOIN menu m ON m.id = mc.menu_id
	JOIN restaurant r ON r.id = m.restaurant_id
	WHERE m.id = ? AND mc.name = ?
	`

	row := repository.DataSource.QueryRow(sql, menuId, name)

	err := row.Scan(
		&result.Id,
		&result.Name,
		&result.IsActive,
		&result.Menu.Id,
		&result.Menu.Name,
		&result.Menu.IsActive,
		&result.Menu.Restaurant.Id,
		&result.Menu.Restaurant.Name,
		&result.Menu.Restaurant.IsActive,
	)
	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetAll(menuId string) []types.MenuCategory {

	result := []types.MenuCategory{}
	sql := `

	SELECT 
		mc.id, mc.name, mc.is_active,
		m.id, m.name, m.is_active,
		r.id, r.name, r.is_active
	FROM	
		menu_category mc
	JOIN menu m ON m.id = mc.menu_id
	JOIN restaurant r ON r.id = m.restaurant_id
	WHERE m.id = ?
	`

	rows, err := repository.DataSource.Query(sql, menuId)

	if err != nil {
		return result
	}

	for rows.Next() {

		record := types.MenuCategory{}
		err = rows.Scan(
			&record.Id,
			&record.Name,
			&record.IsActive,
			&record.Menu.Id,
			&record.Menu.Name,
			&record.Menu.IsActive,
			&record.Menu.Restaurant.Id,
			&record.Menu.Restaurant.Name,
			&record.Menu.Restaurant.IsActive,
		)

		if err != nil {
			return result
		}

		result = append(result, record)
	}

	return result
}
