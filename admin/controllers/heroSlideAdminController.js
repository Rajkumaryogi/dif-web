const HeroSlide = require("../../models/HeroSlide");

exports.getAllSlides = async (req, res) => {
  const slides = await HeroSlide.find().sort({ order: 1 }).lean();
  res.render("pages/heroSlideAdmin", {
    layout: "dashboard-layout",
    pageTitle: "Hero Slides",
    slides,
  });
};

exports.renderCreateSlide = (req, res) => {
  res.render("partials/heroSlideCreate&Edit", { 
    layout: "dashboard-layout", 
    pageTitle: "Add Slide" ,
    slide : null,
});
};

exports.createSlide = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.imageUrl = "/uploads/hero-slides/" + req.file.filename;
    }
    await HeroSlide.create(data);
    res.redirect("/admin/heroSlideAdmin");
  } catch (err) {
    console.error("❌ Error creating hero slide:", err.message);
    res.status(500).send("Server error");
  }
};
exports.renderEditSlide = async (req, res) => {
  const slide = await HeroSlide.findById(req.params.id).lean();
  res.render("partials/heroSlideCreate&Edit", { 
    layout: "dashboard-layout", 
    pageTitle: "Edit Slide", 
    slide,
  });
};

exports.updateSlide = async (req, res) => {
  
  try {
    const { id } = req.params;
    const { title, subtitle, order, isActive } = req.body;
    const slide = await HeroSlide.findById(id);

    if (!slide) return res.status(404).send('Slide not found');

    slide.title = title;
    slide.subtitle = subtitle;
    slide.order = order;
    slide.isActive = isActive === 'on';

    if (req.file) {
      slide.imageUrl = '/uploads/hero-slides/' + req.file.filename;
    }

    await slide.save();
    res.redirect('/admin/heroSlides');
  } catch (err) {
    console.error('Error updating hero slide:', err);
    res.status(500).send('Internal Server Error');
  }
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
