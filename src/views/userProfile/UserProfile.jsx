'use client'
import Navbar from "../../Components/Navbar";
import BlogCard from "../../Components/BlogCard";
import Avatar from "../../assets/user.jpg";
import AddBlog from "./AddBlog";

function UserProfile() {
  return (
    <div className="container mx-auto">
      <div className=" fixed left-0 right-0 top-0 bg-white z-20 shadow">
        <Navbar />
      </div>
      <div className="py-16">
        <div className="relative">
          <div className="w-full h-96 rounded-b-xl bg-[#8b91c3]"></div>
          <div className=" absolute left-10 -bottom-[25%]">
            <img src={Avatar.src} alt="dp" className=" w-48 h-48 rounded-full" />
          </div>
        </div>
        <div className="ps-60 py-5 flex justify-between">
          <p className="text-xl font-semibold">Name</p>
          <div className="flex items-center gap-5">
            <AddBlog />
            <p>100 Followers</p>
            <p>100 Following</p>
            <button className="bg-[#1c1b1b] text-white px-5 rounded py-1">
              Follow
            </button>
            <button className="bg-[#1c1b1b] text-white px-5 rounded py-1">
              Message
            </button>
          </div>
        </div>
      </div>
      <div className="border p-5">
        <h1 className="pb-5 uppercase">Blogs</h1>
        <div className="grid grid-cols-5 gap-5">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
