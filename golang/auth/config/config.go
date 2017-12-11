package config

import (
	"encoding/json"
	"io/ioutil"
)

// App is auth service configuration
type App struct {
	Server struct {
		Host string `json:"host"`
		Port string `json:"port"`
	} `json:"server"`
	TokenSecret string `json:"tokenSecret"`
}

// FromFile is used to read configuration
func FromFile(path string) (*App, error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var appConfig App
	if err = json.Unmarshal(b, &appConfig); err != nil {
		return nil, err
	}

	return &appConfig, nil
}
