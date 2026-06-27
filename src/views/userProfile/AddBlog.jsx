'use client'
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";

function AddBlog() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      {/* Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
        className="text-2xl text-blue-600 hover:text-blue-800 transition-all"
      >
        <BsPlusCircle />
      </button>

      {/* Modal Overlay + Content */}
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-300 ${
          showModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={() => setShowModal(false)}
        ></div>

        {/* Modal */}
        <div
          className={`relative z-50 w-11/12 max-w-lg bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 ${
            showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Add New Blog</h2>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter blog title"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select category</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="tech">Tech</option>
            </select>
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Ingredients
            </label>
            <div className="relative">
              <input
                placeholder="type ingredients here"
                className="w-full border border-gray-300 rounded-md p-2  resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className=" absolute bg-blue-600 right-0 top-0 bottom-0 px-5 rounded-e text-white">Add</button>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              placeholder="Write your blog content here"
              className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
