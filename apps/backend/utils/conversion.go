package utils

import (
	"fmt"
	"strconv"
)

func ConvertToInt64(value string) int64 {

	result, err := strconv.ParseInt(value, 10, 64)

	if err != nil {
		fmt.Printf("%s\n", err)
		return 0
	}
	return result

}
