JQuery Element
==============

JQuery Element is a jQuery plugin that provides an elegant way to create HTML DOM elements  dynamically from Javascript. This plugin can be used as an alternative for client side html templating.

Usage
-----

The example below shows how the plugin can be used.

    var el = $.element; // Handy abbreviation

    el.div({ className: 'control-group' },
      el.label({ className: 'control-label', htmlFor: 'inputEmail' },
        'Email'
      ),
      el.div({ className: 'controls' },
        el.input({ type: 'text', id: 'inputEmail', placeholder: 'Email' })
      )
    ).appendTo($('body'));

The $.element object provides a function for every HTML5 element. This function creates an HTML DOM node and returns a jQuery selector for it. These functions have the following parameters:
 - An optional attributes object. This is an object literal specifying the attributes for the dom node. Due to Javascript restrictions, the 'class' and 'for' attributes have to be specified as 'className' and 'htmlFor' respectively.
 - A list of containing HTML nodes. The following objects are supported:
   - A JQuery selector
   - An HTML Element
   - A string (becomes an XSS safe text node)
   - null or undefined is skipped
   - An array. All items in the array are added individually

Since all element functions return JQuery selectors, you can use jQuery everywhere in the template. 
The example below creates an html fragment that allows users to create their own list of todo's.

    var todosList, newTodoInput;
        
    el.div({className:'todos'},
      el.h3('Todos'),
      todosList=el.ul(),
      'New todo:',
      newTodoInput = el.input({ type: 'text', placeholder:'What should we do?' }),
      el.button('Add')
        .click(function () {
          el.li(newTodoInput.val()).appendTo(todosList);
          newTodoInput.val('').focus();
        })
    ).appendTo($('body'));
