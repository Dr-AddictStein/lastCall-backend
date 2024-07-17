import express from 'express';
import { createUser, deleteUser, getAllUsers, getSingleUser, getSingleUserByEmail, loginUser, singupUser, updateUser } from '../controllers/userController.js';

const router = express.Router();


router.post('/login',loginUser);
router.post('/signup',singupUser);

router.get('/',getAllUsers);
router.get('/:id',getSingleUser);
router.get('/userByEmail/:email',getSingleUserByEmail);


router.post('/createuser',createUser);


router.patch('/:id',updateUser);

router.delete('/:id',deleteUser);



export default router;