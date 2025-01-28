package utils

import "strconv"

func IsStringNumber(str string) bool {

	if _, err := strconv.ParseFloat(str, 64); err != nil {
		return false
	}

	return true
}
