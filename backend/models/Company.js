import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  CompanyGUID: { type: Number, required: true, unique: true },
  CompanyName: { type: String, required: true },
  Address1: { type: String, default: "" },
  Address2: { type: String, default: "" },
  Area: { type: String, default: null },
  City: { type: String, default: "" },
  Pincode: { type: String, default: "" },
  MobileNo: { type: String, default: null },
  OfficePhoneNo: { type: String, default: null },
  DisplayName: { type: String, default: "" },
  IsHealthAvailable: { type: Number, default: 0 },
  IsMotorAvailable: { type: Number, default: 0 },
  IsFireAvailable: { type: Number, default: 0 },
  isPersonalAccidentAvailable: { type: Number, default: 0 },
  CompanyIconName: { type: String, default: "" },
  isActive: { type: Number, default: 1 },
  isPublic: { type: Boolean, default: false },
});

const Company = mongoose.model("Company", CompanySchema, "Company");
export default Company;
