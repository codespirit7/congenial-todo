## A Todo app for your daily todo's

# Demo - https://www.loom.com/share/6bf0d847fc214e548d525cbc1b4659c1?sid=1aaf6aa2-3a2b-4808-94c6-f1cf174b4e91

# Setting up on localhost


  1. Client (react.js) setup


     ``` cd client ```

     ``` docker build -t todo-client . ```


     ``` docker run -it -p 3000: 3000 todo-client ```

     

  3. Server (node.js) setup


     ``` cd server ```

     
     ``` docker build -t todo-server . ```

     
     ``` docker run -it -e MONGO_URL=<YOUR CLOUD MONGO URL> -e JWT_SECRET = <YOUR JWT SECRET KEY> -p 5000:5000 todo-server ```



  5. Access the web application in your browser.
     ```URL : http://localhost:3000 ```
