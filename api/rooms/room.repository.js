import Room from "./room.model.js";

class RoomRepository {
    async findById(roomId) {
        return Room.findById(roomId);
    }

    async findAllRoom() {
        return Room.find()
    }

    async updateStatus(roomId, status) {
        return Room.findByIdAndUpdate(roomId, { status }, { new: true });
    }
}
export default RoomRepository