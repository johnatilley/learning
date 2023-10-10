var mongoose = require( "mongoose" );
mongoose.set( 'strictQuery', true );
mongoose.connect( "mongodb://172.21.18.247:27017/mydb_test" );

console.log( "mongoose version", mongoose.version );

var clientSchema = mongoose.Schema( {
    lastname: String,
    firstname: String,
    address: String
} );

var Client = mongoose.model( "clients", clientSchema );

Client.deleteOne( { $and: [ { lastname: "Clinton" }, { address: "New York" } ] } )
    .exec()
    .then( ( res ) => {
        console.log( res );
        Client.find()
            .exec()
            .then( ( clients ) => console.log( clients ) );
    } )
    .catch( ( err ) => console.log( err ) );

console.log( "After the statement" );