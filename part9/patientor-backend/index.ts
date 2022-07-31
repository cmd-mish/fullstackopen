import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('ping pong');
  res.send('ping');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});