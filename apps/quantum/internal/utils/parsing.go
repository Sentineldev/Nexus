package utils

import "strconv"

func ParseStringToInt64(str string) int64 {

	number, err := strconv.ParseInt(str, 10, 64)

	if err != nil {
		return 0
	}
	return number

}
