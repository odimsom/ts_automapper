import express from 'express';

const PORT = env.prov.PORT | 3000;
const app = express();

console.log('estas aqui');

app.listen(PORT => {
  console.log('app run here: localhost:300')
})
