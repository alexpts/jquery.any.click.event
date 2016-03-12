(function($){

  /**
   * @param {Event} event
   */
  var clickHandler = function(event){
    event.preventDefault();

    var settings = event.data;

    var $this = $(this);
    var count = $this.data('clickCount') || 0;
    var timerId = $this.data('clickCountTimerId') || 0;

    clearTimeout(timerId);

    timerId = setTimeout(function(){
      $this
        .data('clickCount', 0)
        .trigger(settings.eventName + '.' + count);
    }, settings.time);

    if (count < settings.maxCount) {
      count++;
    }

    $this
      .data('clickCount', count)
      .data('clickCountTimerId', timerId);
  };


  $.fn.anyClick = function(options){
    var settings = $.extend({
      time: 300,
      maxCount: 3,
      eventName: 'clickCount',
      delegate: null
    }, options || {});

    this.on('click', options.delegate, settings, clickHandler);

    return this;
  };

})(jQuery);