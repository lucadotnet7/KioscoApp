import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Title from "@/components/ui/Title";

export default function CreateProductPage() {
  return (
    <>
      <Title>Nuevo Producto</Title>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
