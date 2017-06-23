import {Mongo} from 'meteor/mongo'
// import {SimpleSchema} from 'meteor/aldeed:simple-schema'

var Enterprises = new Mongo.Collection('enterprises')

export default Enterprises

// Enterprises.attachSchema(new SimpleSchema({
//   nombre: {
//     type: String,
//     label: 'Nombre',
//     optional: true
//   },
//   username: {
//     type: String,
//     label: 'Nombre usuario',
//     optional: true
//   }
// }))
