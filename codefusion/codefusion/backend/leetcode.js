const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 5005;

app.use(cors()); 
app.use(express.json());

app.get('/:username/solved', async (req, res) => {
  const { username } = req.params;
  

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
  
    const response = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${username}/solved`
      );

    const solvedProblem = response.data.solvedProblem;
    console.log(solvedProblem);

    res.json({ solvedProblem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from LeetCode' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
