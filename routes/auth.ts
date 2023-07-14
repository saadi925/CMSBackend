import express, { Request,Response } from 'express'
import {authenticateUser} from '../middleware/authenticateUser'
import { createUser, loginUser, accessUser } from '../controllers/auth';
import { validateCreate, validateUser } from '../middleware/validate';
const router = express.Router()
type  getUser= (req : Request ,res : Response) => Promise<void>

//-->ROUTE - 1 Create USER using POST user/create No login-Required .
router.post('/register', validateCreate, createUser)

//-->ROUTE - 2 Login  using POST user/login No login-Required 
router.post('/login', validateUser, loginUser)

// ROUTE 3: Get loggedin User Details using: POST "user/accessUser". Login required
router.post('/getuser', authenticateUser, accessUser as getUser)

router.post('/logout', async (req : Request, res : Response) => {
    try {
           res.send({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred during logout" });
    }
});

export default router
