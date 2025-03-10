package users

import "quantum/internal/types"

type UserRepository interface {
	Save(types.User) error
	Update(types.User) error
	Delete(string) error
	GetById(string) (types.User, error)
	GetByUsername(string) (types.User, error)
	GetByEmployeeId(string) (types.User, error)
	GetAll() []types.User
}
