# Uberizing Gym

## Technologies Used
* Docker
* NodeJs
* MySQL
* React
* Redux
* Typescript
* Bootstrap

## Local Development Environment Setup
First step is to install [Docker Desktop](https://hub.docker.com/?overlay=onboarding) on your local computer.

### Build docker image and launch containers
From terminal go the root directory of project and execute below command.
```
docker-compose build
```

Launcing docker containers
```
docker-compose up
```
Note: For running container in deteched mode add this flag **-d** at the end of **docker-compose up** like **docker-compose up -d**.

### Launch eGym portal in browser
After spinning the containers use this url [http://localhost:3000/](http://localhost:3000/) to access UI dashboard in browser.

### Stop docker container
In order to stop docker container use below command.
```
docker-compose down
```
