package category_product

import (
	"quantum/internal/menu_category"
	"quantum/internal/products"
	"quantum/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type CategoryProductService struct {
	Repository      CategoryProductRepository
	ProductService  products.ProductService
	CategoryService menu_category.MenuCategoryService
}

func NewCategoryProductService() *CategoryProductService {
	return &CategoryProductService{
		Repository:      NewLocalCategoryProductRepository(),
		ProductService:  *products.NewProductService(),
		CategoryService: *menu_category.NewMenuCategoryService(),
	}
}

func (service CategoryProductService) Save(body SaveCategoryProductDto) error {

	if _, err := service.Repository.GetByProductId(body.CategoryId, body.ProductId); err == nil {
		return echo.ErrConflict
	}

	product, err := service.ProductService.GetById(body.ProductId)

	if err != nil {
		return err
	}

	category, err := service.CategoryService.GetById(body.CategoryId)
	if err != nil {
		return err
	}

	newCategoryProduct := types.NewCategoryProduct2(
		uuid.NewString(),
		product,
		category,
		body.Price,
	)

	service.Repository.Save(*newCategoryProduct)

	return nil

}

func (service CategoryProductService) getPage(filter types.PageFilter[CategoryPageFilter]) types.PageData[types.CategoryProduct] {
	return service.Repository.GetPage(filter)
}
