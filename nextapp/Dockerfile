FROM node:20-bullseye
WORKDIR /app

# Install required libraries
RUN apt-get update && apt-get install -y libstdc++6

ENV NEXT_PUBLIC_API_URL=http://localhost:4000/api

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev-arm"]

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