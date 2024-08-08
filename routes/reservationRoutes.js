import express from 'express';
import { getAllReservations } from '../controllers/reservationController.js';



const router=express.Router();


router.get('/',getAllReservations);






export default router;