import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();

  function handleSave() {
    if (!email.trim() || !password.trim()) {
      alert("заполните поля!");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    handleLogin(formData, email);
  }

  return (
    <Container className="w-50">
      <Form.Control
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <Form.Control
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      {loading ? (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      ) : (
        <Button onClick={handleSave}>LOGIN</Button>
      )}
    </Container>
  );
};

export default Login;
