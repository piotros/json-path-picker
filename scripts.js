$(function () {

  var $optionsGroups = $('.options-group');

  var opts;

  var defaultOpts = {
    pathNotation: 'dots',
    pathQuotesType: 'single'
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

    $('#json-renderer').jsonPathPicker(jsonData, opts);
  });

});
