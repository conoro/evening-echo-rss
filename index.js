// evening-echo-rss - Copyright Conor O'Neill 2018, conor@conoroneill.com
// LICENSE Apache-2.0
// Invoke like https://url.of.serverless.function/dev/rss?page=https://www.eveningecho.ie/corknews or https://url.of.serverless.function/dev/rss?page=https://www.eveningecho.ie/nationalnews or https://url.of.serverless.function/dev/rss?page=https://www.eveningecho.ie/business

module.exports.check = (event, context, callback) => {
  var request = require("request");
  var cheerio = require("cheerio");
  var RSS = require("rss");
  var sectionURL = event.query.page;

  var feed = new RSS({
    title: "Evening Echo RSS",
    description: "Return latest news stories from a Cork Evening Echo page",
    feed_url: "http://example.com/rss.xml",
    site_url: sectionURL,
    image_url:
      "https://www.eveningecho.ie/EE-flo-theme/images/assetsflo/evening-echo.png",
    docs: "http://example.com/rss/docs.html",
    managingEditor: "conor@conoroneill.com",
    webMaster: "conor@conoroneill.com",
    copyright: "2018 Conor ONeill",
    language: "en",
    pubDate: "Sep 8, 2018 08:00:00 GMT",
    ttl: "60"
  });

  request(sectionURL, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $(".article_details").each(function() {
        var link = "https://www.eveningecho.ie" + $(this).attr("href");
        if (link.indexOf(sectionURL) > -1) {
          //  console.log(link);
          var title = $(this).text();
          var currentDate = new Date();
          feed.item({
            title: title,
            description: title,
            url: link,
            author: "eveningecho@example.com",
            date: currentDate
          });
        }
      });
      var xml = feed.xml();
      context.succeed(xml);
    }
  });
};
