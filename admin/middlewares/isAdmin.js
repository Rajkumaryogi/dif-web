module.exports = (req, res, next) => {
  // 1. Check if user is logged in
  if (!req.session.admin) {
    return res.redirect("/admin/login");
  }
  
  // 2. Check if account is active
  if (req.session.admin.profileStatus !== 'Active') {
    return res.redirect("/admin/login?error=account_inactive");
  }
  
  // 3. Verify at least one admin flag is true
  if (!req.session.admin.isSuperAdmin && !req.session.admin.isAdmin) {
    return res.redirect("/admin/login?error=access_denied");
  }
  
  next();
};