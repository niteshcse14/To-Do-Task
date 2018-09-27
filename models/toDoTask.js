var keystone = require('keystone');
var Types = keystone.Field.Types;
var toDoTask = new keystone.List('toDoTask');
toDoTask.add({
    email: {type: Types.Email, initial: true, required: true},
    task: {type: String, initial: true, required: true},
    time: {type: String, initial: true, required: true}
}, 'Permissions', {
    isAdmin: {type: Boolean, label: 'Can access keystone', index: true}
});
toDoTask.schema.virtual('Can access keystone').get(function() {
    return this.isAdmin;
});
toDoTask.relationship({ref: "Post", path: "posts", refPath: "author"});
toDoTask.defaultColumns = 'email, task, time';
toDoTask.register();