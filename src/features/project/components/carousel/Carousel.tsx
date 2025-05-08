'use client';

import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProjectImage } from '../../schemas';
import { SwipeButton } from './SwipeButton';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type CarouselProps = {
  images: ProjectImage[];
};

export function Carousel({ images }: CarouselProps) {
  return (
    <article className="relative">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        grabCursor
        keyboard={{ enabled: true }}
        loop
      >
        {images.map(({ id, url }) => (
          <SwiperSlide key={id}>
            <div className="relative w-full aspect-[4/3] max-h-[300px] overflow-hidden bg-blue-white">
              <Image
                src={url}
                alt="프로젝트 이미지"
                fill
                sizes="100%"
                className="object-contain group-hover:scale-105 transition-all duration-300"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
        <SwipeButton direction="left" />
        <SwipeButton direction="right" />
      </Swiper>
    </article>
  );
}
