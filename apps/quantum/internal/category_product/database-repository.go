package category_product

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

func (repository DatabaseRepository) Save(body types.CategoryProduct) error {

	sql := `
		INSERT INTO category_product(id, product_id, category_id, price, is_active)
		VALUES (?,?,?,?,?)
	`

	_, err := repository.DataSource.Exec(sql, body.Id, body.Product.Id, body.Category.Id, body.Price, body.IsActive)

	if err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) Update(body types.CategoryProduct) error {

	sql := `
	UPDATE category_product
	SET price = ?, is_active = ?
	WHERE id = ?
	`

	_, err := repository.DataSource.Exec(sql, body.Price, body.IsActive, body.Id)

	if err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) Delete(body string) error {

	sql := `
	DELETE FROM category_product
	WHERE id = ?
	`

	_, err := repository.DataSource.Exec(sql, body)

	if err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) GetById(body string) (types.CategoryProduct, error) {

	result := types.CategoryProduct{}
	sql := `
	SELECT 
		cp.id, cp.price, cp.is_active,
		p.id,p.name,p.description,
		mc.id, mc.name, mc.is_active,
		m.id, m.name, m.is_active,
		r.id,r.name,r.is_active
	FROM
		category_product cp
	JOIN product p ON p.id =  cp.product_id
	JOIN menu_category mc ON mc.id = cp.category_id
	JOIN menu m ON m.id = mc.menu_id
	JOIN restaurant r ON r.id = m.restaurant_id
	WHERE cp.id = ?
	`

	row := repository.DataSource.QueryRow(sql, body)

	err := row.Scan(
		&result.Id,
		&result.Price,
		&result.IsActive,
		&result.Product.Id,
		&result.Product.Name,
		&result.Product.Description,
		&result.Category.Id,
		&result.Category.Name,
		&result.Category.IsActive,
		&result.Category.Menu.Id,
		&result.Category.Menu.Name,
		&result.Category.Menu.IsActive,
		&result.Category.Menu.Restaurant.Id,
		&result.Category.Menu.Restaurant.Name,
		&result.Category.Menu.Restaurant.IsActive,
	)

	if err != nil {
		return result, err
	}
	return result, nil
}

func (repository DatabaseRepository) GetByProductId(categoryId, productId string) (types.CategoryProduct, error) {

	result := types.CategoryProduct{}
	sql := `
	SELECT 
		cp.id, cp.price, cp.is_active,
		p.id,p.name,p.description,
		mc.id, mc.name, mc.is_active,
		m.id, m.name, m.is_active,
		r.id,r.name,r.is_active
	FROM
		category_product cp
	JOIN product p ON p.id =  cp.product_id
	JOIN menu_category mc ON mc.id = cp.category_id
	JOIN menu m ON m.id = mc.menu_id
	JOIN restaurant r ON r.id = m.restaurant_id
	WHERE mc.id = ? AND p.id = ?
	`

	row := repository.DataSource.QueryRow(sql, categoryId, productId)

	err := row.Scan(
		&result.Id,
		&result.Price,
		&result.IsActive,
		&result.Product.Id,
		&result.Product.Name,
		&result.Product.Description,
		&result.Category.Id,
		&result.Category.Name,
		&result.Category.IsActive,
		&result.Category.Menu.Id,
		&result.Category.Menu.Name,
		&result.Category.Menu.IsActive,
		&result.Category.Menu.Restaurant.Id,
		&result.Category.Menu.Restaurant.Name,
		&result.Category.Menu.Restaurant.IsActive,
	)

	if err != nil {
		return result, err
	}
	return result, nil
}
func (repository DatabaseRepository) GetPage(body types.PageFilter[CategoryPageFilter]) types.PageData[types.CategoryProduct] {

	data := types.PageData[types.CategoryProduct]{}
	data.Data = []types.CategoryProduct{}
	offset := (body.Page - 1) * body.PageSize
	sql := `
	SELECT 
		cp.id, cp.price, cp.is_active,
		p.id,p.name,p.description,
		mc.id, mc.name, mc.is_active,
		m.id, m.name, m.is_active,
		r.id,r.name,r.is_active
	FROM
		category_product cp
	JOIN product p ON p.id =  cp.product_id
	JOIN menu_category mc ON mc.id = cp.category_id
	JOIN menu m ON m.id = mc.menu_id
	JOIN restaurant r ON r.id = m.restaurant_id
	
	WHERE mc.id = ? LIMIT ? OFFSET ?
	`
	rows, err := repository.DataSource.Query(sql, body.Filter.CategoryId, body.PageSize, offset)

	if err != nil {
		return data
	}
	defer rows.Close()

	for rows.Next() {

		record := types.CategoryProduct{}
		err := rows.Scan(
			&record.Id,
			&record.Price,
			&record.IsActive,
			&record.Product.Id,
			&record.Product.Name,
			&record.Product.Description,
			&record.Category.Id,
			&record.Category.Name,
			&record.Category.IsActive,
			&record.Category.Menu.Id,
			&record.Category.Menu.Name,
			&record.Category.Menu.IsActive,
			&record.Category.Menu.Restaurant.Id,
			&record.Category.Menu.Restaurant.Name,
			&record.Category.Menu.Restaurant.IsActive,
		)
		if err != nil {
			return data
		}
		data.Data = append(data.Data, record)
	}

	data.Meta.Page = body.Page
	data.Meta.PageSize = body.PageSize

	row := repository.DataSource.QueryRow(`SELECT count(*) FROM category_product WHERE category_id = ?`, body.Filter.CategoryId)

	err = row.Scan(
		&data.Meta.DataSize,
	)
	if err != nil {
		return data
	}
	return data
}

