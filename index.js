// evening-echo-rss - Copyright Conor O'Neill 2018, conor@conoroneill.com
// LICENSE Apache-2.0
// Invoke like https://url.of.serverless.function/dev/rss?page=https://www.eveningecho.ie/corknews or https://url.of.serverless.function/dev/rss?page=https://www.eveningecho.ie/nationalnews or https://url.of.serverless.function/dev/rss?page=https://www.eveningecho.ie/business

module.exports.check = (event, context, callback) => {

    var request = require('request');
    var cheerio = require('cheerio');
    var RSS = require('rss');
    var siteURL = event.query.page;
    var links = [];

    var feed = new RSS({
        title: 'Evening Echo RSS',
        description: 'Return latest news stories from a Cork Evening Echo page',
        feed_url: 'http://example.com/rss.xml',
        site_url: siteURL,
        image_url: 'https://www.eveningecho.ie/EE-flo-theme/images/assetsflo/evening-echo.png',
        docs: 'http://example.com/rss/docs.html',
        managingEditor: 'conor@conoroneill.com',
        webMaster: 'conor@conoroneill.com',
        copyright: '2018 Conor ONeill',
        language: 'en',
        pubDate: 'Sep 8, 2018 08:00:00 GMT',
        ttl: '60',
    });

    request(siteURL, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('.article_details').each(function () {
                var link = $(this).attr('href');
                var title = $(this).text();
                var currentDate = new Date();
                links.push({
                    "link": link,
                    "title": title
                });
                feed.item({
                    title: title,
                    description: title,
                    url: siteURL + link,
                    author: "eveningecho@example.com",
                    date: currentDate
                });
            });
            var xml = feed.xml();
            context.succeed(xml);
        }
    });
};