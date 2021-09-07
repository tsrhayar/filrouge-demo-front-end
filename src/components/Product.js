import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {

  const { product } = props;
  return (



    <Link className="text-dark product-link" to={`/product/${product._id}`}>

      <div className="product-card rounded m-1 shadow-sm">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h5 className="product-name">{product.name}</h5>
          <h3 className="product-price">{product.price}.00 DH</h3>
        </div>
      </div>
    </Link>

  );
};

export default Product;
