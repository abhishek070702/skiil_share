# skiil_share
PAF Project 01


🔐 Auth

    Register:
    POST /auth/register
    Body:

{
  "username": "yourUsername",
  "password": "yourPassword"
}

Login:
POST /auth/login
Body:

    {
      "username": "yourUsername",
      "password": "yourPassword"
    }

👤 Users

    Create User:
    POST /users/create

    Get All Users:
    GET /users

    Get User by ID:
    GET /users/{id}

    Delete User:
    DELETE /users/{id}

    Check Username Exists:
    GET /users/exists/{username}

Body for Create User:

{
  "username": "yourUsername",
  "password": "yourPassword"
}

🧑‍💼 User Profiles

    Create Profile:
    POST /userProfiles

    Get All Profiles:
    GET /userProfiles

    Get Profile by ID:
    GET /userProfiles/{id}

    Get Profile by UserId:
    GET /userProfiles/user/{userId}

Body:

{
  "userId": "userId",
  "bio": "Your bio"
}

🤝 User Connections

    Get Connections by UserId:
    GET /userConnections/{userId}

    Create Connection:
    POST /userConnections

    Delete Friend Connection:
    DELETE /userConnections/{userId}/friends/{friendId}

Body:

{
  "userId": "userId",
  "friendId": "friendId"
}

🛠️ Skill Plans

    Get Plans by UserId:
    GET /skillPlans/user/{userId}

    Create Skill Plan:
    POST /skillPlans

    Delete Skill Plan:
    DELETE /skillPlans/{skillPlanId}/{userId}

Body:

{
  "userId": "userId",
  "title": "Skill Plan Title"
}

📝 Posts

    Get All Posts:
    GET /posts

    Get Posts by UserId:
    GET /posts/{userId}

    Create Post:
    POST /posts

    Delete Post:
    DELETE /posts/{postId}

Body:

{
  "userId": "userId",
  "content": "Post content"
}

💬 Comments

    Create Comment:
    POST /comments

    Get All Comments:
    GET /comments

    Get Comment by ID:
    GET /comments/{id}

    Update Comment:
    PUT /comments/{id}

    Delete Comment:
    DELETE /comments/{id}

    Get Comments by PostId:
    GET /comments/post/{postId}

Body for Create:

{
  "postId": "postId",
  "userId": "userId",
  "commentText": "Your comment"
}

Body for Update:

{
  "commentText": "Updated comment"
}

👍 Likes

    Get Likes by PostId:
    GET /likes/{postId}

    Like a Post:
    POST /likes

    Remove Like:
    DELETE /likes/{likeId}

Body:

{
  "postId": "postId",
  "userId": "userId"
}

🎞️ Media

    Get Media by PostId:
    GET /media/{postId}

    Upload Media:
    POST /media

    Delete Media:
    DELETE /media/{mediaId}

Body:

{
  "postId": "postId",
  "url": "mediaUrl"
}

🔔 Notifications

    Get All Notifications:
    GET /notifications

    Create Notification:
    POST /notifications

Body:

{
  "userId": "userId",
  "message": "Notification message"
}

🏋️ Workout Status Updates

    Get All Updates:
    GET /workoutStatusUpdates

    Get Updates by UserId:
    GET /workoutStatusUpdates/{userId}

    Create Update:
    POST /workoutStatusUpdates

    Delete Update:
    DELETE /workoutStatusUpdates/{updateId}

Body:

{
  "userId": "userId",
  "status": "Workout status"
}
