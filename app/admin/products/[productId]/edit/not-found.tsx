import Title from "@/components/ui/Title";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
        <Title>El producto no existe.</Title>
        <Link 
          href='/admin/products' 
          className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto">
            Ver productos
        </Link>
    </div>
  )
}
