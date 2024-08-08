
Created a basic version of Paytm Which includes both Frontend and Backend Using MERN stack

-How it Looks

![Screenshot (24)](https://github.com/user-attachments/assets/81043924-9968-410a-95ef-9e298e27a751)
![Screenshot (25)](https://github.com/user-attachments/assets/5e7379b4-2573-4171-8883-9f96ea8ab3bf)

Setup the Project Locally :

Clone the repository

Go to the project folder using an IDE of your preference

In the backend folder,go to db folder and add your MongoDb URL/Connection string
Open the terminal and run following commands :

cd backend

npm install

nodemon index.js

#OR

cd backend

npm installl

node index.js

\*NOTE - There is an expiry time set to jwt token…If you see error(error while verifying/token got expired) make sure to sign in again..

Open another terminal and run :

cd frontend

Now Run:

npm install

npm run dev

#OR

yarn install / npm install

yarn dev

Click on Link and on SignUp Page Create Some accounts to See Users on the Dashboard Whom you can Send Money

\*NOTE - There is an Expiry limit set to Token that you get from server…if the token Expires you will get directed to Signin,In that case Signin using your UserName and Password

\*NOTE - If your backend crashes(i.e you not getting response or headers being already sent ) just go to terminalin which you have your backend running and run node index.js

Technologies Used - 

HTML

Javascript

Nodejs

Express

React

MongoDb

Tailwind CSS

JWT
