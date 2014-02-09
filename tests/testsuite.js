var endswith = function(text, ending) {
  return text.substr(text.length-ending.length) === ending;
}

test("normal use cases", function() {
  var link;
  var div = $.element.div({id: "testdiv", className: 'testdiv-class'}, 
    "a bit of text ",
	link = $.element.a({href: "?linkclicked=true", target: "_top", role: "button", "aria-pressed": false}, "the link"),
	"the last bit of text"
  );
  
  equal(div.length, 1);
  ok(div.hasClass("testdiv-class"));
  equal(div.contents().length, 3);
  equal(div.contents()[2].wholeText, "the last bit of text");
  
  ok(endswith(link[0].href, "testsuite.html?linkclicked=true"), link[0].href);
  ok(link.prop("aria-pressed")===false);
  ok(link.text(), "the link");
});

test("custom properties", function() {
  var element = $.element.b( { className: "label", att1: "value1", att2: "value2"}, "Bold language").attr("att3", "value3");
  
  // JQuery.element sets the property, not the attribute
  ok(element.attr("att2")!=="value2");
  
  // This should work
  ok(element.prop("att2")==="value2");
  
  // This works also
  ok(element[0].att2==="value2");

  // Normal jquery behavior
  ok(element.attr("att3")==="value3");

});