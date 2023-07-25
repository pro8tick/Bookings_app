import { Router } from "express";
import {  deleteUser, getAllUsers, getUser, updateUser } from "../controller/users.js";
import { verifyAdmin,  verifyUser, } from "../utils/verifyToken.js";


const router = Router()



router.get('/:id',verifyUser,getUser)



//UPDATE
router.put('/:id',verifyUser, updateUser)

//DELETE
router.delete('/:id',verifyUser, deleteUser)


//GET-ALL
router.get('/',verifyAdmin,getAllUsers)

export default router