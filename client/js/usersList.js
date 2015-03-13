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
			if ($("[name='first-name']").val() === '') {
				showRequiredField ("first-name");
			} else if ($("[name='last-name']").val() === '') {
				showRequiredField ("last-name");
			} else if ($("[name='email']").val() === '') {
				showRequiredField ("email");
			} else {
				var firstName = inputNameValid($("[name='first-name']").val());
				var lastName = inputNameValid($("[name='last-name']").val());
				var phoneNumber = inputPhoneNumberValid($("[name='phone-number']").val());
				var email = inputEmailValid($("[name='email']").val());
				var address = $("[name='address']").val();

				if (firstName === false) {
					showInputWrongField("first-name");
				} else if (lastName === false) {
					showInputWrongField("last-name");
				} else if (email === false) {
					showInputWrongField("email");
				} else if (phoneNumber === false) {
					showInputWrongField("phone-number");
				} else {
					Meteor.call("addUser", firstName, lastName, phoneNumber, email, address);
					$(".add-new-user [type='text']").val('');
				}
			}
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

function showRequiredField (attributeName) {
	$(".add-new-user [type='text']").removeClass("required");
	$("[name='" + attributeName + "']").addClass("required");
}

function showInputWrongField (attributeName) {
	$(".add-new-user [type='text']").removeClass("notValid");
	$("[name='" + attributeName + "']").addClass("notValid");
}

function inputNameValid(name) {
	if (/^[a-zA-Z]+[\s]?[a-zA-Z]+$/.test(name)) {
		return name;
	} else {
		return false;
	}
}

function inputEmailValid(email) {
	if (/^.+@.+\..+$/.test(email)) {
		return email
	} else {
		return false;
	}
}

function inputPhoneNumberValid(phoneNumber) {
	if (/^[0-9]+$/.test(phoneNumber)) {
		return phoneNumber
	} else {
		return false;
	}
}


