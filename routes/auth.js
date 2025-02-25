import express from "express";
import pkg from 'express-openid-connect';
import dotenv from "dotenv";

dotenv.config();

const { requiresAuth } = pkg;
const router = express.Router();

router.get('/login', (req, res) => {
    res.oidc.login({
      returnTo: req.query.returnTo || 'http://localhost:5173/home', // Redirigir al frontend
    });
  });
  
router.get('/logout', (req, res) => {
    res.oidc.logout({
      returnTo: 'http://localhost:5173/', // Redirigir al frontend después de cerrar sesión
    });
  });
  
  
  // The /profile route will show the user profile as JSON
router.get('/profile', requiresAuth(), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.json(req.oidc.user);
  });
  
router.get('/', (req, res) => {
    res.send(
      req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    )
  });  

export default router;