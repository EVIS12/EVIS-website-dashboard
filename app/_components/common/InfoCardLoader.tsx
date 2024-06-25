import React from 'react';
import { InfoCard } from '..';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function InfoCardLoader() {
  return [...Array(6)].map((_item, i) => (
    <InfoCard
      id={i.toString()}
      image={<Skeleton className="w-12 aspect-square rounded-full" />}
      title={<Skeleton className=" !w-32 block" />}
      subtitle={<Skeleton className="!w-28" />}
      key={i}
    />
  ));
}
