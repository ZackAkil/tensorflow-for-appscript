function fetch(url, options) {

    // make appscript fetch act like js fetch

    var fake_promise = {
        'then': (f) => f({
            'body': UrlFetchApp.fetch(url).getContent(),
            'json': () => ({
                then: function(f2) {
                    const content = JSON.parse(UrlFetchApp.fetch(url).getContentText())
                    console.log(url)
                    f2(content)
                }
            }),
            'arrayBuffer': () => ({
                then: function(f2) {
                    const content = UrlFetchApp.fetch(url).getContentText();
                    console.log(url)
                    console.log(content.slice(0, 20));
                    f2(content);
                }
            }),
            'status': 200,
            'ok': true
        })
    }

    return fake_promise
}