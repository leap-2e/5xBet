import { client } from "../utils/connection"

export const signUp =  async(req,res,body) => {
    try {
        const result = await client.query(`INSERT INTO users (username,email,password) VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}')`);
        res.status(200).json({success:true , result})
    } catch (error) {
        res.status(400).json({success:false, message: error.message, body : req.body})
    }
}
export const signIn = async(req,res) => {
    try {

    } catch(error){
        res.status(400).json({success:false, message: error.message})
    }
}
export const refresh = async(req,res) => {
    try {
        const result = await client.query(`SELECT * FROM users`);
        res.status(200).json({success:true , result})
    } catch (error) {
        res.status(400).json({success:false, message: error.message})
    }
}
export const getUser = async(req,res) => {
    try {
        const result = await client.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
        res.status(200).json({success:true , result})
    } catch (error) {
        res.status(400).json({success:false, message: error.message})
    }
}