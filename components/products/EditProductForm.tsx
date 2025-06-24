"use client";

import { editProduct } from "@/actions/edit-product.action";
import { ProductSchema } from "@/src/schemas";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProductForm({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const productId: number = +params.productId!

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image")
    };

    const result = ProductSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }
    
    const response = await editProduct(result.data, productId);
    if(response?.errors) {
      response.errors.forEach(err => {
        toast.error(err.message);
      });
      return;
    }

    toast.success("Producto actualizado correctamente.");
    router.push('/admin/products');
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleSubmit} className="space-y-5">
        {children}
        <input
          type="submit"
          value="Editar producto"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        />
      </form>
    </div>
  );
}