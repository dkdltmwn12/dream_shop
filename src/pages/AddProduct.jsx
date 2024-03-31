import React, { useState } from 'react'
import Button from '../components/ui/Button'
import { uploadImage } from '../api/cloudinary'
import useProducts from '../hooks/useProducts'
export default function AddProduct() {
  const [product, setProduct] = useState({})
  const [file, setFile] = useState()
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const {productsAddQuery} = useProducts()
  const onChangeHandle = (e) => {
    const {name, value, files} = e.target
    if(name === 'file') {
      setFile(files && files[0])
      return;
    }
    setProduct((product) => ({...product, [name]:value}))
  }

  const onSubmitHandle = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
    .then(url => {
      productsAddQuery.mutate({product, url}, {onSuccess: () =>{
        setSuccess('성공적으로 제품이 추가되었습니다.');
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      }})
    })
    .finally(() => setIsUploading(false))
  }
  return (
  <section className='w-full text-center'>
    <h1 className='text-2xl font-bold my-4'>새로운 제품 등록</h1>
    {success && <p className='my-2'>✅{success}</p>}
    {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local'/>}
    <form className='flex flex-col px-12'
      onSubmit={onSubmitHandle}>
      <input type='file' name='file' accept='image/*' required onChange={onChangeHandle}/>
      <input type='text' name='title' required value={product.title ?? ''} onChange={onChangeHandle}  placeholder={'제품명'}/>
      <input type='number' name='price' required value={product.price ?? ''} onChange={onChangeHandle} placeholder={'가격'}/>
      <input type='text' name='category' required value={product.category ?? ''} onChange={onChangeHandle} placeholder={'카테고리'}/>
      <input type='text' name='description' required value={product.description ?? ''} onChange={onChangeHandle} placeholder={'제품 설명'}/>
      <input type='text' name='options' required value={product.options ?? ''} onChange={onChangeHandle} placeholder={'옵션(콤마(,)로 구분)'}/>
      <Button text={isUploading ? '업로드중...' : '등록하기'}
        disabled={isUploading}></Button>
    </form>
  </section>
  )
}
