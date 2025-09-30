import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    status: {
        type: String,
        enum: ['available', 'occupied'], 
        default: 'available'
    }
});
const Room = mongoose.model('Room', roomSchema);
export default Room