import routes from '../api/index.js'
import express from "express"

const expressLoader = (app) => {

    app.use(express.json());

    app.use('/api',routes)

    return app
}

export default expressLoader