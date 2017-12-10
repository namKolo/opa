package rethinkdb

import (
	r "github.com/dancannon/gorethink"
	config "github.com/namKolo/opa/golang/user/config"
)

// Client of rethinkdb
type Client struct {
	session *r.Session
	config  config.RethinkDB
}

// Insert new record
func (c *Client) Insert(table string, doc interface{}) error {
	_, err := r.Table(table).Insert(doc).RunWrite(c.session)
	return err
}

// Get a record by id
func (c *Client) Get(table string, id string, result interface{}) error {
	query := r.Table(table).Get(id)
	dbRes, err := query.Run(c.session)
	if err != nil {
		return err
	}
	defer dbRes.Close()
	err = dbRes.One(result)
	return err
}

// GetAll return all records from table
func (c *Client) GetAll(table string, results interface{}) error {
	query := r.Table(table)
	dbRes, err := query.Run(c.session)
	if err != nil {
		return err
	}
	defer dbRes.Close()
	err = dbRes.All(results)
	return err
}

// NewClient returns new rethinkdb client
func NewClient(config config.RethinkDB) (*Client, error) {
	session, err := r.Connect(r.ConnectOpts{
		Address:  config.Host,
		Database: config.DB,
	})

	if err != nil {
		return nil, err
	}

	return &Client{
		session: session,
		config:  config,
	}, nil
}
