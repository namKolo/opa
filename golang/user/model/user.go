package model

// User schema
type User struct {
	Name     string `json:"name" gorethink:"name"`
	Password string `json:"password" gorethink:"password"`
	Email    string `json:"email" gorethink:"email"`
}

// LoginRequest format
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// CreateUserRequest format
type CreateUserRequest struct {
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

// UserResponse format
type UserResponse struct {
	Name  string `json:"name" gorethink:"name"`
	Email string `json:"email" gorethink:"email"`
}
