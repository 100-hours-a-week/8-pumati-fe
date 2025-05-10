'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwipeButton } from './SwipeButton';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type CarouselProps = {
  pagination?: boolean;
  children: React.ReactNode[];
};

export function Carousel({ children, pagination = true }: CarouselProps) {
  return (
    <article className="relative">
      <Swiper
        modules={pagination ? [Pagination, Navigation] : [Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={pagination ? { clickable: true } : false}
        grabCursor
        keyboard={{ enabled: true }}
        loop
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
        <SwipeButton direction="left" />
        <SwipeButton direction="right" />
      </Swiper>
    </article>
  );
}
