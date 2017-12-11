FROM opa/share

RUN go get github.com/dgrijalva/jwt-go
RUN go get github.com/gin-gonic/gin

ADD . /go/src/github.com/namKolo/opa/golang/auth 

WORKDIR /go/src/github.com/namKolo/opa/golang/auth

RUN go install github.com/namKolo/opa/golang/auth

ENTRYPOINT [ "/go/bin/auth" ]

EXPOSE 3001
