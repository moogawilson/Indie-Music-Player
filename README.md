# Indie Music Player Portfolio Project
_the live deployment is no longer fully functional- Read more below_
### Simple Web Based Music Player

This project was undertaken to refine my web based development/ Devop skills. The inspiration for this project was to provide unfiltered acess to the indie underworld, promoting each song equally and aiming to create a purely merit based system, contrasting the mainstream streaming platforms. Many indie songs published to streaming services receive little to no attention, and often next to no streams.  

This music player was able to scrape Indie songs as they were published, and provide a clean interface to stream them. 

![Beta Version Demo](images/example-beta.png)

### How it Works

When artists publish songs to streaming sites such as spotify, apple music and youtube, they go through an online distribution service such as CDbaby or DistroKid. RealMusic finds these published songs through the unique distributor tag, and serves them through an embedded youtube player.


### Technical Description
This project was designed  to be robust, but above all else follow industry standard best practice. Though the basic functionality of the project would be relatively simple to  achieve on it's own, much of the development time was spent trying to build the project to industry level standard. Though the project still requires much work, to a large extent this goal has been achieved. 

The project backend was hosted on AWS with serverless functions. Every hour, a task was scheduled to run which would make a call to the youtube API requesting video ID's which had been published in the last hour with a distributor tag. Smaller artists tend to favor certain online distributors such as Distrokid and CDBaby. The list of video ID's would then be stored in a custom database hosted on an EC2 instance. The database would be updated every hour with a growing list of songs. The web app- hosted on vercel- could then be accessed via a browser. This would request a list of songs from the AWS backend depending on what the user had selected (ie latest songs, random songs ect). The video ID's would then be stored in a list in the frontend, and the current song's ID fed into an embedded Youtube web player. Custom controls were made for the player, featuring a play/pause button and Skip buttons.

The second phase was to add the ability for users to log in. This was done with Google Authentication, removing the need for this project to handle sensitive information. When a user was logged in, they had the ability to like songs and keep lists of their favorite songs.

This project was undertaken using industry standard best practices. A custom CI pipeline was implemented using GitHub actions, so that when a new push was made to main branch the application would build and deploy automatically. The project also featured a development and staging environment. The staging environment allowed for new changes to be deployed on a separate environment.\
While the infrastructure for the frontend and backend remains, the project is no longer operational after removing the Database to save costs on the dormant project. The database running on the EC2 could no  longer be justified, being the largest ongoing expense of the project. With the removal of the database however, monthly operating expenses for the remaining infrastructure total $0.98 per month due to careful selection of the hosting services. Significant savings were made by choosing the serverless application model. See below for the Tech-Stack.

### Tech-Stack

#### Frontend

    Next.JS hosted on vercel

    - TypeScript
    - styled with CSS

#### Backend

    AWS serverless Lambda functions

    - TypeScript
    - Prisma
    - NextAuth

#### Song Selection Engine

The site was made with future improvements in mind. The song recommendation system (currently random) was created with Python for possible future AI integration to categorize songs.

    AWS serverless python function
    - Docker Deployment
    - SQLAlchemy

#### Data Base
    Hosted on an EC2 Instance (cheapest method I could find for hosting Postgres)
    - PostgreSQL database
