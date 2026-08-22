# syntax=docker/dockerfile:1
# Node 22+ é obrigatório para o @supabase/supabase-js (WebSocket nativo).
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]