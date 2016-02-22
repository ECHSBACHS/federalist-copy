var fs = require('fs');

var Backbone = require('backbone');
var _ = require('underscore');

var templateHtml = fs.readFileSync(__dirname + '/../../../templates/site/pages/page-list-item.html').toString();

var NavBuilderView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list-group',
  initialize: function (opts) {
    var opts  = opts || {};
    this.pages = opts.pages;

    if (!this.pages) throw new Error('Supply pages');

    return this;
  },
  render: function () {
    var self = this,
        template = _.template(templateHtml);

    function addToList(list, item) {
      var m = self.model,
          href = ['/#edit', m.owner, m.name, m.branch, item.href].join('/'),
          html = template({
            text: item.text,
            href: href,
            draft: _.contains(m.get('drafts'), item.href)
          });
      list.append(html);
    }

    this.pages.forEach(function(page) {
      addToList(self.$el, { text: page.title, href: page.href })

      if (page.children) {
        var ul = $('<ul class="list-group"></ul>');
        page.children.forEach(function(childPage) {
          addToList(ul, { text: childPage.title, href: childPage.href })
        });
        self.$el.append($('<li class="list-group-item"></li>').append(ul));
      }
    });

    return this;
  }
});

module.exports = NavBuilderView;
