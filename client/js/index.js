Template.body.events({
	"keyup [name='search']": function () {
		var keyWords = $("[name='search']").val();
		Session.set("searching", true);
		Session.set("searchKeyWords", keyWords);
	}
});
