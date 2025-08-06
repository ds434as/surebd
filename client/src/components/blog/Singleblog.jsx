import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import 'react-medium-image-zoom/dist/styles.css'

export default function Singleblog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://surebdbackend.arbeittechnology.com/admin/blog/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <section className="font-baji">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </section>
    );
  }

  if (error) {
    return (
      <section className="font-baji">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
        <Footer />
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="font-baji">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Blog not found</p>
        </div>
        <Footer />
      </section>
    );
  }

  // Format the date
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="font-baji">
      <Header />
      <Toaster />

      <main className="min-h-screen px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] py-[20px] xl:pb-[50px]">
        <div className="w-full mx-auto">
          <article className="bg-white  overflow-hidden">
            {/* Blog Image */}
            <div className="h-64 sm:h-80 md:h-96 overflow-hidden">
              <img 
                src={`https://surebdbackend.arbeittechnology.com/images/${blog.image}`} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className=" py-4 md:py-8">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {blog.category}
                </span>
                <time className="text-gray-500 text-sm">{formattedDate}</time>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>

              <p className="text-gray-700 italic mb-6">{blog.excerpt}</p>

              <div className="prose max-w-none text-gray-700">
                {blog.content.split('\r\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </section>
  );
}