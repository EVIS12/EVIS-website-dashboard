import React from 'react';
import Link from 'next/link';

interface Props {
  title: string;
  btn?: {
    title: string;
    link?: string;
    target?: string;
    setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function PagesHead({ title, btn }: Props) {
  return (
    <div className="head flex justify-between items-center">
      <h2 className="page-title" dangerouslySetInnerHTML={{ __html: title }} />

      {btn &&
        (btn?.link ? (
          <Link className="main-btn" href={btn.link} target={btn.target}>
            {btn.title}
          </Link>
        ) : (
          //@ts-ignore
          <button
            className="main-btn"
            onClick={() => btn?.setModalOpen && btn?.setModalOpen(true)}
          >
            {btn.title}
          </button>
        ))}
    </div>
  );
}
