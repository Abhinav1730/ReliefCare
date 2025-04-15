import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../../public/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const backendUrl = "https://reliefcare-backend.onrender.com";
  const { docId } = useParams();
  const { doctors, currencySymbol, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [doctorsSlot, setDoctorsSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  useEffect(() => {
    const selectedDoctor = doctors.find((doc) => doc._id === docId);
    if (selectedDoctor) {
      setDocInfo(selectedDoctor);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      if (!docInfo.slots_booked) {
        docInfo.slots_booked = {};
      }
      getAvailableSlots();
    }
  }, [docInfo]);

  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.slots_booked) return;

    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(20, 30, 0, 0); // 8:30 PM

      if (today.getDate() === currentDate.getDate()) {
        const now = new Date();
        const rounded = new Date(now);
        rounded.setSeconds(0);
        rounded.setMilliseconds(0);

        const mins = rounded.getMinutes();
        if (mins < 30) {
          rounded.setMinutes(30);
        } else {
          rounded.setHours(rounded.getHours() + 1);
          rounded.setMinutes(0);
        }

        const closingTime = new Date(now);
        closingTime.setHours(20, 30, 0, 0);

        if (rounded >= closingTime) {
          allSlots.push([]);
          continue;
        }

        currentDate = rounded;
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const isSlotAvailable =
          !docInfo.slots_booked[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDoctorsSlot(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login To Book Appointment");
      return navigate("/login");
    }

    try {
      const date = doctorsSlot[slotIndex][0].dateTime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    docInfo && (
      <div>
        {/*--------------------Doctor Details------------------ */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-3">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee :{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/*------------------Booking Slots ------------------*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {doctorsSlot.length ? (
              doctorsSlot.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>
                    {item[0] ? daysOfWeek[item[0].dateTime.getDay()] : "--"}
                  </p>
                  <p>{item[0] ? item[0].dateTime.getDate() : "--"}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No available slots</p>
            )}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {doctorsSlot[slotIndex] && doctorsSlot[slotIndex].length > 0 ? (
              doctorsSlot[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))
            ) : (
              <p className="text-gray-500 font-medium text-xs">
                No slots for selected day
              </p>
            )}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an Appointment
          </button>
        </div>

        {/*------------------ Related Doctors ------------------*/}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
