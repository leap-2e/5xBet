import express from "express";
import { client } from './utils/connection';
import { authRouter } from "./routes/User";
// import { client, connectDB } from './utils/connection';

const app = express();
const port = 8000;

app.use(express.json());

async function main() {
    app.use("/user", authRouter)
    app.get('/', async (req, res) => {
        try {
            const result = await client.query("INSERT INTO users (userName,email,password) VALUES ('test1', 'test1@example.com', 'test123')");
            res.json({ message: 'Holbogdloo' });
            console.log(await result)
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Failed to execute query' });
        }
    });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();