import { client } from "../utils/connection";

export const createProfile = async (req, res) => {
    const { name, about, avatar_image, social_media_url, bg_img, user_id } = req.body;

    try {
        const result = await client.query(
            `
        INSERT INTO profile (name, about, avatar_image, social_media_url, bg_img, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
            [name, about, avatar_image, social_media_url, bg_img, user_id]
        );

        // ✅ Successfully created profile
        res.status(201).json({
            success: true,
            message: "Profile created successfully!",
            profile: result[0],
        });

    } catch (error: any) {
        console.error("Profile creation error:", error.message);

        // ❗ Duplicate user_id error (already has profile) systemiin aldaa esvel 2 udaa submit daragdah geh met 
        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "Profile already exists for this user.",
            });
        }

        // ❗ Other unexpected errors
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM profile WHERE id = $1`, [req.params.id]);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log(error);
    }
}