# Proyecto NOC

Aplicación de monitoreo implementando arquitectura limpia con el patrón Repository.

### Instalación

Clona el repositorio y navega hasta el directorio:

```bash
git clone https://github.com/StefanoP21/noc-app.git
```

### Instala las dependencias:

```bash
npm install
```

### Variables de Entorno

Cree un archivo .env en la carpeta raíz de su proyecto y añada sus variables. Consulte .env.template para obtener ayuda.

### Ejecución en modo de desarrollo

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```bash
npm run dev
```

### Ejecución de las pruebas

Para iniciar las pruebas de la aplicación, ejecuta:

```bash
npm run test
# or with watch
npm run test:watch
# or with coverage
npm run test:coverage
```

### Ejecución en modo de producción

Para construir la aplicación para producción, ejecuta:

```bash
npm run build
# and then
npm start
```

### Tecnologías

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [JWT](https://jwt.io/)

### Autor

- [Stefano Palomino](https://github.com/StefanoP21)

### Licencia

Este proyecto está disponible para su uso bajo la Licencia MIT.
