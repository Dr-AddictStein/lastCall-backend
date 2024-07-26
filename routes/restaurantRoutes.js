import express from 'express';
import { addTable, addWeekdayTables, createRestaurant, deleteRestaurant, deleteTable, getAllRestaurants, getSingleRestaurant, getSingleRestaurantByOwnerEmail, notifyAdmin, updateRestaurant } from '../controllers/restaurantController.js';


const router=express.Router();


router.get('/',getAllRestaurants);
router.get('/:id',getSingleRestaurant);
router.get('/ownercall/:email',getSingleRestaurantByOwnerEmail);


router.post('/add',createRestaurant);
router.post('/notifyadmin',notifyAdmin);
router.post('/addtable/:id',addTable);
router.post('/addweekdaytables/:id',addWeekdayTables);
router.post('/deletetable/:id',deleteTable);

router.patch('/:id',updateRestaurant);

router.delete('/:id',deleteRestaurant);





export default router;