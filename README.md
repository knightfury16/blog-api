## Blog API Reference

<!-- api-start -->
### **Register user**
Register new user

| Parameter | Type| Description|
|----|----|----|
| `name` | `string` |**Required** User name| 
| `email` | `string` |**Required** User Email| 
| `password` | `string` |**Required** User password| 
| `age` | `string` | User age| 

```http
POST /users
```


- Response

```json
{
  "code": 201,
  "user": [
    {
      "id": 1,
      "name": "Suhaib",
      "email": "hello4gmail@gmail.com",
      "age": 22,
      "createdAt": "2022-06-11T17:43:05.503Z",
      "updatedAt": "2022-06-11T17:43:05.503Z"
    },
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }
  ]
}
```
---
### **Login User**
Login registered user

| Parameter | Type| Description|
|----|----|----|
| `email` | `string` |**Required** User Email| 
| `password` | `string` |**Required** User password| 

```http
POST /users/login
```


- Response

```json
{
  "code": 200,
  "user": [
    {
      "id": 1,
      "name": "Suhaib",
      "email": "hello4gmail@gmail.com",
      "age": 22,
      "createdAt": "2022-06-11T17:43:05.503Z",
      "updatedAt": "2022-06-11T17:43:05.503Z"
    },
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }
  ]
}
```
---
### **Logout current session**
Logout user from the current device

| Parameter | Type| Description|
|----|----|----|
| `email` | `string` |**Required** User Email| 
| `password` | `string` |**Required** User password| 

```http
POST /users/logout
```

```http
Authenticated
```

- Response

```json
{
  "code": 200,
  "msg": "Logged out"
}
```
---
### **Logout all session**
Logout user from all the device

| Parameter | Type| Description|
|----|----|----|
| `email` | `string` |**Required** User Email| 
| `password` | `string` |**Required** User password| 

```http
POST /users/logoutAll
```

```http
Authenticated
```

- Response

```json
{
  "code": 200,
  "msg": "Logged out from all the device"
}
```
---
### **Get user profile**
Get profile of the current user


```http
GET /users/me
```

```http
Authenticated
```

- Response

```json
{
  "code": 200,
  "user": {
    "id": 1,
    "name": "Suhaib",
    "email": "hello3gmail@gmail.com",
    "age": 22,
    "createdAt": "2022-06-11T17:43:03.023Z",
    "updatedAt": "2022-06-11T17:43:03.023Z"
  }
}
```
---
### **Edit user profile**
Edit current user profile

| Parameter | Type| Description|
|----|----|----|
| `name` | `string` | User name| 
| `password` | `string` | User password| 
| `email` | `string` | User email| 
| `age` | `string` | User age| 

```http
PATCH /users/me
```

```http
Authenticated
```

- Response

```json
{
  "code": 200,
  "user": {
    "id": 1,
    "name": "Rafi",
    "email": "hello3gmail@gmail.com",
    "age": 21,
    "createdAt": "2022-06-11T17:43:03.023Z",
    "updatedAt": "2022-06-11T17:43:03.023Z"
  }
}
```
---
### **Create blog**
Create new blog for login user

| Parameter | Type| Description|
|----|----|----|
| `title` | `string` |**Required** Blog title| 
| `description` | `string` |**Required** Blog description| 

```http
POST /blogs/create
```

```http
Authenticated
```

- Response

```json
{
  "code": 201,
  "blog": {
    "id": 5,
    "ownerId": 3,
    "title": "My first blog",
    "description": "description of my first blog",
    "createdAt": "2022-06-11T17:46:41.866Z",
    "updatedAt": "2022-06-11T17:46:41.866Z"
  }
}
```
---
### **Get blogs**
Get most recent blogs (10 by default)

| Parameter | Type| Description|
|----|----|----|
| `?limit` | `string` | Limit the number of blogs fetched from database.(10 default)| 
| `?skip` | `string` | Skip the number of blogs fetched from the database.| 

```http
GET /blogs
```

- Request

```json
"localhost/blogs?limit=2&skip=2"
```
- Response

```json
{
  "code": 200,
  "blogs": [
    {
      "id": 2,
      "title": "My second blog",
      "description": "description of my second blog",
      "createdAt": "2022-06-11T17:45:23.882Z",
      "updatedAt": "2022-06-11T17:45:23.882Z",
      "ownerId": 4
    },
    {
      "id": 1,
      "title": "My first blog",
      "description": "description of my first blog",
      "createdAt": "2022-06-11T17:45:12.916Z",
      "updatedAt": "2022-06-11T17:45:12.916Z",
      "ownerId": 4
    }
  ]
}
```
---
### **Get blog by id**
Get a specific blog by id


```http
GET /blogs/:id
```

- Request

```json
"localhost/blogs/2"
```
- Response

```json
{
  "code": 200,
  "blog": [
    {
      "id": 2,
      "title": "My second blog",
      "description": "description of my second blog",
      "createdAt": "2022-06-11T17:45:23.882Z",
      "updatedAt": "2022-06-11T17:45:23.882Z",
      "ownerId": 4
    }
  ]
}
```
---
### **Delete blog**
Delete a blog by id


```http
DELETE /blogs/:id
```

```http
Authenticated
```
- Request

```json
"localhost/blogs/2"
```
- Response

```json
{
  "code": 200
}
```
<!-- api-end -->
