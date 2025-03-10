package types

type User struct {
	Id       string   `json:"id"`
	Username string   `json:"username"`
	Password string   `json:"password"`
	Employee Employee `json:"employee"`
}

func NewUser(id, username, password string, employee Employee) *User {

	return &User{
		Id:       id,
		Username: username,
		Password: password,
		Employee: employee,
	}
}
