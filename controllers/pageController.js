const { getNavbarData } = require('./navbarController');
const { getActiveHeroSlides } = require('./heroController');
const { getFooterData } = require('./footerController');
const { getSocialIcons } = require('./socialIconController');
const { getMissionVisionData } = require('./missionVisionController');
const { getTeamMembersForPage } = require('./contactCardController');

const renderPage = async (req, res) => {
  try {
    const page = req.params.page || 'index';
    const currentPath = req.path;
    const isHomeOrAbout = currentPath === '/' || currentPath === '/about';
    const isTeamOrContact = currentPath === '/ourTeam' || currentPath === '/contact';

    // Fetch all data in parallel for efficiency
    const [navbarItems, footer, socialIcons, missionVisionItems, teamMembers] = await Promise.all([
      getNavbarData(),
      getFooterData(),
      getSocialIcons(),
      isHomeOrAbout ? getMissionVisionData() : Promise.resolve(null),
      isTeamOrContact ? getTeamMembersForPage() : Promise.resolve(null)
    ]);

    // Only fetch hero slides on the homepage
    const heroSlides = currentPath === '/' ? await getActiveHeroSlides() : null;

    res.render(`pages/${page}`, {
      pageTitle: page.charAt(0).toUpperCase() + page.slice(1),
      navbarItems,
      footer,
      currentPath,
      socialIcons,
      heroSlides,
      teamMembers,
      missionVisionItems
    });

  } catch (error) {
    console.error(`❌ Error rendering page (${req.path}):`, error.message);
    res.status(500).render('error', { 
      error: 'Internal Server Error',
      message: 'Sorry, something went wrong. Please try again later.' 
    });
  }
};

module.exports = { renderPage };