const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const nock = require('nock');

const commands = require('../../commands');
const logger = require('../../utils/logger').default;
const config = require('../../helpers/config_helper').default;

const { expect } = chai;
chai.should();
chai.use(sinonChai);

describe('Command', () => {
  describe('Woot', () => {
    let sandbox;

    const expectedHelp = `Woot command will request the latest sale and price from woot.com 👌\n\rSyntax is ${config.commandChar}woot { wine, sellout, electronics, home, tools, sport, computers, shirt }`;

    const expectedWine = {sales: [{
      SiteName: "Wine.Woot",
      SaleUrl: "https://wine.woot.com/offers/neat-vegan-meat-replacement-sampler-8?utm_source=version1&utm_medium=json&utm_campaign=api.woot.com",
      Title: "Neat Vegan Meat Replacement Sampler (8)",
      Price: "$29.99"
    }]};

    const expectedSellout = {sales: [{
      SiteName: "Sellout.Woot",
      SaleUrl: "https://sellout.woot.com/offers/ultra-soft-semi-fitted-t-shirt-3-pack?utm_source=version1&utm_medium=json&utm_campaign=api.woot.com",
      Title: "Ultra Soft Semi-fitted T-Shirt 3-Pack",
      Price: "$31.99"
    }]};

    const expectedElectronics = {sales: [{
      SiteName: "Electronics.Woot",
      SaleUrl: "https://electronics.woot.com/offers/google-pixel-verizon-and-gsm-sd?utm_source=version1&utm_medium=json&utm_campaign=api.woot.com",
      Title: "Google Pixel (Verizon and GSM) (S&D)",
      Price: "$219.99"
    }]};

    const expectedHome = {sales: [{
      SiteName: "Home.Woot",
      SaleUrl: "https://home.woot.com/offers/sorbus-fridge-and-freezer-organizer-bins-4?utm_source=version1&utm_medium=json&utm_campaign=api.woot.com",
      Title: "Sorbus Fridge and Freezer Organizer Bins",
      Price: "$22.99"
    }]};

    const expectedTools = {sales: [{
      SiteName: "Tools.Woot",
      SaleUrl: "https://tools.woot.com/offers/little-giant-m17-alta-one-17-multipurpose-ladder?utm_source=version1&utm_medium=json&utm_campaign=api.woot.com",
      Title: "Little Giant M17 Alta-One 17' Multipurpose Ladder",
      Price: "$144.99"
    }]};

    const expectedSport = {sales: [{
      SiteName: "Sport.Woot",
      SaleUrl: "https://sport.woot.com/plus/15358b85-ee9d-404e-822a-a120db7da2e7?utm_source=version1&utm_medium=json&utm_campaign=api.woot.com",
      Title: "Oakley Sunglasses",
      Price: "$164.99"
    }]};

    const expectedShirt = {sales: [{
      SiteName: "Shirt.Woot",
      SaleUrl: "https://shirt.woot.com/offers/the-world-is-a-book-explore?utm_source=version1&utm_medium=json&utm_campaign=api.woot.com",
      Title: "The World is a Book: Explore",
      Price: "$15.00"
    }]};

    const expectedComputers = {sales: [{
      SiteName: "Computers.Woot",
      SaleUrl: "https://computers.woot.com/offers/hp-spectre-x360-13-qhd-512gb-convertible?utm_source=version1&utm_medium=json&utm_campaign=api.woot.com",
      Title: "HP Spectre x360 13 QHD 512GB Convertible",
      Price: "$539.99"
    }]};

    const expectedWoot = {sales: [{
      SiteName: "Woot",
      SaleUrl: "https://www.woot.com/offers/mizuno-mens-and-womens-wave-shadow?utm_source=version1&utm_medium=json&utm_campaign=api.woot.com",
      Title: "Mizuno Men's and Women's Wave Shadow",
      Price: "$48.99"
    }]};

    before(() => {
      sandbox = sinon.createSandbox();


      nock('https://api.woot.com/1/sales')
        .get(`/current.json/wine.woot`)
        .reply(200, expectedWine);

      nock('https://api.woot.com/1/sales')
        .get(`/current.json/sellout.woot`)
        .reply(200, expectedSellout);

      nock('https://api.woot.com/1/sales')
        .get(`/current.json/electronics.woot`)
        .reply(200, expectedElectronics);

      nock('https://api.woot.com/1/sales')
        .get(`/current.json/home.woot`)
        .reply(200, expectedHome);

      nock('https://api.woot.com/1/sales')
        .get(`/current.json/tools.woot`)
        .reply(200, expectedTools);

      nock('https://api.woot.com/1/sales')
        .get(`/current.json/sport.woot`)
        .reply(200, expectedSport);

      nock('https://api.woot.com/1/sales')
        .get(`/current.json/shirt.woot`)
        .reply(200, expectedShirt);

      nock('https://api.woot.com/1/sales')
        .get(`/current.json/computers.woot`)
        .reply(200, expectedComputers);
    });

    beforeEach(() => {
      sandbox.stub(logger, 'warn');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return expected help result when passed in "help"', (done) => {
      try {
        commands.woot.main('help').then((result) => {
          expect(result).to.equal(expectedHelp);
          done();
        });
      } catch (error) {
        console.log(error);

      }
    });

    it('should return expected wine.woot result when passed in "wine"', (done) => {
      const expectedWineOutput = 'Neat Vegan Meat Replacement Sampler (8) for $29.99\n\rhttps://wine.woot.com/offers/neat-vegan-meat-replacement-sampler-8';

      try {
        commands.woot.main('wine').then((result) => {
          expect(result).to.equal(expectedWineOutput);
          done();
        });
      } catch (error) {}
    });

    it('should return expected sellout.woot result when passed in "sellout"', (done) => {
      const expectedSelloutOutput = 'Ultra Soft Semi-fitted T-Shirt 3-Pack for $31.99\n\rhttps://sellout.woot.com/offers/ultra-soft-semi-fitted-t-shirt-3-pack';

      try {
        commands.woot.main('sellout').then((result) => {
          expect(result).to.equal(expectedSelloutOutput);
          done();
        });
      } catch (error) {}
    });

    it('should return expected electronics.woot result when passed in "electronics"', (done) => {
      const expectedElectronicsOutput = 'Google Pixel (Verizon and GSM) (S&D) for $219.99\n\rhttps://electronics.woot.com/offers/google-pixel-verizon-and-gsm-sd';

      try {
        commands.woot.main('electronics').then((result) => {
          expect(result).to.equal(expectedElectronicsOutput);
          done();
        });
      } catch (error) {}
    });

    it('should return expected home.woot result when passed in "home"', (done) => {
      const expectedHomeOutput = 'Sorbus Fridge and Freezer Organizer Bins for $22.99\n\rhttps://home.woot.com/offers/sorbus-fridge-and-freezer-organizer-bins-4';

      try {
        commands.woot.main('home').then((result) => {
          expect(result).to.equal(expectedHomeOutput);
          done();
        });
      } catch (error) {}
    });

    it('should return expected tools.woot result when passed in "tools"', (done) => {
      const expectedToolsOutput = 'Little Giant M17 Alta-One 17\' Multipurpose Ladder for $144.99\n\rhttps://tools.woot.com/offers/little-giant-m17-alta-one-17-multipurpose-ladder';

      try {
        commands.woot.main('tools').then((result) => {
          expect(result).to.equal(expectedToolsOutput);
          done();
        });
      } catch (error) {}
    });

    it('should return expected sport.woot result when passed in "sport"', (done) => {
      const expectedSportsOutput = 'Oakley Sunglasses for $164.99\n\rhttps://sport.woot.com/plus/15358b85-ee9d-404e-822a-a120db7da2e7';

      try {
        commands.woot.main('sport').then((result) => {
          expect(result).to.equal(expectedSportsOutput);
          done();
        });
      } catch (error) {}
    });

    it('should return expected shirt.woot result when passed in "shirt"', (done) => {
      const expectedShirtOutput = 'The World is a Book: Explore for $15.00\n\rhttps://shirt.woot.com/offers/the-world-is-a-book-explore';

      try {
        commands.woot.main('shirt').then((result) => {
          expect(result).to.equal(expectedShirtOutput);
          done();
        });
      } catch (error) {}
    });

    it('should return expected computers.woot result when passed in "computers"', (done) => {
      const expectedComputersOutput = 'HP Spectre x360 13 QHD 512GB Convertible for $539.99\n\rhttps://computers.woot.com/offers/hp-spectre-x360-13-qhd-512gb-convertible';

      try {
        commands.woot.main('computers').then((result) => {
          expect(result).to.equal(expectedComputersOutput);
          done();
        });
      } catch (error) {}
    });


    it('should return expected default result when passed in malformed data', (done) => {
      nock('https://api.woot.com/1/sales')
        .get(`/current.json/www.woot.com`)
        .reply(200, expectedWoot);
      const expectedMalformedOutput = 'Mizuno Men\'s and Women\'s Wave Shadow for $48.99\n\rhttps://www.woot.com/offers/mizuno-mens-and-womens-wave-shadow';

      try {
        commands.woot.main('tacobell').then((result) => {
          expect(result).to.equal(expectedMalformedOutput);
          done();
        });
      } catch (error) {}
    });
  });
});
