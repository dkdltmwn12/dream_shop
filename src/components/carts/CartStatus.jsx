import React from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import useCarts from '../../hooks/useCart';
export default function CartStatus() {
    const {cartsGetQuery: {data: carts}} = useCarts();

  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl'/>
      {carts && <p 
      className='w-6 h-6 text-center bg-brand text-white
      font-bold rounded-full absolute -top-1 -right-2'>
        {carts.length}
        </p>}
    </div>
  )
}
