import { Router } from "express";
import bookingRouter from "./bookings/booking.routes.js"

const router = Router()

router.use('/bookings',bookingRouter)

export default router