func (repository DatabaseRepository) GetAllProductsPaginate(body types.PageFilter[AllProductsFilter]) types.PageData[types.CategoryProduct] {

	data := types.PageData[types.CategoryProduct]{}
	data.Data = []types.CategoryProduct{}
	offset := (body.Page - 1) * body.PageSize

	var sql string

	if len(body.Filter.MenuId) > 0 {
		sql = `
		SELECT 
			cp.id, cp.price, cp.is_active,
			p.id,p.name,p.description,
			mc.id, mc.name, mc.is_active,
			m.id, m.name, m.is_active,
			r.id,r.name,r.is_active
		FROM
			category_product cp
		JOIN product p ON p.id =  cp.product_id
		JOIN menu_category mc ON mc.id = cp.category_id
		JOIN menu m ON m.id = mc.menu_id
		JOIN restaurant r ON r.id = m.restaurant_id
		
		WHERE r.id = ? AND m.id = ?  LIMIT ? OFFSET ?
		`
		rows, err := repository.DataSource.Query(sql, body.Filter.RestaurantId, body.Filter.MenuId, body.PageSize, offset)

		if err != nil {
			return data
		}
		defer rows.Close()

		for rows.Next() {

			record := types.CategoryProduct{}
			err := rows.Scan(
				&record.Id,
				&record.Price,
				&record.IsActive,
				&record.Product.Id,
				&record.Product.Name,
				&record.Product.Description,
				&record.Category.Id,
				&record.Category.Name,
				&record.Category.IsActive,
				&record.Category.Menu.Id,
				&record.Category.Menu.Name,
				&record.Category.Menu.IsActive,
				&record.Category.Menu.Restaurant.Id,
				&record.Category.Menu.Restaurant.Name,
				&record.Category.Menu.Restaurant.IsActive,
			)
			if err != nil {
				return data
			}
			data.Data = append(data.Data, record)
		}
	} else {
		sql = `
		SELECT 
			cp.id, cp.price, cp.is_active,
			p.id,p.name,p.description,
			mc.id, mc.name, mc.is_active,
			m.id, m.name, m.is_active,
			r.id,r.name,r.is_active
		FROM
			category_product cp
		JOIN product p ON p.id =  cp.product_id
		JOIN menu_category mc ON mc.id = cp.category_id
		JOIN menu m ON m.id = mc.menu_id
		JOIN restaurant r ON r.id = m.restaurant_id
		
		WHERE r.id = ? LIMIT ? OFFSET ?
		`
		rows, err := repository.DataSource.Query(sql, body.Filter.RestaurantId, body.PageSize, offset)

		if err != nil {
			return data
		}
		defer rows.Close()

		for rows.Next() {

			record := types.CategoryProduct{}
			err := rows.Scan(
				&record.Id,
				&record.Price,
				&record.IsActive,
				&record.Product.Id,
				&record.Product.Name,
				&record.Product.Description,
				&record.Category.Id,
				&record.Category.Name,
				&record.Category.IsActive,
				&record.Category.Menu.Id,
				&record.Category.Menu.Name,
				&record.Category.Menu.IsActive,
				&record.Category.Menu.Restaurant.Id,
				&record.Category.Menu.Restaurant.Name,
				&record.Category.Menu.Restaurant.IsActive,
			)
			if err != nil {
				return data
			}
			data.Data = append(data.Data, record)
		}
	}

	data.Meta.Page = body.Page
	data.Meta.PageSize = body.PageSize

	if len(body.Filter.MenuId) > 0 {

		sql = `
			SELECT count(*) FROM category_product cp
			JOIN menu_category mc ON mc.id = cp.category_id
			JOIN menu m ON m.id = mc.menu_id
			WHERE m.restaurant_id = ? AND m.id = ?
		`
		row := repository.DataSource.QueryRow(sql, body.Filter.RestaurantId, body.Filter.MenuId)

		err := row.Scan(
			&data.Meta.DataSize,
		)
		if err != nil {
			return data
		}

	} else {
		sql = `
			SELECT count(*) FROM category_product cp
			JOIN menu_category mc ON mc.id = cp.category_id
			JOIN menu m ON m.id = mc.menu_id
			WHERE m.restaurant_id = ?
		`
		row := repository.DataSource.QueryRow(sql, body.Filter.RestaurantId)
		err := row.Scan(
			&data.Meta.DataSize,
		)
		if err != nil {
			return data
		}
	}

	return data
}
