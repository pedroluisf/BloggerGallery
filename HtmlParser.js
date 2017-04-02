(function(global, $) {

    var $finalHtml;

    var HtmlParser = function(selector) {
        return new HtmlParser.init(selector);
    };

    // prototype holds methods (to save memory space)
    HtmlParser.prototype = {

        convert: function() {
            this.initHtml();

            var object = $('<div>').html("<div>" + this.$element.val() + "<div>").contents();
            var found = false;
            object.find("a").each(function(e) {
                found = true;
                var $img = $("<img>", {"src": $(this).find('img').attr("src"), "alt": "YOUR_ALT_TEXT_HERE" });
                var $a =  $("<a>", {"class": "item-link", "href": $(this).attr("href")}).append($img);
                var $li = $("<li>", {"class": "gallery-item"}).append($a).append($('<h3>', {"text" : "YOUR_TITLE_HERE"}));

                $finalHtml.find("ul").append($li);
            });

            if (!found) {
                return null;
            }
            return $finalHtml.html();
        },

        initHtml: function() {
            $finalHtml = $("<div>").append($("<div>", {"id": "blogger-gallery", "class": "blogger-gallery"}).append($("<ul>", {"class": "gallery-row"})));
        }
    };

    // the actual object is created here, allowing us to "new" an object without calling "new"
    HtmlParser.init = function(selector) {
        var self = this;

        if ($ === null) {
            console.error("This library requires jquery to work. Please remember to add it to your page");
            return;
        }
        self.$element = $(selector);
    };

    // trick borrowed from jQuery so we don"t have to use the "new" keyword
    HtmlParser.init.prototype = HtmlParser.prototype;

    // attach our Parser to the global object, and provide a shorthand "HP" for ease of access
    global.HtmlParser = global.HP = HtmlParser;

}(window, (typeof jQuery != "undefined" ? jQuery : null)) );