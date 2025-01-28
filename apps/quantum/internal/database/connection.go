package database

import (
	"database/sql"

	_ "github.com/glebarez/go-sqlite"
)

var (
	DatabaseConnection *sql.DB = nil
)

func GetConnection() *sql.DB {
	if DatabaseConnection == nil {
		db, err := sql.Open("sqlite", "my.db")
		if err != nil {
			panic(err)
		}
		DatabaseConnection = db
	}
	return DatabaseConnection
}
