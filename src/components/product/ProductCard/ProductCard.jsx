import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../contexts/ProductContextProvider";

function ProductCard({ item }) {
  const { deleteProduct, toggleFavorites, deleteFromFavorites } = useProduct();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/products/${item.id}`)}
        >
          {item.title}
        </Card.Title>
        <Card.Text>{item.price} $</Card.Text>
        {location.pathname === "/products" ? (
          <Button
            variant={item.favorite_by_user ? "success" : "secondary"}
            onClick={() => toggleFavorites(item.id)}
          >
            {item.favorite_by_user
              ? "Already in Favorites"
              : " Add to Favorites"}
          </Button>
        ) : (
          <Button variant="danger" onClick={() => deleteFromFavorites(item.id)}>
            remove from favorites
          </Button>
        )}

        {item.is_author ? (
          <>
            <Button variant="primary" onClick={() => deleteProduct(item.id)}>
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/edit/${item.id}`)}
            >
              Edit
            </Button>
          </>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
