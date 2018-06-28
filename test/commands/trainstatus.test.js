import chai from 'chai';
import sinon from 'sinon';

import commands from '../../commands/';
import MTA from '../../commands/trainstatus';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('trainstatus', () => {
    describe('main', () => {
      const expectedHelp = `Check the status of your LIRR or NYC Metro Line!\r\nSyntax is ${config.commandChar}trainstatus { line }`;

      it('should return expected help result when passed in "help"', (done) => {
        try {
          commands.trainstatus.main('help').then((result) => {
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
          commands.trainstatus.main('tacobell').then((result) => {
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
          const resultValid = commands.trainstatus.colorForLine('123')
          expect(resultValid).to.equal('light_red');
      });

      it('should return expected transit line result null when passed in invalid data', () => {
          const resultInvalid = commands.trainstatus.colorForLine('tacobell')
          expect(resultInvalid).to.equal(null);
      });
    });

    describe('getLineKey', () => {
      it('should return expected transit line result "123" when passed in "1", "2", "3" in various forms', () => {
          const resultOne = commands.trainstatus.lineKey('1')
          expect(resultOne).to.equal('123');

          const resultTwo = commands.trainstatus.lineKey('2')
          expect(resultTwo).to.equal('123');

          const resultThree = commands.trainstatus.lineKey('3')
          expect(resultThree).to.equal('123');
      });

      it('should return expected transit line result "456" when passed in "4", "5", "6" in various forms', () => {
          const resultFour = commands.trainstatus.lineKey('4')
          expect(resultFour).to.equal('456');

          const resultFive = commands.trainstatus.lineKey('5')
          expect(resultFive).to.equal('456');

          const resultSix = commands.trainstatus.lineKey('6')
          expect(resultSix).to.equal('456');
      });

      it('should return expected transit line result "7" when passed in "7" in various forms', () => {
          const resultSeven = commands.trainstatus.lineKey('7')
          expect(resultSeven).to.equal('7');
      });

      it('should return expected transit line result "ACE" when passed in "A", "C", "E" in various forms', () => {
          const expectedLine = 'ACE';

          const resultAUppercase = commands.trainstatus.lineKey('A');
          expect(resultAUppercase).to.equal(expectedLine);

          const resultALowercase = commands.trainstatus.lineKey('a')
          expect(resultALowercase).to.equal(expectedLine);

          const resultCUppercase = commands.trainstatus.lineKey('C')
          expect(resultCUppercase).to.equal(expectedLine);

          const resultCLowercase = commands.trainstatus.lineKey('c')
          expect(resultCLowercase).to.equal(expectedLine);

          const resultEUppercase = commands.trainstatus.lineKey('E')
          expect(resultEUppercase).to.equal(expectedLine);

          const resultELowercase = commands.trainstatus.lineKey('e')
          expect(resultELowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "BDFM" when passed in "B", "D", "F", "M" in various forms', () => {
          const expectedLine = 'BDFM';

          const resultBUppercase = commands.trainstatus.lineKey('B');
          expect(resultBUppercase).to.equal(expectedLine);

          const resultBLowercase = commands.trainstatus.lineKey('b')
          expect(resultBLowercase).to.equal(expectedLine);

          const resultDUppercase = commands.trainstatus.lineKey('D')
          expect(resultDUppercase).to.equal(expectedLine);

          const resultDLowercase = commands.trainstatus.lineKey('d')
          expect(resultDLowercase).to.equal(expectedLine);

          const resultFUppercase = commands.trainstatus.lineKey('F')
          expect(resultFUppercase).to.equal(expectedLine);

          const resultFLowercase = commands.trainstatus.lineKey('f')
          expect(resultFLowercase).to.equal(expectedLine);

          const resultMUppercase = commands.trainstatus.lineKey('M')
          expect(resultMUppercase).to.equal(expectedLine);

          const resultMLowercase = commands.trainstatus.lineKey('m')
          expect(resultMLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "G" when passed in "G" in various forms', () => {
          const expectedLine = 'G';

          const resultGUppercase = commands.trainstatus.lineKey('G');
          expect(resultGUppercase).to.equal(expectedLine);

          const resultGLowercase = commands.trainstatus.lineKey('g')
          expect(resultGLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "JZ" when passed in "J" or "Z" in various forms', () => {
          const expectedLine = 'JZ';

          const resultJUppercase = commands.trainstatus.lineKey('J');
          expect(resultJUppercase).to.equal(expectedLine);

          const resultJLowercase = commands.trainstatus.lineKey('j')
          expect(resultJLowercase).to.equal(expectedLine);

          const resultZUppercase = commands.trainstatus.lineKey('Z');
          expect(resultZUppercase).to.equal(expectedLine);

          const resultZLowercase = commands.trainstatus.lineKey('z')
          expect(resultZLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "NQR" when passed in "N", "Q", "R" in various forms', () => {
          const expectedLine = 'NQR';

          const resultNUppercase = commands.trainstatus.lineKey('N');
          expect(resultNUppercase).to.equal(expectedLine);

          const resultNLowercase = commands.trainstatus.lineKey('n')
          expect(resultNLowercase).to.equal(expectedLine);

          const resultQUppercase = commands.trainstatus.lineKey('Q')
          expect(resultQUppercase).to.equal(expectedLine);

          const resultQLowercase = commands.trainstatus.lineKey('q')
          expect(resultQLowercase).to.equal(expectedLine);

          const resultRUppercase = commands.trainstatus.lineKey('R')
          expect(resultRUppercase).to.equal(expectedLine);

          const resultRLowercase = commands.trainstatus.lineKey('r')
          expect(resultRLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "S" when passed in "S" in various forms', () => {
          const expectedLine = 'S';

          const resultSUppercase = commands.trainstatus.lineKey('S');
          expect(resultSUppercase).to.equal(expectedLine);

          const resultSLowercase = commands.trainstatus.lineKey('s')
          expect(resultSLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "L" when passed in "L" in various forms', () => {
          const expectedLine = 'L';

          const resultLUppercase = commands.trainstatus.lineKey('L');
          expect(resultLUppercase).to.equal(expectedLine);

          const resultLLowercase = commands.trainstatus.lineKey('l')
          expect(resultLLowercase).to.equal(expectedLine);
      });

      it('should return expected transit line result "SIR" when passed in "SIR" in various forms', () => {
          const expectedLine = 'SIR';

          const resultSIRUppercase = commands.trainstatus.lineKey('SIR');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('sir')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('sIR')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "BABYLON" when passed in "BABYLON" in various forms', () => {
          const expectedLine = 'Babylon';

          const resultSIRUppercase = commands.trainstatus.lineKey('Babylon');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('BABYLON')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('BabYLon')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "CITY TERMINAL ZONE" when passed in "CITY TERMINAL ZONE" in various forms', () => {
          const expectedLine = 'City Terminal Zone';

          const resultSIRUppercase = commands.trainstatus.lineKey('City Terminal Zone');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('CITY TERMINAL ZONE')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('CiTy TeRmiNal ZoNe')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "FAR ROCKAWAY" when passed in "FAR ROCKAWAY" in various forms', () => {
          const expectedLine = 'Far Rockaway';

          const resultSIRUppercase = commands.trainstatus.lineKey('Far Rockaway');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('FAR ROCKAWA')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('FaR ROckaWA')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "HEMPSTEAD" when passed in "HEMPSTEAD" in various forms', () => {
          const expectedLine = 'Hempstead';

          const resultSIRUppercase = commands.trainstatus.lineKey('Hempstead');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('HEMPSTEAD')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('HEMpstEAD')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "LONG BEACH" when passed in "LONG BEACH" in various forms', () => {
          const expectedLine = 'Long Beach';

          const resultSIRUppercase = commands.trainstatus.lineKey('Long Beach');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('LONG BEACH')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('LonG BeAcH')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "MONTAUK" when passed in "MONTAUK" in various forms', () => {
          const expectedLine = 'Montauk';

          const resultSIRUppercase = commands.trainstatus.lineKey('Montauk');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('MONTAUK')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('MOntAuK')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "OYSTER BAY" when passed in "OYSTER BAY" in various forms', () => {
          const expectedLine = 'Oyster Bay';

          const resultSIRUppercase = commands.trainstatus.lineKey('Oyster Bay');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('OYSTER BAY')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('OySTer BAy')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "PORT JEFFERSON" when passed in "PORT JEFFERSON" in various forms', () => {
          const expectedLine = 'Port Jefferson';

          const resultSIRUppercase = commands.trainstatus.lineKey('Port Jefferson');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('PORT JEFFERSON')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('PorT JEffeRSON')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "PORT WASHINGTON" when passed in "PORT WASHINGTON" in various forms', () => {
          const expectedLine = 'Port Washington';

          const resultSIRUppercase = commands.trainstatus.lineKey('Port Washington');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('PORT WASHINGTON')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('PoRt WASHIngton')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "RONKONKOMA" when passed in "RONKONKOMA" in various forms', () => {
          const expectedLine = 'Ronkonkoma';

          const resultSIRUppercase = commands.trainstatus.lineKey('Ronkonkoma');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('RONKONKOMA')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('RoNKONkoma')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected transit line result "WEST HEMPSTEAD" when passed in "WEST HEMPSTEAD" in various forms', () => {
          const expectedLine = 'West Hempstead';

          const resultSIRUppercase = commands.trainstatus.lineKey('West Hempstead');
          expect(resultSIRUppercase).to.equal(expectedLine);

          const resultSIRLowercase = commands.trainstatus.lineKey('WEST HEMPSTEAD')
          expect(resultSIRLowercase).to.equal(expectedLine);

          const resultSIRMixedcase = commands.trainstatus.lineKey('WeSt HEMPstEad')
          expect(resultSIRMixedcase).to.equal(expectedLine);
      });

      it('should return expected null value for malformed transit line', () => {
          const result = commands.trainstatus.lineKey('tacobell')
          expect(result).to.equal(null);
      });
    });
  });
});
