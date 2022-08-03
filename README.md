# ISYE 524 Project
There are currently sixty-one national parks in the continental United States and many people from around the world dedicate a significant amount of their time to visit only a handful of them.

## Model Description
Our model will attempt to create a road trip route that visits the most national parks, while also either keeping costs to a minimum and / or traveling within a declared timeframe. 

We will use real data gathered from multiple internet sources, such as the national parks service site and google maps, to achieve this. Our most important data will come from google maps and will consist of the routes connecting every park. Although this can be a daunting amount of data, we plan to use the Google Maps API that will allow us to retrieve this information efficiently.

## Using this Repo
The two files `index.js` and `startingDistances.js` describe the arc distance (from one park to another), and the distance from the origin to each park

### Arc Distances
The [index.js](./index.js) file contains code that does the following
1. Defines all parks in use (as in the `datasheet` file on the shared drive). Google Maps can automatically fill in details of the city, state, etc. as each park has a unique name
2. Iterate through the parks, defining `(i, j)` combinations that will yield distance and time values from the Google Maps' [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/). Note that distances and times for any `(i, j)` and `(j, i)` combination may be different as the optimal routes for each (as determined by Google) will be different. Thus, we're repeating these requests rather than using the same `(i, j)` values for the `(j, i)` pair.
3. The distance (miles) and time (seconds) values are stored in the same array, but for convenience, populate two different csv files with headers included. These are stored locally as `distanceResults.csv` and `timeResults.csv` when run on your device.

### Starting Distances
The [startingDistances.js](./startingDistances.js) file contains code that does the following
1. Defines all parks in use (same as above)
2. Set origin as UW-Madison (or any other starting point)
3. Iterate through parks and find distance and time from `origin` to `dest` (park)
4. Follow the same procedure above to store csv files of the results (stored as `distOriginToPark.csv` and `timeOriginToPark.csv`)

## How to Run this Locally
- Install [NodeJS version 16.16.0](https://nodejs.org/en/)
- Clone this repository (or download it) by running `git clone https://github.com/nandanv2702/isye-524-project.git` on your local machine
- Run `npm i` to install all relevant packages
- Create a Google API Key with reference to [this documentation](https://developers.google.com/maps/documentation/distance-matrix/cloud-setup)
- Create a `.env` file by running `touch .env` on your terminal
- Create a variable called `GOOGLE_API_KEY=YOUR_API_KEY`, and replace `YOUR_API_KEY` with the API Key shown on your Google Console
- Run `node index.js` and it should create two csv files, as mentioned above