import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

const Brandtable = ({ brands, onEditClick, onDeleteClick }) => {
  return (
    <motion.div
      className="border-[1px] border-[#eee] px-2 py-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
   

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="text-nowrap">
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

          <tbody className="divide-y divide-gray-200">
            {brands.map((category) => (
              <motion.tr
                key={category._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  <img
                    src={`https://surebdbackend.arbeittechnology.com/images/${category.image}`}
                    alt="Product img"
                    className="size-10 rounded-[4px]"
                  />
                  <p className="text-[16px] font-medium text-gray-700">{category.title}</p>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-gray-700">
                  {category.numberOfProducts}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[16px] font-medium text-gray-700">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => onEditClick(category)} // Trigger edit modal here
                  >
                    <Edit size={24} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => onDeleteClick(category._id)} // Trigger delete
                  >
                    <Trash2 size={24} />
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

export default Brandtable;
