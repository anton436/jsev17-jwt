import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../helpers/consts";
import { getTokens } from "../helpers/functions";

export const productContext = createContext();
export const useProduct = () => useContext(productContext);

const INIT_STATE = {
  products: [],
  pages: 0,
  categories: [],
  oneProduct: null,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.results,
        pages: Math.ceil(action.payload.count / 6),
      };

    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };

    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();

  async function getProducts() {
    try {
      const res = await axios(
        `${API}/products/${window.location.search}`,
        getTokens()
      );
      dispatch({ type: "GET_PRODUCTS", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(state);

  async function getCategories() {
    try {
      const res = await axios(`${API}/category/list/`);
      dispatch({ type: "GET_CATEGORIES", payload: res.data.results });
    } catch (error) {
      console.log(error);
    }
  }

  async function createProduct(newProduct) {
    try {
      await axios.post(`${API}/products/`, newProduct, getTokens());
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/products/${id}/`, getTokens());
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneProduct(id) {
    try {
      const res = await axios(`${API}/products/${id}/`, getTokens());
      dispatch({ type: "GET_ONE_PRODUCT", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  const values = {
    getProducts,
    products: state.products,
    pages: state.pages,
    categories: state.categories,
    getCategories,
    createProduct,
    deleteProduct,

    getOneProduct,
    oneProduct: state.oneProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
