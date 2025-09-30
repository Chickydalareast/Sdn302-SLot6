class BookingService {
    constructor(bookingRepository, roomRepository) {
        this.bookingRepository = bookingRepository
        this.roomRepository = roomRepository
    }

    async createBooking(bookingData) {
        const { roomId, checkInDate, checkOutDate } = bookingData;
        const room = await this.roomRepository.findById(roomId);
        if (!room) {
            throw new Error('Phòng không tồn tại.');
        }
        if (room.status !== 'available') {
            throw new Error(`Phòng này đang ở trạng thái '${room.status}' và không thể đặt.`);
        }
        const existingBooking = await this.bookingRepository.findConflicting(roomId, checkInDate, checkOutDate);
        if (existingBooking) {
            throw new Error('Phòng đã được đặt trong khoảng thời gian này.');
        }

        const newBooking = await this.bookingRepository.createBooking(bookingData);
        if (!newBooking) {
            throw new Error('Tạo đơn đặt phòng thất bại.');
        }
        await this.roomRepository.updateStatus(roomId, 'occupied');

        return newBooking;
    }


    async cancelBooking(bookingId) {
        const booking = await this.bookingRepository.findById(bookingId);
        if (!booking) {
            throw new Error('Không tìm thấy đơn đặt phòng.');
        }
        if (new Date(booking.checkInDate) <= new Date()) {
            throw new Error('Không thể hủy vì đã đến hoặc qua ngày nhận phòng.');
        }
        booking.status = 'cancelled';
        return this.bookingRepository.update(booking);
    }

    async getAllBookings(page, limit) {
        const bookings = await this.bookingRepository.findAll(page, limit);
        const total = await this.bookingRepository.countDocuments();
        return {
            data: bookings,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }

    async findBookingsByDate(startDate, endDate) {
        if (!startDate || !endDate || new Date(startDate) >= new Date(endDate)) {
            throw new Error('Ngày nhận phòng phải nhỏ hơn ngày trả phòng.');
        }
        return this.bookingRepository.findByDateRange(startDate, endDate);
    }

    async getAllRoom() {
        return this.roomRepository.findAllRoom()
    }
}

export default BookingService