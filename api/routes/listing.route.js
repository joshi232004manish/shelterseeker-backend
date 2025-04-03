import express from 'express'
import { verifyToken } from '../utils/verifyToken.js';
import { createListing } from '../controller/listing.controller.js';
import { deleteListing ,updateListing,getListing,getListings} from '../controller/listing.controller.js';


const router = express.Router();

// router.post('/create',verifyToken,createListing);
router.post('/create' ,verifyToken, createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);
router.get('/get/:id',getListing);
router.get('/get',getListings);

export default  router;
