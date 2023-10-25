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
            const data = await client.db("nesidb").collection(collection).find(filterObj).toArray();
            return data;
        } catch(err) {
            console.log("err in MDB get:", err);
        } finally {
            await client.close()
        }
    }
}