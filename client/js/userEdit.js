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

