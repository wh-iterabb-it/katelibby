const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const nock = require('nock');

const commands = require('../../commands');
const MTA = require('../../commands/trainstatus');
const config = require('../../helpers/config_helper').default;

const { expect } = chai;

describe('Command', () => {
  describe('trainstatus', () => {
    describe('main', () => {
      const expectedHelp = `Check the status of your LIRR or NYC Metro Line!\r\nSyntax is ${config.commandChar}trainstatus { line }`;
      const expectedXML = `<service><responsecode>0</responsecode><timestamp>7/3/2018 2:26:00 PM</timestamp><subway>
        <line>
          <name>123</name>
          <status>SERVICE CHANGE</status>
          <text>
            Service Change Posted: 07/04/2018 11:05PM Southbound [1] trains are bypassing 157 St because of FDNY activity at 157 St.
          </text>
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>456</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:22PM</Time>
        </line>
        <line>
          <name>7</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>ACE</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:22PM</Time>
        </line>
        <line>
          <name>BDFM</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:22PM</Time>
        </line>
        <line>
          <name>G</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:06PM</Time>
        </line>
        <line>
          <name>JZ</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:22PM</Time>
        </line>
        <line>
          <name>L</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>NQR</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:22PM</Time>
        </line>
        <line>
          <name>S</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:22PM</Time>
        </line>
        <line>
          <name>SIR</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:22PM</Time>
        </line>
      </subway><bus>
        <line>
          <name>B1 - B84</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:09PM</Time>
        </line>
        <line>
          <name>B100 - B103</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>BM1 - BM5</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>BX1 - BX55</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:08PM</Time>
        </line>
        <line>
          <name>BXM1 - BXM18</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>M1 - M116</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:07PM</Time>
        </line>
        <line>
          <name>Q1 - Q113</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:09PM</Time>
        </line>
        <line>
          <name>QM1 - QM44</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:22PM</Time>
        </line>
        <line>
          <name>S40 - S98</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 2:22PM</Time>
        </line>
        <line>
          <name>x1 - x68</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
      </bus><BT>
        <line>
          <name>Bronx-Whitestone</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Cross Bay</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Henry Hudson</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Hugh L. Carey</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Marine Parkway</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Queens Midtown</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Robert F. Kennedy</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Throgs Neck</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Verrazano-Narrows</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
      </BT><LIRR>
        <line>
          <name>Babylon</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time>10:00AM</Time>
        </line>
        <line>
          <name>City Terminal Zone</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Far Rockaway</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time>10:00AM</Time>
        </line>
        <line>
          <name>Hempstead</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Long Beach</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Montauk</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time>10:08AM</Time>
        </line>
        <line>
          <name>Oyster Bay</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Port Jefferson</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>07/03/2018</Date>
          <Time> 1:55PM</Time>
        </line>
        <line>
          <name>West Hempstead</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
      </LIRR><MetroNorth>
        <line>
          <name>Hudson</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Harlem</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Wassaic</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>New Haven</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>New Canaan</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Danbury</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
        <line>
          <name>Waterbury</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date>06/18/2018</Date>
          <Time> 7:23AM</Time>
        </line>
        <line>
          <name>Port Jervis</name>
          <status>GOOD SERVICE</status>
          <text />
          <Date></Date>
          <Time></Time>
        </line>
      </MetroNorth></service>`;

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

      it('should pass through mocked response with service change message', (done) => {
        nock('http://web.mta.info')
          .get(`/status/serviceStatus.txt`)
          .reply(200, expectedXML);

        try {
          commands.trainstatus.main('1').then((result) => {
            expect(result).to.equal('123: SERVICE CHANGE Service Change Posted: 07/04/2018 11:05PM Southbound [1] trains are bypassing 157 St because of FDNY activity at 157 St. ');
            done();
          });
        } catch (error) {
          console.log(error);
        }
      });
    });

    describe('getColorForLine', () => {
      it('should return expected transit line result "light_red" when passed in "123" in various forms', () => {
          const resultValid = commands.trainstatus.colorForLine('123');
          expect(resultValid).to.equal('light_red');
      });

      it('should return expected transit line result null when passed in invalid data', () => {
          const resultInvalid = commands.trainstatus.colorForLine('tacobell');
          expect(resultInvalid).to.equal(null);
      });
    });

    describe('getServiceKey', () => {
      it('should return expected transit service result "subway" when passed in "123" in various forms', () => {
          const resultOne = commands.trainstatus.serviceKey('123');
          expect(resultOne).to.equal('subway');

          const resultTwo = commands.trainstatus.serviceKey('Babylon');
          expect(resultTwo).to.equal('LIRR');

          const resultThree = commands.trainstatus.serviceKey('Hudson');
          expect(resultThree).to.equal('MetroNorth');

          const resultFour = commands.trainstatus.serviceKey('Cross Bay');
          expect(resultFour).to.equal('BT');

          const resultFive = commands.trainstatus.serviceKey('B1 - B84');
          expect(resultFive).to.equal('bus');
      });
    });

    describe('getLineKey', () => {
      it('should return expected null value for malformed transit line', () => {
          const result = commands.trainstatus.lineKey('tacobell')
          expect(result).to.equal(null);
      });

      describe('MTA trains', () => {
        it('should return expected transit line result "123" when passed in "1", "2", "3" in various forms', () => {
            const resultOne = commands.trainstatus.lineKey('1');
            expect(resultOne).to.equal('123');

            const resultTwo = commands.trainstatus.lineKey('2');
            expect(resultTwo).to.equal('123');

            const resultThree = commands.trainstatus.lineKey('3');
            expect(resultThree).to.equal('123');
        });

        it('should return expected transit line result "456" when passed in "4", "5", "6" in various forms', () => {
            const resultFour = commands.trainstatus.lineKey('4');
            expect(resultFour).to.equal('456');

            const resultFive = commands.trainstatus.lineKey('5');
            expect(resultFive).to.equal('456');

            const resultSix = commands.trainstatus.lineKey('6');
            expect(resultSix).to.equal('456');
        });

        it('should return expected transit line result "7" when passed in "7" in various forms', () => {
            const resultSeven = commands.trainstatus.lineKey('7');
            expect(resultSeven).to.equal('7');
        });

        it('should return expected transit line result "ACE" when passed in "A", "C", "E" in various forms', () => {
            const expectedLine = 'ACE';

            const resultAUppercase = commands.trainstatus.lineKey('A');
            expect(resultAUppercase).to.equal(expectedLine);

            const resultALowercase = commands.trainstatus.lineKey('a');
            expect(resultALowercase).to.equal(expectedLine);

            const resultCUppercase = commands.trainstatus.lineKey('C');
            expect(resultCUppercase).to.equal(expectedLine);

            const resultCLowercase = commands.trainstatus.lineKey('c');
            expect(resultCLowercase).to.equal(expectedLine);

            const resultEUppercase = commands.trainstatus.lineKey('E');
            expect(resultEUppercase).to.equal(expectedLine);

            const resultELowercase = commands.trainstatus.lineKey('e');
            expect(resultELowercase).to.equal(expectedLine);
        });

        it('should return expected transit line result "BDFM" when passed in "B", "D", "F", "M" in various forms', () => {
            const expectedLine = 'BDFM';

            const resultBUppercase = commands.trainstatus.lineKey('B');
            expect(resultBUppercase).to.equal(expectedLine);

            const resultBLowercase = commands.trainstatus.lineKey('b');
            expect(resultBLowercase).to.equal(expectedLine);

            const resultDUppercase = commands.trainstatus.lineKey('D');
            expect(resultDUppercase).to.equal(expectedLine);

            const resultDLowercase = commands.trainstatus.lineKey('d');
            expect(resultDLowercase).to.equal(expectedLine);

            const resultFUppercase = commands.trainstatus.lineKey('F');
            expect(resultFUppercase).to.equal(expectedLine);

            const resultFLowercase = commands.trainstatus.lineKey('f');
            expect(resultFLowercase).to.equal(expectedLine);

            const resultMUppercase = commands.trainstatus.lineKey('M');
            expect(resultMUppercase).to.equal(expectedLine);

            const resultMLowercase = commands.trainstatus.lineKey('m');
            expect(resultMLowercase).to.equal(expectedLine);
        });

        it('should return expected transit line result "G" when passed in "G" in various forms', () => {
            const expectedLine = 'G';

            const resultGUppercase = commands.trainstatus.lineKey('G');
            expect(resultGUppercase).to.equal(expectedLine);

            const resultGLowercase = commands.trainstatus.lineKey('g');
            expect(resultGLowercase).to.equal(expectedLine);
        });

        it('should return expected transit line result "JZ" when passed in "J" or "Z" in various forms', () => {
            const expectedLine = 'JZ';

            const resultJUppercase = commands.trainstatus.lineKey('J');
            expect(resultJUppercase).to.equal(expectedLine);

            const resultJLowercase = commands.trainstatus.lineKey('j');
            expect(resultJLowercase).to.equal(expectedLine);

            const resultZUppercase = commands.trainstatus.lineKey('Z');
            expect(resultZUppercase).to.equal(expectedLine);

            const resultZLowercase = commands.trainstatus.lineKey('z');
            expect(resultZLowercase).to.equal(expectedLine);
        });

        it('should return expected transit line result "NQR" when passed in "N", "Q", "R" in various forms', () => {
            const expectedLine = 'NQR';

            const resultNUppercase = commands.trainstatus.lineKey('N');
            expect(resultNUppercase).to.equal(expectedLine);

            const resultNLowercase = commands.trainstatus.lineKey('n');
            expect(resultNLowercase).to.equal(expectedLine);

            const resultQUppercase = commands.trainstatus.lineKey('Q');
            expect(resultQUppercase).to.equal(expectedLine);

            const resultQLowercase = commands.trainstatus.lineKey('q');
            expect(resultQLowercase).to.equal(expectedLine);

            const resultRUppercase = commands.trainstatus.lineKey('R');
            expect(resultRUppercase).to.equal(expectedLine);

            const resultRLowercase = commands.trainstatus.lineKey('r');
            expect(resultRLowercase).to.equal(expectedLine);
        });

        it('should return expected transit line result "S" when passed in "S" in various forms', () => {
            const expectedLine = 'S';

            const resultSUppercase = commands.trainstatus.lineKey('S');
            expect(resultSUppercase).to.equal(expectedLine);

            const resultSLowercase = commands.trainstatus.lineKey('s');
            expect(resultSLowercase).to.equal(expectedLine);
        });

        it('should return expected transit line result "L" when passed in "L" in various forms', () => {
            const expectedLine = 'L';

            const resultLUppercase = commands.trainstatus.lineKey('L');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLLowercase = commands.trainstatus.lineKey('l');
            expect(resultLLowercase).to.equal(expectedLine);
        });

        it('should return expected transit line result "SIR" when passed in "SIR" in various forms', () => {
            const expectedLine = 'SIR';

            const resultSIRUppercase = commands.trainstatus.lineKey('SIR');
            expect(resultSIRUppercase).to.equal(expectedLine);

            const resultSIRLowercase = commands.trainstatus.lineKey('sir');
            expect(resultSIRLowercase).to.equal(expectedLine);

            const resultSIRMixedcase = commands.trainstatus.lineKey('sIR');
            expect(resultSIRMixedcase).to.equal(expectedLine);
        });
      });
      describe('LIRR trains', () => {
        it('should return expected transit line result "BABYLON" when passed in "BABYLON" in various forms', () => {
            const expectedLine = 'Babylon';

            const resultLUppercase = commands.trainstatus.lineKey('Babylon');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('BABYLON');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('BabYLon');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "CITY TERMINAL ZONE" when passed in "CITY TERMINAL ZONE" in various forms', () => {
            const expectedLine = 'City Terminal Zone';

            const resultLUppercase = commands.trainstatus.lineKey('City Terminal Zone');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('CITY TERMINAL ZONE');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('CiTy TeRmiNal ZoNe');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "FAR ROCKAWAY" when passed in "FAR ROCKAWAY" in various forms', () => {
            const expectedLine = 'Far Rockaway';

            const resultLUppercase = commands.trainstatus.lineKey('Far Rockaway');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('FAR ROCKAWAY');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('FaR ROckaWAY');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "HEMPSTEAD" when passed in "HEMPSTEAD" in various forms', () => {
            const expectedLine = 'Hempstead';

            const resultLUppercase = commands.trainstatus.lineKey('Hempstead');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('HEMPSTEAD')
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('HEMpstEAD')
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "LONG BEACH" when passed in "LONG BEACH" in various forms', () => {
            const expectedLine = 'Long Beach';

            const resultLUppercase = commands.trainstatus.lineKey('Long Beach');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('LONG BEACH');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('LonG BeAcH');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "MONTAUK" when passed in "MONTAUK" in various forms', () => {
            const expectedLine = 'Montauk';

            const resultLUppercase = commands.trainstatus.lineKey('Montauk');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('MONTAUK');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('MOntAuK');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "OYSTER BAY" when passed in "OYSTER BAY" in various forms', () => {
            const expectedLine = 'Oyster Bay';

            const resultLUppercase = commands.trainstatus.lineKey('Oyster Bay');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('OYSTER BAY');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('OySTer BAy');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "PORT JEFFERSON" when passed in "PORT JEFFERSON" in various forms', () => {
            const expectedLine = 'Port Jefferson';

            const resultLUppercase = commands.trainstatus.lineKey('Port Jefferson');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('PORT JEFFERSON');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('PorT JEffeRSON');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "PORT WASHINGTON" when passed in "PORT WASHINGTON" in various forms', () => {
            const expectedLine = 'Port Washington';

            const resultLUppercase = commands.trainstatus.lineKey('Port Washington');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('PORT WASHINGTON');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('PoRt WASHIngton');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Ronkonkoma" when passed in "Ronkonkoma" in various forms', () => {
            const expectedLine = 'Ronkonkoma';

            const resultLUppercase = commands.trainstatus.lineKey('Ronkonkoma');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('RONKONKOMA');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('RoNKONkoma');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "West Hempstead" when passed in "West Hempstead" in various forms', () => {
            const expectedLine = 'West Hempstead';

            const resultLUppercase = commands.trainstatus.lineKey('West Hempstead');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('WEST HEMPSTEAD');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('WeSt HEMPstEad');
            expect(resultMixedcase).to.equal(expectedLine);
        });
      });
        // MetroNorth
      describe('MetroNorth trains', () => {
        it('should return expected transit line result "Hudson" when passed in "Hudson" in various forms', () => {
            const expectedLine = 'Hudson';

            const resultLUppercase = commands.trainstatus.lineKey('Hudson');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('HUDSON');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('HuDSon');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Harlem" when passed in "Harlem" in various forms', () => {
            const expectedLine = 'Harlem';

            const resultLUppercase = commands.trainstatus.lineKey('Harlem');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('HARLEM');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('HarLeM');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Wassaic" when passed in "Wassaic" in various forms', () => {
            const expectedLine = 'Wassaic';

            const resultLUppercase = commands.trainstatus.lineKey('Wassaic');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('WASSAIC');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('WaSSaIc');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "New Haven" when passed in "New Haven" in various forms', () => {
            const expectedLine = 'New Haven';

            const resultLUppercase = commands.trainstatus.lineKey('New Haven');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('NEW HAVEN');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('NeW HavEN');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "New Canaan" when passed in "New Canaan" in various forms', () => {
            const expectedLine = 'New Canaan';

            const resultLUppercase = commands.trainstatus.lineKey('New Canaan');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('NEW CANAAN');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('NeW Canaan');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Danbury" when passed in "Danbury" in various forms', () => {
            const expectedLine = 'Danbury';

            const resultLUppercase = commands.trainstatus.lineKey('Danbury');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('DANBURY');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('DanBuRy');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Waterbury" when passed in "Waterbury" in various forms', () => {
            const expectedLine = 'Waterbury';

            const resultLUppercase = commands.trainstatus.lineKey('Waterbury');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('WATERBURY');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('WatERBury');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Pascack Valley" when passed in "Pascack Valley" in various forms', () => {
            const expectedLine = 'Pascack Valley';

            const resultLUppercase = commands.trainstatus.lineKey('Pascack Valley');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('PASCACK VALLEY');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('PAScack ValLEY');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Port Jervis" when passed in "Port Jervis" in various forms', () => {
            const expectedLine = 'Port Jervis';

            const resultLUppercase = commands.trainstatus.lineKey('Port Jervis');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('PORT JERVIS');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('PoRT JERVis');
            expect(resultMixedcase).to.equal(expectedLine);
        });
      });

      describe('BT - Bridges And Tunnels', () => {
        it('should return expected transit line result "BRONX-WHITESTONE" when passed in "BRONX-WHITESTONE" in various forms', () => {
            const expectedLine = 'Bronx-Whitestone';

            const resultLUppercase = commands.trainstatus.lineKey('bronx-whitestone');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('BRONX-WHITESTONE');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('Bronx-WhITEstone');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Cross Bay" when passed in "Cross Bay" in various forms', () => {
            const expectedLine = 'Cross Bay';

            const resultLUppercase = commands.trainstatus.lineKey('cross bay');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('CROSS BAY');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('CroSS Bay');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Henry Hudson" when passed in "Henry Hudson" in various forms', () => {
            const expectedLine = 'Henry Hudson';

            const resultLUppercase = commands.trainstatus.lineKey('henry hudson');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('HENRY HUDSON');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('HeNRY HUDSon');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Hugh L. Carey" when passed in "Hugh L. Carey" in various forms', () => {
            const expectedLine = 'Hugh L. Carey';

            const resultLUppercase = commands.trainstatus.lineKey('Hugh L. Carey');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('HUGH L. CAREY');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('Hugh L. CaREy');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Marine Parkway" when passed in "Marine Parkway" in various forms', () => {
            const expectedLine = 'Marine Parkway';

            const resultLUppercase = commands.trainstatus.lineKey('marine parkway');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('MARINE PARKWAY');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('MaRIne Parkway');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Queens Midtown" when passed in "Queens Midtown" in various forms', () => {
            const expectedLine = 'Queens Midtown';

            const resultLUppercase = commands.trainstatus.lineKey('Queens Midtown');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('QUEENS MIDTOWN');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('QueENS MIDtown');
            expect(resultMixedcase).to.equal(expectedLine);
        });

        it('should return expected transit line result "Robert F. Kennedy" when passed in "Robert F. Kennedy" in various forms', () => {
            const expectedLine = 'Robert F. Kennedy';

            const resultLUppercase = commands.trainstatus.lineKey('robert f. kennedy');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('ROBERT F. KENNEDY');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('Robert F. KeNNedy');
            expect(resultMixedcase).to.equal(expectedLine);
        });
        it('should return expected transit line result "Throgs Neck" when passed in "Throgs Neck" in various forms', () => {
            const expectedLine = 'Throgs Neck';

            const resultLUppercase = commands.trainstatus.lineKey('throgs neck');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('THROGS NECK');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('Throgs Neck');
            expect(resultMixedcase).to.equal(expectedLine);
        });
        it('should return expected transit line result "Verrazano-Narrows" when passed in "Verrazano-Narrows" in various forms', () => {
            const expectedLine = 'Verrazano-Narrows';

            const resultLUppercase = commands.trainstatus.lineKey('verrazano-narrows');
            expect(resultLUppercase).to.equal(expectedLine);

            const resultLowercase = commands.trainstatus.lineKey('VERRAZANO-NARROWS');
            expect(resultLowercase).to.equal(expectedLine);

            const resultMixedcase = commands.trainstatus.lineKey('Verrazano-Narrows');
            expect(resultMixedcase).to.equal(expectedLine);
        });
      });
    });
  });
});
