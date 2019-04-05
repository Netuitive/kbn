'use strict';

var kbn = {};
kbn.valueFormats = {};

///// HELPER FUNCTIONS /////
kbn.toFixed = function(value, decimals) {
  if (value === null) {
    return '';
  }

  var factor = decimals ? Math.pow(10, Math.max(0, decimals)) : 1;
  var formatted = String(Math.round(value * factor) / factor);

  // if exponent return directly
  if (formatted.indexOf('e') !== -1 || value === 0) {
    return formatted;
  }

  // If tickDecimals was specified, ensure that we have exactly that
  // much precision; otherwise default to the value's own precision.
  if (decimals !== null) {
    var decimalPos = formatted.indexOf('.');
    var precision = decimalPos === -1 ? 0 : formatted.length - decimalPos - 1;
    if (precision < decimals) {
      return (precision ? formatted : formatted + '.') + (String(factor)).substr(1, decimals - precision);
    }
  }

  return formatted;
};

kbn.toFixedScaled = function(value, decimals, scaledDecimals, additionalDecimals, ext) {
  if (scaledDecimals === null) {
    return {value: kbn.toFixed(value, decimals), symbol: ext};
  } else {
    return {value: kbn.toFixed(value, scaledDecimals + additionalDecimals), symbol: ext};
  }
};

kbn.roundValue = function(num, decimals) {
  if (num === null) {
    return null;
  }
  var n = Math.pow(10, decimals);
  return Math.round((n * num).toFixed(decimals)) / n;
};

///// FORMAT FUNCTION CONSTRUCTORS /////

kbn.formatBuilders = {};

// Formatter which always appends a fixed unit string to the value. No
// scaling of the value is performed.
kbn.formatBuilders.fixedUnit = function(unit) {
  return function(size, decimals) {
    if (size === null) {
      return {};
    }
    return {value: kbn.toFixed(size, decimals), symbol: unit};
  };
};

// Formatter which scales the unit string geometrically according to the given
// numeric factor. Repeatedly scales the value down by the factor until it is
// less than the factor in magnitude, or the end of the array is reached.
kbn.formatBuilders.scaledUnits = function(factor, extArray) {
  return function(size, decimals, scaledDecimals) {
    if (size === null) {
      return {};
    }

    var steps = 0;
    var limit = extArray.length;

    while (Math.abs(size) >= factor) {
      steps++;
      size /= factor;

      if (steps >= limit) {
        return 'NA';
      }
    }

    if (steps > 0 && scaledDecimals !== null) {
      decimals = scaledDecimals + (3 * steps);
    }

    return {value: kbn.toFixed(size, decimals), symbol: extArray[steps]};
  };
};

