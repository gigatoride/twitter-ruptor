const dbURL = process.env.MONGODB_URL, // MongoDB Connection URL
    dbName = process.env.DATABASE_NAME; // MongoDB Database Name
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); // Assert module comes bundled with Node.js.
const addNumber = (number) => {
    // Save the result in Mongo Database
    MongoClient.connect(dbURL, {
        useNewUrlParser: true
    }, function (err, client) {
        assert.equal(null, err); //throw an exception if the parameter err is not null
        if (err) throw err;
        const db = client.db(dbName);
        // Inesrt phone number in the database as an object.
        db.collection("accounts").insertOne({
            username: number,
            password: number
        }, function(err, result) {
            assert.equal(null, err); //throw an exception if the parameter err is not null
            console.log('Account inserted');
            db.close(); // Close connection
      });
    });
}
// Export all methods
module.exports = addNumber;