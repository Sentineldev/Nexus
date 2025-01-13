package types

type UserLog struct {
	User      User   `json:"user"`
	TimeStamp string `json:"timestamp"`
}

func NewUserLog(user User, timestamp string) *UserLog {
	return &UserLog{
		User:      user,
		TimeStamp: timestamp,
	}
}
