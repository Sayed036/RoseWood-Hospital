import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

function SpecialityMenu() {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
    <h1 className='text-3xl font-medium'>Find by Speciality</h1>
    <p className='sm:w-1/3 text-center text-sm'>Find the right doctor from our trusted list and enjoy seamless appointment booking.</p>
    <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {specialityData.map( (item, idx)=> (
            <Link onClick={()=> scrollTo(0,0) } className='flex flex-col items-center text-xs cursor-pointer shrink-0 hover:-translate-y-2.5 transition-all duration-500' key={idx} to={`/doctors/${item.speciality}`}>

                <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                <p className='text-[#b03053]'>{item.speciality}</p>

            </Link>
        ) )}
    </div>
    </div>
  )
}

export default SpecialityMenu
