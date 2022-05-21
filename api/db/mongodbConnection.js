const mongoose = require('mongoose');

// If we need to connect to the database different users, we can configure it with this values:

// const dbName = process.env.DB_NAME || 'userTest';
// const password = process.env.DB_PASSWORD || 'passwordTest';
// const user = process.env.DB_USER || 'passwordTest';

const url = process.env.DB_URL

module.exports = () => mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

