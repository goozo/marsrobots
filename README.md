#### Install 
```
npm install
```

#### Run tests:
```
npm run test
```
Written with a test first approach (TDD)

#### Start:
```
npm start
```
The UI will load at localhost:8080/webpack-dev-server/  

The UI displays the black command entry box and the once initialised the red mars grid will display below.

#### Usage:

entering `10 10` and pressing enter will generate a grid
then entering `1 1 N` will creat a new robot at that location
then entering the movement commands `FFFRFLFF` will then move the robot and it will then output it's location to the command box.

Most of the functionality was built but with a few caveats: 
  - You can only enter one command at a time into the command box. Sorry, copy and paste fail.
  - If a command has a trailing space it won't register.
  - new robots don't check for where lost robots fell off the world, so new robots can still get lost at the same place (I guess they want to join their friends ;)