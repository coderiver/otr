// for circular scrollable

$.fn.scrollableAddClones = function(addItems) {
	// grab scrollable plugin
	var scrollable;
	if (!(scrollable = $(this).data('scrollable')) || !scrollable.getConf().circular)
	return;
	// grab scrollable elements and remember it's count
	var nodes = scrollable.getItems();
	var length = nodes.length;

	// grab class for the nodes
	var clonedClass = scrollable.getConf().clonedClass;
	// get wrap object to append the clones to
	var wrap = scrollable.getItemWrap();
	// fill as much nodes as needed for 500 pixels
	if (!addItems) addItems = Math.ceil(1000 / nodes.eq(1).width());
	// create fake container to add the clones to (max 4 clones)
	var newNodesAppend = $('<span />');
	for (var i = 1; i <= (addItems < 4 ? addItems : 4); i++)
	nodes.eq(i % length).clone().addClass(clonedClass).appendTo(newNodesAppend);
	// insert HTML
	newNodesAppend.children().appendTo(wrap);
}

$(document).ready(function() {
	//loadthis($("#picture-day__item-first"));

if($('.tabs__wrap').length>0){
	$('.tabs__wrap').scrollable({
		prev:'.tabs__prev',
		next:'.tabs__next',
		circular:false
	});
var scrollable = jQuery(".tabs__wrap").data("scrollable");
  var size = 7;
  scrollable.onSeek(function(event, index) {
	if (this.getIndex() >= this.getSize() - size) {
	  jQuery(".tabs__next").addClass("disabled");
	}
  });

  scrollable.onBeforeSeek(function(event, index) {
	if (this.getIndex() >= this.getSize() - size) {
	  if (index > this.getIndex()) {
		return false;
	  }
	}
  });

}

$('.picture-day').each(function(index, val) {
	 //iterate through array or object
	 console.log($(this).children('.picture-day__items').children('.picture-day__item').length );
	 if($(this).children('.picture-day__items').children('.picture-day__item').length > 4){
		$(this).scrollable({
			next:'.picture-day__next',
			prev:'.picture-day__prew',
			circular:false
		});
		var scrollable = $(this).data("scrollable");

		// hiding small controls
		var size = 4;
		scrollable.onSeek(function(event, index) {
			if (this.getIndex() >= this.getSize() - size) {
				jQuery(".tabs__next").addClass("disabled");
			}
		});

	  	scrollable.onBeforeSeek(function(event, index) {
			if (this.getIndex() <= this.getSize() - size) {
				jQuery(".tabs__prew").addClass("disabled");
			}
		});
	}
	else{
		$(this).next().hide();
	}
});



function loadthisc(elem,context){
	elem.addClass('active');
	context.find('.loadhere').html('<div class="photo-more__item"><div class="bgholder" style="background-image:url('+elem.attr("data-img")+')"></div><p>'+elem.attr("data-text")+'<p></p>')
	console.log(context);
		if(context.find('.picture-day__item.active').is(':first-child')){
			context.find('.photo-more__prev').hide();
		}
		else{
			context.find('.photo-more__prev').show();
		}

		if(context.find('.picture-day__item.active').is(':last-child')){
			context.find('.photo-more__next').hide();
		}
		else{
			context.find('.photo-more__next').show();
		}
}

$('.uberslider').each(function(event) {

	var loc = $(this);

	toload = loc.find('.picture-day__item:first-child');
	loadthisc(toload, loc);

	
	//LOAD ON CLICK
	$(this).find('.picture-day__item').click(function () {
		$(this).siblings().removeClass('active');
		loadthisc($(this),loc);

		


		return false;
	});
	//PREV
	loc.find('.photo-more__prev').click(function(){
		elemtogo = loc.find('.picture-day__item.active').prev();
		loc.find('.picture-day__item').removeClass('active');
		loadthisc(elemtogo,loc);
		return false;

	});
	//  NEXT
	loc.find('.photo-more__next').click(function(){
		elemtogo = loc.find('.picture-day__item.active').next();
		loc.find('.picture-day__item').removeClass('active');
		loadthisc(elemtogo,loc);
		return false;
	});

});














//tape
function tape_move() {
	var parent = $('.scrollable__list').width();
	var el = $('.scrollable__list ul');
	var item = $('.scrollable__list ul li');
	var el_width = 0;
	item.each(function() {
		el_width += $(this).width() + 2;
		return(el_width);
	})
	var max_pos = el_width - parent;
	el.css('width', el_width + 'px');
	$('.scrollable__next').hover(function() {
		var left = el.position().left;
		el.animate({left: -max_pos}, 1000);
	},
	function() {
		el.stop();
	});
	$('.scrollable__prev').hover(function() {
		var left = el.position().left;
		el.animate({left: 0}, 1000);
	},
	function() {
		el.stop();
	});
}
tape_move();


function get_news() {
	var img = $(".list-news .js-news-1").children(".list-news__img").html();
	var text = $(".list-news .js-news-1").children(".list-news__body").html();
	$('.super-news__img').html(img);
	$('.super-news__text').html(text);
}

function slider_news() {
	$(".list-news .js-news-1").addClass("is-active");
	var cycle = setInterval(function() {
		$(".list-news .is-active").each(function(i){
			$(this).addClass('js-news'+i);
			if ($(".list-news .js-news-4").hasClass("is-active")) {
				$(".list-news .js-news-1").addClass("is-active");
				$(".list-news .js-news-4").removeClass("is-active");
				get_news();
			}
			else {
				$(this).removeClass("is-active");
				$(this).next().addClass("is-active");
				//$('.super-news').html($(this).next().html());
				var img = $(this).next().children(".list-news__img").html();
				var text = $(this).next().children(".list-news__body").html();
				$('.super-news__img').html(img);
				$('.super-news__text').html(text);
			}
		});
	}, 3000);
	// get first news aftre page loaded
	get_news();
	// get news on link click
	$('.list-news li a').click(function(){
		if ($(this).parent().hasClass("is-active")) {
			var link = $(this).attr("href");
			window.location = link;
		}
		else {
			$('.list-news li').removeClass("is-active");
			$(this).parent().addClass("is-active");
			var img = $('.list-news .is-active').children(".list-news__img").html();
			var text = $('.list-news .is-active').children(".list-news__body").html();
			$('.super-news__img').html(img);
			$('.super-news__text').html(text);
			clearInterval(cycle); // stop cycle on click
			return false;
		}
	});
	// get news on list item click
	$('.list-news li').click(function(){
		$('.list-news li').removeClass("is-active");
		$(this).addClass("is-active");
		var img = $('.list-news .is-active').children(".list-news__img").html();
		var text = $('.list-news .is-active').children(".list-news__body").html();
		$('.super-news__img').html(img);
		$('.super-news__text').html(text);
		clearInterval(cycle); // stop cycle on click
	});
}
slider_news();



	// for login-form
	$('#enter').click(function() {
		$(".login-form").css("display", "block");
	});
	$('.close').click(function() {
		$(".login-form").css("display", "none");
	});

	// for quest-form_alt
	$('#sent-redactor').click(function() {
		$(".quest-form_alt").css("display", "block");
	});
	$('.close').click(function() {
		$(".quest-form_alt").css("display", "none");
	});

	// for select selected "prog"
	$(".js-select-prog__select").change(function(){
		var text = $(this).val();
		$(".js-select-prog").text(text);
	});

	// for select return first val "prog"
	var text = $(".js-select-prog__select").val();
	$(".js-select-prog").text(text);

	// for select selected "post"
	$(".js-select-post__select").change(function(){
		var text = $(this).val();
		$(".js-select-post").text(text);
	});



	// for select selected in cycle  (does not work)
	// $(".js-select-prog__select").each(function(){
	//   var text = $(this).val();
	//    $(".js-select-prog").text(text);
	// });

	// add\remove onClick class "active"
	$('.programm__lang').click(function(){
		if ($(this).hasClass('active')) {
		}
		else {
			$('.programm__lang').removeClass('active');
			$(this).addClass('active');
		}
	});

	// add\remove onClick class "active"
	$('.button').click(function(){
		if ($(this).hasClass('button_active')) {
		}
		else {
			$('.button').removeClass('button_active');
			$(this).addClass('button_active');
		}
	});

	// add\remove onClick class "active"
	$('.programm__menu a').click(function(){
		if ($(this).hasClass('active')) {
		}
		else {
			$('.programm__menu a').removeClass('active');
			$(this).addClass('active');
		}
	});

	// change lang
	$('.programm__lang_eng').click(function() {
		$(".programm__abc_eng").css("display", "block");
		$(".programm__abc_ru").css("display", "none");
	});
	$('.programm__lang_ru').click(function() {
		$(".programm__abc_eng").css("display", "none");
		$(".programm__abc_ru").css("display", "block");
	});

	//tabs
	$(".tabs-item").hide();
	$(".tab-item-2").show();
	$(".tabs li").click(function(){
		$(".tabs li").removeClass("active");
		$(this).addClass("active");
		var tab_act = $(this).attr("data-tab");
		$(".tabs-item").hide();
		$(tab_act).show();
	});

	var field = $(".js-work-item").html();

	$(".js-add-work").click(function(){
		var last = $(".js-work-item .row:last");
		$(field).insertAfter(last);
		var counter = +($(this).attr("data-counter"));
		++counter;
		$(this).attr("data-counter", counter);
		return false;
	});


});
