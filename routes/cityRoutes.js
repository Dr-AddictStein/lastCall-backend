import express from 'express';
import { createCity, deleteCity, getAllCities, getSingleCity, updateCity } from '../controllers/cityController.js';


const router=express.Router();


router.get('/',getAllCities);
router.get('/:id',getSingleCity);


router.post('/',createCity);

router.patch('/:id',updateCity);

router.delete('/:id',deleteCity);





export default router;