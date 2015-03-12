Users = new Mongo.Collection('users');

if (Meteor.isClient) {
	Session.setDefault("searchKeyWords", '');
	Session.setDefault("searching", false);

	Template.usersList.events({
		"keypress [name='address'], click [name='button-add']": function (event) {
			var confirm = false;
			if (event.type === "keypress" && event.charCode === 13) {
				confirm = true;
			}
			if (event.type === "click" && event.which === 1) {
				confirm = true;
			}

			if (confirm === true) {
				var firstName = $("[name='first-name']").val();
				var lastName = $("[name='last-name']").val();
				var phoneNumber = $("[name='phone-number']").val();
				var email = $("[name='email']").val();
				var address = $("[name='address']").val();
				Meteor.call("addUser", firstName, lastName, phoneNumber, email, address);
				$("[name='first-name']").val('');
				$("[name='last-name']").val('');
				$("[name='phone-number']").val('');
				$("[name='email']").val('');
				$("[name='address']").val('');
			}
		}
	});

	Template.usersList.helpers({
		users: function () {
			if (!Session.get("searching")) {
				return Users.find({}, {sort: {createdAt: -1}});
			} else {
				var searchKeyWords = Session.get("searchKeyWords");
				var regex = new RegExp(searchKeyWords, "i");

				return Users.find({$or: [{firstName: regex}, {lastName: regex}, {phoneNumber: regex}, {email: regex}, {address: regex}]});
			}
		}
	});

	Template.user.events({
		"click .show-user": function () {
			Meteor.call("updateEditStatus", this._id, true);
		}
	});

	Template.userSearch.events({
		"click .show-user": function () {
			Meteor.call("updateEditStatus", this._id, true);
		}
	});

	Template.userEdit.events({
		"click [name='edit-sumbit']": function (event, template) {
			var firstName = $("[name='edit-first-name']").val();
			var lastName = $("[name='edit-last-name']").val();
			var phoneNumber = $("[name='edit-phone-number']").val();
			var email = $("[name='edit-email']").val();
			var address = $("[name='edit-address']").val();
			Meteor.call("updateUser", this._id, firstName, lastName, phoneNumber, email, address);
			Meteor.call("updateEditStatus", this._id, false);
		},
		"click [name='edit-cancel']": function (event, template) {
			Meteor.call("updateEditStatus", this._id, false);
		},
		"click [name='edit-delete']": function () {
			Meteor.call("deleteAUser", this._id);
		},
	});

	Template.body.events({
		"keyup [name='search']": function () {
			var keyWords = $("[name='search']").val();
			Session.set("searching", true);
			Session.set("searchKeyWords", keyWords);
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
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
	});
}
