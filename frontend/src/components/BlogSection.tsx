import { FaCalendarAlt, FaTag, FaUser } from "react-icons/fa";
import chicago1 from "../assets/chicago-1.jpg"
import chicago2 from "../assets/chicago-02.jpg"
import pool from "../assets/ibadan.jpg"
import losangeles11 from "../assets/los-angeles-11.jpg"

type BlogPost = {
  id: number;
  title: string;
  date: string;
  tag: string;
  author: string;
  image: string;
  excerpt: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Quick Tips About Business Development",
    date: "March 9, 2016",
    tag: "Real Estate",
    author: "Martin Moore",
    image: chicago1,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec...",
  },
  {
    id: 2,
    title: "14 Common Misconceptions About Business Development",
    date: "March 9, 2016",
    tag: "Real Estate",
    author: "Martin Moore",
    image: chicago2,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec...",
  },
  {
    id: 3,
    title: "10 Quick Tips About Real Estate",
    date: "March 9, 2016",
    tag: "Real Estate",
    author: "Martin Moore",
    image: pool,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec...",
  },
  {
    id: 4,
    title: "15 Best Blogs To Follow About Real Estate",
    date: "March 9, 2016",
    tag: "Real Estate",
    author: "Martin Moore",
    image: losangeles11,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec...",
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 px-6 bg-gray-100 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-2 font-display">
        Updates From Our Blog
      </h2>
      <p className="text-gray-500 mb-12 max-w-2xl
        mx-auto text-lg font-body">
        Choose from different listing templates and lay
        them out as lists or grids, full-width or boxed
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 font-body
        lg:grid-cols-4 gap-8 max-w-7xl mx-auto text-left">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded shadow-md overflow-hidden flex flex-col">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="text-sm text-gray-500 flex
                items-center space-x-3 mb-2 font-body">
                <span className="flex items-center space-x-1">
                  <FaCalendarAlt className="text-gray-400" />
                  <span>{post.date}</span>
                </span>
                <span className="flex items-center space-x-1 text-green-600">
                  <FaTag />
                  <span>{post.tag}</span>
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              <a
                href="#"
                className="text-green-600 font-medium text-sm hover:underline"
              >
                Continue reading
              </a>
            </div>

            <div className="border-t px-5 py-3 text-sm text-gray-500 flex items-center space-x-2">
              <FaUser />
              <span>by {post.author}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}