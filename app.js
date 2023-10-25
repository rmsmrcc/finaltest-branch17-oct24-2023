var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

//routes instantiation
var adminLoginRouter = require('./routes/admin-login');
var adminDashboardRouter = require('./routes/admin-dashboard');
var adminIndexSubjectRouter = require('./routes/admin-index-subject');
var adminCreateSubjectRouter = require('./routes/admin-create-subject');
var adminViewSubjectRouter = require('./routes/admin-view-subject');
var adminEditSubjectRouter = require('./routes/admin-edit-subject');
var adminDeleteSubjectRouter = require('./routes/admin-delete-subject');
var adminCreateSectionRouter = require('./routes/admin-create-section');
var studentLoginRouter = require('./routes/student-login');
var studentDashboardRouter = require('./routes/student-dashboard');
var teacherLoginRouter = require('./routes/teacher-login');
var teacherDashboardRouter = require('./routes/teacher-dashboard');
var logoutRouter = require('./routes/logout');
var app = express();

//session middleware

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: oneDay, // 60 secs in milliseconds
  },
}));

//port listener
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing the routes
app.use('/', studentLoginRouter);
app.use('/', studentDashboardRouter);
app.use('/', adminLoginRouter);
app.use('/', adminDashboardRouter);
app.use('/', adminIndexSubjectRouter);
app.use('/', adminCreateSubjectRouter);
app.use('/', adminViewSubjectRouter);
app.use('/', adminEditSubjectRouter);
app.use('/', adminDeleteSubjectRouter);
app.use('/', adminCreateSectionRouter);
app.use('/', teacherLoginRouter);
app.use('/', teacherDashboardRouter);
app.use('/', logoutRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
