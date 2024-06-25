import { FacebookIcon, LinkedinIcon, TwitterIcon } from '@/app/_utils/SVGIcons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  social_links: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  fields: [string, string | string[]][];
  btn: {
    title: string;
    link: string;
  };
}

export default function InfoDetails({
  image,
  title,
  subtitle,
  description,
  social_links,
  fields,
  btn,
}: Props) {
  return (
    <div className=" bg-white rounded-2xl p-8 md:p-12 lg:p-14 3xl:p-16 shadow-sm drop-shadow-lg flex flex-col items-end">
      <div className="info-row flex flex-col items-center lg:items-start lg:flex-row w-full">
        <Image
          className=" w-28 h-28 md:w-36 md:h-36 3xl:w-40 3xl:h-40 object-contain rounded-full mb-4 md:mb-6 lg:mb-0"
          src={image}
          alt={`${title} image`}
          width={400}
          height={400}
        />
        <div className="main-content flex flex-col w-full">
          <div className="main-info text-center md:text-start mt-4 pb-8 lg:ml-12 lg:pr-8 border-b-2 ">
            <h2 className="text-main-dark font-semibold text-2xl md:text-4xl 3xl:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <h4 className="text-dark-gray font-semibold text-lg md:text-2xl 3xl:text-3xl mb-4 md:mt-6 3xl:mt-8">
                {subtitle}
              </h4>
            )}
            <p className="text-dark-gray my-4 md:my-6 3xl:my-8 text-sm md:text-base 3xl:text-lg">
              {description}
            </p>
            <div className="links flex justify-center md:justify-start mt-6 md:mt-8 3xl:mt-10">
              {[
                {
                  icon: <FacebookIcon className="w-6 3xl:w-8" />,
                  link: social_links.facebook,
                },
                {
                  icon: <TwitterIcon className="w-6 3xl:w-8" />,
                  link: social_links.twitter,
                },
                {
                  icon: <LinkedinIcon className="w-6 3xl:w-8" />,
                  link: social_links.linkedin,
                },
              ].map(
                ({ icon, link }, i) =>
                  link && (
                    <a className=" mr-6" href={link} target="_blank" key={i}>
                      {icon}
                    </a>
                  )
              )}
            </div>
          </div>

          <div className="other-fields py-8 lg:ml-12 w-full md:w-5/12 flex flex-col justify-center">
            {fields.map(([key, value], i) =>
              key !== 'Website' ? (
                <h4
                  className=" text-dark-gray flex justify-between my-2 md:my-3 text-sm md:text-base 3xl:text-xl"
                  key={i}
                >
                  <span className="font-semibold">{key}:</span>{' '}
                  {typeof value === 'object' ? value.join(', ') : value}
                </h4>
              ) : (
                <a
                  href={value as string}
                  className=" text-dark-gray flex justify-between my-2 md:my-3 text-sm md:text-base 3xl:text-xl"
                  target="_blank"
                  key={i}
                >
                  <span className="font-semibold">{key}:</span> {value}
                </a>
              )
            )}
          </div>
        </div>
      </div>
      <Link className=" main-btn mt-6" href={btn.link}>
        {btn.title}
      </Link>
    </div>
  );
}
