"use client"

import { Category } from "@/app/generated/prisma"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category}: CategoryIconProps) {
  const params = useParams<{category: string}>();

  return (
    <div className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b ${category.slug === params.category ? 'bg-amber-400' : ''}`}>
        <div className="w-16 h-16 relative">
            <Image 
                src={`/icon_${category.slug}.svg`} 
                alt="Imagen categoría" 
                fill />
        </div>

        <Link 
            className="text-xl font-bold" 
            href={`/order/${category.slug}`}> 
            {category.name}
        </Link>
    </div>
  )
}
