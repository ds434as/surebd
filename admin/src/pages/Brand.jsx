import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Brandtable from "../components/brand/Brandtable";
import EditModal from "../components/brand/EditModal";
import { AiOutlinePlus } from "react-icons/ai";
import Header from "../components/common/Header";
import toast,{Toaster} from "react-hot-toast"
const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  // Fetch all brands
  const fetchBrands = () => {
    axios
      .get("https://surebdbackend.arbeittechnology.com/admin/brands")
      .then((res) => {
        if (res.data.success) {
          setBrands(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle the "Edit" button click
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  // Handle deleting a brand
  const deleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://surebdbackend.arbeittechnology.com/admin/delete-brand/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.success) {
              Swal.fire("Deleted!", res.data.message, "success");
              fetchBrands(); // Re-fetch brands after deletion
            }
          })
          .catch((err) => {
            Swal.fire("Error", "Something went wrong!", "error");
            console.error(err);
          });
      }
    });
  };
  const [title, setTitle] = useState('');
  const [numberOfProducts, setNumberOfProducts] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("numberOfProducts", numberOfProducts);
    if (image) formData.append("file", image);

    axios.post('https://surebdbackend.arbeittechnology.com/admin/add-brand', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        toast.success(response.data.message)
        setShowModal(false)
        console.log(response.data);
        fetchBrands();
        // Handle success (show success message, reset form, etc.)
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div className="w-full overflow-y-auto font-baji">
      <Toaster/>
     <div className="flex">
  
   <div className="flex w-full justify-between items-center mb-6">

           <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-0'>Brand List</h1>
                <button
        onClick={() => setShowModal(true)} // Open modal on button click
        className='flex items-center bg-green-500 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-[5px] shadow-md transition text-sm sm:text-base'

      >
        <AiOutlinePlus className="mr-2" /> Add Brand
      </button>
      </div>
      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex text-gray-800 items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Add New Brand</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Brand Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter brand title"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Number of Products</label>
                <input
                  type="number"
                  value={numberOfProducts}
                  onChange={(e) => setNumberOfProducts(e.target.value)}
                  placeholder="Enter number of products"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Brand Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)} // Close modal
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Add Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
      <Brandtable
        brands={brands}
        onEditClick={handleEditClick}
        onDeleteClick={deleteCategory}
      />
      {showEditModal && (
        <EditModal
          category={selectedCategory}
          onClose={() => setShowEditModal(false)}
          onSave={() => {
            fetchBrands();
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Brand;
