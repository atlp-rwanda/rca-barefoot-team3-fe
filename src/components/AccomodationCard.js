import React from 'react';

export default function AccomodationCard({
  name, province, district, type, bookedRooms, availableRooms, onClick, id,
}) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className=" ml-[0.7%] w-[96%] border-b-[1px] border-[#424242] h-[130px] pb-2 space-x-6 flex flex-row justify-start overflow-hidden items-center  relative">
      <div className="mt-[11px] flex items-center  rounded">

        <input type="checkbox" className="form-checkbox h-5 w-5 border-white" />
      </div>
      <div className=" h-[30px] mt-[-17px] w-24 ">
        <img className="rounded-[5px] object-cover object-center" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Hotel" />
      </div>
      <div className="  mt-[24px] w-[120px] flex flex-col justify-center items-start  ">
        <h1 className="font-inter font-normal text-base leading-5 text-[#1976D2]">
          {province}
          {' '}
          {district}
        </h1>
        <p className="font-inter font-bold text-sm leading-5">{name}</p>
      </div>
      <div className="font-inter font-normal text-sm leading-5 mt-[11px] flex w-[90px] justify-center overflow-hidden items-center">
        <span>
          {' '}
          {type}
        </span>
      </div>
      <div className="text-black  mt-[11px] flex w-[80px] justify-center overflow-hidden items-center">
        <span>
          {' '}
          {availableRooms}
        </span>
      </div>
      <div className="text-black mt-[11px] flex w-[110px] justify-center overflow-hidden items-center">
        <span>
          {' '}
          {bookedRooms}
        </span>
      </div>
      {
        availableRooms > 0 ? (
          <div className="text-[#008000] w-[120px] mt-[11px] flex justify-center overflow-hidden items-center">
            <span> Available</span>
          </div>
        ) : (
          <div className="text-[#FF0202] w-[120px] mt-[11px] flex justify-center overflow-hidden items-center">
            <span> Booked</span>
          </div>
        )
      }

      <div className=" flex flex-row mt-[11px]  space-x-8 justify-start w-[190px] ">
        <div className=" bg-[#1976D2] h-[30px] cursor-pointer w-[70px] flex justify-center overflow-hidden items-center
         rounded-[3px]"
        >
          <span className="text-white"> Edit</span>
        </div>
        <button
          className=" bg-[#FF0202] h-[30px] cursor-pointer w-[80px] flex justify-center overflow-hidden items-center
         rounded-[3px] text-white"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
