1. Generate package.json
    npm init -y
2. Create server.js
 
3. Install , import 'express' and create HTTP server.Assign port


### connect MongoDB database
        REST API  --------->mongodb native driver------>  MongoDB server
        REST ApI ---------->mongodb ODM tool (mongoose)-------> MongoDB server


    a. Install mongoose and connect to mongodb server
    b.Create  Schema of Resource
    c. Create Model of teh Schema
    d.Perform DB operations on that Model


### Error handing



### Running validators during update


.gitignore




---> validator are invoked when save (or) insert many automatically
----> validators will run automatically when we add true.
----->default error handler is used in  express.








//2 Feb 2026
projections --->used to insert specific ones
Unique property ----> used for identification 
Saving password----> saving password using encryption (or) tool: bcrypt-generator
Authentication---->
Public & Protected routes

JWT ---> json web token  confirms once the userCredintials are verified the login route creates a JWT token 



-------------------------------------------------
Making Authenticated requested
1.When client application makes request after successful login, the http only cookie will be attached to every request automatically.
2.The middleware in express can extract cookie from express using cookie-parser module
