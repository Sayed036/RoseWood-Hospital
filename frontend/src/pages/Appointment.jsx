import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctor from "../components/RelatedDoctor";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlotes, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  const getAvaialableSlots = () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);

      // ------- (9:00 PM) ---------
      endTime.setHours(21, 0, 0, 0);

      // SAME DAY
      if (i === 0) {
        let hour = today.getHours();
        let minute = today.getMinutes();

        if (hour < 10) {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        } else {
          if (minute < 30) {
            currentDate.setHours(hour);
            currentDate.setMinutes(30);
          } else {
            currentDate.setHours(hour + 1);
            currentDate.setMinutes(0);
          }
        }
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Always push array (even if empty)
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvaialableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-[#b03053] w-full sm:max-w-72 rounded-lg"
              src={docInfo?.image}
              alt=""
            />
          </div>

          <div className="flex-1 border rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo?.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo?.degree} - {docInfo?.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo?.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo?.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo?.fees}/-
              </span>
            </p>
          </div>
        </div>

        {/* BOOKING SLOTS */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlotes.length > 0 &&
              docSlotes.map((item, idx) => {
                // Day , Date always shown
                const dateObj = new Date();
                dateObj.setDate(dateObj.getDate() + idx);

                return (
                  <div
                    onClick={() => {
                      setSlotIndex(idx);
                      setSlotTime("");
                    }}
                    key={idx}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === idx
                        ? "bg-[#b03053] text-white"
                        : "border border-gray-200"
                    } `}
                  >
                    <p>{daysOfWeek[dateObj.getDay()]}</p>
                    <p>{dateObj.getDate()}</p>
                  </div>
                );
              })}
          </div>

          {/* TIME SLOTS */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlotes.length > 0 &&
              docSlotes[slotIndex].map((item, idx) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={idx}
                  className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-[#b03053] text-white"
                      : "text-gray-600 border border-gray-300"
                  } `}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}

            {/* If no time slots */}
            {docSlotes.length > 0 && docSlotes[slotIndex].length === 0 && (
              <p className="text-gray-500 text-sm">No slots available today</p>
            )}
          </div>

          <button className="bg-[#b03053] text-white text-sm font-light px-14 py-3 rounded-full my-6">
            Book an appointment
          </button>
        </div>

        {/* ----- Listing Related Doctors--------*/}
        <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
