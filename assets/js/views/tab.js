define([
  'backbone',
  'text!templates/app/tab-nav.html'
],

function (Backbone, _tabNavTemplate) {

  return Backbone.View.extend({
    tagName: 'div',

    className: 'tab-pane',

    initialize: function (options) {
      this.options = options || {};
      this.id = this.options.title.toLowerCase().replace(/\W/g,'');
      this.tabNavTemplate = _.template(_tabNavTemplate);
      this.render();
    },

    render: function () {
      // Render Snippet Views
      var self = this;
      if (self.collection !== undefined) {
        _.each(this.collection.renderAll(), function (snippet) {
          self.$el.append(snippet);
        });
      } else if (self.options.content) {
        self.$el.append(self.options.content);
      }
      // Render & append nav for tab
      $('#formtabs').append(self.tabNavTemplate({
        title: self.options.title,
        id: self.id
      }));
      // Render tab
      self.$el.attr('id', self.id);
      self.$el.appendTo('.tab-content');
      self.delegateEvents();
    }
  });
});
