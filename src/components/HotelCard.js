import React from 'react'

export default function HotelCard({ accomodation }) {
    return (
        <div className="w-[289px] bg-white rounded-lg overflow-hidden shadow-lg">
            <img className="w-full" src="/images/hotel.png" alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-base mb-2">{accomodation?.name}</div>
                <div className='flex gap-2 items-center'>
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0.875C3.72409 0.876447 2.50085 1.38394 1.59865 2.28615C0.696442 3.18835 0.188947 4.41159 0.1875 5.6875C0.1875 9.80547 4.5625 12.9155 4.74898 13.0457C4.82255 13.0972 4.91018 13.1249 5 13.1249C5.08982 13.1249 5.17745 13.0972 5.25102 13.0457C5.4375 12.9155 9.8125 9.80547 9.8125 5.6875C9.81105 4.41159 9.30356 3.18835 8.40135 2.28615C7.49915 1.38394 6.27591 0.876447 5 0.875ZM5 3.9375C5.34612 3.9375 5.68446 4.04014 5.97225 4.23243C6.26003 4.42472 6.48434 4.69803 6.61679 5.0178C6.74924 5.33757 6.7839 5.68944 6.71637 6.02891C6.64885 6.36837 6.48218 6.68019 6.23744 6.92494C5.99269 7.16968 5.68087 7.33635 5.34141 7.40387C5.00194 7.4714 4.65007 7.43674 4.3303 7.30429C4.01053 7.17183 3.73722 6.94753 3.54493 6.65975C3.35264 6.37196 3.25 6.03362 3.25 5.6875C3.25 5.22337 3.43437 4.77825 3.76256 4.45006C4.09075 4.12187 4.53587 3.9375 5 3.9375Z" fill="#E66B31" />
                    </svg>

                    <p className="text-gray-700 text-sm">
                        {accomodation?.location.city}{", "}{accomodation?.location.country}
                    </p>
                </div>
            </div>
        </div>
    )
}
