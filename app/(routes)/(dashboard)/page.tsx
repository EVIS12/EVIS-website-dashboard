'use client';

import { Loader } from '@/app/_components';
import {
  useGetExhibitionViewsQuery,
  useGetHomeViewsQuery,
  useGetRegionsQuery,
  useGetRegistrationViewsQuery,
  useGetTopArticlesQuery,
} from '@/app/_redux/apiService/mainApi';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Image from 'next/image';

export default function Home() {
  const { data: homeViews, isLoading: homeViewsLoading } =
    useGetHomeViewsQuery();
  const { data: exhibitionViews, isLoading: exhibitionViewsLoading } =
    useGetExhibitionViewsQuery();
  const { data: registrationViews, isLoading: registrationViewsLoading } =
    useGetRegistrationViewsQuery();
  const { data: topArticles, isLoading: topArticlesLoading } =
    useGetTopArticlesQuery();
  const { data: regions, isLoading: regionsLoading } = useGetRegionsQuery();

  const ViewsOptions = {
    chart: {
      type: 'column',
      style: {
        borderRadius: '20px',
        padding: '5px',
        backgroundColor: 'white',
      },
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y} Views',
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>',
    },

    series: [
      {
        name: 'Page',
        colorByPoint: true,
        data: [
          {
            name: 'Home Views',
            y: homeViews?.count as number,
            drilldown: 'Home Views',
            color: '#358FA0',
          },
          {
            name: 'Exhibition Views',
            y: exhibitionViews?.count as number,
            drilldown: 'Exhibition Views',
            color: '',
          },
          {
            name: 'Registration Views',
            y: registrationViews?.count as number,
            drilldown: 'Registration Views',
            color: '#25BDB9',
          },
        ],
      },
    ],
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right',
        },
      },
    },
  };

  if (
    homeViewsLoading ||
    exhibitionViewsLoading ||
    registrationViewsLoading ||
    topArticlesLoading ||
    regionsLoading
  )
    return <Loader />;

  return (
    <section className="section-pad !font-default">
      <div className="container">
        <div className="visits-analytics row gap-4 md:gap-8 mb-8">
          {[
            {
              bg: 'bg-[#358FA0]',
              pageName: 'Home Views',
              viewsNumber: homeViews?.count,
            },
            {
              bg: 'bg-[#309EA8]',
              pageName: 'Exhibition Views',
              viewsNumber: exhibitionViews?.count,
            },
            {
              bg: 'bg-[#25BDB9]',
              pageName: 'Registration Views',
              viewsNumber: registrationViews?.count,
            },
          ].map(({ bg, pageName, viewsNumber }, i) => (
            <div
              className={`col-span-4 ${bg} rounded-3xl p-4 md:p-6 text-white flex justify-between`}
              key={i}
            >
              <div className="content">
                <p className="text-xs md:text-base">{pageName}</p>
                <h3 className="mt-2 text-lg md:text-xl lg:text-2xl font-semibold">
                  {viewsNumber}
                </h3>
              </div>
              <span
                className={`hidden lg:block w-14 h-14 border-8 border-white rounded-full`}
              ></span>
            </div>
          ))}
        </div>
        <HighchartsReact highcharts={Highcharts} options={ViewsOptions} />
        <div className="row gap-6 md:gap-8 mt-8">
          <div className="col-span-12 md:col-span-6 bg-white rounded-2xl p-4 md:p-6">
            <h4 className="font-semibold md:text-lg lg:text-xl mb-4 pb-2 border-b-2 border-b-light-gray">
              Top Articles
            </h4>
            {topArticles
              ?.slice(0, 5)
              .map(({ id, title, photo, view_count }) => (
                <div className="article my-4 flex justify-between" key={id}>
                  <div className="left flex items-center">
                    <Image
                      className="w-12 h-12 rounded-md mr-2"
                      src={photo}
                      alt="article image"
                      width={40}
                      height={40}
                    />
                    <h4 className="text-main-dark text-xs md:text-sm font-semibold">
                      {title}
                    </h4>
                  </div>
                  <h3 className="text-sm md:text-base text-main-dark font-bold ml-4">
                    {view_count}
                  </h3>
                </div>
              ))}
          </div>
          <div className="col-span-12 md:col-span-6 bg-white rounded-2xl p-4 md:p-6">
            <h4 className="font-semibold md:text-lg lg:text-xl mb-4 pb-2 border-b-2 border-b-light-gray">
              Top Countries
            </h4>
            <div className="regions max-h-[458px] overflow-y-scroll">
              {regions?.map(({ id, name, registered_count }) => (
                <div className="regions my-4 flex justify-between" key={id}>
                  <h4 className="text-main-dark text-xs md:text-sm font-semibold">
                    {name}
                  </h4>

                  <h3 className="text-sm md:text-base text-main-dark font-bold ml-4">
                    {registered_count}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
