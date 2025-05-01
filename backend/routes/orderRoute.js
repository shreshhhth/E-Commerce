import express from 'express'
import {updateStatus, userOrders, allOrders, placeOrderRazorpay, placeOrderStripe, placeOrder, verifyStripe, verifyRazorpay} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

{/* ---------------Admin Features---------------- */}
orderRouter.post('/list',adminAuth,allOrders); 
orderRouter.post('/status',adminAuth,updateStatus); 

{/*-----------------Payment Feacture-------------  */}
orderRouter.post('/place', authUser ,placeOrder);
orderRouter.post('/razorpay',authUser, placeOrderRazorpay);
orderRouter.post('/stripe',authUser,  placeOrderStripe);

{/*---------------User feactures----------------- */}
orderRouter.post('/userorders', authUser, userOrders);

{/*------------Verify Payment------------------- */}
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default orderRouter;