import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/user/appointments", {headers:{token} } )

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log("bhai appointment list mil gya :",data.appointments)
      } else {
        console.error("Failed to fetch appointments:", data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }
  }

  // cancel appointment function can be added here
  const cancelAppointment = async (appointmentId) => {
    try {
      // console.log(appointmentId)
      const {data} = await axios.post(backendUrl + "/api/user/cancel-appointment", {appointmentId}, {headers:{token} } )
      if (data.success) {
        toast.success(data.message);
        console.log(data.message)
        // refresh appointments list
        getUserAppointments();
        getDoctorsData() // jb appointment cancel hoga to doctor ke slots bhi update hone chahiye, isliye ye function call kar rahe hain
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("cancel appointments(catch-error) me dikkat h re babah :", error);
      toast.error(error.message);
    }
  }

  const initPay = (order)=> {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "RoseWood Hospital Payment",
      description: "Appointement Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const {data} = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, {headers:{token} } )

          if(data.success)
          {
            getUserAppointments()
            navigate('/my-appointments')
            toast.success(data.message)
          }

        } catch (error) {
          console.log(error)
          toast.error("Payment verification failed")
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }


  // controller fucntion for razorpay
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl + "/api/user/payment-razorpay", {appointmentId}, {headers:{token} } )
      
      if(data.success)
      {
        // console.log(data.order)
        initPay(data.order);
      }
    } catch (error) {
      console.log("Init pay me error aaya hai : ",error)
    }
  }


  useEffect( ()=> {
    if(token)
    {
      getUserAppointments();
    }
  } , [token])

  return (
    <div>
      <p className="pb-3 mt-12 font-bold text-2xl text-zinc-700 border-b border-gray-300">My Appointments</p>
      <div>
        {appointments.map((item, idx) => {
          return (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300" key={idx}>
              <div>
                <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
              </div>

              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-sm">{item.docData.address.line1}</p>
                <p className="text-sm">{item.docData.address.line2}</p>
                <p className="text-sm mt-1">
                  {" "}
                  <span className="text-sm font-medium text-neutral-700">Date & Time:</span> {item.slotDate} | {item.slotTime}{" "}
                </p>
              </div>

              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>}
                {!item.cancelled && !item.payment && <button onClick={()=> appointmentRazorpay(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-emerald-400 hover:text-white transition-all duration-300 cursor-pointer">Pay Online</button>}
                {!item.cancelled && <button onClick={()=> cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-400 hover:text-white transition-all duration-300 cursor-pointer">Cancel Appointment</button>}
                {item.cancelled && <p className="sm:min-w-48 py-2  rounded text-red-600 font-semibold">Appointment Cancelled</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
