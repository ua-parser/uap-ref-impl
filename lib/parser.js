var Results = require('./results').Results,
    makeParser = require('./makeParser'),
    ua = require('./ua'),
    os = require('./os'),
    device = require('./device');

module.exports = function(regexes) {
	var parseUA = makeParser(regexes.user_agent_parsers, ua.makeParser, ua.makeDefault);
	var parseOS = makeParser(regexes.os_parsers, os.makeParser, os.makeDefault);
	var parseDevice = makeParser(regexes.device_parsers, device.makeParser, device.makeDefault);
	
	function parse(str) {
	  var ua = parseUA(str),
	      os = parseOS(str),
	      device = parseDevice(str);
	  return new Results(str, ua, os, device);
	}
	
	return {
		parse: parse,
		parseUA: parseUA,
		parseOS: parseOS,
		parseDevice: parseDevice
	};
};
