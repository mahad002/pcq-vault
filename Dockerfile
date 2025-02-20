FROM node:16-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
# RUN npm run dev
EXPOSE 3000
CMD ["npm", "run", "dev"]