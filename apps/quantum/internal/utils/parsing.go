package utils

import "strconv"

func ParseStringToInt64(str string) int64 {

	number, err := strconv.ParseInt(str, 10, 64)

	if err != nil {
		return 0
	}
	return number

}

func ParseStringToFloat64(str string) float64 {

	number, err := strconv.ParseFloat(str, 64)

	if err != nil {
		return 0.00
	}
	return number
}

func ParseStringToBoolean(str string) bool {

	value, err := strconv.ParseBool(str)

	if err != nil {
		return false
	}
	return value

}
