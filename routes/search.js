import express from "express";
import dotenv from "dotenv";
import { Octokit } from "octokit";

dotenv.config();

const router = express.Router();

const octokit = new Octokit({ 
    auth: process.env.TOKEN
});

      router.get('/',  async (req, res) => {
      
        const { page, perPage, query, type } = req.query;
      
        try {
          const { data } = await octokit.request(`GET /search/${type}`, {
            q: query,
            per_page: perPage,
            page: page
          });
            res.json(data.items);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
      });
      
      
      router.get('/topics', async (req, res) => {
        let { query } = req.query;
      
        if (!query) {
          return res.status(400).json({ error: 'Se requiere un parámetro de búsqueda' });
        }
      
        // Agregar "is:featured" automáticamente a la consulta
        query += ' is:featured';
      
        try {
          const { data } = await octokit.request('GET /search/topics', {
            q: query,
            headers: {
              Accept: 'application/vnd.github.mercy-preview+json',
            },
          });
      
          res.json(data.items);
        } catch (error) {
          res.status(error.status || 500).json({ error: error.message });
        }
      });

export default router;