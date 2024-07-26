import express from 'express';
import { addTable, createRestaurant, deleteRestaurant, getAllRestaurants, getSingleRestaurant, getSingleRestaurantByOwnerEmail, notifyAdmin, updateRestaurant } from '../controllers/restaurantController.js';


const router=express.Router();


router.get('/',getAllRestaurants);
router.get('/:id',getSingleRestaurant);
router.get('/ownercall/:email',getSingleRestaurantByOwnerEmail);


router.post('/add',createRestaurant);
router.post('/notifyadmin',notifyAdmin);

router.patch('/:id',updateRestaurant);
router.post('/:id',addTable);

router.delete('/:id',deleteRestaurant);





export default router;