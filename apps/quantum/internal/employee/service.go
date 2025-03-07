package employee

import "quantum/internal/types"

type EmployeeService struct {
	Repository EmployeeRepository
}

func NewEmployeeService() *EmployeeService {

	return &EmployeeService{
		Repository: NewEmployeeRepositoryImplemented(),
	}
}

func (service EmployeeService) Save() error {

	return nil
}

func (service EmployeeService) Update() error {

	return nil
}

func (service EmployeeService) Delete() error {
	return nil
}

func (service EmployeeService) GetPage(filter types.PageFilter[any]) types.PageData[types.Employee] {
	return service.Repository.GetPage(filter)
}
