import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useProduct } from "../../../contexts/ProductContextProvider";
import { useAuth } from "../../../contexts/AuthContextProvider";

const ProductDetails = () => {
  const { oneProduct, getOneProduct, addReview, deleteReview } = useProduct();
  const { currentUser } = useAuth();

  const [text, setText] = useState("");

  const { id } = useParams();
  useEffect(() => {
    getOneProduct(id);
  }, []);

  const handleAddReview = (e) => {
    e.preventDefault();
    const newReview = { text, product: id };
    addReview(newReview);
    getOneProduct(id);
    setText("");
  };

  return (
    <div>
      <img src={oneProduct?.image} alt="" />
      <h3>{oneProduct?.title}</h3>
      <p>{oneProduct?.category.title}</p>
      <p>{oneProduct?.price} $</p>
      <p>{oneProduct?.description}</p>
      <Button variant={oneProduct?.favorite_by_user ? "success" : "secondary"}>
        {oneProduct?.favorite_by_user
          ? "Remove from favorites"
          : "Add to Favorites"}
      </Button>
      <form onSubmit={handleAddReview}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-75"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button>add review</button>
      </form>

      <div>
        {oneProduct?.reviews.map((item) => (
          <div key={item.id} className="border m-4">
            <h5>{item.author}</h5>
            <p>
              {item.text}
              <span>
                {moment(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
              </span>
            </p>
            {item.author === currentUser ? (
              <div>
                <button>edit</button>
                <button onClick={() => deleteReview(item.id, id)}>
                  delete
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
