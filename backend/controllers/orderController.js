import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import razorpay from 'razorpay'


{/*Global Variables */ }
const currency = 'inr';
const deliveryCharges = 10;

{/*Gateway Initialized */ }
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


{/*--------------------------------Placing orders using COD method --------------------------------*/ }
const placeOrder = async (req, res) => {
    try {
        const { userId, amount, items, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        {/*After placing the order by the user, we are clearing the cart of the user for further usage */ }
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: 'Order Placed' });



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}


{/*--------------------------------Placing orders using Stripe method --------------------------------*/ }

{/*Controller function to verify the stripe payment */ }
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}


const placeOrderStripe = async (req, res) => {
    try {
        const { userId, amount, items, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: parseInt(item.quantity, 10),

        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges * 100
            },

            quantity: 1

        })
        // console.log("Stripe line_items:", line_items);


        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


{/*--------------------------------Placing orders using Razorpay method-------------------------------- */ }

const verifyRazorpay = async (req, res) => {
    try {
        const {userId, razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status==='paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success:true, message:"Payment Successful"})
            
        }else{
            res.json({success:false, message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}


const placeOrderRazorpay = async (req, res) => {

    try {

        const { userId, amount, items, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "RazorPay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()

        }

        await razorpayInstance.orders.create(options, (error, order)=>{
                if (error) {
                    console.log(error);
                    return res.json({success:false, message:error})
                    
                }
                res.json({success:true, order})
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

{/*--------------------------------Function for displaying on the orders for Admin Panel-------------------------------- */ }
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

{/*--------------------------------User Order data for Frontend----------------------------------------- */ }
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


{/*--------------------------------Function to update Order Status from Admin Panel----------------------------------------- */ }
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Order Status updated by Admin ' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

export { updateStatus, userOrders, allOrders, placeOrderRazorpay, placeOrderStripe, placeOrder, verifyStripe, verifyRazorpay }