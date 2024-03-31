import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/ui/Button'
import useCarts from '../hooks/useCart';

export default function ProductsDetail() {
  const [success, setSuccess] = useState();
  const {cartsCountAndSetQuery} = useCarts();
  const {
    state: {
      product: {id, image, title, price, description, options, category}
    }
  } = useLocation();

  const [selected, setSelected] = useState(options && options[0]);
  
  const onChangeHandle = (e) => setSelected(e.target.value)
  
  const onClickHandle = () => {
    const product = {id, image, title, price, option: selected, quantity: 1}
    cartsCountAndSetQuery.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 제품이 추가되었습니다.');
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      }
    })

  }
  return (
      <>
        <p className='mx-12 mt-4 font-bold text-gray-700'>{category}</p>
        <section className='flex flex-col md:flex-row p-4'>
          <img className='w-full px-4 basis-7/12' src={image} alt='deatils'/>
          <div className='w-full basis-5/12 flex flex-col p-4'>
            <h2 className='text-3xl font-bold py-2'>{title}</h2>
            <p className='text-2xl font-bold py-2 border-b border-gray-400'>
              {`${price}원`}
            </p>
            <p className='py-4 text-lg'>{description}</p>
            <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='select'>옵션:</label>
            <select id='select'
              className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
              onChange={onChangeHandle} value={selected}>
              {options && options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
            </div>
            {success && <p className='my-2'>✅{success}</p>}
            <Button text={'장바구니에 추가'} onClick={onClickHandle}/>
          </div>
        </section>
      </>
  )
}
