import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import Header from "../components/Header";
import { FaStar } from "react-icons/fa";
import Footer from "../components/Footer";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import BuyNowModal from "../components/modal/BuyNowModal ";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Relatesproduct from "../components/home/Relatesproduct";
import toast, { Toaster } from "react-hot-toast";
import Description from "../components/reviews/Description";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

const productImages = [
  "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/Grey-3-200x200.jpg",
  "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-41-200x200.jpg",
  "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/black-17-200x200.jpg",
  "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/4-9-200x200.jpg",
  "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/3-30-200x200.jpg",
];

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedColor, setSelectedColor] = useState("black");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useLocalStorage("cart", []); // Using custom hook

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  const sizes = ["Small", "Medium", "Large"];
  const colors = ["black", "white", "red", "blue", "green"];
  
  const { id } = useParams();
  const [searchparams] = useSearchParams();
  const category = searchparams.get("category");
  const [single_product, set_single_product] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleArrow = (direction) => {
    setCurrentIndex((prev) => {
      const totalImages = single_product.images.length;
      const newIndex =
        direction === "left"
          ? (prev - 1 + totalImages) % totalImages
          : (prev + 1) % totalImages;
  
      const currentItem = single_product.images[newIndex];
      setSelectedImage(currentItem);
  
      return newIndex;
    });
  };

  // ------------------read-more--------------------
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const description = single_product?.description || "";
  const isLong = description.length > 200;

  // ------------------read-more--------------------------
  const single_data = () => {
    console.log("hello")
    axios.get(`https://surebdbackend.arbeittechnology.com/user/single-product/${id}`)
      .then((res) => {
        if (res.data) {
          set_single_product(res.data.data)
          setSelectedImage(res.data.data.images[0])
          console.log("dsfsd",res)
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  
  useEffect(() => {
    single_data();
  }, [])
  
  useEffect(() => {
    if (single_product?.images?.length > 0) {
      setSelectedImage(single_product.images[0]);
    }
  }, [single_product]);
// Function to add item to cart in localStorage
  const addToLocalCart = () => {
    const cartItem = {
      productId: single_product._id,
      name: single_product.productName,
      price: single_product.price,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      image: selectedImage,
      stock: single_product.stock || 1 // Default to 1 if stock not available
    };

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      item => item.productId === cartItem.productId && 
             item.size === cartItem.size && 
             item.color === cartItem.color
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += cartItem.quantity;
      setCart(updatedCart);
    } else {
      // Add new item if it doesn't exist
      setCart([...cart, cartItem]);
    }
    
    // Show success message
    toast.success("Product added to cart!");
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Combined function to handle both API and localStorage
  const handleAddToCart = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      
      if (userInfo) {
        // If user is logged in, use API
        const response = await axios.post("https://surebdbackend.arbeittechnology.com/user/add-to-cart", {
          userId: userInfo._id,
          productId: single_product._id,
          name: single_product.productName,
          price: single_product.price,
          quantity,
          size: selectedSize,
          color: selectedColor,
          image: selectedImage
        });

        if (response.data.success) {
          toast.success("Product added to cart successfully!");
        } else {
          toast.error("Failed to add product to cart");
        }
      } else {
        // If user is not logged in, use localStorage
        addToLocalCart();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Fallback to localStorage if API fails
      addToLocalCart();
    }
  };

  // Sync cart across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        setCart(JSON.parse(e.newValue) || []);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', () => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(savedCart);
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', () => {});
    };
  }, [setCart]);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <section className="px-4 md:px-[50px] lg:px-[100px] xl:px-[150px] animate-pulse">
      <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 md:gap-[50px] lg:gap-[80px]">
        {/* Image Section Skeleton */}
        <div className="md:w-1/2">
          <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg mb-4"></div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        
        {/* Details Section Skeleton */}
        <div className="md:w-1/2 space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
          
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 w-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-8 bg-gray-200 rounded-full"></div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 flex-1 bg-gray-200 rounded"></div>
          </div>
          
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    </section>
  );

  if (!single_product?.images?.length) {
    return (
      <section className="font-baji">
        <Header />
        <SkeletonLoader />
        <Footer />
      </section>
    );
  }

  
  return (
    <section className="font-baji ">
      <Header />
      <Toaster />
      <section className="px-4 md:px-[50px] lg:px-[100px] xl:px-[150px]">
        <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 md:gap-[50px] lg:gap-[80px]">
          {/* Product Image Section */}
          <div className="flex flex-col items-center md:w-1/2">
            {/* Main Product Image */}
            <div className="p-[15px] flex justify-center items-center w-full">
              {selectedImage && (
                <Zoom>
                  <img
                    src={`https://surebdbackend.arbeittechnology.com/images/${selectedImage}`}
                    alt="Product"
                    className="w-[80%] md:w-[60%] object-cover block m-auto rounded-lg cursor-zoom-in"
                  />
                </Zoom>
              )}
            </div>

            {/* Thumbnails */}
            <div className="relative w-full">
              <div className="flex justify-center items-center gap-2 mt-3">
                <button onClick={() => handleArrow("left")}>
                  <FaChevronLeft className="text-xl cursor-pointer" />
                </button>
                
                <div className="flex overflow-hidden gap-2">
                  <AnimatePresence initial={false}>
                    {single_product.youtubeVideo !== "" && (
                      <div
                        onClick={openModal}
                        className="w-[70px] md:w-[90px] lg:w-[100px] h-[70px] md:h-[90px] lg:h-[100px] bg-red-600 rounded-[5px] cursor-pointer flex items-center justify-center shadow-lg hover:bg-red-700 transition"
                      >
                        <FaPlay className="text-white text-2xl md:text-3xl lg:text-4xl ml-[4px]" />
                      </div>
                    )}

                    {/* Video Modal */}
                    {isOpen && (
                      <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-lg w-[90%] max-w-3xl relative">
                          <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-red-600 text-2xl"
                          >
                            &times;
                          </button>
                          <div className="aspect-w-16 aspect-h-9">
                            <iframe
                              className="w-full h-[400px]"
                              src={single_product.youtubeVideo}
                              title="YouTube Video"
                              frameBorder="0"
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    )}
                    {single_product.images.map((item, index) => {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={`https://surebdbackend.arbeittechnology.com/images/${item}`}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-[70px] md:w-[90px] lg:w-[100px] h-[70px] md:h-[90px] lg:h-[100px] border-[1px] rounded-[5px] cursor-pointer object-cover ${
                              selectedImage === item
                                ? "border-green-500"
                                : "border-gray-300"
                            }`}
                            onClick={() => setSelectedImage(item)}
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <button onClick={() => handleArrow("right")}>
                  <FaChevronRight className="text-xl cursor-pointer" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">
              {single_product?.productName}
            </h1>
            <h3 className="mb-3 md:mb-4 text-sm md:text-base text-gray-700 font-medium">{single_product?.category}</h3>
            <div className="flex justify-start items-center mb-2 md:mb-3 gap-3 md:gap-5">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">৳{single_product?.price}</p>
              {single_product?.oldPrice && 
                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-400 line-through">৳{single_product?.oldPrice}</p>
              }
            </div>
            <div>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                {showFullDescription || !isLong
                  ? description
                  : `${description.slice(0, 200)}`}
                {isLong && (
                  <button
                    onClick={toggleDescription}
                    className="text-indigo-600 ml-[5px] hover:underline text-sm font-medium mt-1"
                  >
                    {showFullDescription ? "Show Less" : "Read More"}
                  </button>
                )}
              </p>
            </div>

            {/* Stock Info */}
            <div className="flex justify-start items-center gap-2 mt-3 md:mt-4">
              <div className="p-[3px] rounded-full bg-green-400 text-white text-sm">
                <FaCheck />
              </div>
              <p className="text-sm md:text-base text-gray-700">
                In Stock
              </p>
            </div>
            
            {single_product.sizes?.length > 0 && (
              <div className="mt-3 md:mt-4">
                <label className="block font-semibold text-sm md:text-lg mb-2">Special Tags:</label>
                <div className="flex gap-2 md:gap-3">
                  {single_product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 md:px-4 py-1 md:py-2 border rounded-lg ${
                        selectedSize === size ? "bg-indigo-600 text-white" : "bg-white"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {single_product.colors?.length > 0 && (
              <div className="mt-3 md:mt-4">
                <label className="block font-semibold text-sm md:text-lg mb-2">Color:</label>
                <div className="flex gap-2">
                  {single_product.colors.map((color) => (
                    <span
                      key={color}
                      className={`block w-6 md:w-8 h-6 md:h-8 rounded-full border cursor-pointer ${
                        selectedColor === color ? "ring-2 ring-indigo-600" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Buy Now Button */}
            <div className="mt-3 md:mt-4 flex items-center gap-3 md:gap-4 w-full">
              <div className="flex items-center border w-auto">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-lg font-bold"
                >
                  <FaMinus />
                </button>
                <span className="px-4 md:px-6 py-1 md:py-2 text-sm md:text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-lg font-bold"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="flex justify-center gap-2 w-full">
                <button
                  onClick={handleAddToCart}
                  className="bg-gray-100 w-full text-black px-4 md:px-6 py-2 md:py-3 flex items-center justify-center gap-2 rounded text-sm md:text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 active:scale-95"
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="mt-3 md:mt-4">
              <BuyNowModal product={single_product} quantity={quantity} />
            </div>
          </div>
        </div>
      </section>
      
      <Description data={single_product} />
      <Relatesproduct category_name={category} />
      <Footer />
    </section>
  );
}