// Extension of the scaledUnits builder which uses SI decimal prefixes. If an
// offset is given, it adjusts the starting units at the given prefix; a value
// of 0 starts at no scale; -3 drops to nano, +2 starts at mega, etc.
kbn.formatBuilders.decimalSIPrefix = function(unit, offset) {
  var prefixes = ['n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  prefixes = prefixes.slice(3 + (offset || 0));
  var units = prefixes.map(function(p) {
    return p + unit;
  });
  return kbn.formatBuilders.scaledUnits(1000, units);
};

// Extension of the scaledUnits builder which uses SI binary prefixes. If
// offset is given, it starts the units at the given prefix; otherwise, the
// offset defaults to zero and the initial unit is not prefixed.
kbn.formatBuilders.binarySIPrefix = function(unit, offset) {
  var prefixes = ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'].slice(offset);
  var units = prefixes.map(function(p) {
    return p + unit;
  });
  return kbn.formatBuilders.scaledUnits(1024, units);
};

// Currency formatter for prefixing a symbol onto a number. Supports scaling
// up to the trillions.
kbn.formatBuilders.currency = function(symbol) {
  var units = ['', 'K', 'M', 'B', 'T'];
  var scaler = kbn.formatBuilders.scaledUnits(1000, units);
  return function(size, decimals, scaledDecimals) {
    if (size === null) {
      return {};
    }
    var scaled = scaler(size, decimals, scaledDecimals);
    return {prefix: symbol, value: scaled.value, symbol: scaled.symbol};
  };
};

kbn.formatBuilders.simpleCountUnit = function(symbol) {
  var units = ['', 'K', 'M', 'B', 'T'];
  var scaler = kbn.formatBuilders.scaledUnits(1000, units);
  return function(size, decimals, scaledDecimals) {
    if (size === null) {
      return {};
    }
    var scaled = scaler(size, decimals, scaledDecimals);
    var sSymbol = scaled.symbol ? scaled.symbol + ' ' + symbol : symbol;
    return {value: scaled.value, symbol: sSymbol};
  };
};

///// VALUE FORMATS /////

// Dimensionless Units
kbn.valueFormats.none = kbn.toFixed;
kbn.valueFormats.short = kbn.formatBuilders.scaledUnits(1000, ['', 'K', 'Mil', 'Bil', 'Tri', 'Quadr', 'Quint', 'Sext', 'Sept']);
kbn.valueFormats.dB = kbn.formatBuilders.fixedUnit('dB');
kbn.valueFormats.ppm = kbn.formatBuilders.fixedUnit('ppm');

kbn.valueFormats.percent = function(size, decimals) {
  if (size === null) {
    return {};
  }
  return {value: kbn.toFixed(size, decimals), symbol:'%'};
};

kbn.valueFormats.percentunit = function(size, decimals) {
  if (size === null) {
    return {};
  }
  return {value: kbn.toFixed(100 * size, decimals), symbol:'%'};
};

// Currencies
kbn.valueFormats.currencyUSD = kbn.formatBuilders.currency('$');
kbn.valueFormats.currencyGBP = kbn.formatBuilders.currency('£');
kbn.valueFormats.currencyEUR = kbn.formatBuilders.currency('€');
kbn.valueFormats.currencyJPY = kbn.formatBuilders.currency('¥');

// Data
kbn.valueFormats.bits = kbn.formatBuilders.binarySIPrefix('b');
kbn.valueFormats.bytes = kbn.formatBuilders.binarySIPrefix('B');
kbn.valueFormats.kibytes = kbn.formatBuilders.binarySIPrefix('B', 1);
kbn.valueFormats.mibytes = kbn.formatBuilders.binarySIPrefix('B', 2);
kbn.valueFormats.gibytes = kbn.formatBuilders.binarySIPrefix('B', 3);
kbn.valueFormats.bytesd = kbn.formatBuilders.decimalSIPrefix('B');
kbn.valueFormats.kbytes = kbn.formatBuilders.decimalSIPrefix('B', 1);
kbn.valueFormats.mbytes = kbn.formatBuilders.decimalSIPrefix('B', 2);
kbn.valueFormats.gbytes = kbn.formatBuilders.decimalSIPrefix('B', 3);

// Data Rate
kbn.valueFormats.pps = kbn.formatBuilders.decimalSIPrefix('pps');
kbn.valueFormats.bps = kbn.formatBuilders.decimalSIPrefix('bps');
kbn.valueFormats.Bps = kbn.formatBuilders.decimalSIPrefix('Bps');
kbn.valueFormats.kBps = kbn.formatBuilders.decimalSIPrefix('Bps', 1);
kbn.valueFormats.mBps = kbn.formatBuilders.decimalSIPrefix('Bps', 2);
kbn.valueFormats.gBps = kbn.formatBuilders.decimalSIPrefix('Bps', 3);

// Throughput
kbn.valueFormats.ops = kbn.formatBuilders.simpleCountUnit('ops');
kbn.valueFormats.rps = kbn.formatBuilders.simpleCountUnit('rps');
kbn.valueFormats.wps = kbn.formatBuilders.simpleCountUnit('wps');
kbn.valueFormats.iops = kbn.formatBuilders.simpleCountUnit('iops');

// Memory
kbn.valueFormats.fps = kbn.formatBuilders.simpleCountUnit('fps');
kbn.valueFormats.Pps = kbn.formatBuilders.simpleCountUnit('Pps');

// Energy
kbn.valueFormats.watt = kbn.formatBuilders.decimalSIPrefix('W');
kbn.valueFormats.kwatt = kbn.formatBuilders.decimalSIPrefix('W', 1);
kbn.valueFormats.watth = kbn.formatBuilders.decimalSIPrefix('Wh');
kbn.valueFormats.kwatth = kbn.formatBuilders.decimalSIPrefix('Wh', 1);
kbn.valueFormats.joule = kbn.formatBuilders.decimalSIPrefix('J');
kbn.valueFormats.ev = kbn.formatBuilders.decimalSIPrefix('eV');
kbn.valueFormats.amp = kbn.formatBuilders.decimalSIPrefix('A');
kbn.valueFormats.volt = kbn.formatBuilders.decimalSIPrefix('V');

// Temperature
kbn.valueFormats.celsius = kbn.formatBuilders.fixedUnit('°C');
kbn.valueFormats.farenheit = kbn.formatBuilders.fixedUnit('°F');
kbn.valueFormats.kelvin = kbn.formatBuilders.fixedUnit('K');
kbn.valueFormats.humidity = kbn.formatBuilders.fixedUnit('%H');

// Pressure
kbn.valueFormats.pressurembar = kbn.formatBuilders.fixedUnit('mbar');
kbn.valueFormats.pressurehpa = kbn.formatBuilders.fixedUnit('hPa');
kbn.valueFormats.pressurehg = kbn.formatBuilders.fixedUnit('\'Hg');
kbn.valueFormats.pressurepsi = kbn.formatBuilders.scaledUnits(1000, ['psi', 'ksi', 'Mpsi']);

// Length
kbn.valueFormats.lengthm = kbn.formatBuilders.decimalSIPrefix('m');
kbn.valueFormats.lengthmm = kbn.formatBuilders.decimalSIPrefix('m', -1);
kbn.valueFormats.lengthkm = kbn.formatBuilders.decimalSIPrefix('m', 1);
kbn.valueFormats.lengthmi = kbn.formatBuilders.fixedUnit('mi');

// Velocity
kbn.valueFormats.velocityms = kbn.formatBuilders.fixedUnit('m/s');
kbn.valueFormats.velocitykmh = kbn.formatBuilders.fixedUnit('km/h');
kbn.valueFormats.velocitymph = kbn.formatBuilders.fixedUnit('mph');
kbn.valueFormats.velocityknot = kbn.formatBuilders.fixedUnit('kn');

// Volume
kbn.valueFormats.litre = kbn.formatBuilders.decimalSIPrefix('L');
kbn.valueFormats.mlitre = kbn.formatBuilders.decimalSIPrefix('L', -1);
kbn.valueFormats.m3 = kbn.formatBuilders.decimalSIPrefix('m3');

// Time
kbn.valueFormats.hertz = kbn.formatBuilders.decimalSIPrefix('Hz');

kbn.valueFormats.ms = function(size, decimals, scaledDecimals) {
  if (size === null) {
    return {};
  }

  if (Math.abs(size) < 1000) {
    return {value: kbn.toFixed(size, decimals), symbol:'ms'};
  }
  // Less than 1 min
  else if (Math.abs(size) < 60000) {
    return kbn.toFixedScaled(size / 1000, decimals, scaledDecimals, 3, 's');
  }
  // Less than 1 hour, devide in minutes
  else if (Math.abs(size) < 3600000) {
    return kbn.toFixedScaled(size / 60000, decimals, scaledDecimals, 5, 'min');
  }
  // Less than one day, devide in hours
  else if (Math.abs(size) < 86400000) {
    return kbn.toFixedScaled(size / 3600000, decimals, scaledDecimals, 7, 'hr');
  }
  // Less than one year, devide in days
  else if (Math.abs(size) < 31536000000) {
    return kbn.toFixedScaled(size / 86400000, decimals, scaledDecimals, 8, 'day');
  }

  return kbn.toFixedScaled(size / 31536000000, decimals, scaledDecimals, 10, 'year');
};

kbn.valueFormats.s = function(size, decimals, scaledDecimals) {
  if (size === null) {
    return {};
  }

  // Less than 1 s, multiply into milliseconds
  if (Math.abs(size) < 1) {
    return kbn.toFixedScaled(size * 1000, decimals, scaledDecimals, 2, 'ms');
  }

  else if (Math.abs(size) < 60) {
    return {value: kbn.toFixed(size, decimals), symbol:'s'};
  }
  // Less than 1 hour, devide in minutes
  else if (Math.abs(size) < 3600) {
    return kbn.toFixedScaled(size / 60, decimals, scaledDecimals, 1, 'min');
  }
  // Less than one day, devide in hours
  else if (Math.abs(size) < 86400) {
    return kbn.toFixedScaled(size / 3600, decimals, scaledDecimals, 4, 'hr');
  }
  // Less than one week, devide in days
  else if (Math.abs(size) < 604800) {
    return kbn.toFixedScaled(size / 86400, decimals, scaledDecimals, 5, 'day');
  }
  // Less than one year, devide in week
  else if (Math.abs(size) < 31536000) {
    return kbn.toFixedScaled(size / 604800, decimals, scaledDecimals, 6, 'wk');
  }

  return kbn.toFixedScaled(size / 3.15569e7, decimals, scaledDecimals, 7, 'yr');
};

kbn.valueFormats['µs'] = function(size, decimals, scaledDecimals) {
  if (size === null) {
    return {};
  }

  if (Math.abs(size) < 1000) {
    return {
      value: kbn.toFixed(size, decimals),
      symbol: 'µs'
    };
  } else {
    return kbn.valueFormats['ms'](size / (1000), decimals, scaledDecimals);
  }
};

kbn.valueFormats.ns = function(size, decimals, scaledDecimals) {
  if (size === null) {
    return {};
  }

  if (Math.abs(size) < 1000) {
    return {
      value: kbn.toFixed(size, decimals),
      symbol: 'ns'
    };
  } else {
    return kbn.valueFormats['µs'](size / (1000), decimals, scaledDecimals);
  }
};

kbn.valueFormats.m = function(size, decimals, scaledDecimals) {
  if (size === null) {
    return {};
  }

  if (Math.abs(size) < 60) {
    return {value:kbn.toFixed(size, decimals),symbol:'min'};
  } else if (Math.abs(size) < 1440) {
    return kbn.toFixedScaled(size / 60, decimals, scaledDecimals, 2, 'hr');
  } else if (Math.abs(size) < 10080) {
    return kbn.toFixedScaled(size / 1440, decimals, scaledDecimals, 3, 'day');
  } else if (Math.abs(size) < 604800) {
    return kbn.toFixedScaled(size / 10080, decimals, scaledDecimals, 4, 'wk');
  } else {
    return kbn.toFixedScaled(size / 5.25948e5, decimals, scaledDecimals, 5, 'yr');
  }
};

kbn.valueFormats.h = function(size, decimals, scaledDecimals) {
  if (size === null) {
    return {};
  }

  if (Math.abs(size) < 24) {
    return {value: kbn.toFixed(size, decimals), symbol: 'hr'};
  } else if (Math.abs(size) < 168) {
    return kbn.toFixedScaled(size / 24, decimals, scaledDecimals, 2, 'day');
  } else if (Math.abs(size) < 8760) {
    return kbn.toFixedScaled(size / 168, decimals, scaledDecimals, 3, 'wk');
  } else {
    return kbn.toFixedScaled(size / 8760, decimals, scaledDecimals, 4, 'yr');
  }
};

kbn.valueFormats.d = function(size, decimals, scaledDecimals) {
  if (size === null) {
    return '';
  }

  if (Math.abs(size) < 7) {
    return {value: kbn.toFixed(size, decimals),symbol: 'day'};
  } else if (Math.abs(size) < 365) {
    return kbn.toFixedScaled(size / 7, decimals, scaledDecimals, 2, 'wk');
  } else {
    return kbn.toFixedScaled(size / 365, decimals, scaledDecimals, 3, 'yr');
  }
};

// Attempt to find the specified unit, default to short
kbn.findUnitFormat = function(unit) {
  var defaultFormat = 'short';
  if (!unit) {
    return defaultFormat;
  }

  if (kbn.valueFormats[unit]) {
    return unit;
  }
  // AWS units
  switch (unit) {
    case 'Bytes':
      return 'bytes';
    case 'Seconds':
      return 's';
    case 'Percent':
      return 'percent';
  }

  // try without case
  if (kbn.valueFormats[unit.toLowerCase()]) {
    return unit.toLowerCase();
  }
  return defaultFormat;
};

kbn.formatValue = function(value, unit) {
  if (isNaN(parseFloat(value))) {
    return null;
  }

  var formatFunc = kbn.valueFormats[kbn.findUnitFormat(unit)];
  if (formatFunc) {
    var result = formatFunc(value, 10, null);
    if (result && result.value) {
      // convert to 4 significant digits then convert back to number to strip
      // trailing 0's
      var prefix = result.prefix ? result.prefix : '';
      var val = Number(Number(result.value).toPrecision(4));
      var symbol = result.symbol ? ' ' + result.symbol : '';
      return prefix + val + symbol;
    } else {
      return value;
    }
  }
  return value;
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = kbn;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return kbn;
    });
  } else {
    window.kbn = kbn;
  }
}
