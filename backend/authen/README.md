# Node Auth

Example node authentication app with jwt

# Installation

1. in a `/server/config/index` file in the root directory with this content
```
SERVER_HOSTNAME=127.0.0.1
SERVER_PORT=3001
DATABASE_URL=mongodb://127.0.0.1/supplier
JWTSECRET=rickandmorty
```
> Replace `secret` wth the actual secret key

2. npm install
3. npm start

# API Routes

## Signup
url:
```
http://localhost:3000/api/users/signup
```
method:
```
POST
```
body:
```
{
  "firstname": "goldshard",
  "lastname": "goldshard",
  "email": "goldshard.goldshard@gmail.com",
  "password": "PASSWORD"
}
```
response: 
```
{
  "success": true,
  "item": {
    "name": "goldshard",
    "lastname": "goldshard",
    "email": "goldshard.goldshard@gmail.com",
  },
  "meta": {
    "token": "JWT-TOKEN"
  }
}
```

## Signin
url:
```
http://localhost:3000/api/users/signin
```
method:
```
POST
```
body:
```
{
  "email": "goldshard.goldshard@gmail.com",
  "password": "PASSWORD"
}
```
response: 
```
{
  "success": true,
  "item": {
    "name": "goldshard",
    "lastname": "goldshard",
    "email": "goldshard.goldshard@gmail.com",
  },
  "meta": {
    "token": "JWT-TOKEN"
  }
}
```

## Profile protected route
url:
```
http://localhost:3000/api/users/profile
```
method:
```
GET
```
The JSON Web Token can be send as any of the following options:

header:
```
Authorization: JWT-TOKEN
```

query param:
```
token=JWT-TOKEN
```

body:
```
{
  "token": "JWT-TOKEN"
}
```

response:
```
{
  "success": true,
  "item": {
    "firstname": "goldshard",
    "lastname": "goldshard",
    "email": "goldshard.goldshard@gmail.com",
  }
}
```
> Replace `JWT-TOKEN` with the actual token generated in Signup route
