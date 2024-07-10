import { Form, Input } from "react-daisyui";
import { searchProducts } from "./SearchProducts";

export default function SearchField() {
  return (
    <Form action={searchProducts}>
      <Input
        bordered
        name="searchQuery"
        type="text"
        placeholder="Search"
        className="w-24 md:w-auto"
      />
    </Form>
  );
}
