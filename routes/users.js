import express from "express";
import { Octokit } from "octokit";
import pkg from 'express-openid-connect';
import dotenv from "dotenv";

dotenv.config();

const { requiresAuth } = pkg;
const router = express.Router();

const octokit = new Octokit({ 
    auth: process.env.TOKEN
  });

router.get('/:username',  async (req, res) => {
      
    const { username } = req.params;
  
    try {
      const { data } = await octokit.request(`GET /users/${username}`, {
        account_id: 'ACCOUNT_ID',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });

router.get('/', async (req, res) => {
    const { page } = req.query;
    try {
      // Solo para prueba: Devuelve los datos del usuario autenticado
      console.log("Usuario autenticado:", req.oidc.user);
  
      const { data } = await octokit.request(`GET /search/users?per_page=12&q=users&page=${page}`, {
        page: page,
      });
        res.json(data.items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });
    
export default router;
