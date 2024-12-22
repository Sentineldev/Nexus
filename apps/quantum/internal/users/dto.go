package users

type SaveUserDto struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
