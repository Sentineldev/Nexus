package employee

import (
	"database/sql"
	"quantum/internal/database"
	"quantum/internal/types"
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

	sql := `
	INSERT INTO employee(id, first_names, last_names, identification, personal_email, corporative_email,job_entry_date, job_departure_date, department, position)
	VALUES (?,?,?,?,?,?,?,?,?,?)
	`

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

	sql := `
	UPDATE employee
	SET first_names = ?, last_names = ?, identification = ?, personal_email = ?, corporative_email = ?,
	job_entry_date = ?, job_departure_date = ?, department = ?, position = ?
	WHERE id = ?
	`

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
	sql := `DELETE FROM employee WHERE id = ?`

	_, err := repository.DataSource.Exec(sql, id)
	return err
}

func (repository EmployeeRepositoryImplemented) GetById(id string) (types.Employee, error) {
	employee := types.Employee{}

	sql := `
	SELECT 
		*
	FROM employe
	WHERE id = ?
	`

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
		return employee, err
	}

	return employee, nil
}

func (repository EmployeeRepositoryImplemented) GetByIdentification(identification string) (types.Employee, error) {

	employee := types.Employee{}

	sql := `
	SELECT 
		*
	FROM employee
	WHERE identification = ?
	`

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
	sql := `
	SELECT * FROM employee
	LIMIT ? OFFSET ?
	`
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

	row := repository.DataSource.QueryRow(`SELECT count(*) FROM employee`)

	err = row.Scan(
		&data.Meta.DataSize,
	)
	if err != nil {
		return data
	}
	return data
}
