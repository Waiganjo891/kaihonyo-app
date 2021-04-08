import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { detailsProducts } from "../actions/productActions.js";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";
import Rating from "../components/Rating.js";

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() =>{
        dispatch(detailsProducts(productId));
    }, [dispatch, productId]);
    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    return (
        <div>
        {loading? <LoadingBox></LoadingBox>
      :
        error?<MessageBox variant="danger">{error}</MessageBox>
        : (
            <div>
        <Link to="/">Back to Home page </Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}></img>
                </div>
                <div className="col-1">
                    <ul>
                        <li> <h1>{product.name}</h1></li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                        </li>
                        <li>Brand: {product.brand} </li>
                        <li> <div className="price">Ksh{product.price.toLocaleString("ksh")}</div></li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                        <li>
                    Seller{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <div>Number</div>
                    {product.seller.seller.number}
                  </li>
                            <li>
                                <div className="row">
                                    <div>Price</div>
    <div className="price">Ksh{product.price.toLocaleString("ksh")} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock>0? <span className="success"> In Stock </span>:
                                        <span className="danger">Unavailable</span>
                                        }
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock > 0 && (
                                <>
                                <li>
                                    <div className="row">
                                        <div>Qty</div>
                                        <div>
                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map( x =>(
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                    )

                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                <button onClick={addToCartHandler} className="primary block"> Add to Cart </button>
                            </li>
                                </>
                                )
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
            
                </div>
        )
        
      }

                </div>
    );
}