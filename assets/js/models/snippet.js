define([
  'backbone'
],

function (Backbone) {

  return Backbone.Model.extend({
    initialize: function () {
      this.set('fresh', true);
    },

    getValues: function () {
      return _.reduce(this.get('fields'), function (o, v, k) {
        if (v['type'] == 'select') {
          o[k] = _.find(v['value'], function (o) {return o.selected})['value'];
        } else {
          o[k]  = v['value'];
        }
//console.log(o);
        return o;
      }, {});
    },

    idFriendlyTitle: function () {
      return this.get('title').replace(/\W/g,'').toLowerCase();
    },

    setField: function (name, value) {
      var fields = this.get('fields');
      fields[name]['value'] = value;
      this.set('fields', fields);
    }
  });
});
