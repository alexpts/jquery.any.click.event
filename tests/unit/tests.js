var $button = $('button#click');
var $result = $('div#result');

var timeWaitClick = 100;
var maxClicksDetect = 5;

var name;
var tests = {
  'one click': function(assert){
    var done = assert.async();

    $button.click();

    assert.equal(+$result.text(), 0);

    setTimeout(function(){
      assert.equal(+$result.text(), 1);
      done();
    }, timeWaitClick);
  },

  'double click': function(assert) {
    var done = assert.async();

    $button.click().click();

    assert.equal(+$result.text(), 0);

    setTimeout(function(){
      assert.equal(+$result.text(), 2);
      done();
    }, timeWaitClick);
  },

  'triple click': function(assert) {
    var done = assert.async();

    $button.click().click().click();

    assert.equal(+$result.text(), 0);

    setTimeout(function(){
      assert.equal(+$result.text(), 0);
    }, timeWaitClick-50);

    setTimeout(function(){
      assert.equal(+$result.text(), 3);
      done();
    }, timeWaitClick);
  },

  'more clicks': function(assert) {
    var done = assert.async();
    var count = maxClicksDetect + 3;
    var i = 0;

    for (i; count > i; i++) {
      $button.click()
    }

    assert.equal(+$result.text(), 0);

    setTimeout(function(){
      assert.equal(+$result.text(), maxClicksDetect);
      done();
    }, timeWaitClick);
  }

};

QUnit.module("detect deps");

QUnit.test("detect jquery", function(assert) {
  assert.equal(typeof $, 'function');
});

QUnit.test("detect jquery method", function(assert) {
  assert.equal(typeof $.fn.anyClick, 'function');
});


var reset = function(){
  $button.off('click');
  $(document)
    .off('click', '#button')
    .off('click')
    .find('#result').text(0);
};

QUnit.module("without delegate", {
  afterEach: reset,
  beforeEach: function(){
    $button.anyClick({
      maxCount: maxClicksDetect,
      time: timeWaitClick
    });
  }
});


for (name in tests) {
  QUnit.test(name, tests[name]);
}

QUnit.module("with delegate", {
  afterEach: reset,
  beforeEach: function(){
    $(document).anyClick({
      delegate: 'button#click',
      maxCount: maxClicksDetect,
      time: timeWaitClick
    });
  }
});

for (name in tests) {
  QUnit.test(name, tests[name]);
}