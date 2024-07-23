import heroImage from "../assets/heroImage.png"; // Adjust the path as per your project structure

function Hero() {
  return (
    <section
      className="relative md:h-[90vh] h-[60vh] bg-no-repeat bg-cover mt-18 flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="bg-black bg-opacity-50 absolute inset-0 z-0"></div>
      <div className="relative z-10 lg:w-1/2 w-full text-white text-center px-6 md:px-12">
        <h1 className="mb-6 text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          Delicious Food Delivered Fast
        </h1>
        <p className="mb-6 text-sm md:text-xl text-gray-300">
          Experience the best in local cuisine delivered right to your door.
          <span className="block lg:inline"> Whether it's lunch, dinner, or breakfast, we've got you covered.</span>
        </p>
        <p className="mb-6 text-xs md:text-lg text-gray-300">
          Our chefs use the freshest ingredients to craft mouth-watering dishes that will leave you craving more. From local favorites to international delights, we offer a wide range of options to satisfy your taste buds.
        </p>
       
        <a
          href="#"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-orange-700 rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Order Now
          <svg
            className="w-4 h-4 ml-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Hero;
