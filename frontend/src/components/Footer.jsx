import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32 ' alt="Company's Logo" />
                <p className='w-full md:w-2/3 text-gray-600'>LOOTED is a contemporary clothing brand built for individuals who value bold expression and effortless style. We create fashion-forward pieces that blend everyday comfort with standout design, offering collections that speak to confidence, individuality, and culture. Join the movement, explore the looks, and get LOOTED.</p>
            </div>
            <div>
                <p className='text-xl font-medium mt-1 mb-8'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mt-1 mb-8'>Get in touch</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-222-333-444</li>
                        <li>connect@looted.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ Looted.com - All Rights Reserved.</p>
        </div>
    </div>
  )
}
 
export default Footer