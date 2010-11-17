var creds = { account:    'yolk'
            , api_key:    '76315504aa8df50'
            , user_agent: 'mite.node example/v0.1'},
    MiteResources = require('../lib/resources'),
    Mite = new MiteResources(creds);

function dump(data) {
  console.log(data);
}

// User
Mite.User.all(dump);
Mite.User.archived(dump);
Mite.User.find(1, dump);
Mite.User.time_entries(1, dump);
// 
// // Customer
// Mite.Customer.all(dump);
// Mite.Customer.archived(dump);
// Mite.Customer.create({name: 'funky uno!'}, dump);
// Mite.Customer.find(1, dump);
// Mite.Customer.update(1, {name: 'funky zwuno!'}, dump);
// Mite.Customer.delete(16, dump);
// Mite.Customer.time_entries(1, dump)
// Mite.Customer.projects(1, dump)
// 
// // Project
// Mite.Project.all(dump);
// Mite.Project.archived(dump);
// Mite.Project.create({name: 'funky test'}, dump);
// Mite.Project.find(24, dump);
// Mite.Project.update(24, {name: 'funky fresh!!!!'}, dump);
// Mite.Project.delete(25, dump);
// Mite.Project.time_entries(1, dump)
// 
// // Service
// Mite.Service.all(dump);
// Mite.Service.archived(dump);
// Mite.Service.create({name: 'funky uno!'}, dump);
// Mite.Service.find(1, dump);
// Mite.Service.update(1, {name: 'funky zwuno!'}, dump);
// Mite.Service.delete(24, dump);
// Mite.Service.time_entries(1, dump)
// 
// // TimeEntry
// Mite.TimeEntry.all(dump);
// Mite.TimeEntry.archived(dump);
// Mite.TimeEntry.create({name: 'funky uno!'}, dump);
// Mite.TimeEntry.find(3024, dump);
// Mite.TimeEntry.update(3024, {note: 'funky zwuno!'}, dump);
// Mite.TimeEntry.delete(3024, dump);
// 
// // Tracker
// Mite.Tracker.find(dump);
// Mite.Tracker.start(3064, dump);
// Mite.Tracker.stop(3064,dump);
// 
// // Bookmark
// Mite.Bookmark.all(dump);
// Mite.Bookmark.find(6, dump);
// Mite.Bookmark.time_entries(6, dump);