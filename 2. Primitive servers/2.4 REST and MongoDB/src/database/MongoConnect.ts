import { MongoClient } from "mongodb";
const uri = "mongodb+srv://Andrii:iVezwyYYstW4nvC6@mongodbtodo.7qea02l.mongodb.net/?retryWrites=true&w=majority";
export const client = new MongoClient(uri);

(async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');
    } catch (err) {
        console.error('Failed connection to MongoDB:', err);
    }
})();