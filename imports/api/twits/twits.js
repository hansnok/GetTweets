import {Mongo} from 'meteor/mongo'
// import {SimpleSchema} from 'meteor/aldeed:simple-schema'

var Twits = new Mongo.Collection('twits')

export default Twits

// Twits.attachSchema(new SimpleSchema({
//   id: {
//     type: String,
//     label: 'ID',
//     optional: true
//   },
//   text: {
//     type: String,
//     label: 'Texto',
//     optional: true
//   },
//   language: {
//     type: String,
//     label: 'Lenguaje',
//     optional: true
//   },
//   emotion: {
//     type: String,
//     label: 'Emoción',
//     optional: true
//   },
//   keywords: {
//     type: String,
//     label: 'Palabras Clave',
//     optional: true
//   },
//   date: {
//     type: Date,
//     label: 'Fecha',
//     optional: true
//   },
//   bank: {
//     type: String,
//     label: 'Banco',
//     optional: true
//   }
// }))
