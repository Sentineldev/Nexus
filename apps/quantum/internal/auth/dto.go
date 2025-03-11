package auth

import (
	"net/http"
	"quantum/internal/types"
	"quantum/internal/utils"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type LogInDto struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (dto LogInDto) Validate() error {

	err := ""

	if utils.IsStringEmpty(dto.Username) {
		err = "Username cant be empty"
	}

	if utils.IsStringEmpty(dto.Password) {
		err = "Password cant be empty"
	}

	if !utils.IsStringEmpty(err) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	return nil
}

type TokenData struct {
	Id        string         `json:"id"`
	Username  string         `json:"username"`
	ShortName string         `json:"shortName"`
	Employee  types.Employee `json:"employee"`
	jwt.RegisteredClaims
}
