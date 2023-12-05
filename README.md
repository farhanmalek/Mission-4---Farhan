# Project Details - Brief
Turners Car AI car detection system 
The digital team at Turners would like to prototype a solution that allows a user to upload the picture of a car, and then find a similar car in their stock to recommend to customer. Build an application (either runs on your laptop or on the cloud) that can recognise motor vehicles (even better if it recognises certain types of vehicles, e.g. sedan vs hatchback) using a cloud-based AI service on Microsoft Azure.

## Technologies used
- TypeScript
- Tailwind CSS
- Postman
- React
- MongoDB
- Microsoft Azure ComputerVision REST API
- Node JS
- Express JS

### To Run
- Fork the repo and clone to your code editor
- npm i both the front and backend to install all relevant packages


- Create a `.env` file in the `backend` folder and set the following environment variables:

   ```env

   MONGO_KEY=your_mongodb_uri
   ```

- - Create a `.env` file in the `frontend` folder and set the following environment variables:

   ```env

   VITE_API_KEY=your_azure_computer_vision_key
   VITE_API_ENDPOINT=your_azure_computer_vision_endpoint
   ```
- npm run dev on both the front and backend directorys.
- To test, upload a JPG or PNG file to the drop zone area and relevant cars detected by AI API will be returned from the DB.
- Note: Microsofts API is not entirely accurate so there may be some discrepancies.

Created by Farhan Malek as part of the Mission Ready L5 Course - Mission 4.
Hosted Version of the project can be found here :
(https://mission-2-farhan-frontend.vercel.app/)

#### CLI Usage
- To use the CLI tools and work with the dummy data provided. Follow the steps outlined below.
- Navigate to the backend directory, two files can be found; The JSON file containing the data a user can seed and modify and the CLI commands.
- To begin, ensure your local mongodb compass is setup, and input your own env variables in a .env file. Ensure your mongo server runs on either `localhost: 27017` or `mongodb://127.0.0.1:27017`.
- To seed the provided dummy data into your mongodb database:
  ```bash
  npm run seed
  ```
  - The user should be shown a success message implying the data has been imported.

Functionality:
With the use of the CLI tools we can do the following:
1. Seed data into DB (NOTE: all previous entries into the db will be cleared, if reseeded)
2. Find data from the DB by name or colour
3. Retrieve a list of all items in the database
4. Add an item to the database
5. Delete an item to the database

To view all commands and information on each:
  ```bash
  node cli/seed.js
  ```

