$(() => {
	const addSpanCollapseIcon = (targetPar, childElem) => {
		var targetParent = $(targetPar),
			childElement = childElem;
		var headerSpanIconElement = '<span class="drop-down"> </span>';
		targetParent.each(function () {
			var _this = $(this);
			if (_this.find(childElement).length) {
				_this.append(headerSpanIconElement);
			}
		});
	};
	addSpanCollapseIcon('.header--nav li', 'ul');

	const clickToggle = (ClickEle, targetElem, tarEleType, addingClass, toggleActive, toggleDura) => {
		var clickElement = $(ClickEle),
			targetElement = targetElem,
			elementType = tarEleType,
			activeClass = addingClass,
			toggleDuration = toggleDura;
		clickElement.click(function () {
			var _this = $(this);
			if (elementType == 'previous') {
				_this.prev(targetElement).slideToggle(toggleDuration);
			} else if (elementType == 'next') {
				_this.next(targetElement).slideToggle(toggleDuration);
			} else {
				$(targetElement).slideToggle(toggleDuration);
				$(targetElement).toggleClass(activeClass);
			}
			_this.toggleClass(activeClass);
			_this.parent().toggleClass(toggleActive);
		});
	};
	clickToggle('.header--nav span.drop-down', 'ul', 'previous', 'active', 'toggle-active', 400);

	/*** Side bar category navigation  ***/
	clickToggle('.active-mobile .widgettitle', 'ul', 'next', 'active', 'toggle-active', 400); 

	var headerHamburger = $('.header--hamburger'); 

	headerHamburger.click(function () {
		var _this = $(this);
		$('body').toggleClass('menu-active');
		_this.toggleClass('active');
	});

	$('.icon').click(function () {
		$(this).parent().toggleClass('active');
		var code = $('.search');
		code.toggleClass('active');
		if (code.hasClass('active')) {
			code.focus();
		} else {
			code.blur().val('');
		}
	});

	const scrollTop = () => {
		var mainHeader = $('.header'),
			scroll = $(window).scrollTop(),
			body = $('body').offset().top;
		if (scroll >= 79 || body >= 79) {			
			mainHeader.addClass('header--fixed');
		}
		else {
			mainHeader.removeClass('header--fixed');
		}
	};
	window.onload = scrollTop;
	window.onscroll = scrollTop;
});
