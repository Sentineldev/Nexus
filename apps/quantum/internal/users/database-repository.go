package users

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

func (repository DatabaseRepository) Save(body types.User) error {

	sql := `INSERT INTO user(id, username, password) VALUES (?,?,?)`

	if _, err := repository.DataSource.Exec(sql, body.Id, body.Username, body.Password); err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) Update(body types.User) error {

	sql := `UPDATE user SET username = ?, password = ? WHERE id = ?`

	if _, err := repository.DataSource.Exec(sql, body.Username, body.Password, body.Id); err != nil {
		return err
	}

	return nil
}

func (repository DatabaseRepository) Delete(id string) error {

	sql := `DELETE FROM user WHERE id = ?`

	if _, err := repository.DataSource.Exec(sql, id); err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) GetById(id string) (types.User, error) {

	result := types.User{}

	sql := `SELECT * FROM user WHERE id = ?`

	row := repository.DataSource.QueryRow(sql, id)

	err := row.Scan(
		&result.Id,
		&result.Username,
		&result.Password,
	)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetByUsername(username string) (types.User, error) {
	result := types.User{}

	sql := `SELECT * FROM user WHERE username = ?`

	row := repository.DataSource.QueryRow(sql, username)

	err := row.Scan(
		&result.Id,
		&result.Username,
		&result.Password,
	)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetAll() []types.User {

	result := []types.User{}
	sql := `SELECT * FROM user`

	rows, err := repository.DataSource.Query(sql)
	if err != nil {
		return result
	}

	for rows.Next() {

		record := types.User{}

		err = rows.Scan(
			&record.Id,
			&record.Username,
			&record.Password,
		)
		if err != nil {
			return result
		}
		result = append(result, record)
	}

	return result
}
