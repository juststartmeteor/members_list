Template.user.events({
	"click [name='button-edit']": function () {
		Meteor.call("updateEditStatus", this._id, true);
	},
	"mouseout .show-user": function () {
		$("." + this._id + " button").css("visibility", "hidden");
	},
	"mouseover .show-user": function () {
		$("." + this._id + " button").css("visibility", "visible");
	},
	"click [name='button-delete']": function () {
		Meteor.call("deleteAUser", this._id);
	}
});
