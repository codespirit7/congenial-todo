## A Todo app for your daily todo's

# Setting up on localhost
  1. Client (react.js) setup
     ``` cd client ```
     ``` docker build -t todo-client . ```
     ``` docker run -it -p 3000: 3000 todo-client ```

  2. Server (node.js) setup
     ``` cd server ```
     ``` docker build -t todo-server ```
     ``` docker run -it -e MONGO_URL=<YOUR CLOUD MONGO URL> -e JWT_SECRET = <YOUR JWT SECRET KEY> -p 5000:5000 todo-server ```


  3. Access the web application in your browser.
     ```URL : http://localhost:3000 ```
