const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Placeholder for Firebase Admin SDK initialization

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
