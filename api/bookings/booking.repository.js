import BooKing from "./booking.model.js";
import Room from "../rooms/room.model.js";

class BooKingRepository {

    async createBooking(bookingData) {
        const data = {
            customerId:bookingData.customerId,
            roomId: bookingData.roomId,
            checkInDate: bookingData.checkInDate,
            checkOutDate: bookingData.checkOutDate,
        }
        const booking = new BooKing(data)
        await booking.save()
        return booking
    }

    async findById(id){
        return BooKing.findById(id)
    }

    async findConflicting(roomId, checkInDate, checkOutDate) {
        return BooKing.findOne({
            roomId,
            status: { $ne: 'cancelled' },
            $or: [
                { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } }
            ]
        });
    }

    async update(booking) {
        return booking.save();
    }

    async findAll(page, limit) {
        const skip = (page - 1) * limit;
        return BooKing.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    }
    
    async countDocuments() {
        return BooKing.countDocuments();
    }

    async findByDateRange(startDate, endDate) {
        return BooKing.find({
            checkInDate: { $gte: new Date(startDate) },
            checkOutDate: { $lte: new Date(endDate) }
        });
    }

}

export default BooKingRepository