import EditProductForm from '@/components/products/EditProductForm';
import ProductForm from '@/components/products/ProductForm';
import GoBackButton from '@/components/ui/GoBackButton';
import Title from '@/components/ui/Title';
import prisma from '@/src/lib/prisma'
import { notFound } from 'next/navigation';
import React from 'react'

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  });

  return product;
}

export default async function EditProductPage({params}: {params: {productId: string}}) {

  const product = await getProductById(+params.productId);

  if(!product)
    notFound();

  return (
    <>
      <Title>Editar producto: {product.name}</Title>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  )
}
