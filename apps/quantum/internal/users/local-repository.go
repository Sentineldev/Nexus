package users

import "quantum/internal/types"

type LocalUserRepository struct{}

func NewLocalUserRepository() *LocalUserRepository {
	return &LocalUserRepository{}
}

func (repository LocalUserRepository) Save(body types.User) error {

	return nil
}

func (repository LocalUserRepository) Update(body types.User) error {

	return nil
}

func (repository LocalUserRepository) Delete(id string) error {

	return nil
}

func (repository LocalUserRepository) GetById(id string) (types.User, error) {

	return types.User{}, nil
}

func (repository LocalUserRepository) GetByUsername(username string) (types.User, error) {

	return types.User{}, nil
}

func (repository LocalUserRepository) GetAll() []types.User {

	return []types.User{}
}
