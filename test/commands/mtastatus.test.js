import chai from 'chai';
import sinon from 'sinon';

import commands from '../../commands/';
import MTA from '../../commands/mtastatus';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('Mtastatus', () => {
    describe('main', () => {
      const expectedHelp = `Check the status of your NYC Metro Line!\r\nSyntax is ${config.commandChar}mtastatus { line }`;

      it('should return expected help result when passed in "help"', (done) => {
        try {
          commands.mtastatus.main('help').then((result) => {
            expect(result).to.equal(expectedHelp);
            done();
          });
        } catch (error) {
          console.log(error);
        }
      });

      /**
       * This is a bad test, but alturnative is coppying all of the array
       * and deep comparison the result.
       */
      it('should return any expected string when passed empty string', (done) => {
        config.app.nsfw = true;
        try {
          commands.fortune.main('a').then((result) => {
            expect(result).to.be.a('string');
            done();
          });
        } catch (error) {}
      });

      it('should return expected error result when passed in an invalid line', (done) => {
        try {
          commands.mtastatus.main('tacobell').then((result) => {
            expect(result).to.equal('You must specify a valid line!');
            done();
          });
        } catch (error) {
          console.log(error);
        }
      });
    });

    describe('getColorForLine', () => {
      it('should return expected transit line result "light_red" when passed in "123" in various forms', () => {
          const resultValid = commands.mtastatus.colorForLine('123')
          expect(resultValid).to.equal('light_red');
      });

      it('should return expected transit line result null when passed in invalid data', () => {
          const resultInvalid = commands.mtastatus.colorForLine('tacobell')
          expect(resultInvalid).to.equal(null);
      });
    });

    describe('getLineKey', () => {
      it('should return expected transit line result "123" when passed in "1", "2", "3" in various forms', () => {
          const resultOne = commands.mtastatus.lineKey('1')
          expect(resultOne).to.equal('123');

          const resultTwo = commands.mtastatus.lineKey('2')
          expect(resultTwo).to.equal('123');

          const resultThree = commands.mtastatus.lineKey('3')
          expect(resultThree).to.equal('123');
      });

      it('should return expected transit line result "456" when passed in "4", "5", "6" in various forms', () => {
          const resultFour = commands.mtastatus.lineKey('4')
          expect(resultFour).to.equal('456');

          const resultFive = commands.mtastatus.lineKey('5')
          expect(resultFive).to.equal('456');

          const resultSix = commands.mtastatus.lineKey('6')
          expect(resultSix).to.equal('456');
      });

      it('should return expected transit line result "7" when passed in "7" in various forms', () => {
          const resultSeven = commands.mtastatus.lineKey('7')
          expect(resultSeven).to.equal('7');
      });

      it('should return expected transit line result "ACE" when passed in "A", "C", "E" in various forms', () => {
          const expectedLine = 'ACE';

          const resultAUppercase = commands.mtastatus.lineKey('A');
          expect(resultAUppercase).to.equal(expectedLine);

          const resultALowercase = commands.mtastatus.lineKey('a')
          expect(resultALowercase).to.equal(expectedLine);

          const resultCUppercase = commands.mtastatus.lineKey('C')
          expect(resultCUppercase).to.equal(expectedLine);

          const resultCLowercase = commands.mtastatus.lineKey('c')
          expect(resultCLowercase).to.equal(expectedLine);

          const resultEUppercase = commands.mtastatus.lineKey('E')
          expect(resultEUppercase).to.equal(expectedLine);

          const resultELowercase = commands.mtastatus.lineKey('e')
          expect(resultELowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "BDFM" when passed in "B", "D", "F", "M" in various forms', () => {
          const expectedLine = 'BDFM';

          const resultBUppercase = commands.mtastatus.lineKey('B');
          expect(resultBUppercase).to.equal(expectedLine);

          const resultBLowercase = commands.mtastatus.lineKey('b')
          expect(resultBLowercase).to.equal(expectedLine);

          const resultDUppercase = commands.mtastatus.lineKey('D')
          expect(resultDUppercase).to.equal(expectedLine);

          const resultDLowercase = commands.mtastatus.lineKey('d')
          expect(resultDLowercase).to.equal(expectedLine);

          const resultFUppercase = commands.mtastatus.lineKey('F')
          expect(resultFUppercase).to.equal(expectedLine);

          const resultFLowercase = commands.mtastatus.lineKey('f')
          expect(resultFLowercase).to.equal(expectedLine);

          const resultMUppercase = commands.mtastatus.lineKey('M')
          expect(resultMUppercase).to.equal(expectedLine);

          const resultMLowercase = commands.mtastatus.lineKey('m')
          expect(resultMLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "G" when passed in "G" in various forms', () => {
          const expectedLine = 'G';

          const resultGUppercase = commands.mtastatus.lineKey('G');
          expect(resultGUppercase).to.equal(expectedLine);

          const resultGLowercase = commands.mtastatus.lineKey('g')
          expect(resultGLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "JZ" when passed in "J" or "Z" in various forms', () => {
          const expectedLine = 'JZ';

          const resultJUppercase = commands.mtastatus.lineKey('J');
          expect(resultJUppercase).to.equal(expectedLine);

          const resultJLowercase = commands.mtastatus.lineKey('j')
          expect(resultJLowercase).to.equal(expectedLine);

          const resultZUppercase = commands.mtastatus.lineKey('Z');
          expect(resultZUppercase).to.equal(expectedLine);

          const resultZLowercase = commands.mtastatus.lineKey('z')
          expect(resultZLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "NQR" when passed in "N", "Q", "R" in various forms', () => {
          const expectedLine = 'NQR';

          const resultNUppercase = commands.mtastatus.lineKey('N');
          expect(resultNUppercase).to.equal(expectedLine);

          const resultNLowercase = commands.mtastatus.lineKey('n')
          expect(resultNLowercase).to.equal(expectedLine);

          const resultQUppercase = commands.mtastatus.lineKey('Q')
          expect(resultQUppercase).to.equal(expectedLine);

          const resultQLowercase = commands.mtastatus.lineKey('q')
          expect(resultQLowercase).to.equal(expectedLine);

          const resultRUppercase = commands.mtastatus.lineKey('R')
          expect(resultRUppercase).to.equal(expectedLine);

          const resultRLowercase = commands.mtastatus.lineKey('r')
          expect(resultRLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "S" when passed in "S" in various forms', () => {
          const expectedLine = 'S';

          const resultSUppercase = commands.mtastatus.lineKey('S');
          expect(resultSUppercase).to.equal(expectedLine);

          const resultSLowercase = commands.mtastatus.lineKey('s')
          expect(resultSLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "L" when passed in "L" in various forms', () => {
          const expectedLine = 'L';

          const resultLUppercase = commands.mtastatus.lineKey('L');
          expect(resultLUppercase).to.equal(expectedLine);

          const resultLLowercase = commands.mtastatus.lineKey('l')
          expect(resultLLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "SIR" when passed in "SIR" in various forms', () => {
          const expectedLine = 'SIR';

          const resultSIRUppercase = commands.mtastatus.lineKey('SIR');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.mtastatus.lineKey('sir')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.mtastatus.lineKey('sIR')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected null value for malformed transit line', () => {
          const result = commands.mtastatus.lineKey('tacobell')
          expect(result).to.equal(null);
      });
    });
  });
});
