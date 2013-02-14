(function ($) {
  "use strict";

  // Internet explorer 6 or 7?
  var ie67mode = (navigator.appName == 'Microsoft Internet Explorer' && /^MSIE [67]/.test(navigator.userAgent));
  var previousDocumentStack = [];
  var currentDocument = document;

  // Private utility functions

  // Adds attributes to an HTML Element
  var setAttributes = function(element, attributes) {
    for (var attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        var value = attributes[attribute];
        if (value !== null && value !== undefined) {
          element.attr(attribute, value);
        }
      }
    }
  };

  // IE<=7 does not implement the standard way of creating elements and adding attributes like 'name'
  var createIE67Element = function(tagName, attributes) {
    var string = '<' + tagName + ' ';
    for (var attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        var value = attributes[attribute];
        if (value !== null && value !== undefined) {
          var attName = attribute;
          if (attName == 'className') { attName = 'class'; }
          if (attName == 'htmlFor') { attName = 'for'; }
          if (attName == 'checked' && value === false) { continue; }
          string += attName + '="' + value + '" ';
        }
      }
    }
    string += '>';
    return $(currentDocument.createElement(string));
  };

  // Recursive function which adds attributes and childnodes to an HTML Element
  var addChildNodes = function(element, content, isRoot) {
    for (var i = 0; i < content.length; i++) {
      var child = content[i];
      if (child === null || child === undefined) {
        // Nothing
      } else if (jQuery.type(child) === "string") { // Textnode
        element.append(currentDocument.createTextNode(child));
      } else if (jQuery.type(child) === "array") { // Recursion
        addChildNodes(element, child, false);
      } else if (child instanceof $) {
      	element.append(child);
      } else if (i === 0 && !child.nodeName && isRoot) { // Attributes object
        if (ie67mode) {
          element = createIE67Element(element.tagName.toLowerCase(), child);
        } else {
          setAttributes(element, child);
        }
      } else if (child.nodeName) { // HTMLElement
        element.append(child);
      } else {
        throw new Error('Cannot create child node from "' + child + '"');
      }
    }
    return element;
  };

  $.element = {
    // Returns a function which can be used to create elements with a specific tagName.
    // The returned function can handle the following:
    // - (Optional first argument) object containing attributes for the element
    //     Note: Use 'className' instead of 'class'. Also use 'htmlFor' instead of 'for'
    // - Other HTMLElements
    // - String, will be converted to a textNode
    // - Array, will be recursed
    // - JQuery selector
    createElementFactory: function(tagName) {
      return function() {
        var result = $(currentDocument.createElement(tagName));
        result = addChildNodes(result, arguments, true);
        return result;
      };
    },
    
    // Use this function when temporarily creating elements inside a different document (an iframe for example)
    pushDocument: function(doc) {
      previousDocumentStack.push(currentDocument);
      currentDocument = doc;
    },
    
    // Use in symmetry with pushDocument
    popDocument: function() {
      currentDocument = previousDocumentStack.pop();
    }
  };
	
  var htmlElementNames = ['a','abbr','acronym','address','area','b','base','bdo','big','blockquote','body','br','button','caption','cite','code','col','colgroup','dd','del','dfn','div','dl','dt','em','fieldset','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','hr','html','i','iframe','img','input','ins','kbd','label','legend','li','link','map','meta','noframes','noscript','object','ol','optgroup','option','p','param','pre','q','samp','script','select','small','span','strong','style','sub','sup','table','tbody','td','textarea','tfoot','th','thead','title','tr','tt','u','ul','var'];
  for (var i=0;i<htmlElementNames.length;i++) {
    var name = htmlElementNames[i];
    $.element[name] = $.element.createElementFactory(name);
  }

})(jQuery);

/*jslint vars: true, white: true, browser: true */
