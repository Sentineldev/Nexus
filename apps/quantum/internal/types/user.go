package types

type User struct {
	Id        string   `json:"id"`
	Username  string   `json:"username"`
	Password  string   `json:"password"`
	Employee  Employee `json:"employee"`
	ShortName string   `json:"shortName"`
}

func NewUser(id, username, password, shortName string, employee Employee) *User {

	return &User{
		Id:        id,
		Username:  username,
		Password:  password,
		ShortName: shortName,
		Employee:  employee,
	}
}
