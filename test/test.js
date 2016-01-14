// Test helper functions
QUnit.module('Helper function tests');
QUnit.test('kbn.toFixed and negative decimals', function(assert) {
  assert.equal(kbn.toFixed(186.123, -2), '186');
});

QUnit.test('kbn ms format when scaled decimals is null do not use it', function(assert) {
  var str = kbn.valueFormats['ms'](10000086.123, 1, null);
  assert.equal(str, '2.8 hour');
});

QUnit.test('kbn kbytes format when scaled decimals is null do not use it', function(assert) {
  var str = kbn.valueFormats['kbytes'](10000000, 3, null);
  assert.equal(str, '9.537 GiB');
});

QUnit.test('kbn roundValue', function(assert) {
  var str = kbn.roundValue(null, 2);
  assert.equal(str, null);
});

// test value formats
function testValueFormat(desc, value, tickSize, tickDecimals, result) {
  QUnit.test('should translate ' + value + ' as ' + result, function(assert) {
    var scaledDecimals = tickDecimals - Math.floor(Math.log(tickSize) / Math.LN10);
    var str = kbn.valueFormats[desc](value, tickDecimals, scaledDecimals);
    assert.equal(str, result);
  });
}

QUnit.module('Value format function tests');
testValueFormat('ms', 0.0024, 0.0005, 4, '0.0024 ms');
testValueFormat('ms', 100, 1, 0, '100 ms');
testValueFormat('ms', 1250, 10, 0, '1.25 s');
testValueFormat('ms', 1250, 300, 0, '1.3 s');
testValueFormat('ms', 65150, 10000, 0, '1.1 min');
testValueFormat('ms', 6515000, 1500000, 0, '1.8 hour');
testValueFormat('ms', 651500000, 150000000, 0, '8 day');

testValueFormat('none', 2.75e-10, 0, 10, '3e-10');
testValueFormat('none', 0, 0, 2, '0');
testValueFormat('dB', 10, 1000, 2, '10.00 dB');

testValueFormat('percent', 0, 0, 0, '0 %');
testValueFormat('percent', 53, 0, 1, '53.0 %');
testValueFormat('percentunit', 0.0, 0, 0, '0 %');
testValueFormat('percentunit', 0.278, 0, 1, '27.8 %');
testValueFormat('percentunit', 1.0, 0, 0, '100 %');

testValueFormat('currencyUSD', 7.42, 10000, 2, '$7.42');
testValueFormat('currencyUSD', 1532.82, 1000, 1, '$1.53K');
testValueFormat('currencyUSD', 18520408.7, 10000000, 0, '$19M');

testValueFormat('bytes', -1.57e+308, -1.57e+308, 2, 'NA');

testValueFormat('ns', 25, 1, 0, '25 ns');
testValueFormat('ns', 2558, 50, 0, '2.56 µs');

testValueFormat('ops', 123, 1, 0, '123 ops');
testValueFormat('rps', 456000, 1000, -1, '456K rps');
testValueFormat('rps', 123456789, 1000000, 2, '123.457M rps');
testValueFormat('wps', 789000000, 1000000, -1, '789M wps');
testValueFormat('iops', 11000000000, 1000000000, -1, '11B iops');

testValueFormat('s', 24, 1, 0, '24 s');
testValueFormat('s', 246, 1, 0, '4.1 min');
testValueFormat('s', 24567, 100, 0, '6.82 hour');
testValueFormat('s', 24567890, 10000, 0, '40.62 week');
testValueFormat('s', 24567890000, 1000000, 0, '778.53 year');

testValueFormat('m', 24, 1, 0, '24 min');
testValueFormat('m', 246, 10, 0, '4.1 hour');
testValueFormat('m', 6545, 10, 0, '4.55 day');
testValueFormat('m', 24567, 100, 0, '2.44 week');
testValueFormat('m', 24567892, 10000, 0, '46.7 year');

testValueFormat('h', 21, 1, 0, '21 hour');
testValueFormat('h', 145, 1, 0, '6.04 day');
testValueFormat('h', 1234, 100, 0, '7.3 week');
testValueFormat('h', 9458, 1000, 0, '1.08 year');

testValueFormat('d', 3, 1, 0, '3 day');
testValueFormat('d', 245, 100, 0, '35 week');
testValueFormat('d', 2456, 10, 0, '6.73 year');


// FORMAT VALUE convience function that scales and then truncates to 2 decimals
QUnit.module('FormatValue tests');

// test value formats
function testFormatValue(unit, value, result) {
  QUnit.test('formatValue() should translate ' + value + ' as ' + result, function(assert) {
    var str = kbn.formatValue(value, unit)
    assert.equal(str, result);
  });
}

// Nanoseconds
testFormatValue('ns', 10, '10 ns');
testFormatValue('ns', 10000, '10.0 µs');
testFormatValue('ns', 100000000, '100 ms');
testFormatValue('ns', 10000000000, '10.0 s');
testFormatValue('ns', 1000000000000, '16.67 min');

// Milliseconds
testFormatValue('ms', 10000, '10.0 s');

// minutes
testFormatValue('m', 10, '10 min');
testFormatValue('m', 1000, '16.7 hour');
testFormatValue('m', 10000, '6.9 day');
testFormatValue('m', 100000, '9.9 week');

// percent
testFormatValue('percent', 0.1, '0.10 %');
testFormatValue('percent', 100, '100 %');
testFormatValue('percent', 100.0015, '100 %');
testFormatValue('percent', 0.0015, '0.0015 %');

// AWS Units
testFormatValue('Percent', 45.4, '45 %');
testFormatValue('Bytes', 1024, '1.00 KiB');
testFormatValue('Seconds', 10000, '2.78 hour');
