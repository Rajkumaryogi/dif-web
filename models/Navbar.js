'use strict'
const mongoose = require("mongoose");

const NavbarSchema = new mongoose.Schema(
    {
        SNo: { type: Number, required: true },
        title: { type: String, required: true },
        titleLink: { type: String, required: true },
        parentId: { type: Number , ref: "Navbar", default: 0 },
        visibility: { type: Boolean, default: true },
        order: { type: Number, required: true },
        class: { type: String, default: "" },
        subItems: [
            {
                title: { type: String, required: true },
                titleLink: { type: String, required: true },
                Id: { type: Number , ref: "Navbar" },
                order: { type: Number, required: true },
                class: { type: String, default: "" }
            }
        ]
    },
    { timestamps: true }
);
NavbarSchema.index({ order: 1 });

const Navbar = mongoose.model("Navbar", NavbarSchema);
module.exports = Navbar;
