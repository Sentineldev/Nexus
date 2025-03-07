package types

type Employee struct {
	Id               string `json:"id"`
	FirstNames       string `json:"names"`
	LastNames        string `json:"lastNames"`
	Identification   string `json:"identification"`
	PersonalEmail    string `json:"personalEmail"`
	CorporativeEmail string `json:"corporativeEmail"`
	Department       string `json:"department"`
	Position         string `json:"position"`
	JobEntryDate     string `json:"jobEntryDate"`
	JobDepartureDate string `json:"jobDepartureDate"`
}

func NewEmployee(id, firstNames, lastNames, identification, personalEmail, corporativeEmail, department, position, jobEntryDate, jobDepartureDate string) *Employee {

	return &Employee{
		Id:               id,
		FirstNames:       firstNames,
		LastNames:        lastNames,
		Identification:   identification,
		PersonalEmail:    personalEmail,
		CorporativeEmail: corporativeEmail,
		Department:       department,
		Position:         position,
		JobEntryDate:     jobEntryDate,
		JobDepartureDate: jobEntryDate,
	}
}
