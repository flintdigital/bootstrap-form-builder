define([
  'backbone',
  'text!templates/popover/popover-main.html',
  'text!templates/popover/popover-input.html',
  'text!templates/popover/popover-select.html',
  'text!templates/popover/popover-textarea.html',
  'text!templates/popover/popover-textarea-split.html',
  'text!templates/popover/popover-checkbox.html',
  'templates/snippet/snippet-templates',
  'bootstrap'
],

function (Backbone, _PopoverMain, _PopoverInput, _PopoverSelect,
          _PopoverTextArea, _PopoverTextAreaSplit, _PopoverCheckbox,
          _snippetTemplates) {

  return Backbone.View.extend({
    tagName: 'div',
    className: 'component',
    initialize: function () {
      this.template = _.template(_snippetTemplates[this.model.idFriendlyTitle()]);
      this.popoverTemplates = {
        'input' : _.template(_PopoverInput),
        'select' : _.template(_PopoverSelect),
        'textarea' : _.template(_PopoverTextArea),
        'textarea-split' : _.template(_PopoverTextAreaSplit),
        'checkbox' : _.template(_PopoverCheckbox)
      };
    },

    render: function (withAttributes) {
      var self = this;
      var content = _.template(_PopoverMain)({
        'title': self.model.get('title'),
        'items' : self.model.get('fields'),
        'popoverTemplates': self.popoverTemplates
      });

      if (withAttributes) {
        return this.$el.html(
          self.template(self.model.getValues())
        ).attr({
          'data-content'     : content,
          'data-title'     : self.model.get('title'),
          'data-trigger'   : 'manual',
          'data-html'      : true
        });
      } else {
        return this.$el.html(
          self.template(self.model.getValues())
        );
      }
    }
  });
});
