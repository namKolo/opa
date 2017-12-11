package controller

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
	authModel "github.com/namKolo/opa/golang/auth/model"
	model "github.com/namKolo/opa/golang/user/model"
	service "github.com/namKolo/opa/golang/user/service"
)

// UserHandler handles user routes
type UserHandler struct {
	Service *service.UserService
}

// Signin to login user
func (handler UserHandler) Signin(c *gin.Context) {
	var loginRequest model.LoginRequest
	if c.BindJSON(&loginRequest) != nil {
		c.JSON(406, gin.H{"message": "Invalid request"})
		c.Abort()
		return
	}

	user, err := handler.Service.Signin(loginRequest)

	if err != nil {
		c.JSON(406, gin.H{"message": "Invalid signin details", "error": err.Error()})
		c.Abort()
		return
	}

	// Send request to auth service to generate token
	jsonValue, _ := json.Marshal(user)
	res, err := http.Post(
		"http://localhost:3002/v1/auth/generate",
		"application/json",
		bytes.NewBuffer(jsonValue),
	)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	var token authModel.Token
	if err = json.Unmarshal(body, &token); err != nil {
		c.JSON(406, gin.H{"message": "Invalid signin details", "error": err.Error()})
		c.Abort()
		return
	}

	c.JSON(200, &token)
}

// Signup to create new user
func (handler UserHandler) Signup(c *gin.Context) {
	var request model.CreateUserRequest
	if c.BindJSON(&request) != nil {
		c.JSON(406, gin.H{"message": "Invalid request"})
		c.Abort()
		return
	}

	user, err := handler.Service.Signup(request)
	if err != nil {
		c.JSON(406, gin.H{"message": "Invalid signup details", "error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(200, gin.H{"message": "User signed up", "user": user})
}
