const { MongoClient, ObjectId } = require("mongodb");

const DB = "nesiDB"
const newConnection = () => {
    const uri = process.env.MDB_CONNECTION;
    return new MongoClient(uri);
}

module.exports = {
    get: async (collection, filterObj) => {
        const client = newConnection();
        try {
            await client.connect();
            return await client.db(DB).collection(collection).find(filterObj).toArray();
        } catch(err) {
            console.log("err in MDB get:", err);
            return null;
        } finally {
            await client.close()
        }
    },
    insert: async (collection, obj) => {
        const client = newConnection();
        try {
            await client.connect();
            const insertResult = await client.db(DB).collection(collection).insertOne(obj);
            return insertResult;
        } catch(err) {
            console.log("err in MDB insert:", err);
            return null;
        } finally {
            await client.close()
        }
    },
    getUserbyId: async (userId) => {
        const client = newConnection();
        try {
            await client.connect();
            const matchingUsers = await client.db(DB).collection("users")
                                                .find({"_id": new ObjectId(userId)})
                                                .toArray();
            return matchingUsers[0];
        } catch(err) {
            console.log("err in MDB get:", err);
            return null;
        } finally {
            await client.close()
        }
    },
    delete: async (collection, filterObj) => {
        const client = newConnection();
        try {
            return await client.db(DB).collection(collection).deleteOne(filterObj);
        } catch(err) {
            console.log("err in MDB get:", err);
            return null;
        } finally {
            await client.close();
        }
    },
    update: async (collection, filterObj, updateObj) => {
        const client = newConnection();
        try {
            return await client.db(DB).collection(collection).updateOne(filterObj, updateObj);
        } catch(err){
            console.log("ERR in MDB update");
            return null;
        } finally {
            await client.close();
        }
    }
}