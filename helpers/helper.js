exports.pad = function(num, size) {
  var s = num.toString();
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}
