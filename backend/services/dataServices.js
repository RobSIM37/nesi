const { MongoClient } = require("mongodb");

const newConnection = () => {
    const uri = process.env.MDB_CONNECTION;
    return new MongoClient(uri);
}

module.exports = {
    get: async (collection, filterObj) => {
        const client = newConnection();
        try {
            await client.connect();
            return await client.db("nesiDB").collection(collection).find(filterObj).toArray();
        } catch(err) {
            console.log("err in MDB get:", err);
        } finally {
            await client.close()
        }
    },
    insert: async (collection, obj) => {
        const client = newConnection();
        try {
            await client.connect();
            const insertResult = await client.db("nesiDB").collection(collection).insertOne(obj);
            return insertResult;
        } catch(err) {
            console.log("err in MDB insert:", err);
        } finally {
            await client.close()
        }
    }
}