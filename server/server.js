import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

app.get('/', (req, res) => {
  res.send('Received! You sent: ');
});
