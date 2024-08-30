const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');

const app = express();

app.use(cors());
app.use(express.json());

const registerRoutes = async (app, dir = './api') => {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await registerRoutes(app, filePath);
    } else if (file.name.endsWith('.js')) {
      const route = require('./' + filePath);
      app[route.method](route.path, async (req, res, next) => {
        try {
          console.log(`[${new Date().toISOString()}] ${req?.method} ${req?.originalUrl}`);
          console.log('Request Body:', req?.body);
          const clientIP = req.headers['x-real-ip'] || req.connection.remoteAddress;
          console.log('Client IP:', clientIP);
          await route.execute(req, res, next);
        } catch (e) {
          console.log(e);
          res.status(400).send('Bad request');
        }
      });
    }
  }
};

(async () => {
  await registerRoutes(app);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
