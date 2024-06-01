import express from 'express';
import { createRegion, deleteRegion, getAllRegions, getSingleRegion, updateRegion } from '../controllers/regionController.js';


const router=express.Router();


router.get('/',getAllRegions);
router.get('/:id',getSingleRegion);


router.post('/',createRegion);

router.patch('/:id',updateRegion);

router.delete('/:id',deleteRegion);





export default router;