import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

function DoctorDashBoard() {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-500">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* // panel for latest bookings */}
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0 border-gray-200">
            {dashData.latestAppointments.map((item, idx) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={idx}
              >
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-gray-300"
                  src={item.userData.image || "/default-avatar.jpg"}
                  alt={item.userData.name || "Patient"}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">{item.slotDate}</p>
                </div>
                {/* // adding cancel button for admin */}
                {item.cancelled ? (
                  <p className="text-red-600 font-medium">Cancelled</p>
                ) : item.isCompleted ? ( // ← yahan isComplete nahi, isCompleted hoga shayad
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default DoctorDashBoard;
