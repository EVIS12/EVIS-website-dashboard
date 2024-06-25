import { URLIcon } from '@/app/_utils/SVGIcons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  link: string;
  btn: string;
}

export default function SummaryCard({
  image,
  title,
  subtitle,
  description,
  link,
  btn,
}: Props) {
  return (
    <div className=" bg-white rounded-2xl p-8 md:p-12 lg:p-14 3xl:p-16 shadow-sm drop-shadow-lg flex flex-col items-end">
      <div className="info-row w-full flex flex-col items-center lg:items-start lg:flex-row gap-8">
        <Image
          className="w-full md:w-80 lg:w-64 3xl:w-80 object-cover rounded-xl aspect-square"
          src={image}
          alt="testimonial writer"
          width={600}
          height={600}
        />
        <div className="content w-full">
          <h2 className="text-main-dark font-semibold text-2xl md:text-4xl 3xl:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <h4 className="text-dark-gray md:text-xl 3xl:text-2xl mb-2 md:mt-4 3xl:mt-6 font-medium">
              {subtitle}
            </h4>
          )}
          <p className="text-dark-gray my-2 md:my-4 3xl:my-6 text-sm md:text-base 3xl:text-lg">
            {description}
          </p>{' '}
          <a
            className="text-dark-gray flex items-center font-semibold md:text-xl 3xl:text-2xl mb-2 md:mt-4 3xl:mt-6"
            href={link}
            target="_blank"
          >
            <URLIcon className="mr-2" /> {link}
          </a>
        </div>
      </div>
      <Link className=" main-btn mt-6 !px-14" href={btn}>
        Edit
      </Link>
    </div>
  );
}
