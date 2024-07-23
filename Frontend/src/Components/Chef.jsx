import chef from "../assets/chef.jpg";
import chef2 from "../assets/chef2.jpg";

function Chef() {
    return (
        <div className="flex bg-black w-full items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="md:w-1/2 md:mt-0 mt-60 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-800">Meet Our Talented Chefs</h1>
                </div>
                <div className="p-6 flex flex-col lg:flex-row justify-center items-center lg:space-x-4">
                    {/* Chef 1 */}
                    <div className="w-full p-4 mb-4 lg:mb-0">
                        <div className="bg-gray-200 p-4 rounded-lg shadow-lg w-full">
                            <img
                                src={chef}
                                alt="Chef"
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-2xl font-semibold mb-2">Culinary Expert</h2>
                            <p className="text-gray-600 mb-2">Our first chef brings a rich blend of traditional and modern cooking techniques. Experience expertly crafted dishes that highlight both classic and innovative flavors.</p>
                        </div>
                    </div>
                    
                    {/* Chef 2 */}
                    <div className="w-full p-4">
                        <div className="bg-gray-200 p-4 rounded-lg shadow-lg w-full">
                            <img
                                src={chef2}
                                alt="Chef"
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-2xl font-semibold mb-2">Creative Culinary Artist</h2>
                            <p className="text-gray-600 mb-2">Our second chef is renowned for their inventive approach to cooking. Discover dishes that combine traditional recipes with a modern twist, delivering unique and delightful flavors.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chef;
