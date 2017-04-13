
var PopupController = function () {
  this.button_ = document.getElementById('button');
  this.timeframe_ = document.getElementById('timeframe');
  this.addListeners_();
};

PopupController.prototype = {

  button_: null,
  timeframe_: null,

  addListeners_: function () {
    this.button_.addEventListener('click', this.handleClick_.bind(this));
    this.timeframe_.addEventListener('change', this.handleChange.bind(this));
  },

  parseMilliseconds_: function (timeframe) {
    var now = new Date().getTime();
    var milliseconds = {
      'hour': 60 * 60 * 1000,
      'day': 24 * 60 * 60 * 1000,
      'week': 7 * 24 * 60 * 60 * 1000,
      '4weeks': 4 * 7 * 24 * 60 * 60 * 1000
    };

    if (milliseconds[timeframe])
      return now - milliseconds[timeframe];

    if (timeframe === 'forever')
      return 0;

    return null;
  },

  handleCallback_: function () {
    var this_button_ = this.button_;
    
    setTimeout(function() { 
       this_button_.innerText = 'Completed!'; 
    }, 2000);
  },

  handleChange: function () {
      this.button_.disabled = false;
      this.button_.innerText = 'Clean Now!';
  },

  handleClick_: function () {
    console.log(this.timeframe_.value);
    var removal_start = this.parseMilliseconds_(this.timeframe_.value);
    if (removal_start !== undefined) {
      this.button_.setAttribute('disabled', true);
      this.button_.innerText = 'Clearing...';
      
      chrome.browsingData.removeCache({ "since": removal_start },
        this.handleCallback_.bind(this)); 
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  window.PC = new PopupController();
});
