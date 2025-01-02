package clients

import "quantum/internal/types"

type ClientRepository interface {
	Save(types.Client) error
	Update(types.Client) error
	Delete(string) error
	GetByIdentification(string) (types.Client, error)
	GetById(string) (types.Client, error)
	GetPage(types.PageFilter[any]) types.PageData[types.Client]
}
