import React, { useEffect } from "react";
import { useProduct } from "../../contexts/ProductContextProvider";
import ProductCard from "../product/ProductCard/ProductCard";

const Favorites = () => {
  const { favorites, getFavorites } = useProduct();

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {favorites.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Favorites;
