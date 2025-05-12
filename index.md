import express from 'express'; // Importamos con la sintaxis de ESG
import nunjucks from 'nunjucks'; 
import { User } from './models/user.js';
import { loggerBasic, loggerCustom } from './middleware/log.js';
import session from 'express-session'; // Importamos express-session
import SQLiteStore from 'connect-sqlite3'; // Importamos SQLiteStore

const app = express();
app.use(loggerBasic); // Usamos el logger básico
const port = 3000;

const SQLiteStoreSession = SQLiteStore(session); // Creamos una instancia de SQLiteStore

const sessionStore = new SQLiteStoreSession({
    db: 'sessions.sqlite', // Nombre de la base de datos para las sesiones
    dir: './db', // Directorio donde se guardará la base de datos
});

const sessionConfig = {
    store: sessionStore, // Usamos el store de SQLite
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Duración de la cookie en milisegundos (1 día)
    },
};

app.use(session(sessionConfig)); // Usamos el middleware de sesión

const env = nunjucks.configure('views', {
    autoescape: true, // Activamos el autoescape para evitar XSS 
    express: app,
});

// Middleware para procesar datos del cuerpo de las solicitudes
app.set('view engine', 'njk'); // Configuramos Nunjucks como motor de plantillas
app.use(express.urlencoded({ extended: true })); // Para datos de formularios
app.use(express.json()); // Para datos en formato JSON

import userRouter from './routes/users.js'; // Importamos el router de usuarios
import pagesRouter from './routes/pages.js'; // Importamos el router de páginas
import authRouter from './routes/auth.js'; // Importamos el router de autenticación
app.use('/users', userRouter); // Usamos el router de usuarios
app.use('/', pagesRouter); // Usamos el router de páginas
app.use('/', authRouter); // Usamos el router de autenticación


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




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});