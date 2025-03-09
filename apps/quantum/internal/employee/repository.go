package employee

import (
	"database/sql"
	"fmt"
	"quantum/internal/database"
	"quantum/internal/types"
)

var (
	tableName = "employee"
)

type EmployeeRepositoryImplemented struct {
	DataSource *sql.DB
}

func NewEmployeeRepositoryImplemented() *EmployeeRepositoryImplemented {
	return &EmployeeRepositoryImplemented{
		DataSource: database.GetConnection(),
	}
}

func (repository EmployeeRepositoryImplemented) Save(body types.Employee) error {

	sql := fmt.Sprintf(`
	INSERT INTO %s(id, first_names, last_names, identification, personal_email, corporative_email,job_entry_date, job_departure_date, department, position)
	VALUES (?,?,?,?,?,?,?,?,?,?)
	`, tableName)

	_, err := repository.DataSource.Exec(sql,
		body.Id,
		body.FirstNames,
		body.LastNames,
		body.Identification,
		body.PersonalEmail,
		body.CorporativeEmail,
		body.JobEntryDate,
		body.JobDepartureDate,
		body.Department,
		body.Position,
	)

	return err
}

func (repository EmployeeRepositoryImplemented) Update(body types.Employee) error {

	sql := fmt.Sprintf(`
	UPDATE %s
	SET first_names = ?, last_names = ?, identification = ?, personal_email = ?, corporative_email = ?,
	job_entry_date = ?, job_departure_date = ?, department = ?, position = ?
	WHERE id = ?
	`, tableName)

	_, err := repository.DataSource.Exec(sql,
		body.FirstNames,
		body.LastNames,
		body.Identification,
		body.PersonalEmail,
		body.CorporativeEmail,
		body.JobEntryDate,
		body.JobDepartureDate,
		body.Department,
		body.Position,
		body.Id,
	)

	return err
}

func (repository EmployeeRepositoryImplemented) Delete(id string) error {
	sql := fmt.Sprintf(`DELETE FROM %s WHERE id = ?`, tableName)

	_, err := repository.DataSource.Exec(sql, id)
	return err
}

func (repository EmployeeRepositoryImplemented) GetById(id string) (types.Employee, error) {
	employee := types.Employee{}

	sql := fmt.Sprintf(`
	SELECT 
		*
	FROM %s
	WHERE id = ?
	`, tableName)

	row := repository.DataSource.QueryRow(sql, id)

	err := row.Scan(
		&employee.Id,
		&employee.FirstNames,
		&employee.LastNames,
		&employee.Identification,
		&employee.PersonalEmail,
		&employee.CorporativeEmail,
		&employee.JobEntryDate,
		&employee.JobDepartureDate,
		&employee.Department,
		&employee.Position,
	)
	if err != nil {
		fmt.Printf("%s\n", err)
		return employee, err
	}

	return employee, nil
}

func (repository EmployeeRepositoryImplemented) GetByIdentification(identification string) (types.Employee, error) {

	employee := types.Employee{}

	sql := fmt.Sprintf(`
	SELECT 
		*
	FROM %s
	WHERE identification = ?
	`, tableName)

	row := repository.DataSource.QueryRow(sql, identification)

	err := row.Scan(
		&employee.Id,
		&employee.FirstNames,
		&employee.LastNames,
		&employee.Identification,
		&employee.PersonalEmail,
		&employee.CorporativeEmail,
		&employee.JobEntryDate,
		&employee.JobDepartureDate,
		&employee.Department,
		&employee.Position,
	)
	if err != nil {
		return employee, err
	}

	return employee, nil
}

func (repository EmployeeRepositoryImplemented) GetPage(body types.PageFilter[any]) types.PageData[types.Employee] {

	data := types.PageData[types.Employee]{}
	data.Data = []types.Employee{}
	offset := (body.Page - 1) * body.PageSize
	sql := fmt.Sprintf(`
	SELECT * FROM %s
	LIMIT ? OFFSET ?
	`, tableName)
	rows, err := repository.DataSource.Query(sql, body.PageSize, offset)

	if err != nil {
		return data
	}
	defer rows.Close()

	for rows.Next() {

		employee := types.Employee{}
		err := rows.Scan(
			&employee.Id,
			&employee.FirstNames,
			&employee.LastNames,
			&employee.Identification,
			&employee.PersonalEmail,
			&employee.CorporativeEmail,
			&employee.JobEntryDate,
			&employee.JobDepartureDate,
			&employee.Department,
			&employee.Position,
		)
		if err != nil {
			return data
		}
		data.Data = append(data.Data, employee)
	}

	data.Meta.Page = body.Page
	data.Meta.PageSize = body.PageSize

	row := repository.DataSource.QueryRow(fmt.Sprintf(`SELECT count(*) FROM %s`, tableName))

	err = row.Scan(
		&data.Meta.DataSize,
	)
	if err != nil {
		return data
	}
	return data
}
