Template.userSearch.events({
	"click .show-user": function () {
		Meteor.call("updateEditStatus", this._id, true);
	}
});
