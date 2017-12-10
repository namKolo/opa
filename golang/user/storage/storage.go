package storage

// Storage is general interface
type Storage interface {
	Insert(string, interface{}) error
	Get(string, string, interface{}) error
	GetAll(string, interface{}) error
}
