package controller

import (
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
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
	session := sessions.Default(c)
	session.Set("user_email", user.Email)
	session.Set("user_name", user.Name)
	session.Save()
	c.JSON(200, gin.H{"message": "User signed in", "user": user})
}

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
	session := sessions.Default(c)
	session.Set("user_email", user.Email)
	session.Set("user_name", user.Name)
	session.Save()
	c.JSON(200, gin.H{"message": "User signed up", "user": user})
}
