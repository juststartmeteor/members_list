var msg_first_name_is_incorrect = "First name is incorrect";
var msg_last_name_is_incorrect = "Last name is incorrect";
var msg_phone_number_is_incorrect = "Phone number is incorrect";
var msg_email_is_incorrect = "Email is incorrect";
var msg_passed_validation = "Passed validation";

Meteor.methods({
	addUser: function (firstName, lastName, phoneNumber, email, address) {
		var validationResult = validateInput(firstName, lastName, phoneNumber, email);

		if (validationResult === "Passed validation") {
			Users.insert({firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, address: address, createdAt: new Date()});
			return true;
		} else {
			return validationResult;
		}

	},
	updateUser: function (id, firstName, lastName, phoneNumber, email, address) {
		var validationResult = validateInput(firstName, lastName, phoneNumber, email);

		if (validationResult === "Passed validation") {
			Users.update(id, {$set: {firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, address: address, updatedAt: new Date()}});
			Users.update(id, {$set: {editing: false}});
			return true;
		} else {
			return [id, validationResult];
		}
	},
	updateEditStatus: function (id, editing) {
		Users.update(id, {$set: {editing: editing}});
	},
	deleteAUser: function (id) {
		Users.remove(id);
	}
});

function validateInput(firstName, lastName, phoneNumber, email)
{
	if (!/^[a-zA-Z]+$/.test(firstName)) {
		return msg_first_name_is_incorrect;
	} else if (!/^[a-zA-Z]+$/.test(lastName)) {
		return msg_last_name_is_incorrect;
	} else if (!/^[\(]?[\d]+[\)]?[\d]+[\-]?[\d]+$/.test(phoneNumber)) {
		return msg_phone_number_is_incorrect;
	} else if (!/^[\w\.]+@[\w]+\.[\w]{2,4}$/.test(email)) {
		return msg_email_is_incorrect;
	} else {
		return msg_passed_validation;
	}
}