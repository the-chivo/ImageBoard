# Imageboard

## Conceptos
- **VALIDACIÒN** ➜ Comprueba el tipo, escapado de caracteres, longitud
- **AUTENTICACIÓN** ➜ Comprobamos si existe, vemos quien es, es decir si es quien dice ser
- **AUTORIZACIÓN** ➜ Permisos
- **REGISTRO** ➜ Crear un usuario
- **LOGIN** ➜ Acceso
- **LOGOUT** ➜ Cierra la sesion
- **SESIÓN** ➜ Instancia del usuario

## Conceptos
- **VALIDACIÓN** ➜ Comprueba el tipo, escapado de caracteres, longitud, formato y consistencia de los datos ingresados por el usuario.
- **AUTENTICACIÓN** ➜ Comprobamos si existe, vemos quién es, es decir, si es quien dice ser. Se realiza mediante contraseñas, tokens o sistemas de terceros como OAuth.
- **AUTORIZACIÓN** ➜ Permisos que determinan qué acciones o recursos puede acceder un usuario autenticado.
- **REGISTRO** ➜ Crear un usuario en el sistema, generalmente con un nombre de usuario, contraseña y otros datos opcionales.
- **LOGIN** ➜ Acceso al sistema mediante credenciales válidas.
- **LOGOUT** ➜ Cerrar acceso y finalizar la sesión del usuario.
- **SESIÓN** ➜ Instancia del usuario que persiste durante su interacción con el sistema, generalmente gestionada mediante cookies o tokens.

## Flujo de autenticación
1. **Registro**:
   - El usuario proporciona datos como nombre de usuario, correo y contraseña.
   - La contraseña se hashea antes de almacenarse en la base de datos.
2. **Inicio de sesión (Login)**:
   - El usuario ingresa sus credenciales.
   - El sistema verifica las credenciales y genera una sesión o token.
3. **Autorización**:
   - Una vez autenticado, el sistema verifica los permisos del usuario para acceder a recursos específicos.
4. **Cierre de sesión (Logout)**:
   - La sesión o token se invalida, cerrando el acceso del usuario.

## Seguridad
- **Hasheo de contraseñas** ➜ Las contraseñas nunca se almacenan en texto plano. Se utiliza un algoritmo como bcrypt para generar un hash seguro.
- **Protección contra ataques XSS** ➜ Escapar caracteres especiales en entradas de usuario para evitar la inyección de scripts maliciosos.
- **Protección contra ataques CSRF** ➜ Uso de tokens CSRF para validar solicitudes legítimas.
- **Rate Limiting** ➜ Limitar el número de solicitudes por usuario para prevenir ataques de fuerza bruta.

## Herramientas utilizadas
- **bcrypt** ➜ Para hashear contraseñas.
- **jsonwebtoken (JWT)** ➜ Para manejar autenticación basada en tokens.
- **express-session** ➜ Para gestionar sesiones en aplicaciones Express.
- **morgan** ➜ Para registrar solicitudes HTTP.
- **chalk** ➜ Para agregar colores a los logs en la consola.

## Buenas prácticas
- Validar siempre los datos del usuario en el servidor.
- Usar HTTPS para cifrar la comunicación entre cliente y servidor.
- Implementar logs para monitorear actividades sospechosas.
- Mantener las dependencias actualizadas para evitar vulnerabilidades conocidas.