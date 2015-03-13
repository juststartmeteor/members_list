Meteor.methods({
	addUser: function (firstName, lastName, phoneNumber, email, address) {
		Users.insert({firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, address: address, createdAt: new Date()});
	},
	updateUser: function (id, firstName, lastName, phoneNumber, email, address) {
		Users.update(id, {$set: {firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, address: address, updatedAt: new Date()}});
	},
	updateEditStatus: function (id, editing) {
		Users.update(id, {$set: {editing: editing}});
	},
	deleteAUser: function (id) {
		Users.remove(id);
	}
});
