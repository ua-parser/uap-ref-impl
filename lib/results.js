exports.Results = Results
function Results (uaStr, ua, os, device) {
  this.userAgent = uaStr
  this.ua = ua
  this.os = os
  this.device = device
  delete ua.userAgent
  delete os.userAgent
  delete device.userAgent
}
