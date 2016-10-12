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
The UI will load at localhost:8080  

The UI displays the black command entry box and the once initialised with a command e.g. `10 10` the red mars grid will display below.

#### Usage:

- Enter commands in the black command box followed by pressing enter. (pls see caveats below)
- Entering `10 10` (or other integers) and pressing enter will generate a grid.
- Then entering `1 1 N` will creat a new robot at that location.
- Then entering the movement commands e.g. `FFFRFLFF` will move the robot and it will then output its location to the command box.
- you can have multiple robots but you can only move the last one added.
- you can move a robot multiple times.

#### Caveats

Most of the functionality was built but with a few caveats: 
  - You can only enter one command at a time into the command box. Sorry, copy and paste fail.
  - If a command has a trailing space it won't register.
  - New robots don't check for where lost robots fell off the world, so new robots can still get lost at the same place 
  ( I guess they're off to find their friends ;) )