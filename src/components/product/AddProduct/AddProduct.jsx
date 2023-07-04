import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useProduct } from "../../../contexts/ProductContextProvider";

const AddProduct = () => {
  const { categories, getCategories, createProduct } = useProduct();

  useEffect(() => {
    getCategories();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSave = () => {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("price", price);
    newProduct.append("description", description);
    newProduct.append("category", category);
    if (image) {
      newProduct.append("image", image);
    }
    createProduct(newProduct);
  };
  return (
    <div className="w-50 mt-5 m-auto">
      <h2>CREATE PRODUCT</h2>
      <Form.Control
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        type="text"
      />
      <Form.Control
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        type="text"
      />
      <Form.Control
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        type="text"
      />
      <Form.Select
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Default select example"
      >
        <option>Open this select menu</option>
        {categories.map((item) => (
          <option value={item.id} key={item.id}>
            {item.title}
          </option>
        ))}
      </Form.Select>
      <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />

      <Button className="mt-3" onClick={handleSave}>
        Create Product
      </Button>
    </div>
  );
};

export default AddProduct;
