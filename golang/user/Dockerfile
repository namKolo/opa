FROM opa/share

RUN go get github.com/dancannon/gorethink
RUN go get github.com/gin-gonic/gin

ADD . /go/src/github.com/namKolo/opa/golang/user 

WORKDIR /go/src/github.com/namKolo/opa/golang/user

RUN go install github.com/namKolo/opa/golang/user

ENTRYPOINT [ "/go/bin/user" ]

EXPOSE 3002
