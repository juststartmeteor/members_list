Template.userEdit.events({
	"click [name='button-update']": function () {
		var firstName = $("." + this._id + " [name='edit-first-name']").val();
		var lastName = $("." + this._id + " [name='edit-last-name']").val();
		var phoneNumber = $("." + this._id + " [name='edit-phone-number']").val();
		var email = $("." + this._id + " [name='edit-email']").val();
		var address = $("." + this._id + " [name='edit-address']").val();
		Meteor.call("updateUser", this._id, firstName, lastName, phoneNumber, email, address, function (err, result) {
			if ("First name is incorrect" === result[1]) {
				showEditInputWrongField(result[0], "edit-first-name");
			} else if ("Last name is incorrect" === result[1]) {
				showEditInputWrongField(result[0], "edit-last-name");
			} else if ("Phone number is incorrect" === result[1]) {
				showEditInputWrongField(result[0], "edit-phone-number");
			} else if ("Email is incorrect" === result[1]) {
				showEditInputWrongField(result[0], "edit-email");
			}
		});
	},
	"click [name='button-cancel']": function () {
		Meteor.call("updateEditStatus", this._id, false);
	}
});

function showEditInputWrongField(id, attributeName) {
	$("." + id + " [type='text']").removeClass("notValid");
	$("." + id + " [name='" + attributeName + "']").addClass("notValid");
}

