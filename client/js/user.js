Template.user.events({
	"click .show-user": function () {
		Meteor.call("updateEditStatus", this._id, true);
	}
});
