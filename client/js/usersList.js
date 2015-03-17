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
				showRequiredField("first-name");
			} else if ($("[name='last-name']").val() === '') {
				showRequiredField("last-name");
			} else if ($("[name='email']").val() === '') {
				showRequiredField("email");
			} else {
				var firstName = $("[name='first-name']").val();
				var lastName = $("[name='last-name']").val();
				var phoneNumber = $("[name='phone-number']").val();
				var email = $("[name='email']").val();
				var address = $("[name='address']").val();

				Meteor.call("addUser", firstName, lastName, phoneNumber, email, address, function (err, result) {
					if (result === "First name is incorrect") {
						showInputWrongField("first-name");
					} else if (result === "Last name is incorrect") {
						showInputWrongField("last-name");
					} else if (result === "Phone number is incorrect") {
						showInputWrongField("phone-number");
					} else if (result === "Email is incorrect") {
						showInputWrongField("email");
					} else if (result === true) {
						$(".add-new-user [type='text']").removeClass("required");
						$(".add-new-user [type='text']").removeClass("notValid");
						$(".add-new-user [type='text']").val('');
					}
				});
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

			return Users.find({$or: [{firstName: regex}, {lastName: regex}, {phoneNumber: regex}, {email: regex}, {address: regex}]}, {sort: {createdAt: -1}});
		}
	}
});

function showRequiredField(attributeName) {
	$(".add-new-user [type='text']").removeClass("required");
	$(".add-new-user [name='" + attributeName + "']").addClass("required");
}

function showInputWrongField(attributeName) {
	$(".add-new-user [type='text']").removeClass("required");
	$(".add-new-user [type='text']").removeClass("notValid");
	$(".add-new-user [name='" + attributeName + "']").addClass("notValid");
}