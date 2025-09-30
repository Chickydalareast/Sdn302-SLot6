import expressLoader from "./express.js";
import mongooseLoader from "./mongoose.js"

const loaders = async (app) => {
    await mongooseLoader()
     console.log('DB loaded and connected!');

    await expressLoader(app)
     console.log('Express loaded');
}

export default loaders