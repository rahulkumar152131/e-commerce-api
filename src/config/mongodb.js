import { MongoClient } from "mongodb";



let client;
export const connectToMongoDB = () => {
    MongoClient.connect(process.env.DB_URL)
        .then((clientInstance) => {
            client = clientInstance;
            console.log("Mongodb is connected");
        })
        .catch((err) => {
            console.log("Error connecting to mongoDB : ", err);
        })
}

export const getClient = () => {
    return client;
}
export const getDB = () => {
    return client.db();
}

