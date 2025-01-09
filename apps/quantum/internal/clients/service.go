package clients

import (
	"quantum/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type ClientService struct {
	Repository ClientRepository
}

func NewClientService() *ClientService {
	return &ClientService{
		Repository: NewLocalClientRepository(),
	}
}

func (service ClientService) Save(body SaveClientDto) error {

	if _, err := service.Repository.GetByIdentification(body.Identification); err == nil {
		return echo.ErrConflict
	}

	newClient := types.NewClient(
		uuid.NewString(),
		body.FullName,
		body.Identification,
		body.IdentificationType,
		body.Email,
	)

	if err := service.Repository.Save(*newClient); err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service ClientService) Update(id string, body SaveClientDto) error {

	client, err := service.Repository.GetByIdentification(body.Identification)

	if err != nil {
		return echo.ErrNotFound
	}

	if client.Identification != body.Identification {
		if _, err := service.Repository.GetByIdentification(body.Identification); err == nil {
			return echo.ErrConflict
		}
	}

	client.FullName = body.FullName
	client.Email = body.Email
	client.Identification = body.Identification
	client.IdentificationType = body.IdentificationType

	if err := service.Repository.Update(client); err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service ClientService) Delete(id string) error {

	err := service.Repository.Delete(id)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service ClientService) GetByIdentification(identification string) (types.Client, error) {

	if client, err := service.Repository.GetByIdentification(identification); err == nil {
		return client, nil
	}

	return types.Client{}, echo.ErrNotFound
}

func (service ClientService) GetPage(filter types.PageFilter[any]) types.PageData[types.Client] {

	return service.Repository.GetPage(filter)
}
