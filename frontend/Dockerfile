# frontend/Dockerfile

# --- Estágio 1: Build da aplicação React ---
FROM node:18-alpine AS build

WORKDIR /app

# Copia os arquivos de manifesto e instala dependências
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copia o resto do código fonte
COPY . .

# Executa o build da aplicação para produção
RUN npm run build

# --- Estágio 2: Servir os arquivos estáticos com NGINX ---
FROM nginx:stable-alpine

# Copia os arquivos estáticos gerados no estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80 do contêiner
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]