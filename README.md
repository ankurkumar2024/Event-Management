# Airtribe Event Management

This repository consists of an API for a typical virtual event management. It's part of my Airtribe Backend Engineering Launchpad Assignment.

### Prerequistes:

- NodeJS (v18 or newer)

### Installation:

- `npm install` - This will install all the dependencies of the application.
- `npm start` - This will start the application on port 3000.

### Running Tests:

- `npm run test`

### Adding environment variables

Copy the content of the env-example and make a separate file known as .env and add the respective values of the env variables.

- BCRYPT_SALT - generate a salt of bcrypt and use it in the .env file
- MONGODB_URI - this is the uri which you need to mention if you are using mongodb. Visit https://rb.gy/tv589x for more info.
- Generate your private key for token generation and paste it in the file private-key.pem which is present in project root directory.

### Routes:

- POST /users/register: Register a new user.
- POST /users/login: Log in a user.
- POST /events: Create the event. Only organizer can create a new event.
- PUT /events/:id: Update the content of existing event.
- GET /news: Fetch news articles based on the logged-in user's preferences.

### Postman Collection

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/32783578-d92943cf-7f72-4005-b0d9-b77a3f0fca17?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D32783578-d92943cf-7f72-4005-b0d9-b77a3f0fca17%26entityType%3Dcollection%26workspaceId%3D24caa9ff-36b0-4682-9650-f7ff054d3f42)
