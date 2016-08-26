# API routes

## Summary

* Users
* Tasks
* Admin
* Authentication

## Users

### /POST users/new

**type**: application/json

* **email**:string (required)
* **password**:string (required)
* **username**:string

### /GET users/

## Tasks

### /POST tasks/new

**type**: application/json

1. **userId**:string (required)
2. **boardId**:integer (required)
3. **title**:string (required)
4. **progress**:string (default: 0)
5. **priority**:string (default: 0)
6. **include**:array (default: [])
7. **notes**:array

### /GET tasks

### /PATCH tasks/:id

1. **userId**:integer (required)
2. **boardId**:integer (required)
3. **title**:string (required)
4. **progress**:integer (default: 0)
5. **priority**:integer (default: 0)
6. **include**:array
7. **notes**:array

### Admin

Requires token either in

1. body with token property
2. url param
3. x-access-token header

### Authenticate

1. **email**:string (required)
2. **token**:string (required)
