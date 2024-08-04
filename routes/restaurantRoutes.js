import express from 'express';
import { addTable, addWeekdayTables, contactAdmin, createRestaurant, deleteRestaurant, deleteTable, getAllRestaurants, getReservations, getSingleRestaurant, getSingleRestaurantByOwnerEmail, notifyAdmin, suggestAdmin, updateRestaurant } from '../controllers/restaurantController.js';


const router=express.Router();


router.get('/',getAllRestaurants);
router.get('/:id',getSingleRestaurant);
router.get('/ownercall/:email',getSingleRestaurantByOwnerEmail);
router.get('/reservations/:email',getReservations);


router.post('/add',createRestaurant);
router.post('/notifyadmin',notifyAdmin);
router.post('/contactadmin',contactAdmin);
router.post('/suggestadmin',suggestAdmin);
router.post('/addtable/:id',addTable);
router.post('/addweekdaytables/:id',addWeekdayTables);
router.post('/deletetable/:id',deleteTable);

router.patch('/:id',updateRestaurant);

router.delete('/:id',deleteRestaurant);





export default router;