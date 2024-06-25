import express from 'express';
import { createRestaurant, deleteRestaurant, getAllRestaurants, getSingleRestaurant, updateRestaurant } from '../controllers/restaurantController.js';


const router=express.Router();


router.get('/',getAllRestaurants);
router.get('/:id',getSingleRestaurant);


router.post('/',createRestaurant);

router.patch('/:id',updateRestaurant);

router.delete('/:id',deleteRestaurant);





export default router;