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
		description TEXT NOT NULL default "",
		group TEXT NOT NULL,
	);

	CREATE TABLE IF NOT EXISTS client(
		id TEXT PRIMARY KEY,
		full_name TEXT NOT NULL,
		identification TEXT NOT NULL UNIQUE,
		identification_type TEXT NOT NULL,
		email TEXT default ""	
	);

	CREATE TABLE IF NOT EXISTS employee(
		id TEXT PRIMARY KEY,
		first_names TEXT NOT NULL,
		last_names TEXT NOT NULL,
		identification TEXT NOT NULL UNIQUE,
		personal_email TEXT NOT NULL,
		corporative_email TEXT NOT NULL,
		job_entry_date DATE NOT NULL,
		job_departure_date DATE NOT NULL,
		department TEXT NOT NULL,
		position TEXT NOT NULL
	);

	CREATE TABLE IF NOT EXISTS user(
		id TEXT PRIMARY KEY,
		employee_id TEXT NOT NULL,
		username TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		short_name TEXT NOT NULL,
		FOREIGN KEY(employee_id) REFERENCES"employee"(id)
	);

	INSERT OR IGNORE INTO employee(id, first_names, last_names, identification, personal_email, corporative_email,position,department,job_entry_date,job_departure_date) VALUES (
		"1",
		"SYSTEM",
		"SYSTEM",
		"1",
		"system@gmail.com",
		"system@gmail.com",
		"system",
		"system",
		"10-03-2001",
		"10-03-2001"
	);
	
	INSERT OR IGNORE INTO user(id, username, password, employee_id) VALUES (
		"some",
		"admin",
		"$2a$14$jcp9oXAw1keAZ3g9hn7p8e1uBjYV7ME7E0kg9TmHg7pTCMC3Je6zK",
		"1"
	);




	CREATE TABLE IF NOT EXISTS restaurant_order(
		id TEXT PRIMARY KEY,
		client_id TEXT NOT NULL,
		order_type TEXT NOT NULL,
		location TEXT NOT NULL,
		total FLOAT default 0,
		FOREIGN KEY(client_id) REFERENCES "client"(id)
	);

	CREATE TABLE IF NOT EXISTS order_product(
		id TEXT PRIMARY KEY,
		product_id TEXT NOT NULL,
		order_id TEXT NOT NULL,
		quantity INT default 0,
		total FLOAT default 0,
		FOREIGN KEY(product_id) REFERENCES"product"(id),
		FOREIGN KEY(order_id) REFERENCES"restaurant_order"(id)
	);

	CREATE TABLE IF NOT EXISTS restaurant(
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL UNIQUE,
		is_active BOOLEAN NOT NULL DEFAULT true
	);

	CREATE TABLE IF NOT EXISTS menu(
		id TEXT PRIMARY KEY,
		restaurant_id TEXT NOT NULL,
		name TEXT NOT NULL,
		is_active BOOLEAN default false,
		FOREIGN KEY(restaurant_id) REFERENCES "restaurant"(id)
	);

	CREATE TABLE IF NOT EXISTS menu_category(
		id TEXT PRIMARY KEY,
		menu_id TEXT NOT NULL,
		name TEXT NOT NULL,
		is_active BOOLEAN default false,
		FOREIGN KEY(menu_id) REFERENCES "menu"(id)
	);


	CREATE TABLE IF NOT EXISTS category_product(
		id TEXT PRIMARY KEY,
		product_id TEXT NOT NULL,
		category_id TEXT NOT NULL,
		price FLOAT default 0,
		count INT default 0,
		is_active BOOLEAN default false,
		FOREIGN KEY(product_id) REFERENCES"product"(id),
		FOREIGN KEY(category_id) REFERENCES"menu_category"(id)
	);
	`

	if _, err := connection.Exec(sql); err != nil {
		panic(err)
	}

	fmt.Printf("Migrations completed\n")
}
