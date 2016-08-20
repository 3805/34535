var response = {
  "message": "Task validation failed",
  "name": "ValidationError",
  "errors": {
    "board_id": {
      "message": "Path `board_id` is required.",
      "name": "ValidatorError",
      "properties": {
        "type": "required",
        "message": "Path `{PATH}` is required.",
        "path": "board_id"
      },
      "kind": "required",
      "path": "board_id"
    },
    "userId": {
      "message": "Path `userId` is required.",
      "name": "ValidatorError",
      "properties": {
        "type": "required",
        "message": "Path `{PATH}` is required.",
        "path": "userId"
      },
      "kind": "required",
      "path": "userId"
    }
  }
}

var msg = Object.keys(response.errors)

msg.map((name) => {
  return { message: response.errors[name].message }
})
