
function testFormatValue(unit, value, result) {
  it('formatValue() should translate ' + value + ' as ' + result, function() {
    var str = kbn.formatValue(value, unit)
    assert.equal(str, result);
  });
}

describe('Time', function() {
  describe('Nanoseconds', function () {
    testFormatValue('ns', 10, '10 ns');
    testFormatValue('ns', 10000, '10 µs');
    testFormatValue('ns', 100000000, '100 ms');
    testFormatValue('ns', 10000000000, '10 s');
    testFormatValue('ns', 1000000000000, '16.67 min');
    testFormatValue('ns', 2558, '2.558 µs');
  });
  describe('Milliseconds', function() {
    testFormatValue('ms', 0.0024, '0.0024 ms');
    testFormatValue('ms', 100, '100 ms');
    testFormatValue('ms', 1250, '1.25 s');
    testFormatValue('ms', 65150, '1.086 min');
    testFormatValue('ms', 6515000, '1.81 hr');
    testFormatValue('ms', 651500000, '7.541 day');
  });
  describe('Seconds', function() {
    testFormatValue('s', 0.0245, '24.5 ms');
    testFormatValue('s', 24, '24 s');
    testFormatValue('s', 246, '4.1 min');
    testFormatValue('s', 24567, '6.824 hr');
    testFormatValue('s', 24567890, '40.62 wk');
    testFormatValue('s', 24567890000, '778.5 yr');
  });
  describe('Minutes', function() {
    testFormatValue('m', 24, '24 min');
    testFormatValue('m', 246, '4.1 hr');
    testFormatValue('m', 6545, '4.545 day');
    testFormatValue('m', 24567, '2.437 wk');
    testFormatValue('m', 24567892, '46.71 yr');
  });
  describe('Hours', function() {
    testFormatValue('h', 21, '21 hr');
    testFormatValue('h', 145, '6.042 day');
    testFormatValue('h', 1234, '7.345 wk');
    testFormatValue('h', 9458, '1.08 yr');
  });
  describe('Days', function() {
    testFormatValue('d', 3, '3 day');
    testFormatValue('d', 245, '35 wk');
    testFormatValue('d', 2456, '6.729 yr');
  });
});


describe('General', function() {
  describe('none', function() {
    testFormatValue('none', 2.75e-10, '2.75e-10');
    testFormatValue('none', 0, '0');
  });
  describe('Percent', function() {
    testFormatValue('percent', 0, '0 %');
    testFormatValue('percent', 53, '53 %');
    testFormatValue('percent', 0.1000, '0.1 %');
    testFormatValue('percent', 100.0, '100 %');
    testFormatValue('percent', 100.0015, '100 %');
    testFormatValue('percent', 0.0015, '0.0015 %');
  });
  describe('Percent Unit', function() {
    testFormatValue('percentunit', 0.0, '0 %');
    testFormatValue('percentunit', 0.278, '27.8 %');
    testFormatValue('percentunit', 1.0, '100 %');
  });

});

describe('General', function() {
  testFormatValue('currencyUSD', 7.42, '$7.42');
  testFormatValue('currencyUSD', 1532.82, '$1.533 K');
  testFormatValue('currencyUSD', 18520408.7, '$18.52 M');
});

describe('Data Rates', function() {
  testFormatValue('ops', 123, '123 ops');
  testFormatValue('rps', 456000, '456 K rps');
  testFormatValue('rps', 123456789, '123.5 M rps');
  testFormatValue('wps', 789000000, '789 M wps');
  testFormatValue('iops', 11000000000, '11 B iops');
});

describe('Data', function() {
  testFormatValue('bytes', 10240, '10 KiB');
  testFormatValue('kbytes', 10240, '10 MiB');
});

describe('AWS Data', function() {
  // AWS Units
  testFormatValue('Percent', 45.4, '45.4 %');
  testFormatValue('Bytes', 10240, '10 KiB');
  testFormatValue('Seconds', 10000, '2.778 hr');
  testFormatValue('Percent', 0, '0 %');
  testFormatValue('None', 1, '1');
});

describe('Bad Inputs', function() {
  // Unknown units should default to 'short'
  testFormatValue('blah', 1000.0, '1 K');
  testFormatValue('', 1000.0, '1 K');
  testFormatValue(null, 1000.0, '1 K');

  // Other unusally inputs
  testFormatValue('bytes', null, null);
  testFormatValue('bytes', '10', '10 B');
  testFormatValue('bytes', 'not a number', null);
});
