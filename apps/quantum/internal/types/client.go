package types

type Client struct {
	Id                 string `json:"id"`
	FullName           string `json:"fullName"`
	Identification     string `json:"identification"`
	IdentificationType string `json:"identificationType"`
	Email              string `json:"email"`
}

func NewClient(id, fullName, identification, identificationType, email string) *Client {

	return &Client{
		id,
		fullName,
		identification,
		identificationType,
		email,
	}
}
