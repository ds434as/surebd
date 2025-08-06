// Categorytable.jsx
import axios from "axios";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const Categorytable = ({ data, onEdit, onDelete }) => {
  const delete_category = (id) => {
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
          .delete(`https://surebdbackend.arbeittechnology.com/admin/delete-category/${id}`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire("Deleted!", res.data.message, "success");
              onDelete();
            }
          })
          .catch(() => {
            Swal.fire("Error", "Something went wrong!", "error");
          });
      }
    });
  };

  return (
    <motion.div
      className='border-[1px] border-[#eee] p-6 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className="text-nowrap" >
            <tr>
              <th className='px-6 py-3 text-left text-[14px] font-[700] md:text-[16px] md:font-medium text-gray-700 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-[14px] font-[700] md:text-[16px] md:font-medium text-gray-700 uppercase tracking-wider'>

                Category Products
              </th>
              <th className='px-6 py-3 text-left text-[14px] font-[700] md:text-[16px] md:font-medium text-gray-700 uppercase tracking-wider'>

                Actions
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {data.map((category) => (
              <motion.tr
                key={category._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className='px-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
                  <img
                    src={`https://surebdbackend.arbeittechnology.com/images/${category.image}`}
                    alt='Product img'
                    className='size-10 rounded-[4px]'
                  />
                  <p className='text-[16px] font-medium text-gray-700'>{category.title}</p>
                </td>

                <td className='px-1 md:px-6 py-4 whitespace-nowrap text-[16px] font-medium text-gray-700'>
                  {category.numberOfProducts}
                </td>
                <td className='px-1 md:px-6 py-4 whitespace-nowrap text-[16px] font-medium text-gray-700 flex gap-2'>
                  {/* <button className='text-indigo-500 hover:text-indigo-700' onClick={() => onEdit(category)}>
                    <Edit size={22} />
                  </button> */}
                  <button className='text-red-500 hover:text-red-700' onClick={() => delete_category(category._id)}>
                    <Trash2 size={22} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Categorytable;
