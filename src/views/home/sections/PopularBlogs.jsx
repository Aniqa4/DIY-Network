'use client'
import Title from "../../../Components/Title";
import BlogCard from "../../../Components/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { blogs } from "../../../data/blogs";

function PopularBlogs() {
  const popular = blogs.filter((b) => b.views > 2000);

  return (
    <section id="popular" className="py-14 border-b border-canvas-dark">
      <Title title="Popular Now" />
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.15}
        spaceBetween={16}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        breakpoints={{
          540:  { slidesPerView: 2.1, spaceBetween: 16 },
          768:  { slidesPerView: 2.4, spaceBetween: 16 },
          1024: { slidesPerView: 3.2, spaceBetween: 20 },
          1280: { slidesPerView: 4.1, spaceBetween: 20 },
        }}
      >
        {popular.map((blog) => (
          <SwiperSlide key={blog.id}>
            <BlogCard
              id={blog.id}
              blogTitle={blog.blogTitle}
              nameOfWriter={blog.nameOfWriter}
              description={blog.description}
              categoryName={blog.categoryName}
              views={blog.views}
              likes={blog.likes}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default PopularBlogs;
