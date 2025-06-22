"use client";

import { SearchSchema } from "@/src/schemas";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SearchProduct() {
  const router = useRouter();

  const handleSearchAction = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    const result = SearchSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form action={handleSearchAction} className="flex items-center gap-1">
      <input
        type="text"
        placeholder="Buscar producto"
        className="p-2 placeholder-gray-500 bg-gray-200 w-full rounded-md"
        name="search"
      />

      <input
        type="submit"
        value="Buscar"
        className="bg-amber-400 p-2 font-bold cursor-pointer rounded-md"
      />
    </form>
  );
}
