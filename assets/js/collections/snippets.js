define([
  'backbone',
  'models/snippet',
  'views/tab-snippet'
],

function (Backbone, SnippetModel, TabSnippetView) {

  return Backbone.Collection.extend({
    model: SnippetModel,

    renderAll: function () {
      return this.map(function (snippet) {
        return new TabSnippetView({model: snippet}).render();
      });
    }
  });
});
