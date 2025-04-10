const HeroSlide = require("../../models/HeroSlide");

exports.getAllSlides = async (req, res) => {
  const slides = await HeroSlide.find().sort({ order: 1 }).lean();
  res.render("pages/heroSlideAdmin", {
    layout: "admin-layout",
    pageTitle: "Hero Slides",
    slides,
  });
};

exports.renderCreateSlide = (req, res) => {
  res.render("partials/heroSlideCreate&Edit", { 
    layout: "admin-layout", 
    pageTitle: "Add Slide" ,
    slide : null,
});
};

exports.createSlide = async (req, res) => {
  await HeroSlide.create(req.body);
  res.redirect("/admin/heroSlideAdmin");
};

exports.renderEditSlide = async (req, res) => {
  const slide = await HeroSlide.findById(req.params.id).lean();
  res.render("partials/heroSlideCreate&Edit", { 
    layout: "admin-layout", 
    pageTitle: "Edit Slide", 
    slide,
  });
};

exports.updateSlide = async (req, res) => {
  await HeroSlide.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/heroSlideAdmin");
};

exports.deleteSlide = async (req, res) => {
  await HeroSlide.findByIdAndDelete(req.params.id);
  res.redirect("/admin/heroSlideAdmin");
};

exports.toggleSlideStatus = async (req, res) => {
  const slide = await HeroSlide.findById(req.params.id);
  slide.isActive = !slide.isActive;
  await slide.save();
  res.redirect("/admin/heroSlideAdmin");
};
