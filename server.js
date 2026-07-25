import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const rootPath = process.cwd();

app.use(express.static(rootPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(rootPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
