import React from "react";
import Discount from "../assets/discount.jpg";
import Salad from "../assets/Salad.jpg";
import Delivery from "../assets/Delivery.jpg";
import chef from "../assets/chef.jpg";

function Features() {
    return (
        <div className="h-[70vh] flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center mb-8">
                <h2 className="p-2 text-4xl font-bold mb-4 mt-12">Discover Our Unique Features and Benefits</h2>
                <p className="text-lg text-gray-600">Explore what sets us apart and enhances your dining experience.</p>
            </div>
            <div className="flex flex-wrap justify-center items-start gap-8">
                <div className="w-[20%] p-2 md:m-4 text-center transition-transform duration-300 hover:scale-105">
                    <img className="w-full md:h-60 h-30 object-cover rounded-full mb-4" src={Discount} alt="Discount" />
                    <h3 className="text-xl font-semibold mb-2">Exclusive Discounts</h3>
                    <p className="text-gray-500">Save with our special offers and seasonal promotions. Get the best value every time you dine with us.</p>
                </div>
                <div className="w-[20%] p-2 md:m-4 text-center transition-transform duration-300 hover:scale-105">
                    <img className="w-full md:h-60 h-30 object-cover rounded-full mb-4" src={Salad} alt="Salad" />
                    <h3 className="text-xl font-semibold mb-2">Fresh Salads</h3>
                    <p className="text-gray-500">Enjoy our crisp, fresh salads made from the finest ingredients. A healthy and tasty choice for any meal.</p>
                </div>
                <div className="w-[20%] p-2 md:m-4 text-center transition-transform duration-300 hover:scale-105">
                    <img className="w-full md:h-60 h-30 object-cover rounded-full mb-4" src={Delivery} alt="Delivery" />
                    <h3 className="text-xl font-semibold mb-2">Reliable Delivery</h3>
                    <p className="text-gray-500">Our fast and dependable delivery service ensures your meals arrive hot and fresh at your door.</p>
                </div>
            </div>
        </div>
    );
}

export default Features;
