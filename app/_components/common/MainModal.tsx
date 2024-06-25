'use client';

import React from 'react';
import ReactModal from 'react-modal';

interface Props {
  children: React.ReactNode;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainModal({
  children,
  modalOpen,
  setModalOpen,
}: Props) {
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 50,
        },
      }}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
}
