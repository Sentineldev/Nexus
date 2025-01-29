package clients

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

func (repository DatabaseRepository) Save(body types.Client) error {

	sql := `INSERT INTO client(id, full_name, identification, identification_type, email) VALUES (?,?,?,?,?)`

	_, err := repository.DataSource.Exec(
		sql,
		body.Id,
		body.FullName,
		body.Identification,
		body.IdentificationType,
		body.Email,
	)
	if err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) Update(body types.Client) error {

	sql := `UPDATE client SET full_name = ?, identification = ?, identification_type = ?, email = ? WHERE id = ?`

	_, err := repository.DataSource.Exec(
		sql,
		body.FullName,
		body.Identification,
		body.IdentificationType,
		body.Email,
		body.Id,
	)
	if err != nil {
		return err
	}

	return nil
}

func (repository DatabaseRepository) Delete(id string) error {

	sql := `DELETE FROM client WHERE id = ?`

	_, err := repository.DataSource.Exec(sql, id)

	if err != nil {
		return err
	}

	return nil
}

func (repository DatabaseRepository) GetByIdentification(identification string) (types.Client, error) {
	result := types.Client{}

	sql := `SELECT * FROM client WHERE identification = ?`

	row := repository.DataSource.QueryRow(sql, identification)

	err := row.Scan(
		&result.Id,
		&result.FullName,
		&result.Identification,
		&result.IdentificationType,
		&result.Email,
	)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetById(id string) (types.Client, error) {

	result := types.Client{}

	sql := `SELECT * FROM client WHERE id = ?`

	row := repository.DataSource.QueryRow(sql, id)

	err := row.Scan(
		&result.Id,
		&result.FullName,
		&result.Identification,
		&result.IdentificationType,
		&result.Email,
	)

	if err != nil {
		return result, err
	}

	return result, nil
}
func (repository DatabaseRepository) GetPage(body types.PageFilter[any]) types.PageData[types.Client] {

	data := types.PageData[types.Client]{}
	data.Data = []types.Client{}
	offset := (body.Page - 1) * body.PageSize
	sql := `
	SELECT * FROM client
	LIMIT ? OFFSET ?
	`
	rows, err := repository.DataSource.Query(sql, body.PageSize, offset)

	if err != nil {
		return data
	}
	defer rows.Close()

	for rows.Next() {

		record := types.Client{}
		err := rows.Scan(
			&record.Id,
			&record.FullName,
			&record.Identification,
			&record.IdentificationType,
			&record.Email,
		)
		if err != nil {
			return data
		}
		data.Data = append(data.Data, record)
	}

	data.Meta.Page = body.Page
	data.Meta.PageSize = body.PageSize

	row := repository.DataSource.QueryRow(`SELECT count(*) FROM client`)

	err = row.Scan(
		&data.Meta.DataSize,
	)
	if err != nil {
		return data
	}
	return data
}
