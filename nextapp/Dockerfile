FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Stage 1: Build
#FROM node:20-alpine AS builder
#WORKDIR /app
#COPY . .
#RUN npm install && npm run build

# Stage 2: Serve
#FROM node:20-alpine
#WORKDIR /app
#COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/public ./public
#COPY --from=builder /app/package.json ./package.json
#RUN npm install next
#EXPOSE 3000
#CMD ["npm", "start"]