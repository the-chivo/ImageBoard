import express from 'express';

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Registro',
        desc: 'Crea una cuenta nueva',
    });
});

export default router;