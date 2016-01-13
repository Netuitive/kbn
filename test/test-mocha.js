var chai = require('chai');
var expect = chai.expect;

describe('kbn.toFixed and negative decimals', function() {
  it('should treat as zero decimals', function() {
    var str = kbn.toFixed(186.123, -2);
    expect(str).to.be('186');
  });
});
