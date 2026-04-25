import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV });
  });

  // API Routes
  app.post('/api/subscribe', async (req, res) => {
    console.log('--- Subscription Request Received ---');
    console.log('Body:', req.body);
    const { name, phone, service } = req.body;

    if (!name || !phone || !service) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = process.env.MAILCHIMP_DC;

    if (!API_KEY || !LIST_ID || !DATACENTER) {
      console.warn('Mailchimp environment variables are not fully configured.');
      // For demo purposes, we'll return success if keys are missing but log a warning
      return res.status(200).json({ 
        success: true, 
        message: 'Lead received (Demo Mode: Mailchimp not configured)',
        data: { name, phone, service }
      });
    }

    try {
      // Mailchimp requires an email. Since we only have a phone, we'll create a dummy email
      // format: phone@electricalsolution.com
      const email = `${phone.replace(/\s+/g, '')}@noemail.com`;

      const response = await axios({
        method: 'post',
        url: `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
        headers: {
          Authorization: `Basic ${Buffer.from(`any:${API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        data: {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: name,
            PHONE: phone,
            MESSAGE: service
          }
        }
      });

      res.status(200).json({ success: true, message: 'Subscribed successfully' });
    } catch (error: any) {
      console.error('Mailchimp Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ 
        error: 'Failed to subscribe to Mailchimp',
        details: error.response?.data?.detail || error.message
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
