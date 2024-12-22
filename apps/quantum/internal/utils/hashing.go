package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {

	hashedPassword := ""

	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		return hashedPassword, err
	}
	hashedPassword = string(bytes)

	return hashedPassword, nil
}

func CheckPasswordHash(password, hash string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	return err
}
