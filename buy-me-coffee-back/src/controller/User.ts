import { client } from "../utils/connection"

export const createUser =  async(_req,res) => {
    try {
        const result = await client.query('INSERT INTO users (userName,email,password) VALUES ("test", "test@example.com", "test123*")')
    } catch (error) {
        res.status(400).json({success:false})
    }
}