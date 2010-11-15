/*!
 * mite.mize
 *
 * Embed your mite in every web app you want.
 *
 * Copyright(c) 2010 Gregor Martynus.
 * MIT Licensed
 */


require.paths.unshift('./vendor');
MiteClient = require(__dirname + '/lib/mite_client');

var Mite      = new MiteClient({
  account:  'yolk',
  api_key:  '76315504aa8df50'
});

User.all()

// Mite.users.active(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.users.archived(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.users.find(1, function(data) {
//   console.log(JSON.parse(data))
// })
// // throws an error: not allowed over api (same for new & delete)
// Mite.users.update(1, {name: 'funky yo!'}, function(data, response) {
//   onsole.log(JSON.parse(data))
// })

// Mite.customers.active(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.customers.archived(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.customers.new({name: 'funky uno!'}, function(data, response) {
//   console.log(JSON.parse(data))
// })
// Mite.customers.find(1, function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.customers.update(1, {name: 'funky yo!'}, function(data, response) {
//   console.log(JSON.parse(data))
// })
// Mite.customers.update(1, {name: 'funky zwo!'}, function(data, response) {
//   console.log(JSON.parse(data))
// })
// Mite.customers.delete(1, function(data, response) {
//   console.log(JSON.parse(data))
// })
// Mite.customers.projects(12, function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.customers.time_entries(1, function(data) {
//   console.log(JSON.parse(data))
// })

// Mite.projects.active(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.projects.archived(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.projects.new({name: 'funky uno!'}, function(data, response) {
//   console.log(JSON.parse(data))
// })
// Mite.projects.find(18, function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.projects.update(18, {name: 'funky zwo!'}, function(data, response) {
//   console.log(JSON.parse(data))
// })
// Mite.projects.delete(18, function(data, response) {
//   console.log(JSON.parse(data))
// })

// Mite.services.active(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.services.archived(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.services.new({name: 'funky uno!'}, function(data, response) {
//   console.log(JSON.parse(data))
// })
// Mite.services.find(23, function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.services.update(23, {name: 'funky zwo!'}, function(data, response) {
//   console.log(JSON.parse(data))
// })
// Mite.services.delete(23, function(data, response) {
//   console.log(JSON.parse(data))
// })

// Mite.time_entries.all(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.time_entries.all({service_id: 1},function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.time_entries.new(function(data) {
//   console.log(JSON.parse(data))
// })
//   Mite.time_entries.new({minutes: 185}, function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.time_entries.find(3028, function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.time_entries.update(3028, {minutes: 123},function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.time_entries.delete(3028, function(data) {
//   console.log(JSON.parse(data))
// })

// Mite.tracker.find(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.tracker.start(3063, function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.tracker.stop(3063, function(data) {
//   console.log(JSON.parse(data))
// })

// Mite.bookmarks.all(function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.bookmarks.find(6, function(data) {
//   console.log(JSON.parse(data))
// })
// Mite.bookmarks.time_entries(6, function(data) {
//   console.log(JSON.parse(data))
// })