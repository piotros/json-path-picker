$(function () {

  var $optionsGroups = $('.options-group');
  var $jumpToTop = $('.jump-to-top');
  var $window = $(window);
  var $pathTarget = $('.path');

  var opts;

  var defaultOpts = {
    pathNotation: 'dots',
    pathQuotesType: 'single'
  };

  var toggleJumpToTopButton = function () {
    var isScrolled = $window.scrollTop() !== 0;
    $jumpToTop.toggleClass('visible', isScrolled);
  };

  var loadOptsFromStorage = function () {
    return JSON.parse(localStorage.getItem('opts'));
  };

  var storeOptsInStorage = function () {
    localStorage.setItem('opts', JSON.stringify(opts));
  };

  (function prepareOpts() {
    opts = loadOptsFromStorage() || defaultOpts;

    for (var opt in opts) {
      if (opts.hasOwnProperty(opt)) {
        var optValue = opts[opt];

        $optionsGroups.find(':checkbox[name=' + opt + ']')
          .prop('checked', optValue);

        $optionsGroups.find(':radio[name=' + opt + ']')
          .filter('[value="' + optValue + '"]')
          .prop('checked', true);

        $optionsGroups.find(':text[name=' + opt + ']')
          .val(optValue);
      }
    }

    $('body').removeClass('loading');
  })();

  $window.scroll(_.debounce(toggleJumpToTopButton, 100));

  $jumpToTop.click(function () {
    $('html, body').animate({scrollTop: 0}, 'fast');
  });

  $optionsGroups.find(':checkbox').change(function () {
    var optName = $(this).attr('name');
    opts[optName] = $(this).prop('checked');
    storeOptsInStorage();
  });

  $optionsGroups.find(':radio, :text').change(function () {
    var optName = $(this).attr('name');
    opts[optName] = $(this).val();
    storeOptsInStorage();
  });

  $('#btn-json-path-picker').click(function () {
    try {
      var jsonData = eval('(' + $('#json-input').val() + ')');
    }
    catch (error) {
      return alert("Cannot eval JSON: " + error);
    }

    $('#json-renderer').jsonPathPicker(jsonData, $pathTarget, opts);

    toggleJumpToTopButton();
  });

});
