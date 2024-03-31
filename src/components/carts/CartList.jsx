import React from 'react'
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai'
import {RiDeleteBin5Fill} from 'react-icons/ri'
import useCarts from '../../hooks/useCart';

const ICON_CLASS = 'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';

export default function CartList({cart, cart: {id, image, title, option, quantity, price}}) {
  const {cartsCountAndSetQuery, cartsDeleteQuery} = useCarts();
  const decreasement = () => {
    if(quantity < 2) return;
    cartsCountAndSetQuery.mutate({...cart, quantity: quantity - 1});
  }
  const increasement = () => cartsCountAndSetQuery.mutate({...cart, quantity: quantity + 1});
  const deleteHandle = () => cartsDeleteQuery.mutate(id)
  return (
  <li className='flex justify-between my-2 items-center'>
    <img className='w-24 md:w-48 rounded-lg' src={image} alt={title} />
      <div className='flex-1 flex justify-between ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{title}</p>
          <p className='text-xl font-bold text-brand'>{option}</p>
          <p>{price}원</p>
        </div>
        <div className='text-2xl flex items-center'>
          <AiOutlineMinusSquare className={ICON_CLASS}
          onClick={decreasement}/>
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS}
          onClick={increasement}/>
          <RiDeleteBin5Fill className={ICON_CLASS}
          onClick={deleteHandle}/>
        </div>
      </div>
  </li>
  )
}
