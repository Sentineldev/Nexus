package users

import (
	"database/sql"
	"fmt"
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

	sql := `INSERT INTO user(id, username, password, employee_id, short_name) VALUES (?,?,?,?,?)`

	if _, err := repository.DataSource.Exec(sql, body.Id, body.Username, body.Password, body.Employee.Id, body.ShortName); err != nil {
		return err
	}
	return nil
}

func (repository DatabaseRepository) Update(body types.User) error {

	sql := `UPDATE user SET username = ?, password = ?, short_name = ? WHERE id = ?`

	if _, err := repository.DataSource.Exec(sql, body.Username, body.Password, body.ShortName, body.Id); err != nil {
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

	sql := `
	SELECT 
		u.id, u.username, u.password, u.short_name,
		e.id, e.first_names,e.last_names,e.identification, e.personal_email,
		e.corporative_email,e.position,e.department,e.job_departure_date,e.job_entry_date 
	FROM 
		user u
	JOIN employee e ON e.id = u.employee_id
	WHERE u.id = ?
	`

	row := repository.DataSource.QueryRow(sql, id)

	err := row.Scan(
		&result.Id,
		&result.Username,
		&result.Password,
		&result.ShortName,
		&result.Employee.Id,
		&result.Employee.FirstNames,
		&result.Employee.LastNames,
		&result.Employee.Identification,
		&result.Employee.PersonalEmail,
		&result.Employee.CorporativeEmail,
		&result.Employee.Position,
		&result.Employee.Department,
		&result.Employee.JobDepartureDate,
		&result.Employee.JobEntryDate,
	)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetByEmployeeId(employeeId string) (types.User, error) {

	result := types.User{}

	sql := `
	SELECT 
		u.id, u.username, u.password, u.short_name,
		e.id, e.first_names,e.last_names,e.identification, e.personal_email,
		e.corporative_email,e.position,e.department,e.job_departure_date,e.job_entry_date 
	FROM 
		user u
	JOIN employee e ON e.id = u.employee_id
	WHERE u.employee_id = ?
	`

	row := repository.DataSource.QueryRow(sql, employeeId)

	err := row.Scan(
		&result.Id,
		&result.Username,
		&result.Password,
		&result.ShortName,
		&result.Employee.Id,
		&result.Employee.FirstNames,
		&result.Employee.LastNames,
		&result.Employee.Identification,
		&result.Employee.PersonalEmail,
		&result.Employee.CorporativeEmail,
		&result.Employee.Position,
		&result.Employee.Department,
		&result.Employee.JobDepartureDate,
		&result.Employee.JobEntryDate,
	)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetByUsername(username string) (types.User, error) {
	result := types.User{}

	sql := `
	SELECT 
		u.id, u.username, u.password, u.short_name,
		e.id, e.first_names,e.last_names,e.identification, e.personal_email,
		e.corporative_email,e.position,e.department,e.job_departure_date,e.job_entry_date 
	FROM 
		user u
	JOIN employee e ON e.id = u.employee_id
	WHERE username = ?
	`

	row := repository.DataSource.QueryRow(sql, username)

	err := row.Scan(
		&result.Id,
		&result.Username,
		&result.Password,
		&result.ShortName,
		&result.Employee.Id,
		&result.Employee.FirstNames,
		&result.Employee.LastNames,
		&result.Employee.Identification,
		&result.Employee.PersonalEmail,
		&result.Employee.CorporativeEmail,
		&result.Employee.Position,
		&result.Employee.Department,
		&result.Employee.JobDepartureDate,
		&result.Employee.JobEntryDate,
	)

	if err != nil {
		fmt.Printf("%s\n", err)
		return result, err
	}

	return result, nil
}

func (repository DatabaseRepository) GetAll() []types.User {

	result := []types.User{}
	sql := `
	SELECT 
		u.id, u.username, u.password, u.short_name,
		e.id, e.first_names,e.last_names,e.identification, e.personal_email,
		e.corporative_email,e.position,e.department,e.job_departure_date,e.job_entry_date 
	FROM 
		user u
	JOIN employee e ON e.id = u.employee_id
	`

	rows, err := repository.DataSource.Query(sql)
	if err != nil {
		return result
	}

	for rows.Next() {

		record := types.User{}

		err := rows.Scan(
			&record.Id,
			&record.Username,
			&record.Password,
			&record.ShortName,
			&record.Employee.Id,
			&record.Employee.FirstNames,
			&record.Employee.LastNames,
			&record.Employee.Identification,
			&record.Employee.PersonalEmail,
			&record.Employee.CorporativeEmail,
			&record.Employee.Position,
			&record.Employee.Department,
			&record.Employee.JobDepartureDate,
			&record.Employee.JobEntryDate,
		)
		if err != nil {
			return result
		}
		result = append(result, record)
	}

	return result
}
