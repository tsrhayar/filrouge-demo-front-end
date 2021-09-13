import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>{
      loading ? (<LoadingBox />) : error ? <MessageBox variant="danger">{error}</MessageBox> : (
        <div className="product-page-container row">
          <div className="col-sm-5 product-page-image p-0">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="col-sm-7 product-page-info d-flex flex-column justify-content-center">
            <h2 className="h1">{product.price}.00 $</h2>
            <h1 className="h3">{product.name}</h1>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <p className="text-muted">
              {product.description}
            </p>
            <h4>status :  {product.countInStock > 0 ? (
              <span className="text-success">In Stock</span>
            ) : (
              <span className="text-danger">Unavailable</span>
            )}</h4>
            {product.countInStock > 0 && (
              <>
                <input type="number"
                  className="w-50"
                  defaultValue={qty}
                  min="1"
                  max={product.countInStock}
                  onChange={(e) => setQty(e.target.value)} />
                <br />
                <button id="addToCart-lg" className="btn btn-lg btn-warning mt-1" onClick={addToCartHandler}>Add To Cart</button>
                <button id="addToCart-sm" className="btn btn-warning rounded-0 mt-1 fixed-bottom" onClick={addToCartHandler}>Add To Cart</button>
              </>
            )}

          </div>
        </div>
      )
    }</div>




  );
};

export default ProductScreen;
