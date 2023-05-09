import React, { useEffect, useState } from "react"
import {submitHandler} from "submithandler"

import Button from "../components/Button"
import { Input } from "../components/input";
import { getAccomodationDetails, searchAccommodations } from "../utils/api";

import { AccommodationCard } from "../components/accommodation"

import { useLocation } from 'react-router-dom';

const useQuery = () => new URLSearchParams(useLocation().search);

function Logo(){
  return (
    <h1 className="font-[700] text-[32px]">Barefoot</h1>
  )
}

function Hero({ setFetching, setAccommodations }){
	let url = window.location.origin

	async function update(query){
		setFetching(true)
		setAccommodations((await searchAccommodations(query)).accommodations || [])
		setFetching(false)
	}

	useEffect(() => {
		update({})
	}, [])

  return (
		<div
			className='h-[80vh] max-h-[910px] bg-center text-white p-16'
			style={{
				backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('${url}/images/index__hero.png')`,
			}}
		>
			<div className='container mx-auto flex h-full flex-col justify-between'>
				<div className='flex justify-between items-center'>
					<Logo />
					<div>
						<Button text='Sign in' className='my-2 w-full h-12 button-primary px-16' />
					</div>
				</div>
				<div>
					<h1 className='font-[900] text-[70px] tracking-[-2%] leading-[70px]'>
						Best affordable <br /> accomodations ever!
					</h1>
					<p className='pt-10 font-[300] text-[40px] tracking-[-2%] leading-[40px]'>
						For sure, you have made the right choice to <br /> save your
						reservation here!
					</p>
				</div>
				
				<form onSubmit={submitHandler(update)}>
				<div className='bg-white rounded-[4px] flex px-12 gap-16 py-6 text-black'>
						<Input.Select label="Type" name="type" options={[
							{value: null, label: "All"},
							{value: "HOTEL", label: "Hotel"},
							{value: "MOTEL", label: "Motel"},
							{value: "LODGE", label: "Lodge"}
						]} />
						<Input.Select label="Location" name="city" options={[
							{ value: null, label: "All"},
							{ value: "Kigali", label: "Kigali"},
							{ value: "Musanze", label: "Musanze"},
							{ value: "Rubavu", label: "Rubavu"},
							{ value: "Gisagara", label: "Gisagara"},
						]}/>
						<Input.Date label="Check in:" name="check_in"/>
						<Input.Date label="Check out:" name="check_out"/>
						<Button text='Search' className='my-2 w-full h-12 button-primary px-16' />
				</div>
					</form>
			</div>
		</div>
	);
}

function Accommodations({ fetching, setActiveHoteDetail, accommodations = [] }){

	if(fetching) {
		return (
			<div>
				<h1>Updating ... </h1>
			</div>
		)
	}

  return (
    <div className="container mx-auto px-2 lg:px-16">
			<div className="py-16">
				<div className="text-left">{accommodations.length} accommodations found</div>
				<div className="grid grid-cols-1 py-16 gap-8 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{accommodations.map((acc, key) => (
						<AccommodationCard setActiveHoteDetail={setActiveHoteDetail} accommodation={acc} key={key}>Hello world</AccommodationCard>
					))}
				</div>
			</div>
    </div>
  )
}

function AccommodationDetail({ id }) {
	const [{accommodation, rooms}, setDetails] = useState({
		accommodation: null, rooms: []
	})

	useEffect(() => {
		(async function () {
			let { accommodation, rooms } = await getAccomodationDetails(id)
			console.log("Working ..... ")
			setDetails({accommodation, rooms})
		})()
	}, [id])

	if(!accommodation) return <></>

	return (
		<div className="container w-full h-full mx-auto py-16 px-2 lg:px-16">
			<div className="flex gap-10">
				<div className="h-[400px] w-[400px] bg-center"  style={{
          backgroundImage: `url('${accommodation?.meta?.images?.[0] || 'https://www.pekanbaru.go.id/berkas_file/news/05062020/81702-hotel-city-buildings-landscape-view-vector-illustration-flat-cartoon_101884-215.jpg'}')`
        }}/>
				<div>
					<h1>{accommodation?.name}</h1>
					<p>{accommodation?.description}</p>
				</div>
			</div>
		</div>
	)
}

export function LandingPage(){
	const [fetching, setFetching] = useState(false)
	const [accommodations, setAccommodations] = useState([])
	
	let query = useQuery();

	const [activeAccDetail, setActiveHoteDetail] = useState(parseInt(query.get('hotel-id')) || null)

	if(activeAccDetail != null){
		return (
			<div className="bg-[#FFEADF]">
				<Hero setFetching={setFetching} setAccommodations={setAccommodations} />
				<div>
					<AccommodationDetail id={activeAccDetail}/>
				</div>
			</div>
		)
	} else {
		return (
			<div className="bg-[#FFEADF]">
				<Hero setFetching={setFetching} setAccommodations={setAccommodations} />
				<div className="min-h-[200px] text-center flex items-center justify-center w-full">
					<Accommodations fetching={fetching} setActiveHoteDetail={setActiveHoteDetail} accommodations={accommodations} />
				</div>
			</div>
		)
	}
}