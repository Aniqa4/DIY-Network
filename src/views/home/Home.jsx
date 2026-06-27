'use client'
import { useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection";
import Categories from "./sections/categories/CategoriesLayout";
import PopularBlogs from "./sections/PopularBlogs";
import Navbar from "../../Components/Navbar";

function Home() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        className={
          scrolling
            ? "fixed left-0 right-0 top-0 z-20 bg-canvas/90 backdrop-blur-sm border-b border-canvas-dark shadow-sm"
            : "fixed left-0 right-0 top-0 z-20 bg-canvas"
        }
      >
        <Navbar />
      </div>
      <HeroSection />
      <div className="container mx-auto px-6">
        <PopularBlogs />
        <Categories />
      </div>
    </div>
  );
}

export default Home;
