import React from 'react';
import Button from './Button';

export function AccommodationCard({ accommodation, setActiveHoteDetail }) {
  return (
    <div className="bg-white rounded-[5px] overflow-hidden">
      <div>
        <div
          className="h-[250px] bg-center"
          style={{
            backgroundImage: `url('${accommodation?.meta?.images?.[0] || 'https://www.pekanbaru.go.id/berkas_file/news/05062020/81702-hotel-city-buildings-landscape-view-vector-illustration-flat-cartoon_101884-215.jpg'}')`,
          }}
        />
      </div>
      <div className="text-left p-5">
        <div className="font-[700] text-[18px]">
          {accommodation.name}
        </div>
        <div>
          <Button
            className="my-2 w-full h-12 button-primary px-16"
            text="Book now"
            handleClick={() => {
              setActiveHoteDetail(accommodation.id);
              window.history.pushState({}, undefined, `/?hotel-id=${accommodation.id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
