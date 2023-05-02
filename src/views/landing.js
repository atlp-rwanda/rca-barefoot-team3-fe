import React from "react"

import Button from "../components/Button"
import { Input } from "../components/input";

function Logo(){
  return (
    <h1 className="font-[700] text-[32px]">Barefoot</h1>
  )
}

function Hero(){
  let url =  window.location.href

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
						<Button text='Sign in' className='px-10' />
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
				<div className='bg-white rounded-[4px] flex px-12 gap-16 text-black'>
					<Input.Select />
					<Input.Select />
					<Input.Date />
					<Input.Date />
				</div>
			</div>
		</div>
	);
}

function Accommodations(){
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

export function LandingPage(){
  return (
    <div>
      <Hero />
      <Accommodations />
    </div>
  )
}