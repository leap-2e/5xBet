import express from 'express';
import { client } from './utils/connection';
// import { client, connectDB } from './utils/connection';

const app = express();
const port = 8000;

app.use(express.json());

async function main() {

    app.get('/', async (req, res) => {
        try {
            const result = await client.query('CREATE TABLE IF NOT EXISTS aaaaaa (id SERIAL PRIMARY KEY, name VARCHAR(100))');
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