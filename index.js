const DBconnect = require('./db')
const express = require('express')
const app = express()
const port = process.env.PORT || 6000;
var cors = require('cors');

DBconnect();

app.use(express.json())
app.use(cors())
app.use('/api/auth', require('./routes/Auth'));

app.use('/api/post', require('./routes/Post'));
app.use('/api/follow', require('./routes/Follow'));
app.use('/api/comment', require('./routes/Comment'));
app.use('/api/like', require('./routes/Like'));
app.use('/api/chat', require('./routes/Chat'));
app.use('/api/favourite', require('./routes/Favourite'));
app.use('/api/playlist', require('./routes/Playlist'));

app.get('/', (req, res)=>{
  res.send("Welcome to Melophile API");
})

app.listen(port, () => {
  console.log(`Melophile is listening on port ${port}`)
})