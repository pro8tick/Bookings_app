import { Router } from "express";
import { createRoom, deleteRoom, getAllRooms, updateRoom ,getRoom,updateRoomAvailability} from "../controller/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = Router()

//GET
router.get('/:id',getRoom)


//CREATE
router.post('/:hotelid',verifyAdmin, createRoom )

//UPDATE
router.put('/:id',verifyAdmin, updateRoom)
router.put('/availability/:id', updateRoomAvailability)


//DELETE
router.delete('/:id/:hotelId',verifyAdmin, deleteRoom)


//GET-ALL
router.get('/',getAllRooms)

export default router
