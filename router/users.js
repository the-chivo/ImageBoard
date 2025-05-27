import { User } from '../models/user.js';
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    const {name, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name: name,
        password: hashedPassword,
    });
    res.redirect("/login");
});

export default router;