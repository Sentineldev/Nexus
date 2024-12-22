package users

type SaveUserDto struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UpdateUserDto struct {
	Username string `json:"username"`
}

type UpdateUserPassword struct {
	Password string `json:"password"`
}

type OutGoingUserDto struct {
	Id       string `json:"id"`
	Username string `json:"username"`
}
