import { client } from "../utils/connection"

export const signUp = async (req, res) => {
    const { userId, username, email } = req.body;

    try {
        const result = await client.query(
            `
        INSERT INTO users (user_id, username, email)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
            [userId, username, email]
        );

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            user: result[0],
        }
    } catch (error) {
        console.error("Signup error:", error.message);

        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const signIn = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
export const refresh = async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM users`);
        res.status(200).json({ success: true, result })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
export const getUser = async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
        res.status(200).json({ success: true, result })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const fields = [];
    const values = [];

    let index = 1;

    for (let key in req.body) {
        fields.push(`${key} = $${index}`);
        values.push(req.body[key]);
        index++;
    }

    if (fields.length === 0) {
        return res.status(400).json({ message: 'No data provided to update' });
    }

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    values.push(id);

    try {
        const result = await client.query(query, values);
        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user' });
    }
};
