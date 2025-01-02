package clients

import (
	"errors"
	"quantum/internal"
	"quantum/internal/types"
)

type LocalClientRepository struct{}

func NewLocalClientRepository() *LocalClientRepository {
	return &LocalClientRepository{}
}

func (repository LocalClientRepository) Save(body types.Client) error {

	internal.CLIENTS = append(internal.CLIENTS, body)

	return nil
}

func (repository LocalClientRepository) Update(body types.Client) error {

	internal.CLIENTS = append(internal.CLIENTS, body)

	for index, client := range internal.CLIENTS {
		if client.Id == body.Id {
			internal.CLIENTS[index] = body
			return nil
		}
	}

	return nil
}

func (repository LocalClientRepository) Delete(id string) error {

	aux := []types.Client{}
	for _, client := range internal.CLIENTS {
		if client.Id != id {
			aux = append(aux, client)
		}
	}
	return nil
}

func (repository LocalClientRepository) GetByIdentification(identification string) (types.Client, error) {

	for _, client := range internal.CLIENTS {
		if client.Identification == identification {
			return client, nil
		}
	}

	return types.Client{}, errors.New("client no found")
}

func (repository LocalClientRepository) GetById(id string) (types.Client, error) {

	for _, client := range internal.CLIENTS {
		if client.Id == id {
			return client, nil
		}
	}

	return types.Client{}, errors.New("client no found")
}
func (repository LocalClientRepository) GetPage(filter types.PageFilter[any]) types.PageData[types.Client] {

	data := types.PageData[types.Client]{}

	data.Data = []types.Client{}
	data.Meta = types.PageMeta{
		Page:     filter.Page,
		PageSize: filter.PageSize,
		DataSize: int64(len(internal.CLIENTS)),
	}

	page := filter.Page
	pageSize := filter.PageSize

	// Validamos los parámetros de entrada
	if page <= 0 || pageSize <= 0 {
		return data
	}

	// Calculamos el índice de inicio
	startIndex := (page - 1) * pageSize

	// Verificamos si el índice de inicio excede el tamaño del arreglo
	if startIndex >= int64(len(internal.CLIENTS)) {
		return data
	}

	// Calculamos el índice final (teniendo en cuenta el tamaño del arreglo)
	endIndex := min(startIndex+pageSize, int64(len(internal.CLIENTS)))

	// Retornamos la porción paginada del arreglo
	data.Data = internal.CLIENTS
	if len(internal.RESTAURANTS) == 0 {
		data.Data = internal.CLIENTS[startIndex:endIndex]
	}

	return data
}
