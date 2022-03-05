# Creo el directorio de trabajo
FROM node:16-alpine3.14

# Creo el directorio de trabajo
WORKDIR /app

# Copio el archivo package.json
COPY package*.json ./

# Instalo las dependencias
RUN npm install

# Copio la aplicacion al directorio de trabajo
COPY . .

# Exponer el puerto de la aplicacion
EXPOSE 5000

CMD [ "npm", "start" ]