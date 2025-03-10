package employee

import (
	"quantum/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type EmployeeService struct {
	Repository EmployeeRepository
}

func NewEmployeeService() *EmployeeService {

	return &EmployeeService{
		Repository: NewEmployeeRepositoryImplemented(),
	}
}

func (service EmployeeService) Save(body SaveEmployeeDto) error {

	_, err := service.Repository.GetByIdentification(body.Identification)

	if err == nil {
		return echo.ErrConflict
	}

	newEmployee := types.NewEmployee(
		uuid.NewString(),
		body.FirstNames,
		body.LastNames,
		body.Identification,
		body.PersonalEmail,
		body.CorporativeEmail,
		body.Department,
		body.Position,
		body.JobEntryDate,
		body.JobDepartureDate,
	)

	err = service.Repository.Save(*newEmployee)

	if err != nil {
		return echo.ErrInternalServerError
	}
	return nil
}

func (service EmployeeService) Update(id string, body SaveEmployeeDto) error {

	current, err := service.Repository.GetById(id)

	if err != nil {
		return echo.ErrNotFound
	}

	if current.Identification != body.Identification {

		_, err = service.Repository.GetByIdentification(body.Identification)
		if err == nil {
			return echo.ErrConflict
		}

	}

	current.FirstNames = body.FirstNames
	current.LastNames = body.LastNames
	current.Identification = body.Identification
	current.PersonalEmail = body.PersonalEmail
	current.CorporativeEmail = body.CorporativeEmail
	current.Department = body.Department
	current.Position = body.Position
	current.JobEntryDate = body.JobEntryDate
	current.JobDepartureDate = body.JobDepartureDate

	err = service.Repository.Update(current)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service EmployeeService) Delete(id string) error {

	err := service.Repository.Delete(id)
	if err != nil {
		return echo.ErrInternalServerError
	}
	return nil
}

func (service EmployeeService) GetPage(filter types.PageFilter[any]) types.PageData[types.Employee] {
	return service.Repository.GetPage(filter)
}
