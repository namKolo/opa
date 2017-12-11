package handler

import (
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	model "github.com/namKolo/opa/golang/share/model"
)

// TokenHandler handle token routes
type TokenHandler struct {
	TokenSecret string
}

// GenerateAuthToken generates tokens
func (handler *TokenHandler) GenerateAuthToken(g *gin.Context) {
	var request model.GenerateTokenRequest
	if g.BindJSON(&request) != nil {
		g.JSON(http.StatusBadRequest, gin.H{"message": "Bad Request"})
		g.Abort()
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":    request.Email,
		"password": request.Password,
	})

	tokenString, err := token.SignedString([]byte(handler.TokenSecret))

	if err != nil {
		g.JSON(http.StatusInternalServerError, gin.H{"message": "Cannot generate token"})
		g.Abort()
		return
	}

	g.JSON(http.StatusAccepted, model.Token{Token: tokenString})
}
