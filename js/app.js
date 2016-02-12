$(document).ready(function() {

//pulls tweet text and time fron localstorage when you refresh
  for (var i = 1; i < localStorage.length + 1; i += 2) {
    $('#stream').prepend('<div class="tweet"><div class="content"><img class="avatar" src="img/alagoon.jpg" /><strong class="fullname">BKing</strong><span class="username">@tasty</span><p class="tweet-text">' + localStorage.getItem(i) + '</p><div class="tweet-actions"><ul><li><span class="icon action-reply"></span> Reply</li><li><span class="icon action-retweet"></span> Retweet</li><li><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="time">' + '<p><span data-livestamp="' + localStorage.getItem(i + 1) + '"></span></p>' + '</div></div>');
  }

  //initially hide all tweet actions and controls
  $('.tweet-actions').hide();
  $('#tweet-controls').hide();

  //on textarea focus it will expand height and show tweet controls
  $('textarea').focus(function() {
    $(this).animate({
      height: '6em'
    }, 400);
    $(this).siblings('#tweet-controls').fadeIn();
  });

  //count characters, disable button when too many characters are in, change to red when <10 remaining
  var charCount = 1;
  $('textarea').on('keyup', function() {
    charCount = 140 - $('textarea.tweet-compose').val().length;
    $('#char-count').text(charCount);
    if (charCount < 0) {
      $('#char-count').css({
        color: 'red'
      });
      $('#tweet-submit').attr('disabled', 'disabled');
    } else if (charCount >= 0 && charCount <= 10) {
      $('#char-count').css({
        color: 'red'
      });
      $('#tweet-submit').removeAttr('disabled');
    } else if (charCount > 10) {
      $('#char-count').css({
        color: '#999'
      });
    }
  });

//grab fullname, username, and tweet text when the reply button is clicked, could be used to set up a reply thing
  $('.action-retweet').parent().on('click', function() {
    var fullName = $($(this).parents()[2]).find('.fullname').text();
    var userName = $($(this).parents()[2]).find('.username').text();
    var tweetText = $($(this).parents()[2]).find('.tweet-text').text();
  });

  //shrink textarea and fade out tweet controls on blur
  $('textarea').blur(function() {
    $(this).animate({
      height: '2.5em'
    }, 400);
    $('#tweet-controls').fadeOut();
  });

  //enclosure to up key count for localstorage, pushes tweet and time into two different items
  var addTweetClosure = function(task) {
    var count = localStorage.length + 1;
    return function(task, time) {
      localStorage.setItem(count, task);
      localStorage.setItem(count + 1, time);
      count += 2;
    };
  };

  //addtweet enclosure function
  var addTweet = addTweetClosure();

  //prepend tweet, empty tweet box if successful, hide tweet actions on new tweet, and also the actions to show on hover over
  $('.button').on('click', function() {
    //push tweet to local storage
    addTweet($('textarea.tweet-compose').val(), Math.round(Date.now() / 1000));
    //if textarea is not empty
    if ($('textarea.tweet-compose').val()) {
      //prepend new tweet
      $('#stream').prepend('<div class="tweet"><div class="content"><img class="avatar" src="img/alagoon.jpg" /><strong class="fullname">BKing</strong><span class="username">@tasty</span><p class="tweet-text">' + $('textarea.tweet-compose').val() + '</p><div class="tweet-actions"><ul><li><span class="icon action-reply"></span> Reply</li><li><span class="icon action-retweet"></span> Retweet</li><li><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="time">' + '<p><span data-livestamp="' + Math.round(Date.now() / 1000) + '"></span></p>' + '</div></div>');
    }
    //clear tweet area if tweet is sucessful
    if ($('textarea.tweet-compose').val().length <= 140) {
      $('textarea.tweet-compose').val('');
    }
    //hide tweet actions on new post
    $('.tweet-actions').hide();
    //allows tweet actions on new post to show on mouseenter like for other posts
    $('.tweet').mouseenter(function() {
      $(this).find('.tweet-actions').slideDown();
    });
    $('.tweet').mouseleave(function() {
      $(this).find('.tweet-actions').slideUp();
    });
  });

  //allow tweet actions to be shown on hover of tweets in steam
  $('.tweet').mouseenter(function() {
    $(this).find('.tweet-actions').slideDown();
  });

  $('.tweet').mouseleave(function() {
    $(this).find('.tweet-actions').slideUp();
  });



});
