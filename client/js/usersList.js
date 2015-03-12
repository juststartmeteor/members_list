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

