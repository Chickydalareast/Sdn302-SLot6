import mongoose from 'mongoose';
import config from '../config/index.js'

const mongooseLoader = async () => {
    const connection = await mongoose.connect(config.databaseURL)

    const dbname = connection.connections[0].name
    console.log(`MongoDB connected: ${dbname}`)

    return connection.connection.db

}

export default mongooseLoader