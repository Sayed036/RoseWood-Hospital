import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext.jsx'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { assets } from '../../assets/assets.js';

function DoctorAppointment() {

    const {dToken, appointments, getAppointments, completeAppointment, cancelAppointment} = useContext(DoctorContext);
    const {calculateAge, currency} = useContext(AppContext);

    useEffect( ()=> {
        if(dToken){
            getAppointments();
        }
    },[dToken] )

  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointments</p>

        <div className='bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>
            <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-200'>
                <p>#</p>
                <p>Patient</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Fees</p>
                <p>Actions</p>
            </div>

            {
                appointments.reverse().map( (item, idx) => (
                    <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 ' key={idx}>
                        <p className='max-sm:hidden'>{idx+1}</p>
                        <div className='flex items-center gap-3'>
                            <img 
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shadow-sm" 
                                src={item.userData.image || "/default-avatar.jpg"} 
                                alt={item.userData.name || "Patient"} 
                            />
                            <p className="font-medium text-gray-800">{item.userData.name}</p>
                        </div>
                        <div>
                            <p className='text-xs inline border border-[#b03053] px-2 rounded-full'>
                                {item.payment ? 'Online' : 'Cash'}
                            </p>
                        </div>
                        <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                        <p>{item.slotDate}, {item.slotTime} </p>
                        <p>{currency}{item.amount}</p>
                        {
                            item.cancelled ? (
                                <p className="text-red-600 font-medium">Cancelled</p>
                            ) : item.isCompleted ? (  // ← yahan isComplete nahi, isCompleted hoga shayad
                                <p className="text-green-600 font-medium">Completed</p>
                            ) : (
                                <div className="flex gap-4 items-center">
                                <img
                                    onClick={() => cancelAppointment(item._id)}
                                    className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
                                    src={assets.cancel_icon}
                                    alt="Cancel"
                                />
                                <img
                                    onClick={() => completeAppointment(item._id)}
                                    className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
                                    src={assets.tick_icon}
                                    alt="Complete"
                                />
                                </div>
                            )
                        }
                        
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default DoctorAppointment
