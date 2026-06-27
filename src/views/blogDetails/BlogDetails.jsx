'use client'
import { useState } from "react";
import UserAvatar from "../../Components/UserAvatar";
import { MdFavorite } from "react-icons/md";
import { TiEye } from "react-icons/ti";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../Components/Navbar";
import { HiOutlineSaveAs } from "react-icons/hi";
import EditBlog from "./EditBlog";
import { getBlogById } from "../../data/blogs";

function BlogDetails() {
  const [defaultImage, setDefaultImage] = useState(false);
  const { id } = useParams();
  const blog = getBlogById(id);

  if (!blog) {
    return (
      <div className="container mx-auto pt-10">
        <div className="fixed left-0 right-0 top-0 bg-white z-20 shadow">
          <Navbar />
        </div>
        <div className="pt-16 text-center py-20 text-gray-500">
          Blog not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-10">
      <div className="fixed left-0 right-0 top-0 bg-white z-20 shadow">
        <Navbar />
      </div>
      <div className="pt-16">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <p className="text-3xl font-semibold">{blog.blogTitle}</p>
            <Link href="/user">
              <div className="flex items-center gap-2 py-5">
                <img
                  src=""
                  alt="User Image"
                  onError={() => setDefaultImage(true)}
                  className={defaultImage ? "hidden" : "rounded-full w-8 h-8"}
                />
                {defaultImage && <UserAvatar />}
                <p className="font-semibold cursor-pointer hover:text-blue-400">
                  {blog.nameOfWriter}
                </p>
              </div>
            </Link>
            <p>
              Category:
              <span className="font-medium"> {blog.categoryName}</span>
            </p>
            <p>
              Posted on: <span className="font-medium"> 20th January 2024</span>
            </p>
            <div className="flex items-center gap-5 py-5">
              <p className="flex gap-1 items-center">
                <TiEye /> {blog.views}
              </p>
              <BsDot />
              <p className="flex gap-1 items-center">
                <MdFavorite /> {blog.likes}
              </p>
              <BsDot />
              <p className="flex gap-1 items-center">
                <HiOutlineSaveAs /> {blog.saved}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="border border-[#1c1b1b] text-center rounded py-1 px-5">
                Like
              </button>
              <button className="border border-[#1c1b1b] text-center rounded py-1 px-5">
                Save
              </button>
              <button className="border border-[#1c1b1b] text-center rounded py-1 px-5">
                Share
              </button>
              <EditBlog />
              <button className="border border-[#1c1b1b] text-center rounded py-1 px-5">
                Delete
              </button>
            </div>
          </div>
          <img
            src="https://www.lightstalking.com/wp-content/uploads/backlit-beach-color-258109-3-1024x576.jpg"
            alt="cover photo"
          />
        </div>
        <div className="py-10 flex gap-10">
          <div className="border rounded-xl p-10">
            <p className="font-semibold text-xl">Ingredients</p>
            <ol className="list-inside list-disc py-3">
              {blog.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
          <div className="border rounded-xl p-10 w-full">
            <h1 className="text-xl font-semibold pb-3">Recipe:</h1>
            <p className="text-justify">{blog.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
