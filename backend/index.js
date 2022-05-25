require('dotenv').config()

const port = process.env.PORT || 8000
const app = require("./src");

app.listen(port, () => {
    console.info(`Listening on port ${port}`);
});