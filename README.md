How to Setup and Run the Project:
To run the project locally, make sure to open two different terminals. One will localhost your frontend while the other will localhost your backend.
For the frontend portion, cd to /sweng861/login/client and run npm start. If you don't have npm installed, run npm install to get the proper libraries.
For the back end portion, cd to /sweng861/login/ and run node server.js. This will activate your backend.
When the frontend is deployed locally, it will automatically open browser with http://localhost:3000. Backend is using http://localhost:5000.

How to Configure Social Media Login Integration:
First, in the index.html, include the g_id_onload div tag, which initializes the Google login button using the Google Identity Services (GIS) library. This configuration uses a client ID to connect the application to your organization’s project on Google Cloud. When the user clicks the button, they are redirected to Google, where they enter their credentials (e.g., email and password). Google verifies the credentials and, upon successful authentication, generates a JSON Web Token (JWT) containing the user's information. This token is then passed to the frontend in App.js via a callback function.
In App.js, the token is captured and sent to the backend (server.js) via an API request. The backend decodes and verifies the token using Google’s OAuth library to extract the user’s details, such as their Google ID, name, and email. Once the user is authenticated, their information is saved to a MongoDB database for future reference. After this, the backend sends a success response back to the frontend. Based on this response, App.js renders the Welcome page to indicate that the user has successfully logged in.

Troubleshooting Guides:
If you are running into issues when deploying, most of the time it is the missing library. Even after installing there were times where the library still didn't work. Make sure all the library dependecies are listed under package.json file.
