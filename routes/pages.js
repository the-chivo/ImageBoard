import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Registro',
        desc: 'Crea una cuenta nueva',
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        desc: 'Inicia sesión con tu cuenta',
    });
});

router.get('/profile', isAuthenticated, (req, res) => {
    const user = req.session.username;
    res.render('profile', {user});
});

export default router;