package types

type User struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func NewUser(id, username, password string) *User {

	return &User{
		Id:       id,
		Username: username,
		Password: password,
	}
}
