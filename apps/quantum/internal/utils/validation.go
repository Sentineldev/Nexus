package utils

import (
	"strconv"
	"strings"
)

func IsStringNumber(str string) bool {

	_, err := strconv.ParseFloat(str, 64)

	return err == nil
}

func IsStringNumberIntenger(str string) bool {

	splited := strings.Split(str, ".")

	if len(splited) > 1 {
		return false
	}
	_, err := strconv.ParseInt(str, 10, 64)

	return err == nil
}

func IsStringEmpty(str string) bool {

	return len(str) == 0
}

func IsStringBoolean(str string) bool {

	value := strings.ToLower(str)

	return value == "true" || value == "false"
}
