package main

import (
	"flag"
	"log"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	config "github.com/namKolo/opa/golang/user/config"
	handler "github.com/namKolo/opa/golang/user/handler"
	service "github.com/namKolo/opa/golang/user/service"
	rethinkdb "github.com/namKolo/opa/golang/user/storage/rethinkdb"
)

func main() {
	configPath := flag.String("config", "./config/config.json", "path of the config file")
	flag.Parse()
	appConfig, err := config.FromFile(*configPath)
	if err != nil {
		log.Fatal(err)
	}

	dbClient, err := rethinkdb.NewClient(appConfig.RethinkDB)

	if err != nil {
		log.Fatal(err)
	}

	r := gin.Default()
	store, _ := sessions.NewRedisStore(10, "tcp", "localhost:6379", "", []byte("secret"))
	r.Use(sessions.Sessions("gin-boilerplate-session", store))

	v1 := r.Group("/v1/user")
	{
		/*** START USER ***/
		userService := service.UserService{dbClient}
		userHandler := handler.UserHandler{&userService}
		v1.POST("/signin", userHandler.Signin)
		v1.POST("/signup", userHandler.Signup)
	}

	r.Run(":" + appConfig.Server.Port)
}
