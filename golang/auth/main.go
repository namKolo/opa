package main

import (
	"flag"
	"log"

	"github.com/gin-gonic/gin"
	config "github.com/namKolo/opa/golang/auth/config"
	handler "github.com/namKolo/opa/golang/auth/handler"
)

func main() {
	configPath := flag.String("config", "./config/config.json", "path of the config file")
	flag.Parse()
	appConfig, err := config.FromFile(*configPath)
	if err != nil {
		log.Fatal(err)
	}

	r := gin.Default()
	v1 := r.Group("/v1/auth")
	{
		/*** START USER ***/
		tokenHandler := handler.TokenHandler{TokenSecret: appConfig.TokenSecret}
		v1.POST("/generate", tokenHandler.GenerateAuthToken)
	}

	r.Run(":" + appConfig.Server.Port)
}
