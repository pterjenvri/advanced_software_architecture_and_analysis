## Description of the src folder

This folder contains the source code. There are 3 folders here:

- agc: This contains the source code for the AGC (Automated Guided Cart) which is written in Python
- hmi: This contains the source code for the HMI (Human Machine Interface) which is written in Typescript using the Next.JS framework
- utils: This contains SQL scripts for creating the database tables and creating the function and trigger which are used in the experiment part to calculate the elapsed time.

## How to start the project

Both AGC and HMI projects contain their own Dockerfiles. First, you need to build those Docker images, and then you can start up the whole project using the docker-compose.yml in the root folder.

#### First startup step by step

1. Go to the agc folder
1. Run ```docker build -t asaa-agc .```
1. Go to the hmi folder
1. Run ```docker build -t asaa-hmi .```
1. Go to the root directory
1. Run ```docker-compose up```

After a few seconds everything should be up and running. You can reach the systems on the following ports:

- HMI: ```localhost:3000```
- RabbitMQ Management: ```localhost:8080 Credentials: guest/guest```
- pgadmin4: ```localhost:80 Credentials: sdugroup6@sdu.dk/Admin123!```

At this point, you need to create the tables and functions on the database.

1. Go to ```localhost:80```
1. Login with the following credentials: ```Email: sdugroup6@sdu.dk Password: Admin123!```
1. Right click on Servers -> Register -> Server...
1. On the General tab fill the ```Name``` field
1. On the connection tab fill the following fields:
```
Host name/address: postgresdb
Port: 5432
Maintenance database: postgres
Username: postgres
Password: postgres
Save password?: true
```
6. Open up the dropdown on the left until you reach public under Schemas
1. Right click on ```public``` and click ```Query tool```
1. Copy the content of the ```db_tables.sql``` to the Query tool, and run it
1. Copy the content of the ```db_functions.sql``` to the Query tool, and run it

After this, everything should be set up, you can use the HMI to start production. (Changing of the product is not completly implemented.)