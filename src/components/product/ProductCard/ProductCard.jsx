import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../contexts/ProductContextProvider";

function ProductCard({ item }) {
  const { deleteProduct } = useProduct();
  const navigate = useNavigate();
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.price}</Card.Text>
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
