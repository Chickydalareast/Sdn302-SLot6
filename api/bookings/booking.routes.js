import { Router } from "express";
import { bookingController } from "./index.js";

const router = Router()

router.post('/', bookingController.createBooking);
router.delete('/:bookingId', bookingController.cancelBooking);
router.get('/', bookingController.getAllBookings);
router.get('/by-date', bookingController.getBookingsByDate); 
router.get('/room',bookingController.getAllRoom)


export default router