const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoDBConnection = require("./lib/connectionDB");


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors(
    {
        origin: [process.env.CLIENT_URI],
        methods: ["POST", "GET"],
        credentials: true
    }
));


const collectionName = process.env.COLLECTION_NAME;

app.post('/api/user/push', async (req, res) => {
  let client;

  try {
    await mongoDBConnection.connectToDatabase();

    const database = mongoDBConnection.getDatabase();
    const collection = await database.collection(collectionName);

    const documentToInsert = req.body;

    const result = await collection.insertOne(documentToInsert);

    res.status(200).json({ message: 'Data successfully inserted'});
  } catch (error) {
    console.error('Error during data insertion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
});


app.get("/", (req, res) => {
    res.json("Hello World");
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
