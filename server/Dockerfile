# Development stage
FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine as production

WORKDIR /usr/src/app

# Copy only the necessary files from the development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/package*.json ./

RUN npm install --only=production

CMD ["node", "dist/app.js"]
