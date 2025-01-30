package utils

import "strconv"

func IsStringNumber(str string) bool {

	if _, err := strconv.ParseFloat(str, 64); err != nil {
		return false
	}

	return true
}

func IsStringEmpty(str string) bool {

	return len(str) == 0
}

func IsStringBoolean(str string) bool {

	return str == "true" || str == "false"
}
