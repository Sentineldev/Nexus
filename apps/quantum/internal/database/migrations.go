package database

import "fmt"

func CreateTables() {

	connection := GetConnection()

	sql := `
	CREATE TABLE IF NOT EXISTS feed_stock(
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL UNIQUE,
		unit TEXT NOT NULL
	);
	`

	if _, err := connection.Exec(sql); err != nil {
		panic(err)
	}

	fmt.Printf("Migrations completed\n")
}
