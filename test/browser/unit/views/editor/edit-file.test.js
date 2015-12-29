var _ = require('underscore');
var assert = require('assert');
var mocha = require('mocha');

var EditFileView = require('./../../../../../assets/app/views/editor/edit-file');

describe('edit-file view', function () {

  beforeEach(function () {

  });

  describe('when view is initialized', function () {
    describe('without model', function () {
      it('should throw exception', function () {
        assert.throws(function () {
          new EditFileView();
        });
      });
    });
  });

  describe('cleanContent class method', function () {
    it('should not alter text unncessarily', function () {
      var model = {
            owner: '18f',
            name: 'federalist',
            branch: 'master'
          },
          expected = 'Yo',
          actual = EditFileView.prototype.cleanContent(expected, model);

      assert.equal(actual, expected);
    });

    it('should replace baseUrl mentions', function () {
      var model = {
            owner: '18f',
            name: 'federalist',
            branch: 'master'
          },
          expected = 'Yo https://raw.githubusercontent.com/18f/federalist/master',
          actual = EditFileView.prototype.cleanContent('Yo {{ site.baseurl }}', model);

      assert.equal(actual, expected);
    });
  });

  describe('parseSettings class method', function () {
    it('should do nothing with no settingsFields', function () {
      EditFileView.prototype.settingsFields = {};
      var doc = {
            frontMatter: "title: Test\nlayout: test-layout\nfoo: bar\n"
          },
          actual = EditFileView.prototype.parseSettings(doc);

      assert.equal(actual.whitelist.length, 0);
      assert.equal(actual.remaining, doc.frontMatter);
    });

    it('should whitelist settingsFields', function () {
      EditFileView.prototype.settingsFields = {'title': 'text'}
      var doc = {
            frontMatter: "title: Test\nlayout: test-layout\nfoo: bar\n"
          },
          actual = EditFileView.prototype.parseSettings(doc),
          expectedRemaining = 'layout: test-layout\nfoo: bar\n';

      assert.equal(actual.whitelist.length, 1);
      assert.equal(actual.whitelist[0].name, 'title');
      assert.equal(actual.remaining, expectedRemaining);
    });
  });

  afterEach(function () {

  });

});
