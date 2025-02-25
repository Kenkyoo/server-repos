import express from "express";
import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const octokit = new Octokit({ 
    auth: process.env.TOKEN
  });

router.get('/:owner/:repo', async (req, res) => {
      
    const { owner, repo } = req.params;
    console.log(owner, repo)
    try {
      const { data } = await octokit.request(`GET /repos/${owner}/${repo}`, {
        owner: owner,
        repo: repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
        res.json(data);
        console.log(data);
        
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });
  
router.get('/',  async (req, res) => {
    const { page } = req.query;
    try {
      const { data } = await octokit.request(`GET /search/repositories?per_page=12&q=repositories&page=${page}`, {
        page: page,
      });    
        res.json(data.items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });

export default router;
    