# mongo-grisot

GRP 6 :
Lisa DUTERTE
Vincent DELY
Maxime PERONA
Joseph CASCIO ( remote during the session )

# 1/ Cluster Mongo deployed on AWS Cloud on 3 AZ
<img width="1101" alt="image" src="https://user-images.githubusercontent.com/82362374/207592863-340c0877-d941-48b1-8f94-8b8c71f28728.png">

The terraform file deploy automaticaly the mongo cluster on the aws Cloud. However during the presentation by lack of time we used a local Mongo cluster

# 2/ Generate fake pictures meta-data about planes to test the api and database storage
The generate_metadata.py script generate and post every 0.4 seconds meta-data (timestamp and position) about 2 planes, moving randomly around previous position in a range of 4.

# 3/ Local Mongo cluster
In the docker-compose file you can find the file and the differents config used to set up the cluser of mongo with 1 primary and 2 replica but we encoured a last minute issue during the presentaion and used a single docker image

# 4/ The API To manage the database

In ./src/models you have the schema of our metadata model
In ./src/routes you have our different API path to get all data or get data on a specific timestamp and also the route used to create the fake pictures meta-data by the our script


