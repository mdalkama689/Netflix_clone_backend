import { Schema, model } from "mongoose";

const listScehma = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    genere: {
      type: String,
    },
    content: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const List = model("List", listScehma);

export default List;
