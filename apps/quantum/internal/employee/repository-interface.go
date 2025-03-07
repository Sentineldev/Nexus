package employee

import "quantum/internal/types"

type EmployeeRepository interface {
	Save(types.Employee) error
	Update(types.Employee) error
	Delete(string) error

	GetById(string) (types.Employee, error)
	GetByIdentification(string) (types.Employee, error)
	GetPage(types.PageFilter[any]) types.PageData[types.Employee]
}
