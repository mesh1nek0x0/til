const expect = require('chai').expect;
const converter = require('../app/converter');

describe("Color Code Converter", function () {
  describe("RGB to Hex conversion", function () {
    it('converts the basic colors', function () {
      var redHex = converter.rgb2Hex(255, 0, 0);
      
      expect(redHex).to.equal('ff0000');
    });
  });
  
  describe("Hex to RGB conversion", function () {
    it('converts the basic colors', function () {
      var red = converter.hex2Rgb('ff0000');
      
      expect(red).to.deep.equal([255, 0, 0]);
    });
  });
});