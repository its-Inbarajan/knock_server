import { Schema, Document, model, Types } from "mongoose";

interface IConverPhoto {
  public_id: string;
  secure_url: string;
}

export interface IlistModel extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  conver_photos: IConverPhoto[];
  price: string;
  benefits: string[];
  additional_details: string[];
  category: string;
}

const listsSchema = new Schema<IlistModel>(
  {
    name: {
      type: String,
      required: [true, "Name is must not be empty!"],
    },
    description: {
      type: String,
      default: "",
    },
    conver_photos: [
      {
        public_id: { type: String, default: "" },
        secure_url: { type: String, default: "" },
      },
    ],
    price: {
      type: String,
      default: "",
    },
    benefits: [
      {
        type: String,
        default: "",
      },
    ],
    additional_details: [
      {
        type: String,
        default: "",
      },
    ],
    category: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const LISTSMODELS = model("lists", listsSchema);
