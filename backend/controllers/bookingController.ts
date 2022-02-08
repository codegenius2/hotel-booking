import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking';
import { IUserRequest } from '../models/User';

// @Desc new booking
// @Route /api/bookings
// @Method POST
export const newBooking = asyncHandler(async (req: IUserRequest, res: Response) => {

    const { room, checkInDate, checkOutDate, amountPaid, daysOfStay, paymentInfo } = req.body;

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        amountPaid,
        daysOfStay,
        paymentInfo,
        paidAt: Date.now(),
    });

    res.status(201).json(booking);

})

// @Desc Check room is available for booking
// @Route /api/bookings/check
// @Method POST
export const checkRoomIsAvailble = asyncHandler(async (req: Request, res: Response) => {

    const { roomId, checkInDate, checkOutDate } = req.body;

    const room = await Booking.find({ room: roomId, $and: [{
            checkInDate: {
                $lte: checkOutDate
            }
        }, {
            checkOutDate: {
                $gte: checkInDate
            }
        }]});

    let roomAvailable;

    if(room && room.length === 0) {
        roomAvailable = true;
    } else {
        roomAvailable = false;
    }

    res.status(201).json({ roomAvailable });

})

// @Desc Get all bookings current user
// @Route /api/bookings/me
// @Method GET
export const myBookings = asyncHandler(async (req: IUserRequest, res: Response) => {

    const bookings = await Booking.find({ user: req.user._id }).populate("user", "name email").populate("room", "name, images");

    if(!bookings) {
        res.status(401);
        throw new Error("Bookings not found");
    }

    res.status(201).json(bookings);

})