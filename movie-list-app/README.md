# movie-list-app

## What is the use of this Repo

This Project is a Simple ReactJS Project which demonstrates the following
1. Creating a Component in React
2. Communicating between parent and child component
3. Using material UI along with React

## requirements covered

### Layout and UI
1. Created custom UI Components for the app, using React.
2. Displayed a list of movies sorted in descending order of popularity.
3. Shown the movie title, image, genre and a short description related to the movie in each information card.
### Default page load state
1. It Loads a total of only 20 movies for each year.
2. By default, when a user lands on the page, display a list of movies of the year 2012.
3. Implemented smooth scrolling behavior to load more movies as the user scrolls in
any direction i.e load movies of previous year when user scrolls up and load movies of next year when user scrolls down until the current year.
4. As and when the user scrolls and movies are added to the list and this interaction is smooth and doesn’t cause any jitters.

### API
1. Used the following URL to query a list of movie
https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100

2. It starts from 2012, and fetch the previous or next year with respect to the direction in which the user scrolls the list.

### Genre Filter
1. Provided a filter UI that allows users to filter movies by genre.
2. When a user selects one or more genres, the list only display movies of the selected genres.

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

To check node is installed or not use command
```bash
node --version
```
use node version v16.18.0 or above
## Cloning and Running the Application in local

Clone the project into local
1. open command prompt or terminal
2. go to the folder or directory where you want to clone this repository
3. write command  git clone repository url
```bash
git clone 
```
4. type code . to open project folder in vs code
```bash
code .
```
5. open terminal in vs code
6.  Go into the project folder movie-list-app
```bash
cd movie-list-app
```
7. Install all the npm packages. Type the following command to install all npm packages

```bash
npm install
```

8. In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## production build of your app

After completing the below steps if you are on same network you can use this application in your mobile as well.
1. Type npm run build to production build of your app 
```bash
npm run build
```
2. Static Server
```bash
npm install -g serve
serve -s build
```
3.In order to run the application Type the following command

```bash
npm start
```
The Application Runs on
  Local:            http://localhost:3000        
  On Your Network:  http://192.168.142.90:3000 
