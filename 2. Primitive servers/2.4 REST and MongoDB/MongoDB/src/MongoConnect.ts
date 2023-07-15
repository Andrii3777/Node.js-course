import { MongoClient } from "mongodb";
const url = "mongodb+srv://Andrii:iVezwyYYstW4nvC6@mongodbtodo.7qea02l.mongodb.net/?retryWrites=true&w=majority";
export const client = new MongoClient(url);

(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error('Failed connection to MongoDB:', err);
    }
})();