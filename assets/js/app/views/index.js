// Generated by CoffeeScript 1.6.2
(function() {
  define(['backbone'], function(Backbone) {
    var IndexView;

    return IndexView = Backbone.View.extend({
      tumblrPage: 0,
      initialize: function() {
        _.bindAll(this);
        return this.getTumblr();
      },
      getInstagram: function() {
        $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          url: "https://api.instagram.com/v1/tags/tablesaw/media/recent&/?access_token=5725120139.4de2eb0.d716395e1cd7453da234aed6cce5b8c5",
          success: this.haveInstagramData
        });
      },
      instagramTemplate: _.template("<img src=\"<%= images.standard_resolution.url %>\" />\n<% if(caption){ %>\n	<p><%= caption.text %></p>\n<% } %>"),
      haveInstagramData: function(data) {
        var _this = this;

        return _.each(this.$('.instagram'), function(el, index) {
          var $el, gram;

          $el = $(el);
          gram = data.data[index];
          if (gram != null) {
            return $el.append(_this.instagramTemplate(gram));
          }
        });
      },
      getTumblr: function(offset) {
        if (offset == null) {
          offset = 0;
        }
        this.currentTumblr = 0;
        return $.ajax({
          url: 'http://api.tumblr.com',
          dataType: 'jsonp',
          type: 'GET',
          data: {
            api_key: "YgpsEXCrpCtKL9U7aNBzWeDp0sSbZw1AeZQSt5QgsXRLdb5o24",
            limit: 50,
            offset: Number(offset)
          },
          success: this.haveTumblrData
        });
      },
      tumblrTemplate: _.template("<a href=\"<%= link_url %>\" target=\"_blank\">\n	<div class=\"image\">\n		<img src=\"<%= photos[0].original_size.url %>\" />\n	</div>\n</a>"),
      haveTumblrData: function(data) {
        var _this = this;

        _.each(this.$('.tumblr-empty'), function(el, index) {
          var $el, post;

          $el = $(el);
          post = data.response.posts[index];
          if (post === void 0) {
            return;
          }
          $el.append(_this.tumblrTemplate(post));
          $el.find('.preloader').remove();
          return $el.removeClass('tumblr-empty');
        });
        if (this.$('.tumblr-empty').length > 0) {
          return this.getTumblr(this.currentTumblr + 1);
        }
      },
      getSvpply: function() {
        return $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          url: 'https://api.svpply.com/v1/users/jarred/wants/products.json?callback=?',
          success: this.haveSvpplyData
        });
      },
      svpplyTemplate: _.template("<a href=\"<%= page_url %>\" target=\"_blank\">\n	<div class=\"image\">\n		<img src=\"<%= image %>\" />\n	</div>\n	<div class=\"info\">\n		<h3><%= page_title %></h3>\n		<h4>from <em><%= store.name %></em></h4>\n	</div>\n</a>"),
      haveSvpplyData: function(data) {
        var _this = this;

        return _.each(this.$('.svpply'), function(el, index) {
          var $el, post;

          $el = $(el);
          post = data.response.products[index];
          $el.append(_this.svpplyTemplate(post));
          return $el.find('.preloader').remove();
        });
      }
    });
  });

}).call(this);
