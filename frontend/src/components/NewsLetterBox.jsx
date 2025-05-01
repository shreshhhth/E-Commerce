import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (event)=>{
        event.preventDefault(); {/*This will prevent page reload on submitting the form */}
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
        <p className='text-gray-400 mt-3'>Join the LOOTED fam. Style alerts and secret sales await</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-l-lg'> 
            <input className='w-full sm:flex-1 outline-none ' type="email" placeholder='Enter your email here' required />
            <button className='bg-black text-white text-xs px-10 py-4' type="submit">Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox