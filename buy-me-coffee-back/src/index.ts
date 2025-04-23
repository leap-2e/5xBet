import express from 'express';
import { client, connectDB } from './utils/connection';

const app = express();
const port = 8000;

app.use(express.json());

async function main() {
    await connectDB();

    app.get('/', async (req, res) => {
        try {
            const result = await client.query('SELECT NOW()');
            res.json({ message: 'Holbogdloo' });
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