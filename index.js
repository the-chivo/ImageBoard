import express from 'express'; // Importamos con la sintaxis de ESG
import nunjucks from 'nunjucks'; 
import { User } from './models/user.js';
import { loggerBasic, loggerCustom } from './middleware/log.js';

const app = express();
app.use(loggerBasic); // Usamos el logger básico
const port = 3000;

const env = nunjucks.configure('views', {
    autoescape: true, // Activamos el autoescape para evitar XSS 
    express: app,
});

// Middleware para procesar datos del cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true })); // Para datos de formularios
app.use(express.json()); // Para datos en formato JSON

import userRouter from './routes/users.js'; // Importamos el router de usuarios
import pagesRouter from './routes/pages.js'; // Importamos el router de páginas
app.use('/users', userRouter); // Usamos el router de usuarios
app.use('/', pagesRouter); // Usamos el router de páginas


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

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Iniciar Sesión',
        desc: 'Por favor, ingresa tu nombre de usuario y contraseña para registrarte.'
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    await User.create({ username, password });
    console.log(`Usuario registrado: ${username}`);
        
    // Redirigir a la tabla de usuarios después de registrar
    res.redirect('/tabladb');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});