const credentials = {
    username : 'surya_reddy',
    password : 'Iy7Lj7NRg3orImx1',
    dbname:'aplha'
}
const connectionURL =  'mongodb+srv://'+credentials.username+':'+credentials.password+'@cluster0.ell2v.mongodb.net/'+credentials.dbname;

module.exports = connectionURL;