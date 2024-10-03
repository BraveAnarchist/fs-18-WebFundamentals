import axios from "../axiosConfig";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../App";

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleProduct, setSingleProduct] = useState({});
  const { addToCart, addToWishlist, isUserLoggedIn } = useContext(userContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/product/" + id);
        // console.log(response);
        setSingleProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      {singleProduct && (
        <div className="singleProduct flex flex-wrap gap-4">
          <div className="left w-1/5">
            <img className="w-full" src={singleProduct.url} />
          </div>
          <div className="right w-3/4">
            <h2>{singleProduct.name}</h2>
            <p>
              <em>Category: </em>
              {singleProduct.category}
            </p>
            <p>
              <em>Price: </em>
              {singleProduct.price}
            </p>
            <p>{singleProduct.description}</p>

            <button
              className="my-2 mx-4 bg-slate-400 text-white py-2 px-6 rounded"
              onClick={() =>
                !isUserLoggedIn
                  ? navigate("/login?back_to=/product/" + singleProduct._id)
                  : addToWishlist(singleProduct)
              }
            >
              Add to Wishlist
            </button>
            <button
              className="my-2 mx-4 bg-slate-400 text-white py-2 px-6 rounded"
              onClick={() =>
                !isUserLoggedIn
                  ? navigate("/login?back_to=/product/" + singleProduct._id)
                  : addToCart(singleProduct)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
