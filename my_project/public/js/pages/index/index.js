function Page(){
	
}

$.extend(Page.prototype, {
	init: function(){
		this.createHeader();
		this.createMenu();
	},
	createHeader: function(){
		var headerContainer = $(".js-header");
		this.header = new Header(headerContainer);
	},
	createMenu: function(){
		var menuContainer = $(".js-menu");
		this.Menu = new Menu(menuContainer);
	}
});