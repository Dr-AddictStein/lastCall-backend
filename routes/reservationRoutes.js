import express from 'express';
import { cancelReservation, getAllReservations } from '../controllers/reservationController.js';



const router=express.Router();


router.get('/',getAllReservations);

router.delete('/:id',cancelReservation);






export default router;