'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowIcon, BurgerIcon, CloseIcon, Logo } from '../../_utils/SVGIcons';
import { navLinks } from '../../_utils/info';

export default function Navbar() {
  const [visible, setVisible] = useState<boolean>(false);
  const pathname = usePathname();

  // handle dropdown menu
  const toggleMenus = (name: string) => {
    const menu = document.getElementById(`${name}-menu`);
    const arrow = document.querySelector(`.${name}-arrow`);
    if (menu?.classList.contains('show')) {
      menu?.classList.remove('show');
      arrow?.classList.remove('-rotate-180');
      arrow?.classList.add('rotate-0');
    } else {
      menu?.classList.add('show');
      arrow?.classList.remove('rotate-0');
      arrow?.classList.add('-rotate-180');
    }
  };

  return (
    <>
      {/* Open btn */}
      <button
        className="lg:hidden absolute left-[5%] top-2 my-3"
        onClick={() => setVisible(true)}
        name="toggle-btn"
        title="Toggle Button"
      >
        <BurgerIcon className="w-8" />
      </button>
      {/* Side nav */}
      <aside
        className={`bg-white overflow-y-auto overflow-x-hidden special-scrollbar w-[55%] md:w-[25%] lg:w-1/6 h-screen z-20 fixed lg:sticky top-0 flex flex-col items-center p-10 shadow-md drop-shadow-xl all-elements ${
          visible ? 'translate-x-0' : '-translate-x-[110%]'
        } lg:translate-x-0 transition duration-300`}
      >
        {/* Close btn */}
        <button
          onClick={() => setVisible(false)}
          name="close-btn"
          title="Close side bar button"
        >
          <CloseIcon className="mb-4 w-6 md:w-8 lg:hidden" />
        </button>
        <Link href={'/'} title="Home Link">
          <Logo className="w-32 md:w-40 3xl:w-52 mb-4 md:mb-6 3xl:mb-8" />
        </Link>
        <nav className="flex flex-col">
          {navLinks.map(({ name, link, icon, subRoutes }, i) =>
            subRoutes ? (
              // Link with dropdown
              <div className="sub-links" key={i}>
                <button
                  className="flex items-center outline-none md:text-lg 3xl:text-2xl text-main-dark font-semibold hover:bg-[#ebebeb] py-2 px-3 md:py-3 md:px-5 rounded-3xl transition-all"
                  onClick={() => toggleMenus(name)}
                >
                  {icon} <span className="ml-2">{name}</span>{' '}
                  <ArrowIcon
                    className={`${name}-arrow transition-all duration-200 w-6 ml-2`}
                  />
                </button>
                <div
                  id={`${name}-menu`}
                  className={`h-0 overflow-hidden [&.show]:h-fit transition-all duration-300`}
                >
                  {/* [300px] [&.show]:md:h-[340px] [&.show]:lg:h-[340px] [&.show]:3xl:h-[340px] */}
                  {subRoutes.map(({ name, link }, z) => (
                    <Link
                      className={`my-2 ml-8 flex items-center text-sm md:text-base 3xl:text-xl text-main-dark ${
                        pathname.split('/').slice(0, 3).join('/') === link &&
                        'bg-[#F2FAFA]'
                      } hover:bg-[#f5f5f5] py-2 px-3 rounded-3xl transition-all`}
                      href={link}
                      key={z}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              // default link
              <Link
                className={`my-2 flex items-center md:text-lg 3xl:text-2xl text-main-dark font-semibold ${
                  pathname.split('/').slice(0, 2).join('/') === link &&
                  'bg-light-green'
                } hover:bg-[#ebebeb] py-2 px-3 md:py-3 md:px-5 rounded-3xl transition-all`}
                href={link ?? ''}
                key={i}
              >
                {icon} <span className="ml-2">{name}</span>
              </Link>
            )
          )}
        </nav>
      </aside>
    </>
  );
}
