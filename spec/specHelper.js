var $ = require(['jquery'], function(){
  setTimeout(function(){
    var stackString =  $('.stackTrace').html();
    if(stackString){
      function removeExtraLines(array){
        var result = [];
        array.forEach(function(item, index){ if(item != '' && item != '\n'){result.push(item)}}, array);
        return result;
      }
      
      var unimportant = '<span class="unimportant">';
      var stackTraces = $('.stackTrace');
      stackTraces.each(function(i, stackTrace){
        stackTrace = $(stackTrace);
        var originalStackTrace =  stackTrace.html();
        var importantStackTrace = originalStackTrace.split(/.*jasmine.*/).join('').split(/(.*)/);
        importantStackTrace = removeExtraLines(importantStackTrace);
        var unimportantStackTrace = removeExtraLines(originalStackTrace.split(/(.*)/)).slice(importantStackTrace.length);
        unimportantStackTrace = removeExtraLines(unimportantStackTrace);
        stackTrace.html(
            "<span class='important'>"+ 
            importantStackTrace.join('\n') + '\n' +
            '</span><span class="unimportant">'+ 
            unimportantStackTrace.join('\n') + 
            '</span>'
        );
      });
      
      
      $('.unimportant').css('color', '#aaa');
    }
  },1000);
});
