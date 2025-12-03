import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const checkAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// doctor list for showing the doctor on frontend page
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// API for doctor Login
const loginDoctor = async (req, res) => {
  try {

    const { email, password } = req.body;
    
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if(isMatch){
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true,token });
    }else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
    
  } catch (error) {
    console.log("Login doctor me problem hai vai(catch) : ",error);
    res.json({ success: false, message: error.message });
  }
}


// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    if (!docId) {
      return res.status(401).json({ success: false, message: "Doctor not authenticated" });
    }
    const appointments = await appointmentModel.find({docId})
    res.json({success: true, appointments})
  } catch (error) {
    console.log("All Appointent doctor(doctor panel) me problem hai vaii(catch) : ",error);
    res.json({ success: false, message: error.message });
  }
}


// API to mark appointment as completed by doctor(doctor panel)
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Doctor not authenticated" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true});
      res.json({success: true, message: "Appointment completed"});
    } else{
      res.json({success: false, message: "Marked Failed"});

    }

  } catch (error) {
    console.log("Mark appointment me problem(doc Panel) hai vaii(catch) : ",error);
    res.json({ success: false, message: error.message });
  }
}


// API to cancel appointment as completed by doctor(doctor panel)
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Doctor not authenticated" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});
      res.json({success: true, message: "Appointment Cancelled"});
    } else{
      res.json({success: false, message: "Cancellation Failed"});

    }

  } catch (error) {
    console.log("Cancel appointment me problem(doc Panel) hai vaii(catch) : ",error);
    res.json({ success: false, message: error.message });
  }
}

export { checkAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel };
