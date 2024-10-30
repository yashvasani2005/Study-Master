import { useDispatch, useSelector } from 'react-redux';
import './Cartmainbody.css';
import ReactStars from 'react-stars';
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

import { MdDelete } from "react-icons/md";
import { removeFromCart } from '../../../../slices/Cartslice';


function Cartmainbody() {
    const { total, totalitems, cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleonclickofbuynow = () => {
        const courses = cart.map((course) => course._id);
        console.log("Courses to buy:", courses);
    };

    return (
        <div className='cart-mainbody'>
            <h2 className="cart-heading">Your Cart</h2>
            <p className="cart-paragraph">{totalitems} Courses in cart</p>

            { total > 0 ? (
                <div className='cart-components'>
                    <div className="cart-leftside">
                        {cart.map((course, index) => (
                            <div key={index} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={course.thumbnail} alt="course thumbnail" />
                                </div>
                                <div className="cart-item-details">
                                    <p className="course-name">{course?.coursename}</p>
                                    <p className="course-category">{course?.Category?.name}</p>
                                    <div className="course-rating">
                                        <span>4.8</span>
                                        <ReactStars
                                            className='rating-stars'
                                            count={5}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaRegStar />}
                                            fullIcon={<FaStar />}
                                        />
                                        <span>{course?.RatingAndReviews?.length} Ratings</span>
                                    </div>
                                    <div className="cart-actions">
                                        <button 
                                            onClick={() => dispatch(removeFromCart(course._id))}
                                            className="remove-button">
                                            <MdDelete />
                                            <span>Remove</span>
                                        </button>
                                        <p className="course-price">
                                            <FaIndianRupeeSign className='price-symbol' />
                                            <span>{course?.price}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-rightside">
                        <p className="cart-total-label">Total</p>
                        <p className="cart-total-price">
                            <FaIndianRupeeSign className='total-symbol'/>
                            <span>{total}</span>
                        </p>
                        <button onClick={handleonclickofbuynow} className="buy-now-btn">Buy Now</button>
                    </div>
                </div>
            ) : (
                <p className='empty-cart-message'>Your Cart is Empty. Please Enroll in a Course.</p>
            )}
        </div>
    );
}

export default Cartmainbody;
