exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (req.originalUrl.startsWith('/admin')) {
      return res.status(500).render('admin/error', {
        error: 'Admin Error',
        message: 'Something went wrong in the admin panel'
      });
    }
    
    res.status(500).render('error', {
      error: 'Server Error',
      message: 'Something went wrong!'
    });
  };