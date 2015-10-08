define([
  'backbone',
  'views/temp-snippet',
  'helper/pubsub',
  'text!templates/app/renderform.html'
],

function (Backbone, TempSnippetView, PubSub, _renderForm) {

  return Backbone.View.extend({

    tagName: 'fieldset',

    initialize: function () {
      this.collection.on('add', this.render, this);
      this.collection.on('remove', this.render, this);
      this.collection.on('change', this.render, this);

      PubSub.on('mySnippetDrag', this.handleSnippetDrag, this);
      PubSub.on('tempMove', this.handleTempMove, this);
      PubSub.on('tempDrop', this.handleTempDrop, this);

      this.build = document.getElementById('build')
      this.buildBCR = this.build.getBoundingClientRect();
      this.renderForm = _.template(_renderForm);
      this.render();
    },

    render: function () {
      //Render Snippet Views
      var self = this;
      self.$el.empty();
      var containsFile = false;

      _.each(self.collection.renderAll(), function (snippet) {
        self.$el.append(snippet);
      });

      $('#render').val(self.renderForm({
        multipart: self.collection.containsFileType(),
        text: _.map(self.collection.renderAllClean(), function (e) {
          return e.html()
        }).join('\n')
      }));

      self.$el.appendTo('#build form');
      self.delegateEvents();
    },

    getBottomAbove: function (eventY) {
      var myFormBits = $(this.$el.find('.component'));
      var topelement = _.find(myFormBits, function (renderedSnippet) {
        var snippetY = $(renderedSnippet).position().top +
                       $(renderedSnippet).height();
        if (snippetY > eventY - 160) return true;
        else return false;
      });

      if (topelement) {
        return topelement;
      } else {
        return myFormBits[0];
      }
    },

    handleSnippetDrag: function (mouseEvent, snippetModel) {
      $('body').append(new TempSnippetView({model: snippetModel}).render());
      this.collection.remove(snippetModel);
      PubSub.trigger('newTempPostRender', mouseEvent);
    },

    handleTempMove: function (mouseEvent) {
      $('.target').removeClass('target');
      var width = this.build.offsetWidth;
      var height = this.build.offsetHeight;
      if (mouseEvent.pageX >= this.buildBCR.left &&
          mouseEvent.pageX <= (width + this.buildBCR.left) &&
          mouseEvent.pageY >= this.buildBCR.top &&
          mouseEvent.pageY <= (height + this.buildBCR.top)) {

        $(this.getBottomAbove(mouseEvent.pageY)).addClass('target');
      } else {
        $('.target').removeClass('target');
      }
    },

    handleTempDrop: function (mouseEvent, model, index) {
      var width = this.build.offsetWidth;
      var height = this.build.offsetHeight;
      if (mouseEvent.pageX >= this.buildBCR.left &&
         mouseEvent.pageX <= (width + this.buildBCR.left) &&
         mouseEvent.pageY >= this.buildBCR.top &&
         mouseEvent.pageY <= (height + this.buildBCR.top)) {

        var index = $('.target').index();
        $('.target').removeClass('target');
        this.collection.add(model,{at: index + 1});
      } else {
        $('.target').removeClass('target');
      }
    }
  })
});
