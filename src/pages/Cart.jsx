import React from 'react'
import CartList from '../components/carts/CartList'
import PriceCard from '../components/carts/PriceCard'
import { BsFillPlusCircleFill } from 'react-icons/bs';
import {FaEquals} from 'react-icons/fa'
import Button from '../components/ui/Button'
import useCarts from '../hooks/useCart';

const SHIPPING = 3000;
export default function Cart() {

  const {cartsGetQuery: {isLoading, data: carts}} = useCarts();
  
  if(isLoading) return <p>Loading...</p>

  const hasCarts = carts && carts.length > 0;
  const totalPrice =
    carts && 
    carts.reduce(
      (prev, curr) => prev + parseInt(curr.price) * curr.quantity,
      0
      );
  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>장바구니</p>
      {!hasCarts && <p>장바구니가 비어 있습니다.</p>}
      {hasCarts && <>
        <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
          {carts && carts.map(cart => <CartList key={cart.id} cart={cart} />)}
        </ul>
        <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
          <PriceCard text='상품 총액' price={totalPrice}/>
          <BsFillPlusCircleFill className='shrink-0'/>
          <PriceCard text='배송비' price={SHIPPING}/>
          <FaEquals className='shrink-0'/>
          <PriceCard text='총 가격' price={totalPrice + SHIPPING}/>
        </div>
        <Button text='주문하기'/>
      </>}
    </section>
  )
}
