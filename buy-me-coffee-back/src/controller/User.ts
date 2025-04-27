import { client } from "../utils/connection";

export const createProfile = async (req, res) => {
    try{
        const result = await client.query(`INSERT INTO "Profile" (name, about, avatar_image, social_media_url, bg_img, user_id) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *`, [ req.body.name, req.body.about, req.body.avatar_image, req.body.social_media_url, req.body.bg_img, req.body.user_id]);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export const getUserProfile = async (req, res) => {
    try{
        const result = await client.query(`SELECT * FROM "Profile" WHERE id = $1`, [req.params.id]);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log(error);
    }
}