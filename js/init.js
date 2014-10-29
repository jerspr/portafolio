$(function(){
	//explosion! I'll probably be making a plugin for sequencing like this soon...
	var explosion = [];
	var $frameNum;
	var $spacing = 40;
	var $frames = 25;
	//add all the frames into an array
	/*for( var s = 0; s < $frames; s++ ) {
		explosion[s] = $path + '/' + s +'.jpg';
	}
	explosion.shift();*/
	//cache
	$('body').append('<div id="cache"></div>');
	$('#cache').hide();
	/*$(explosion).each(function() {
	    $('<img />').attr('src', this).appendTo('#cache');
	});*/

	//on scroll swap the images
	$(window).scroll(function(){
		var $scrollTop = $(window).scrollTop() -40;
		$frameNum = Math.ceil( $scrollTop / $spacing );
		/*if( $frameNum <= $frames ) {
			$('#explosion img').attr('src' , explosion[$frameNum] );
		}*/
	});
	//preload
	/*$("body").queryLoader2({
		percentage : true,
		completeAnimation : 'grow',
		onLoadComplete : complete
	});  
	function complete() {
		$('.initialBG').remove();
		$('#qLoverlay').fadeOut(1000);
	}*/
	//site of the day 
	$(window).load(function(){
		if( $(window).width() < 1230 ) {
			$('#topAwards').stop().animate({ 'left' : -100 },500);
		}
	});
	$(window).resize(function(){
		if( $(window).scrollTop() < 40 ) {
			if( $(window).width() < 1230 ) {
				$('#topAwards').stop().animate({ 'left' : -100 },500);
			}
			else {
				$('#topAwards').stop().animate({ 'left' : 0 },500);
			}
		}
	});
	
	$(window).bind( 'scroll', awards );
	function awards() {
		if( $(window).scrollTop() > 40 && $(window).width() > 1230 ) {
			$('#topAwards').stop().animate({ 'left' : -100 },400);
			$(window).unbind( 'scroll', awards );
		}
	}
	$(window).scroll(function(){
		if( $(window).scrollTop() < 40 && $(window).width() > 1230 ) {
			$('#topAwards').stop().animate({ 'left' : 0 },400);
			$(window).bind( 'scroll', awards );
		}
	});
	//Social
	////Auto center the right icons 
	$('#social').css("top", (($(window).height() - $('#social').outerHeight()) / 2) );
	$(window).resize(function(){
		$('#social').css("top", (($(window).height() - $('#social').outerHeight()) / 2) );
	});
	
	////return false
	$('#social ul li > a').click(function(){
		return false;
	});
	////slide in 
	$('#social ul li').hover(function(){
		if( $(this).hasClass('youtube') ) {
			$(this).find('.socialContainer').stop().animate({ 'opacity' : 1, "right" : 35},200);
		}
		else {
			$(this).find('.socialContainer').stop().animate({ 'opacity' : 1, "right" : 19},200);
		}
	},function(){
		if( $(this).hasClass('youtube') ) {
			
			$(this).find('.socialContainer').stop().animate({ 'opacity' : 0, "right" : -75},500);
		}
		else {
			$(this).find('.socialContainer').stop().animate({ 'opacity' : 0, "right" : -60},500);
		}	
	});
	////hover fade
	$('#social ul li a > span').hide();
	$('#social ul > li > a ').hover(function(){
		$(this).find('> span').stop(true,true).fadeIn(400);
	},function(){
		$(this).find('> span').stop(true,true).fadeOut(400);
	});
	$('#keyboard span').hide();
	$('#keyboard').hover(function(){
		$(this).find('span').stop(true,true).fadeIn();
		$('#keyboardInfo').stop(true,true).slideDown(300);
	},function(){
		$(this).find('span').stop(true,true).fadeOut();
		$('#keyboardInfo').hide();
	});
	//keyboard arrow controls 
	$(document).keyup(function(e){
		console.log(e);
		var prevSection = $('#topNav ul li.current').prev('li').find('a').attr('href');
		var nextSection = $('#topNav ul li.current').next('li').find('a').attr('href');
		if( e.keyCode == 38 || e.keyCode == 37 ) {
			$.scrollTo( prevSection , {duration: 1500, axis:"y", easing: "easeOutCubic"});
		}
		if( e.keyCode == 40 || e.keyCode == 39) {
			$.scrollTo( nextSection , {duration: 1500, axis:"y", easing: "easeOutCubic"});
		}
	});
	//PORTFOLIO
	Shadowbox.init({
		onOpen : hideNav,
		onClose : showNav
	});
	function hideNav() {
		$('#topNav, #footer').slideUp();
	}
	function showNav() {
		$('#topNav, #footer').slideDown();
	}
	$('#portfolioContainer').masonry({
		itemSelector: '.portfolioItem',
		isAnimated: true,
		isFitWidth: true
	});
	////when pages load check the width and adjust
	if( $(window).width() < 1390 ) {
		$('#portfolio').stop().animate({ 'height' : 2500 });
	}
	if( $(window).width() > 1391 ) {
		$('#portfolio').stop().animate({ 'height' : 1400 });
		$('#wrapper').stop().animate({ 'height' : 6300 },0);
	}
	if( $(window).width() > 1730 ) {
		$('#portfolio').stop().animate({ 'height' : 700 });
		$('#wrapper').stop().animate({ 'height' : 5260 },0);
	}
	////adjust for resize	
	$(window).resize(function(){
		if( $(window).width() < 1390 ) {
			$('#portfolio').stop().animate({ 'height' : 2500 });
			$('#wrapper').stop().animate({ 'height' : 7120 },0);
		}
		if( $(window).width() > 1391 ) {
			$('#portfolio').stop().animate({ 'height' : 1400 });
			$('#wrapper').stop().animate({ 'height' : 6000 },0);
		}
		if( $(window).width() > 1730 ) {
			$('#portfolio').stop().animate({ 'height' : 700 });
			$('#wrapper').stop().animate({ 'height' : 5300 },0);
		}
	});
	//// hover plus sign
	$('#portfolioContainer .portfolioItem .imageHolder').each(function(){
		$(this).prepend('<span class="zoom"></span>');
	});
	$('#portfolioContainer .portfolioItem a').hover(function(){
		$(this).parent().find('.zoom').stop().animate({ 'top' : 0, 'left' : 0 },300);
	},function(){
		$(this).parent().find('.zoom').stop().animate({ 'top' : -57, 'left' : -57 },300);
	});
	////If user access page through hash
	$(window).load(function(){
		if( location.hash ) {
			var hash = location.hash;
			window.scroll(0,0);
			if( hash == '#contact' ) {
				if( $(window).width() < 1390 ) {
					$.scrollTo(7300, {duration: 3500, axis:"y", easing: "easeOutCubic"});
				}
				if( $(window).width() > 1391 ) {
					$.scrollTo(6200, {duration: 3500, axis:"y", easing: "easeOutCubic"});
				}
				
				if( $(window).width() > 1731 ) {
					$.scrollTo(5500, {duration: 3500, axis:"y", easing: "easeOutCubic"});
				}
				
			}
			
			if( hash == '#music' ) {
				
				if( $(window).width() < 1390 ) {
					$.scrollTo(8320, {duration: 4500, axis:"y", easing: "easeOutCubic"});
				}
				
				if( $(window).width() > 1391 ) {
					$.scrollTo(7230, {duration: 4500, axis:"y", easing: "easeOutCubic"});
				}
				
				if( $(window).width() > 1731 ) {
					$.scrollTo(6520, {duration: 4500, axis:"y", easing: "easeOutCubic"});
				}
			}
			else {
				$.scrollTo('#' + location.hash, {duration: 3500, axis:"y", easing: "easeOutCubic"});
			}
		}	
	});
	$('a.home').click(function(){
		$.scrollTo('#home', {duration: 2500, axis:"y", easing: "easeOutQuart", queue : false});
		return false;
	});
	
	$('a.about').click(function(){
		$.scrollTo('#about', {duration: 3500, axis:"y", easing: "easeOutQuart", queue : false});
		return false;
	});
	
	$('a.services').click(function(){
		$.scrollTo('#services', {duration: 3500, axis:"y", easing: "easeOutQuart", queue : false});
		return false;
	});
	
	$('a.portfolio').click(function(){
		$.scrollTo('#portfolio', {duration: 3500, axis:"y", easing: "easeOutQuart", queue : false});
		return false;
	});
	
	$('a.contact').click(function(){
		$.scrollTo('#contact', {duration: 3500, axis:"y", easing: "easeOutQuart"});
		return false;
	});
	
	$('a.music').click(function(){
		$.scrollTo('#music', {duration: 3500, axis:"y", easing: "easeOutQuart"});
		return false;
	});
	
	//what I love
	var things = ["Making Websites","Design", "HTML5", "jQuery", "Animation", "3D Design", "Photoshop", "Producing", "Building PCs", "CSS3", "WordPress", "Illustrator", "V-ray"];
		var i = 0;		
		function showThem() {
			$('#home h4 span').fadeOut(300,function(){
				$('#home h4 span').html(things[i]).fadeIn(300);	
			});	
			i++;
			if(i==11) {
				i = 0;
			}
			window.setTimeout( showThem, 3400);
			return;
		}
		showThem();
	//nav highlight 
	$('#topNav ul li a').hover(function(){
		if( $(this).parent().hasClass('current') ) {
		}
		else {
			$(this).stop().animate({ 'color' : '#fff '});	
		}
	},function(){
		if( $(this).parent().hasClass('current') ) {
			
		}
		else {
			$(this).stop().animate({ 'color' : '#999 '});
		}
	});
	$('ul.nav_menu li a').hover(function(){
		if( $(this).parent().hasClass('current') ) {
		}
		else {
			$(this).stop().animate({ 'color' : '#fff '});	
		}
	},function(){
		if( $(this).parent().hasClass('current') ) {
			
		}
		else {
			$(this).stop().animate({ 'color' : '#999 '});
		}
	});
	$(window).scroll(function() {
		var scroll_position = $(window).scrollTop();
		//// home
		if (scroll_position >= 0 && scroll_position <= 850) {
			$('#topNav ul li').removeClass();
			$('#topNav ul li a.home').parent().addClass('current');
			$('#topNav ul li a').stop().animate({'color' : '#999'});	
			$('#topNav ul li a.home').stop().animate({'color' : '#fbb900'},50);	
			/**/
			$('ul.nav_menu li').removeClass();
			$('ul.nav_menu li a.home').parent().addClass('current');
			$('ul.nav_menu li a').stop().animate({'color' : '#999'});	
			$('ul.nav_menu li a.home').stop().animate({'color' : '#fbb900'},50);
		}
		//// about
		if (scroll_position >= 851 && scroll_position <= 2000) {
			$('#topNav ul li').removeClass();
			$('#topNav ul li a.about').parent().addClass('current');
			$('#topNav ul li a').stop().animate({'color' : '#999'});
			$('#topNav ul li a.about').stop().animate({'color' : '#fbb900'});
			/**/
			$('ul.nav_menu li').removeClass();
			$('ul.nav_menu li a.about').parent().addClass('current');
			$('ul.nav_menu li a').stop().animate({'color' : '#999'});
			$('ul.nav_menu li a.about').stop().animate({'color' : '#fbb900'});
		}
		//// services
		if (scroll_position >= 2000 && scroll_position <= 3290) {
			$('#topNav ul li').removeClass();
			$('#topNav ul li a.services').parent().addClass('current');
			$('#topNav ul li a').stop().animate({'color' : '#999'});	
			$('#topNav ul li a.services').stop().animate({'color' : '#fbb900'});
			/**/
			$('ul.nav_menu li').removeClass();
			$('ul.nav_menu li a.services').parent().addClass('current');
			$('ul.nav_menu li a').stop().animate({'color' : '#999'});	
			$('ul.nav_menu li a.services').stop().animate({'color' : '#fbb900'});
		}
		//// portfolio
		if (scroll_position >= 3290 && scroll_position <= 7000) {
			$('#topNav ul li').removeClass();
			$('#topNav ul li a.portfolio').parent().addClass('current');
			$('#topNav ul li a').stop().animate({'color' : '#999'});	
			$('#topNav ul li a.portfolio').stop().animate({'color' : '#fbb900'});
			/**/
			$('ul.nav_menu li').removeClass();
			$('ul.nav_menu li a.portfolio').parent().addClass('current');
			$('ul.nav_menu li a').stop().animate({'color' : '#999'});	
			$('ul.nav_menu li a.portfolio').stop().animate({'color' : '#fbb900'});	
		}
		//// contact
		if ( $(window).width() < 1390 && scroll_position >= 7090 ) {
			$('#topNav ul li').removeClass();
			$('#topNav ul li a.contact').parent().addClass('current');
			$('#topNav ul li a').stop().animate({'color' : '#999'});	
			$('#topNav ul li a.contact').stop().animate({'color' : '#fbb900'});
			/**/
			$('ul.nav_menu li').removeClass();
			$('ul.nav_menu li a.contact').parent().addClass('current');
			$('ul.nav_menu li a').stop().animate({'color' : '#999'});	
			$('ul.nav_menu li a.contact').stop().animate({'color' : '#fbb900'});
		}
		
		if ( $(window).width() > 1391 && scroll_position >= 6090 ) {
			$('#topNav ul li').removeClass();
			$('#topNav ul li a.contact').parent().addClass('current');
			$('#topNav ul li a').stop().animate({'color' : '#999'});	
			$('#topNav ul li a.contact').stop().animate({'color' : '#fbb900'});	
			/**/
			$('ul.nav_menu li').removeClass();
			$('ul.nav_menu li a.contact').parent().addClass('current');
			$('ul.nav_menu li a').stop().animate({'color' : '#999'});	
			$('ul.nav_menu li a.contact').stop().animate({'color' : '#fbb900'});	
		}
		
		if ( $(window).width() > 1730 && scroll_position >= 5300 ) {
			$('#topNav ul li').removeClass();
			$('#topNav ul li a.contact').parent().addClass('current');
			$('#topNav ul li a').stop().animate({'color' : '#999'});	
			$('#topNav ul li a.contact').stop().animate({'color' : '#fbb900'});
			/**/
			$('ul.nav_menu li').removeClass();
			$('ul.nav_menu li a.contact').parent().addClass('current');
			$('ul.nav_menu li a').stop().animate({'color' : '#999'});	
			$('ul.nav_menu li a.contact').stop().animate({'color' : '#fbb900'});	
		}
	});
	//SERVICE ICONS 
	$('.services .wordpress .wordpressIcon span, .services .website .websiteIcon span , .services .digital .digitalIcon span').css('opacity' , 0);
	
	$('.services .wordpress').hover(function(){
		$('.services .wordpress .wordpressIcon span').stop().animate({ 'opacity' : 1 },400);
	},function(){
		$('.services .wordpress .wordpressIcon span').stop().animate({ 'opacity' : 0 },400);
	});
	
	$('.services .website').hover(function(){
		$('.services .website .websiteIcon span').stop().animate({ 'opacity' : 1 },400);
	},function(){
		$('.services .website .websiteIcon span').stop().animate({ 'opacity' : 0 },400);
	});
	
	$('.services .digital').hover(function(){
		$('.services .digital .digitalIcon span').stop().animate({ 'opacity' : 1 },400);
	},function(){
		$('.services .digital .digitalIcon span').stop().animate({ 'opacity' : 0 },400);
	});
	
	
	//ABOUT TOOLS
	
	$(window).scroll(tools);
	
	function tools() {
		
			if ( $(window).scrollTop() > 750  ) { 
					
					$('.about h3.second').fadeIn();
						
					$("#skills #icons img").each(function(i){
						$(this).delay(i * 100 ).animate({ opacity : 1 },400);
					});
					
					$(window).unbind('scroll',tools);		
			}
	}
	$(window).scroll(function(){
		if ( $(window).scrollTop() < 450  ) { 	
			$('.about h3.second').fadeOut();
			$("#skills #icons img").animate({ 'opacity' : 0 } , 0);
			$(window).unbind('scroll',tools);
			$(window).bind('scroll',tools);		
		}
		
	});
	//ABOUT PERCENT DESIGNER / DEVELOPER
	$(window).scroll(percentages);
	$(window).scroll(function(){
		if( $(window).scrollTop() < 1000 ) {
			
			$('#desDevPercentage').fadeOut(400);
			
			$('#desPercent, #devPercent').html('00.0 <span class="percent">&</span>');
			
			$(window).unbind('scroll',percentages);
			$(window).bind('scroll', percentages);
		}
			
	});
	function percentages() {
		
		
		if( $(window).scrollTop() > 1300 ) {
			
			$('#desDevPercentage').fadeIn(400);
			
			var dec = 0, wholeNum=0;
	
			function desPercent() {
				
				dec++;
				
				if( dec == 10 ) {
					wholeNum++;
					dec = 0;
				}
				
				if(wholeNum == 54 && dec == 4 ) {
					clearInterval(desPercentIntervalID);
				}
				
				if( wholeNum < 10 ) {
					$('#desPercent').html( '0' + wholeNum + '.' + dec + '<span class="percent">%</span>');
				}
				
				else {
					$('#desPercent').html(wholeNum + '.' + dec + '<span class="percent">%</span>');
				}
			}
			var dec2 = 0, wholeNum2=0;
			
			function devPercent() {
				
				dec2++;
				
				if( dec2 == 10 ) {
					
					wholeNum2++;
					dec2 = 0;
				}
				
				if( wholeNum < 10 ) {
					
				$('#devPercent').html('0' + wholeNum2 + '.' + dec2 +'<span class="percent">%</span>');
				
				}
				
				else {
					
					$('#devPercent').html(wholeNum2 + '.' + dec2 +'<span class="percent">%</span>');
				}
				
				if(wholeNum2 == 45 && dec2 == 6 ) {
					clearInterval(devPercentIntervalID);
					$('#devPercent').html(wholeNum2 + '.' + dec2  +'<span class="percent">%</span>');
				}
			}
			
			var desPercentIntervalID = setInterval(desPercent, 1);
			var devPercentIntervalID = setInterval(devPercent, 1);
			
			$(window).unbind('scroll',percentages);
					
			}

	}
	//PARALLAX
	var pixelsNumForSwitch = 0;
	var imgNum = 1;
	$(window).scroll(function() {
		var delay = 0;
		var object_speed = 0.54;
		var object_speed2 = 1.3;
		var object_speed4 = 0.8;
		var object_speed3 = 0.92;
		var object_speed5 = 1.2;
		var object_speed6 = 1.5;
		var object_speed7 = 1.6;
		var object_speed8 = 1.4;
		var scroll_position = $(window).scrollTop();
		$("#main-content").stop().animate({ top : 0 - scroll_position}, 0);
		////HOME 
		//if(scroll_position >=0 && scroll_position <= 40 ) { $('#topPM').show(); $('#whiteBG').show();}
		/*if(scroll_position >=40 ) { $('#topPM, #whiteBG').hide(); $('#explosion').show();}*/
		if (scroll_position >= 0 && scroll_position <= 1000 ) {
			$("#line1, #line2").show();	
			$("#hello").stop().animate({ top:  (scroll_position / object_speed2) + 70  }, delay);
			//$("#topPM,#whiteBG").stop().animate({ top:  (scroll_position / object_speed2)  }, delay);
			$("#explosion").stop().animate({ top:  (scroll_position / object_speed2) -410 }, delay);
			$("#line1").stop().animate({ top:  (scroll_position / object_speed) - 280  }, delay);
			$("#line2").stop().animate({ top:  -(scroll_position * object_speed4) - 340  }, delay);
			$("#beginLink").stop().animate({ top:  (scroll_position / object_speed7) + 420  }, delay);
		}
		
		if( scroll_position >=120 && scroll_position <=1000 ) {
			$("#line1").hide();
			$("#line2").hide();
		}
		////ABOUT 
		if (scroll_position >= 0 && scroll_position <= 2201 ) {
				$("#aboutBG").stop().animate({ top:  (scroll_position / object_speed5) -850   }, delay);	
				$("#about .about").stop().animate({ top:  (scroll_position * object_speed) - 370   }, delay);
				
				$("#about .parallax #me").stop().animate({ top:  (scroll_position / object_speed8) -540   }, delay);		
				
		 }
		////SERVICES
		if (scroll_position >= 1200 && scroll_position <= 3501 ) {
			
			$('#serviceBG').stop().animate({ top: (scroll_position / object_speed5 )- 1800},delay);
			
			$("#services .services").stop().animate({ top:  (scroll_position * object_speed) -1200   }, delay);
			
			$('#dottedLine').stop().animate({ top: (scroll_position / object_speed6) -1530 },delay);
		
			$('#line3').stop().animate({ top: (scroll_position / object_speed5) -1790 },delay);
			
			$('#myProcess').stop().animate({ top:  (scroll_position * object_speed) -620   }, delay);
				
		}
		
		////PORTFOLIO
		
		if( scroll_position >= 2500 && scroll_position <= 7500 ) {
			
			$('#portfolioBG').stop().animate({ top : (scroll_position / object_speed5)-2900 },delay);
			$('#portfolioContainer').stop().animate({ top : (scroll_position * object_speed) - 1800 },delay);
		}
		////CONTACT 
	});
	//remove items based on scroll position
	
	$(window).scroll(function(){
		
		var scroll_position = $(window).scrollTop();
		
		if( scroll_position > 100 ) {
			$("#beginLink").stop().animate({ opacity: 0 },200);	
		}
		
		else {
			$("#beginLink").stop().animate({ opacity: 1 },500);
		}
	});
	//remove items based on window size
	
	var windowHeight = $(window).height();
	
	if( windowHeight < 650) {
		$("#beginLink").hide();
	}
	
	$(window).resize(function(){
		
		var windowHeightResize = $(window).height();
		
		if( windowHeightResize < 650) {
			$("#beginLink").fadeOut();
		}	
		
		else {
			$("#beginLink").fadeIn();	
		}
	});
	//contact form
	
	//place holders
	$('input#name').focus(function(){
		if( $(this).attr('value') == 'Name' ) {
			$(this).attr('value','');	
		}
	});
	
	$('input#name').blur(function(){
		if( $(this).attr('value') == '' ) {
			$(this).attr('value','Name');	
		}
	});
	
	$('input#email').focus(function(){
	    if ( $(this).attr('value') == 'Email' ) {
			 $(this).attr('value','');
		}
	});
	$('input#email').blur(function(){
		if( $(this).attr('value') == '' ) {
			$(this).attr('value','Email');	
		}
	});
	
	$('input#subject').focus(function(){
	    if ( $(this).attr('value') == 'Subject' ) {
			 $(this).attr('value','');
		}
	});
	
	$('input#subject').blur(function(){
		if( $(this).attr('value') == '' ) {
			$(this).attr('value','Subject');	
		}
	});
	
	$('input#subject').focus(function(){
	    if ( $(this).attr('value') == 'Subject' ) {
			 $(this).attr('value','');
		}
	});
	$('input#subject').blur(function(){
		if( $(this).attr('value') == '' ) {
			$(this).attr('value','Subject');	
		}
	});
	$('#contactForm form textarea').focus(function(){
	    if ( $(this).val() == 'Your message' ) {
			 $(this).val('');
		}
	});
	$('#contactForm form textarea').blur(function(){
		if( $(this).val() == '' ) {
			$(this).val('Your message');	
		}
	});
	//submit
	$('#contactForm form').submit(function(){
		
		//Basic validation
		if( $('#name').val() == 'Name' || $('#email').val() == 'Email'  || $('#subject').val() == 'Subject' || $('#contactForm form textarea').val() == 'Your message' ) {
			
			if( $('input#name').val() == 'Name') { 
			$(this).find('#name').parent().find('.error').slideDown();
			}
			else {
				$(this).find('#name').parent().find('.error').slideUp();
			}
			
			if( $('input#email').val() == 'Email') { 
				$(this).find('#email').parent().find('.error').slideDown();
			}
			else {
				$(this).find('#email').parent().find('.error').slideUp();
			}
			
			if( $('input#subject').val() == 'Subject') { 
				$(this).find('#subject').parent().find('.error').slideDown();
			}
			else {
				$(this).find('#subject').parent().find('.error').slideUp();
			}
			if( $('#messages').val() == 'Your message') { 
				$(this).find('#messages').parent().find('.error').slideDown();
			}
			else {
				$(this).find('#messages').parent().find('.error').slideUp();
			}
		}
		// after completing validation collect data from form to process
		else {
			$('#sending').fadeIn();
			var dataToPass = $(this).serialize();
			$.ajax({
				url: $('#contactForm form').attr('action') + "?ajax=true",
				type: $('#contactForm form').attr('method'),
				data: dataToPass,
				success: submitFinished
			});
		}
		function submitFinished( response ) {
			//remove possible  excess whitespaces
			response = $.trim( response );
			 if ( response == "success" ) {
			 	$('#sending').fadeOut(200,function(){
			 		$('#contactForm #success').fadeIn();
			 	});
			 }
			 else {
			    // Form submission failed: Display the failure message,
			    // then redisplay the form
			  $('#sending').fadeOut(200,function(){ 
				  $('#contactForm #noSuccess').fadeIn();
			  });
 			 }
		}
		return false;
	});
	//MUSIC 
	////hover fade
	$('#music #originals span, #music #remixes span, #music #originals p').hide();
	$('#music #originals, #music #remixes').hover(function(){
		$(this).find('span').stop(true,true).fadeIn(300);
		$(this).find('span.coming_soon').stop(true,true).slideDown(300);
	},function(){
		$(this).find('span').stop(true,true).fadeOut(300);
		$(this).find('span.coming_soon').stop(true,true).slideUp(300);
	});
	$('#remixContainer ul li, #download, #back').hide();
	//section navigation
	////to remixes
	$('#music #remixes').click(function(){
		$('#music #originals, #music #remixes').stop().fadeOut(500,function(){
			$('#musicBGPre').fadeOut(1000);
			$('#remixContainer ul li').each(function(i){
				$(this).delay( i * 150 ).fadeIn(700);
			});
			$('#download').slideDown(1400);
			$('#back').fadeIn();
		});
	});
	////back to main selection
	$('#music #back').click(function(){
		$('#remixContainer ul li').stop(true,true).fadeOut(700);
		$('#back').fadeOut(700);
		$('#download').slideUp(700,function(){
			$('#musicBGPre').fadeIn(700);
			$('#music #originals, #music #remixes').fadeIn(500)
		});
	});
	////show the song title on hover
	$('#music #remixContainer ul li span').hide();
	$('#remixContainer ul li a').hover(function(){
		$(this).parent().find('span').stop(true,true).slideDown(250);
	},function(){
		$(this).parent().find('span').stop(true,true).slideUp(250);
	});
	////horizontal scrolling music
	var div = $("#remixContainer");
	var ul = $('#remixContainer ul');
	var ulPadding = 55;
	var divWidth = div.width();
	var lastLi = ul.find('li:last-child');
	$('#remixContainer').mousemove(function(e){
     	var ulWidth = lastLi[0].offsetLeft + lastLi.outerWidth() + ulPadding;
        var left = (e.pageX - div.offset().left) * (ulWidth-divWidth) / divWidth;
      	div.scrollLeft(left);
	});
	//count update
	////on load get the count
	/*$.ajax({
		type : 'post',
		url : 'http://philmartinezdesign.com/home/count',
		success : function(data) {
			$('#count').html(data);
		}	
	});*/
	////stop the download button from being clicked
	$('#downloadBtn a').click(function(){	
		return false;
	});
	////on click update and redisplay thhe count
	$('#download ul li ul li a').click(function(){
		var href = $(this).parent().parent().parent().find('#downloadBtn a').attr('href');
		var songDownload = $(this).attr('href');
		$.ajax({
			type : 'post',
			url : href,
			success : function(data) {
				$('#count').html(data);
				window.location = songDownload;
			}
		});
		return false;
	});
	////download menu 
	$('#music #download ul li').hover(function(){
		$(this).find('#selection').stop(true,true).slideDown(400);
	},function(){
		$(this).find('#selection').stop(true,true).slideUp(400);
	});
});
