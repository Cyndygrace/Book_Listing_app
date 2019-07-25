first make sure u have node installed on ur computer
create a root folder on your desktop or any directory
then open on vscode
create a new folder inside ur root folder called server
cd in to the server folder
initialise npm on the terminal
npm init -y
This will generate our package.json file that will store all our dependencies we install.

next we install our express app
npm install express --save
This will automatically generate our package-lock.json and node-modules that will contain the express module.
This will also store express module as a dependency in our package.json file. 

next we create a new file called app.js in our server folder to kick-off our express appliction
here we first require express
then we invoke our express function and store in a variable called app


Next is to tell our app to listen to a specific port on our computer, also add a callback function that will tell us that our app is listening for the port 4000.
app.listen(4000, () => {console.log('now listening on port 4000...')})
So when we run the app on node, we see the callback function
node app.js

next we install nodemon to listen for realtime changes so that we do not need to re-run our express-app everytime we make new changes. 
npm install nodemon --save
This will also add nodemon as a dependency to our package,json file

we run our express app with nodemon using
npx nodemon app.js
or nodemon app.js

next is to setup our graphQl

first we install our grapgql module  and express-graphql that allows express understand/communicate with our graphql.
npm install graphql express-graphql --save
