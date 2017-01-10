this["JST"] = this["JST"] || {};

this["JST"]["contacts"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\r\n  <p>"
    + alias4(((helper = (helper = helpers.contactName || (depth0 != null ? depth0.contactName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"contactName","hash":{},"data":data}) : helper)))
    + "</p>\r\n  <dt>Phone Number:</dt>\r\n  <dd>"
    + alias4(((helper = (helper = helpers.phoneNumber || (depth0 != null ? depth0.phoneNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phoneNumber","hash":{},"data":data}) : helper)))
    + "</dd>\r\n  <dt>Email:</dt>\r\n  <dd>"
    + alias4(((helper = (helper = helpers.contactEmail || (depth0 != null ? depth0.contactEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"contactEmail","hash":{},"data":data}) : helper)))
    + "</dd>\r\n  <a href='#' class='edit-contact'><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Edit</a>\r\n  <a href='#' class='delete-contact'><i class=\"fa fa-trash\" aria-hidden=\"true\"></i> Delete</a>\r\n</li>\r\n";
},"useData":true});

this["JST"]["error-message"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p class='error-message'>Please enter a valid "
    + container.escapeExpression(((helper = (helper = helpers.input || (depth0 != null ? depth0.input : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"input","hash":{},"data":data}) : helper)))
    + ".</p>\r\n";
},"useData":true});
