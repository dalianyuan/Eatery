function Page(){
	
}

$.extend(Page.prototype, {
	init: function(){
		this.createHeader();
		this.createMenu();
		this.createContent();
	},
	createHeader: function(){
		var headerContainer = $(".js-header");
		this.header = new Header(headerContainer);
	},
	createMenu: function(){
		var menuContainer = $(".js-menu");
		this.Menu = new Menu(menuContainer);
	},
	createContent: function(){
		var contentContainer = $(".js-content");
		this.Content = new Content(contentContainer);
	}
});