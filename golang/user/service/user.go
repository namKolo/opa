package controller

import (
	"errors"

	model "github.com/namKolo/opa/golang/user/model"
	storage "github.com/namKolo/opa/golang/user/storage"
	"golang.org/x/crypto/bcrypt"
)

var tableName = "user_test"

// UserService interacts with db
type UserService struct {
	DbClient storage.Storage
}

// Signin - login
func (service UserService) Signin(loginRequest model.LoginRequest) (*model.User, error) {
	email := loginRequest.Email
	var user model.User
	err := service.DbClient.Get(tableName, email, &user)

	if err != nil {
		return nil, err
	}

	bytePassword := []byte(loginRequest.Password)
	byteHashedPassword := []byte(user.Password)

	err = bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)
	if err != nil {
		return nil, errors.New("invalid password")
	}

	return &user, nil
}

// Signup create new user
func (service UserService) Signup(request model.CreateUserRequest) (*model.UserResponse, error) {
	var user *model.User
	err := service.DbClient.Get(tableName, request.Email, user)

	if err == nil {
		return nil, errors.New("Email exists")
	}

	bytePassword := []byte(request.Password)
	hashedPassword, err := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	insertedUser := model.User{
		Name:     request.Name,
		Email:    request.Email,
		Password: string(hashedPassword),
	}

	err = service.DbClient.Insert(tableName, insertedUser)

	if err != nil {
		return nil, err
	}

	return &model.UserResponse{
		Email: request.Email,
		Name:  request.Name,
	}, err
}
