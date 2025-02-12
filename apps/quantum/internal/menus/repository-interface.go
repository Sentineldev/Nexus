package menus

import "quantum/internal/types"

type MenuRepository interface {
	Save(types.Menu) error
	Update(types.Menu) error
	Delete(string) error
	GetByName(string, string) (types.Menu, error)
	GetById(string) (types.Menu, error)
	GetAll(string) []types.Menu
}
