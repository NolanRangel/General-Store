import express from 'express'
const router = express.Router()
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile

} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'



// Register new user
// POST /api/users
// Public
router.route('/').post(registerUser)

// home gets authenticated user
// POST
// public
router.post('/login', authUser)

// Get user profile
// GET /api/users/profile
// private
// runs authMiddleware
router.route('/profile').get(protect, getUserProfile)

//  update user profile
//  PUT /api/users/register
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)





export default router