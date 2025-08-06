
export default function TopCategories() {
  return (
<div className="w-full font-baji px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-36 py-6 sm:py-8 md:py-10">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {/* Sidebar */}
    <div className="bg-cover bg-center text-white p-4 sm:p-5 md:p-6 bg-[url('https://images.pexels.com/photos/2608495/pexels-photo-2608495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2">Category</h3>
      <ul className="space-y-2 text-xs sm:text-sm md:text-base">
        <li>MI headphone</li>
        <li>Bluetooth AirPods</li>
        <li>Music system</li>
        <li>JBL bar 5.1</li>
        <li>Edifier Computer Speaker</li>
        <li>Macbook pro</li>
        <li>Men's watch</li>
        <li>Washing machine</li>
      </ul>
    </div>
    
    {/* Categories */}
    <div className="md:col-span-3">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-left">Top Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { title: "Men's Watches", img: "https://template.fullstackdeveloper.co.il/stowaa/assets/images/categories/xcategory_1.png.pagespeed.ic.ntdeefcB00.webp" },
          { title: "IPad", img: "https://template.fullstackdeveloper.co.il/stowaa/assets/images/categories/xcategory_2.png.pagespeed.ic.AxDBK29XoV.webp" },
          { title: "IPhone", img: "https://template.fullstackdeveloper.co.il/stowaa/assets/images/categories/xcategory_3.png.pagespeed.ic.1kNyuUOuuD.webp" },
        ].map((item, index) => (
          <div key={index} className="text-center border border-[#eee] p-3 sm:p-4 transition-all duration-300 hover:shadow-md">
            <img 
              src={item.img} 
              alt={item.title} 
              width={150} 
              height={150} 
              className="mx-auto rounded-lg w-28 sm:w-36 md:w-40 lg:w-48"
            />
            <p className="mt-2 font-semibold text-sm sm:text-base md:text-lg">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
}
