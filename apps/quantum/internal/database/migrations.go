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

	CREATE TABLE IF NOT EXISTS product(
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL UNIQUE,
		description TEXT default ""
	);

	CREATE TABLE IF NOT EXISTS client(
		id TEXT PRIMARY KEY,
		full_name TEXT NOT NULL,
		identification TEXT NOT NULL UNIQUE,
		identification_type TEXT NOT NULL,
		email TEXT default ""	
	);

	CREATE TABLE IF NOT EXISTS user(
		id TEXT PRIMARY KEY,
		username TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);

	INSERT OR IGNORE INTO user(id, username, password) VALUES (
		"some",
		"admin",
		"$2a$14$jcp9oXAw1keAZ3g9hn7p8e1uBjYV7ME7E0kg9TmHg7pTCMC3Je6zK"
	);

	CREATE TABLE IF NOT EXISTS restaurant(
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL UNIQUE,
		is_active BOOLEAN NOT NULL DEFAULT true
	);
	`

	if _, err := connection.Exec(sql); err != nil {
		panic(err)
	}

	fmt.Printf("Migrations completed\n")
}
