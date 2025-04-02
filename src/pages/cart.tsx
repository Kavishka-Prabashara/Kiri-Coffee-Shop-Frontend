import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateQuantity, removeFromCart } from "../components/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (productId: string, quantity: number) => {
        dispatch(updateQuantity({ productId, quantity }));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            const checkoutItems = cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                name: item.name,
                price: item.price,
            }));

            const response = await axios.post("/api/orders", { items: checkoutItems });

            if (response.status === 200) {
                console.log("Checkout successful", response.data);
                navigate("/checkout-success");
            } else {
                console.error("Checkout failed", response);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.productId} className="flex items-center border-b pb-4 mb-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                            <div className="ml-4 flex-1">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">
                                    {item.category} - {item.brand}
                                </p>
                            </div>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                className="w-12 text-center border"
                                onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                            />
                            <button
                                onClick={() => dispatch(removeFromCart(item.productId))}
                                className="ml-4 text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="mt-6 border-t pt-4">
                        <h2 className="text-lg font-bold">Order Summary</h2>
                        <p className="text-gray-700">Total: ${totalPrice.toFixed(2)}</p>
                    </div>

                    <div className="flex mt-4">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;