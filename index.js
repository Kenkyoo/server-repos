import express from "express";
import cors from "cors";
import pkg from 'express-openid-connect';
import dotenv from "dotenv";

import users from './routes/users.js';
import repositories from './routes/repositories.js';
import search from './routes/search.js';
import auth0 from './routes/auth.js';

dotenv.config();

const { auth } = pkg;
const app = express();
const port = 3000

app.use(cors({
  origin: "http://localhost:5173", // Cambia esto según el puerto del frontend
  credentials: true // Permite enviar cookies y autenticación
}));

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  secret: process.env.SESSION_SECRET,
  routes: {
    callback: "/callback", // Asegúrate de que coincide con el callback en Auth0
  },
};

app.use(express.json()); // Middleware para parsear JSON en las requests

app.use(auth(config));

app.use("/api/users", users);
app.use("/api/repositories", repositories);
app.use("/api/search", search);
app.use("/api/auth0", auth0);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
