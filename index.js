const express = require('express');
const mongoose = require('mongoose');
const blogrout = require('./routes/blog');
const userrout = require('./routes/user');
const cors = require('cors');

const app = express();

// const { MONGODB_URI } = process.env;
// mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
//mongoose.connect('mongodb://localhost:27017/blog', { useUnifiedTopology: true });

const url =
  "mongodb+srv://nouraosama:dwni686737@cluster0.lz0az.mongodb.net/NodeUsersBlogs?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use('/static', express.static('static'));
app.use('/Blog', blogrout);
app.use('/User', userrout);

app.use('*', (req, res, next) => {
    res.status(404).json({ err: 'NOT_FOUND' });
});
app.use((err, req, res, next) => {

    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json(err.errors);
    }
    if (err.code === 11000) {
        res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    if (err.message === 'UN_AUTHENTICATED') {
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
    res.status(503).end();
});
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
    console.log('APP is up and ready on:', PORT);
})
