#Bootstrap Form Builder

## Now Bootstrap 3 Ready :zap:

##What's this?

A Drag-and-drop form builder for [twitter bootstrap](http://getbootstrap.com/). 

##Where can I see it in action?

It's hosted on the Flint Digital Site [here](http://bootform.flintdigital.net/).

###Notes

* TO compile the code you will need to install Node.js, npm and bower. Once those are installed you can run `bower install` from the command line. 
* For development & debugging change the data-main for the require script tag in `index.html` 
  to point at `assets/js/main.js`. (Look just before the closing `<body>` tag!)

* Once done, change it back to  build for production using the `build.js` script in the `assets/js/lib`
  folder and [r.js](https://github.com/jrburke/r.js/). Then revert to `assets/js/main-built.js`

* The full command is `r.js -o assets/js/lib/build.js` which should be run from the base directory.

### Adding new form elements
### Note need to fix input YAML! It breaks the json!
* In the [js/data/ folder]
  - create a corresponding template in the [templates/snippet directory](https://github.com/flintdigital/bootstrap-form-builder/tree/gh-pages/assets/js/templates/snippet)
  - add the template to [snippet-templates.js](https://github.com/flintdigital/bootstrap-form-builder/blob/gh-pages/assets/js/templates/snippet/snippet-templates.js)
* If you want to add a new tab, you'll also need to adjust the [app.js file](https://github.com/flintdigital/bootstrap-form-builder/blob/gh-pages/assets/js/app.js) to make sure the tab is loaded.

Don't forget to switch to main.js rather than main-built.js, or the changes you make before compiling with require.js won't show up!
