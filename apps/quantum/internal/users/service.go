package users

import (
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type UserService struct {
	Repository UserRepository
}

func NewUserService() *UserService {

	return &UserService{
		Repository: NewLocalUserRepository(),
	}
}

func (service UserService) Save(body SaveUserDto) error {

	if _, err := service.Repository.GetByUsername(body.Username); err == nil {
		return echo.ErrConflict
	}

	hashedPassword, err := utils.HashPassword(body.Password)

	if err != nil {
		return echo.ErrInternalServerError
	}

	newUser := types.NewUser(
		uuid.NewString(),
		body.Username,
		hashedPassword,
	)

	if err := service.Repository.Save(*newUser); err != nil {
		return echo.ErrInternalServerError
	}

	return nil

}

func (service UserService) Update(id string, body SaveUserDto) error {

	user, err := service.GetById(id)
	if err != nil {
		return err
	}

	if body.Username != user.Username {
		if _, err := service.Repository.GetByUsername(body.Username); err == nil {
			return echo.ErrConflict
		}
	}

	hashedPasssword, err := utils.HashPassword(body.Password)
	if err != nil {
		return echo.ErrInternalServerError
	}
	user.Username = body.Username
	user.Password = hashedPasssword

	err = service.Repository.Update(user)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil

}

func (service UserService) Delete(id string) error {

	err := service.Repository.Delete(id)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service UserService) GetById(id string) (types.User, error) {

	if result, err := service.Repository.GetById(id); err == nil {
		return result, nil
	}

	return types.User{}, echo.ErrNotFound
}
