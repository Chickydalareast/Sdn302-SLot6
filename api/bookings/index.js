import BooKingRepository from "./booking.repository.js";
import BookingService from "./booking.service.js";
import BookingController from "./booking.controller.js";
import { roomRepository } from "../rooms/index.js";

const bookingRepository = new BooKingRepository()
const bookingService = new BookingService(bookingRepository,roomRepository)
const bookingController = new BookingController(bookingService)

export {bookingController}