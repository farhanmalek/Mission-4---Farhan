const { MongoClient, ObjectId } = require("mongodb");
const program = require("commander");
require("dotenv").config();
const data = require("./carsSeed.json");
const readLine = require("readline-sync");

const uri = process.env.MONGO_KEY;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

async function seedData(data) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Drop existing data before seeding
    await collection.deleteMany({});

    // Insert new data
    await collection.insertMany(data);

    console.log("Data seeded successfully!");
  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Find Data
async function findData(detail) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const search = new RegExp(detail, "i");
    const data = await collection
      .find({ $or: [{ brand: search }, { color: search }] })
      .toArray();

    if (data.length === 0) {
      console.log("No data found!");
      return;
    }
    console.log(data);
  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

//Add a car
async function addData(image, brand, color, price, bodyTypesArray) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.insertOne({
      image: image,
      brand: brand,
      color: color,
      price: price,
      bodyType: bodyTypesArray,
    });
    console.log(data);
    if (data.acknowledged === true) {
      console.log("Data added successfully!");
    } else {
      console.log("Failed to add data!");
    }
  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}


//List all cars
async function listData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find({}).toArray();

    if (data.length === 0) {
      console.log("No data found!");
      return;
    }
    console.log(data);
  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

//Find a car by its ID
async function idData(id) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const searchId = new ObjectId(id);

    const data = await collection.findOne({_id: searchId});
    if (data) {
      console.log(data);
    } else {
      console.log("No data found!");
    }
  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

//Function that will delete an item from the database
async function deleteData(id) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const searchId = new ObjectId(id);

    const data = await collection.deleteOne({_id: searchId});
    if (data) {
      console.log("Data deleted successfully!");
    } else {
      console.log("No data found!");
    }
  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Create Seed CLI command
program
  .command("seed")
  .description("Seed data into the MongoDB database")
  .action(() => {
    seedData(data);
  });

// Create Find CLI command, to find by a colour or a brand
program
  .command("find <detail>")
  .description("Find data in the MongoDB database")
  .action((detail) => {
    findData(detail);
  });

// Create Add CLI command
program
  .command("add")
  .description("Add data to the MongoDB database")
  .action(() => {
    const url = readLine.question("Image URL: ");
    const brand = readLine.question("Brand: ");
    const color = readLine.question("Color: ");
    const price = readLine.question("Price: ");

    const bodyTypeOptions = ["sedan", "hatchback", "suv", "pickup", "coupe"];
    index = readLine.keyInSelect(bodyTypeOptions, "Body Type: ");

    if (index === 0) {
      bodyTypesArray = ["sedan", "mid-size car"];
    } else if (index === 1) {
      bodyTypesArray = [
        "hatchback",
        "subcompact car",
        "hot hatch",
        "subcompact car",
        "compact mpv",
      ];
    } else if (index === 2) {
      bodyTypesArray = [
        "suv",
        "minivan",
        "jeep",
        "van",
        "family car",
        "full-size",
        "sport utility vehicle",
      ];
    } else if (index === 3) {
      bodyTypesArray = ["truck", "pickup truck", "pickup", "off road"];
    } else if (index === 4) {
      bodyTypesArray = [
        "sports car",
        "coupe",
        "compact",
        "roadster",
        "sport compact",
        "supermini",
      ];
    }

    addData(url, brand, color, price, bodyTypesArray);
  });


//CLI command to list all cars
program
  .command("list")
  .description("List all data in the MongoDB database")
  .action(() => {
    listData();
  });

//CLI command to list a car by its ID
program
  .command("id")
  .description("List a car by its ID in the MongoDB database")
  .action(() => {
    const inputId = readLine.question("ID: ");
    idData(inputId);
  });

//CLI command to delete a car by its ID
program
  .command("delete")
  .description("Delete a car by its ID in the MongoDB database")
  .action(() => {
    const inputId = readLine.question("ID: ");
    deleteData(inputId);
  });

program.parse(process.argv);
