class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService
    }
     createBooking= async(req, res)=> {
        try {
            const payload = req.body
            const booking = await this.bookingService.createBooking(payload);
            res.status(201).json({ message: 'Đặt phòng thành công!', booking });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

     cancelBooking = async(req, res)=> {
        try {
            await this.bookingService.cancelBooking(req.params.bookingId);
            res.status(200).json({ message: 'Hủy đặt phòng thành công.' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

     getAllBookings = async(req, res)=> {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await this.bookingService.getAllBookings(page, limit);
            if (result.data.length === 0) {
                return res.status(200).json({ message: 'Không có đơn đặt phòng nào.' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

     getBookingsByDate = async(req, res)=> {
        try {
            const { checkInDate, checkOutDate } = req.query;
            const bookings = await this.bookingService.findBookingsByDate(checkInDate, checkOutDate);
            if (bookings.length === 0) {
                return res.status(404).json({ message: 'Không có đơn đặt phòng nào trong khoảng thời gian này.' });
            }
            res.status(200).json({ data: bookings });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

     getAllRoom = async(req,res)=>{
        try {
            const response = await this.bookingService.getAllRoom()
            res.status(200).json({data:response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default BookingController