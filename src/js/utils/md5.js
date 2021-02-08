var crypto = require("crypto");
module.exports.md5 = function md5(content) {
  var result = crypto
    .createHash("md5")
    .update(content)
    .digest("hex");
  return result;
};
