import { Router } from "express";
import { createHotel, deleteHotel, getALlHotels, getHotel, updateHotels ,countByCity,countByType,getHotelRooms} from "../controller/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = Router()

//GET
router.get('/find/:id',getHotel)


//CREATE
router.post('/',verifyAdmin, createHotel )

//UPDATE
router.put('/:id',verifyAdmin, updateHotels)

//DELETE
router.delete('/:id',verifyAdmin, deleteHotel)


//GET-ALL
router.get('/',getALlHotels)

router.get('/countByCity',countByCity)

router.get('/countByType',countByType)

router.get('/room/:id',getHotelRooms)



export default router