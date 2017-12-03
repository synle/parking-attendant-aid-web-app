# Parking Attendant iOS App
This is an iOS app that allows parking attendant to take notes and give citation.

## Information
- Student: Sy Le (https://www.linkedin.com/in/syle1021/)
- University Name: San Jose State University (http://www.sjsu.edu/)
- Course: CMPE 297 - Special Topics in Computer/Software Engineering (http://info.sjsu.edu/web-dbgen/catalog/courses/CMPE297.html)


## Repos and Components
There are 2 repos for this project. One of them is the iOS Client to interact with the web app, and the other one is the node js webapp that serves the back end...
- iOS Client (https://github.com/synle/parking-attendant-aid-ios-client)
- Node JS Web App (https://github.com/synle/parking-attendant-aid-web-app)


## Stacks
### Front End (iOS)
- iOS 11
- AlomoFire (Network Requests)


### Web Server
- Node JS
- Express
- Sequelize
- Passport (for authentication)


## Screenshots
### Dashboard for agency to look into insights
![alt text](./screenshot/1.png "1")

### Previously Recorded Violations and Notes
![alt text](./screenshot/2.png "2")
![alt text](./screenshot/3.png "3")

### Self-served citation payment chatbot
![alt text](./screenshot/4.png "4")
![alt text](./screenshot/5.png "5")


## How to
### Environment Vars required for the web app...
```
export MAIN_DB_HOST='YOUR_MAIN_DB_HOST'
export MAIN_DB_NAME='YOUR_MAIN_DB_NAME'
export MAIN_DB_USER='YOUR_MAIN_DB_USER'
export MAIN_DB_PASSWORD='YOUR_MAIN_DB_PASSWORD'
```


### Start the web app
```
git clone https://github.com/synle/parking-attendant-aid-web-app.git
npm install
npm start
```
