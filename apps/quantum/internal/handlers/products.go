package handlers

import (
	"net/http"
	"quantum/internal/interfaces"
	"quantum/internal/repositories"

	"github.com/labstack/echo/v4"
)

type ProductsHandler struct {
	Repository interfaces.ProductRepository
}

func NewProductsHandler() *ProductsHandler {
	return &ProductsHandler{
		Repository: repositories.NewLocalRepository(),
	}
}

func (handler ProductsHandler) GetProducts(context echo.Context) error {

	return context.String(http.StatusOK, "Get all products")
}
