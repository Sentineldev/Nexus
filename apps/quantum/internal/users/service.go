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

func (service UserService) Update(id string, body UpdateUserDto) error {

	user, err := service.GetById(id)
	if err != nil {
		return err
	}

	if body.Username != user.Username {
		if _, err := service.Repository.GetByUsername(body.Username); err == nil {
			return echo.ErrConflict
		}
	}
	user.Username = body.Username

	err = service.Repository.Update(user)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil

}

func (service UserService) ChangePassword(id string, body UpdateUserPassword) error {

	user, err := service.GetById(id)
	if err != nil {
		return err
	}

	hashedPassword, err := utils.HashPassword(body.Password)

	if err != nil {
		return echo.ErrInternalServerError
	}

	user.Password = hashedPassword

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

func (service UserService) GetAll() []types.User {

	return service.Repository.GetAll()
}
