JQuery Element
==============

JQuery Element is a JQuery plugin that provides an elegant way to dynamically create HTML DOM elements from Javascript. This plugin can be used as an alternative for client side html templating.

Usage
-----

The example below shows how the plugin is used.

    var el = $.element; // Handy abbreviation

    el.div({ className: 'control-group' },
      el.label({ className: 'control-label', htmlFor: 'inputEmail' },
        'Email'
      ),
      el.div({ className: 'controls' },
        el.input({ type: 'text', id: 'inputEmail', placeholder: 'Email' })
      )
    ).appendTo($('body'));

The $.element provides a function for every HTML5 element. This function creates an HTML DOM node and returns a JQuery selector for it. These functions have the following parameters:
 - An optional attributes object. This is an object literal specifying the attributes for the dom node. Due to Javascript restrictions, the 'class' and 'for' attributes have to be specified as 'className' and 'htmlFor' respectively.
 - A list of containing HTML nodes. The following objects are supported:
   - A JQuery selector
   - An HTML Element
   - A string (becomes an XSS safe text node)
   - null or undefined is skipped
   - An array. All items in the array are added individually

Since the element functions return JQuery selectors, you can use JQuery everywhere in the template. The example below is a shows the freedom that this brings.

    var todosUl, newTodoInput;
        
    el.div({className:'todos'},
      el.h3('Todos'),
      todosUl=el.ul(),
      'New todo:',
      newTodoInput = el.input({ type: 'text', placeholder:'What should we do?' }),
      el.button('Add')
        .click(function () {
          el.li(newTodoInput.val()).appendTo(todosUl);
          newTodoInput.val('').focus();
        })
    ).appendTo($('body'));
