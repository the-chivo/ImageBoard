import express from 'express'; // Importamos con la sintaxis de ESG
import nunjucks from 'nunjucks'; 
import { User } from './models/user.js';

const app = express();
const port = 3000;

const env = nunjucks.configure('views', {
    autoescape: true, // Activamos el autoescape para evitar XSS 
    express: app,
});

app.set('view engine', 'njk'); // Configuramos Nunjucks como motor de plantillas

app.get('/', async (req, res) => {
    const usersRaw = await User.findAll();
    const users = usersRaw.map(user => {
        return {
            id: user.id,
            name: user.username,
            password: user.password,
        }
    }
    );
    console.log(users);
    res.render('test', { 
        title: 'Test de Nunjucks',
        desc: 'Porbando el motor de plantillas',
        users
    });
});

app.get('/tabladb', async (req, res) => {
    const usersRaw = await User.findAll(); 
    const users = usersRaw.map(user => {
        return {
            id: user.id,
            name: user.username,
            password: user.password, 
        };
    });
    console.log(users);
    res.render('database', { 
        title: 'Tabla de Usuarios',
        desc: 'Lista de usuarios registrados en la base de datos:',
        users
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});