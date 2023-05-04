import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import { getAllAccomodations } from '../utils/api'
// import Dashboard from './Dashboard';

export default function Accomodations() {

    const [accomodations, setAccomodations] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function get() {
            setLoading(true);
            const data = await getAllAccomodations();
            setAccomodations(data?.accommodations)
            setLoading(false);
        }
        get()
    }, [])

    return (
        <>
            <h2 className='font-bold pb-8'>New Accomodations</h2>
            <div className='flex justify-start gap-10 flex-wrap'>
                {loading ? (
                    <p>Loading ....</p>
                ) : (
                    accomodations.map(accomodation => (
                        <HotelCard accomodation={accomodation} />

                    ))
                )}
            </div></>
    )
}
