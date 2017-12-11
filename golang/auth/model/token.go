package model

type Token struct {
	Token string `json:"token"`
}

type GenerateTokenRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
