import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.control.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

    router.post('/signup', signup);

    router.post('/signin', login);

    router.post('/logout', logout);

    router.put('/profile' , protectRoute, updateProfile);

    router.get('/check', protectRoute, checkAuth);

export default router;
