
import Image from 'next/image'
import React from 'react'

export default function HeaderImage() {
  return (
    <Image src={'/hero-banner.webp'} height={350} width={1000} alt='hero-banner'/>
  )
}
