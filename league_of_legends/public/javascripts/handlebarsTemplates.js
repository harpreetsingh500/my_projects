this["JST"] = this["JST"] || {};

this["JST"]["champion-image"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class='champion' data-name="
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + " data-type="
    + alias4(((helper = (helper = helpers.championType || (depth0 != null ? depth0.championType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championType","hash":{},"data":data}) : helper)))
    + ">\r\n  <img class='lazy' data-original="
    + alias4(((helper = (helper = helpers.championImage || (depth0 != null ? depth0.championImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championImage","hash":{},"data":data}) : helper)))
    + ">\r\n</li>\r\n";
},"useData":true});

this["JST"]["champion-info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "      <li>\r\n        <p>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</p>\r\n        <img src="
    + alias2(alias1((depth0 != null ? depth0.imageLink : depth0), depth0))
    + " alt=' Image not found'>\r\n      </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class='champion-spells'>\r\n  <p class='close'>Click here to exit.</p>\r\n  <h2>Champion Name: "
    + alias4(((helper = (helper = helpers.championName || (depth0 != null ? depth0.championName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"championName","hash":{},"data":data}) : helper)))
    + "</h2>\r\n  <h3>Click to show/hide: Spells</h3>\r\n  <ul>\r\n    <li><img src="
    + alias4(((helper = (helper = helpers.passiveImage || (depth0 != null ? depth0.passiveImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passiveImage","hash":{},"data":data}) : helper)))
    + "><p><span>Passive:</span> "
    + alias4(((helper = (helper = helpers.passiveInfo || (depth0 != null ? depth0.passiveInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passiveInfo","hash":{},"data":data}) : helper)))
    + "</p></li>\r\n    <li><img src="
    + alias4(((helper = (helper = helpers.qImage || (depth0 != null ? depth0.qImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"qImage","hash":{},"data":data}) : helper)))
    + "><p><span>Q:</span> "
    + alias4(((helper = (helper = helpers.qInfo || (depth0 != null ? depth0.qInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"qInfo","hash":{},"data":data}) : helper)))
    + "</p></li>\r\n    <li><img src="
    + alias4(((helper = (helper = helpers.wImage || (depth0 != null ? depth0.wImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wImage","hash":{},"data":data}) : helper)))
    + "><p><span>W:</span> "
    + alias4(((helper = (helper = helpers.wInfo || (depth0 != null ? depth0.wInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wInfo","hash":{},"data":data}) : helper)))
    + "</p></li>\r\n    <li><img src="
    + alias4(((helper = (helper = helpers.eImage || (depth0 != null ? depth0.eImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"eImage","hash":{},"data":data}) : helper)))
    + "><p><span>E:</span> "
    + alias4(((helper = (helper = helpers.eInfo || (depth0 != null ? depth0.eInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"eInfo","hash":{},"data":data}) : helper)))
    + "</p></li>\r\n    <li><img src="
    + alias4(((helper = (helper = helpers.rImage || (depth0 != null ? depth0.rImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rImage","hash":{},"data":data}) : helper)))
    + "><p><span>R:</span> "
    + alias4(((helper = (helper = helpers.rInfo || (depth0 != null ? depth0.rInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rInfo","hash":{},"data":data}) : helper)))
    + "</p></li>\r\n  </ul>\r\n</div>\r\n<div class='champion-skins'>\r\n  <h3>Click to show/hide: Skins</h3>\r\n  <ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.skins : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\r\n</div>\r\n";
},"useData":true});