package users

import (
	"errors"
	"quantum/internal"
	"quantum/internal/types"
)

type LocalUserRepository struct{}

func NewLocalUserRepository() *LocalUserRepository {
	return &LocalUserRepository{}
}

func (repository LocalUserRepository) Save(body types.User) error {

	internal.USERS = append(internal.USERS, body)
	return nil
}

func (repository LocalUserRepository) Update(body types.User) error {

	for index, user := range internal.USERS {

		if user.Id == body.Id {
			internal.USERS[index] = body
			break
		}
	}
	return nil
}

func (repository LocalUserRepository) Delete(id string) error {

	aux := []types.User{}
	for _, user := range internal.USERS {

		if user.Id != id {
			aux = append(aux, user)
		}
	}
	internal.USERS = aux
	return nil
}

func (repository LocalUserRepository) GetById(id string) (types.User, error) {

	for _, user := range internal.USERS {
		if user.Id == id {
			return user, nil
		}
	}
	return types.User{}, errors.New("user not found")
}

func (repository LocalUserRepository) GetByUsername(username string) (types.User, error) {
	for _, user := range internal.USERS {
		if user.Username == username {
			return user, nil
		}
	}
	return types.User{}, errors.New("user not found")
}

func (repository LocalUserRepository) GetAll() []types.User {

	return internal.USERS
}
