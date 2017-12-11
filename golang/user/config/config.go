package config

import (
	"encoding/json"
	"io/ioutil"
)

// RethinkDB configuration
type RethinkDB struct {
	Host string `json:"host"`
	DB   string `json:"db"`
}

// App configuration
type App struct {
	Server struct {
		Host string `json:"host"`
		Port string `json:"port"`
	} `json:"server"`
	RethinkDB RethinkDB `json:"rethinkdb"`
}

// FromFile parses configuration from file
func FromFile(path string) (*App, error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var cfg App
	if err := json.Unmarshal(b, &cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}
