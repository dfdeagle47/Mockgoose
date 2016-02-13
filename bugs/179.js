var should = require('chai').should()
,expect = require('chai').expect
, Mongoose = require('mongoose').Mongoose
, mongoose = new Mongoose
, mockgoose = require('../Mockgoose')
, Cat = mongoose.model('Cat', { name: String });

mockgoose(mongoose);

describe('issue 179', function() {
    before(function(done) {
        mongoose.connect('mongodb://127.0.0.1:27017/TestingDB', function(err) {
         done(err);
        }); 
    });
    
    beforeEach(function(done) {
        mockgoose.reset(function() {
            done();
        });
    });

    it("should create a cat foo", function(done) {
        Cat.create({name: "foo"}, function(err, cat) {
            expect(err).to.be.falsy;
            done(err);
        });
    });

    it("should NOT find cat foo", function(done) {
        Cat.findOne({name: "foo"}, function(err, cat) {
            expect(err).to.be.falsy;
            expect(cat).to.be.null;
            done(err);
        });
    });

});