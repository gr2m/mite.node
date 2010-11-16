/*!
 * mite.mize
 *
 * Embed your mite in every web app you want.
 *
 * Copyright(c) 2010 Gregor Martynus.
 * MIT Licensed
 */


require.paths.unshift('./vendor');

var creds = {
  account:  'yolk',
  api_key:  '76315504aa8df50'
};

function dump(data) {
  console.log(data);
}

var UserResource = require(__dirname + '/lib/resources/user'),
    User         = new UserResource(creds);
// User.all(dump);
// User.archived(dump);
// User.find(1, dump);
// User.time_entries(1, dump)

var CustomerResource = require(__dirname + '/lib/resources/customer'),
    Customer         = new CustomerResource(creds);
// Customer.all(dump);
// Customer.archived(dump);
// Customer.new({name: 'funky uno!'}, dump);
// Customer.find(1, dump);
// Customer.update(1, {name: 'funky zwuno!'}, dump);
// Customer.delete(16, dump);
// Customer.time_entries(1, dump)
// Customer.projects(1, dump)

var ProjectResource = require(__dirname + '/lib/resources/project'),
    Project         = new ProjectResource(creds);
// Project.all(dump);
// Project.archived(dump);
// Project.new({name: 'funky uno!'}, dump);
// Project.find(1, dump);
// Project.update(1, {name: 'funky zwuno!'}, dump);
// Project.delete(20, dump);
// Project.time_entries(1, dump)

var ServiceResource = require(__dirname + '/lib/resources/service'),
    Service         = new ServiceResource(creds);
// Service.all(dump);
// Service.archived(dump);
// Service.new({name: 'funky uno!'}, dump);
// Service.find(1, dump);
// Service.update(1, {name: 'funky zwuno!'}, dump);
// Service.delete(24, dump);
// Service.time_entries(1, dump)

var TimeEntryResource = require(__dirname + '/lib/resources/time_entry'),
    TimeEntry         = new TimeEntryResource(creds);
// TimeEntry.all(dump);
// TimeEntry.archived(dump);
// TimeEntry.new({name: 'funky uno!'}, dump);
// TimeEntry.find(3024, dump);
// TimeEntry.update(3024, {note: 'funky zwuno!'}, dump);
// TimeEntry.delete(3024, dump);

var TrackerResource = require(__dirname + '/lib/resources/tracker'),
    Tracker         = new TrackerResource(creds);
// Tracker.find(dump);
// Tracker.start(3064, dump);
// Tracker.stop(3064,dump);

var BookmarkResource = require(__dirname + '/lib/resources/bookmark'),
    Bookmark         = new BookmarkResource(creds);
// Bookmark.all(dump);
// Bookmark.find(6, dump);
// Bookmark.time_entries(6, dump);