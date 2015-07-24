var express = require('express');
var gutil   = require('gulp-util');

function startServer (staticPath, log) {
  var app = express();

  app.use(express.static(staticPath));

  var port = process.env.PORT || 8080;
  app.listen(port, function() {
    log(gutil.colors.green('HTTP server listening on port ' + port));
  });
}

if (require.main === module) {
  // Called directly through Node
  startServer(__dirname + '/dist', console.log.bind(console));
} else {
  // Required as a module
  module.exports = startServer;
}
