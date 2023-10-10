var createError = require( 'http-errors' );
var express = require( 'express' );
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
var logger = require( 'morgan' );

var indexRouter = require( './routes/index' );
var usersRouter = require( './routes/users' );

require('dotenv').config();

var mongoUrl = process.env.MONGO_URL;
var mongoose = require( "mongoose" );
mongoose.set( 'strictQuery', true );
mongoose.connect( "mongodb://" + mongoUrl + "/mydb_test" );

var listSchema = mongoose.Schema( {
  text: String
} );

var List = mongoose.model( "elements", listSchema );

var app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', indexRouter );
app.use( '/users', usersRouter );

app.post( "/list", function ( req, res ) {
  var text = req.body.text;
  List.create( { text: text } )
    .then( ( doc ) => {
      res.json( { id: doc._id } );
    } )
} )

app.get( "/list", function ( req, res ) {
  List.find().then( ( elements ) => res.json( { elements: elements } ) );
} )

app.put( "/list", function ( req, res ) {
  var id = req.body.id;
  var text = req.body.text;
  List.updateOne( { _id: id }, { text: text } ).exec();
  res.send();
} )

app.delete( "/list", function ( req, res ) {
  var id = req.body.id;
  console.log( req.body.id );
  List.deleteOne( { _id: id } ).exec();
  res.send();
} )

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
  next( createError( 404 ) );
} );

// error handler
app.use( function ( err, req, res, next ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.render( 'error' );
} );

module.exports = app;
