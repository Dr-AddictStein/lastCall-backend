import express from 'express';
import { createRestaurant, deleteRestaurant, getAllRestaurants, getSingleRestaurant, notifyAdmin, updateRestaurant } from '../controllers/restaurantController.js';


const router=express.Router();


router.get('/',getAllRestaurants);
router.get('/:id',getSingleRestaurant);


router.post('/add',createRestaurant);
router.post('/notifyadmin',notifyAdmin);

router.patch('/:id',updateRestaurant);

router.delete('/:id',deleteRestaurant);





export default router;