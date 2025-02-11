function timepicker(el, opt)
{
	if (!opt) opt = {};
	opt = Object.assign({},
	{
		twentyFourHours: true,
		nullSelection: true,
	}, opt);
	var selector;
	var self = el;
	var hours = 24;
	var initialHour = 0;
	if (!opt.twentyFourHours)
	{
		hours = 13;
		initialHour = 1;
	}
	init_timepicker.call(this);
	return this;

	function init_timepicker()
	{
		self.setAttribute('type', 'hidden');
		self.addEventListener('change', function ()
		{
			getTime();
		});
		selector = createDom();
		getTime();
		[].forEach.call(selector.querySelectorAll('.timepicker-hour'), function(hour)
		{
			hour.addEventListener('click', function (e)
			{
				if (this.getAttribute('param-value') !== '' && selector.querySelector('.timepicker-minute.selected').getAttribute('param-value') == '')
				{
					setTime(this.getAttribute('param-value'), '00');
				}
				else if (this.getAttribute('param-value') === '')
				{
					selector.querySelector('.timepicker-minute').value = null;
					setTime(null);
				}
				else
				{
					setTime(this.getAttribute('param-value'), selector.querySelector('.timepicker-minute.selected').getAttribute('param-value'));
				}
			});
		});
		[].forEach.call(selector.querySelectorAll('.timepicker-minute'), function(minute)
		{
			minute.addEventListener('click', function (e)
			{
				if (this.getAttribute('param-value') !== '' && selector.querySelector('.timepicker-hour.selected').getAttribute('param-value') == '')
				{
					selector.querySelector('.timepicker-hour').value = '00';
					setTime('00', this.getAttribute('param-value'));
				}
				else if (this.getAttribute('param-value') === '' && selector.querySelector('.timepicker-hour.selected') !== null)
				{
					selector.querySelector('.timepicker-hour').value = null;
					setTime(null);
				}
				else
				{
					setTime(selector.closest('.timepicker').querySelector('.timepicker-hour.selected').getAttribute('param-value'), this.getAttribute('param-value'));
				}
				setTimeout(function ()
				{
					selector.querySelector('.timepicker-selectors').classList.add('hidden');
					selector.querySelector('.timepicker-selectors').classList.remove('grid');
				}, 200);
			});
		});
		selector.addEventListener('click', function ()
		{
			var value = self.value;
			if (value !== '' && value !== undefined)
			{
				var data = value.split(':');
				var h = data[0];
				var m = data[1];
				setSelections(h, m);
			}
			else if (opt.nullSelection)
			{
				setSelections('', '');
			}
			else
			{
				setSelections('00', '00');
			}
			selector.querySelector('.timepicker-selectors').classList.remove('hidden');
			selector.querySelector('.timepicker-selectors').classList.add('grid');
		});
		document.addEventListener('click', function (e)
		{
			if (!e.target.closest('.timepicker-container'))
			{
				selector.querySelector('.timepicker-selectors').classList.add('hidden');
				cleanSelections();
			}
		});
		self.parentNode.insertBefore(selector, self.nextSibling);
		self.querySelector('.reset-picker').addEventListener('click', function ()
		{
			setTime(null);
		});
	}

	function createDom()
	{
		var html = '';
		html += '<div class="w-full timepicker-container">';
		html += '<div class="timepicker-container single">';
		html += '<div class="timepicker-selectors grid-cols-2 hidden">';
		html += '<div class="tp-h-selector col-span-1 overflow-auto pl-1.5">';
		if(opt.nullSelection)
		{
			html += '<div class="timepicker-hour select-none cursor-pointer selected" param-value="">__</div>';
		}
		for (var i = initialHour; i < hours; i++)
		{
			html += '<div class="timepicker-hour select-none cursor-pointer" param-value="' + (i < 10 ? '0' + i : i) + '">' + (i < 10 ? '0' + i : i) + '</div>';
		}
		html += '</div>';
		html += '<div class="tp-m-selector col-span-1 overflow-auto pl-1.5">';
		if(opt.nullSelection)
		{
			html += '<div class="timepicker-minute select-none cursor-pointer selected" param-value="">__</div>';
		}
		for (var i = 0; i < 60; i++)
		{
			html += '<div class="timepicker-minute select-none cursor-pointer" param-value="' + (i < 10 ? '0' + i : i) + '">' + (i < 10 ? '0' + i : i) + '</div>';
		}
		html += '</div>';
		html += '</div>';
		html += '<div class="timepickerInput-container">';
		html += '<input class="tp-h-input" readonly type="text" placeholder="__">';
		html += '<span class="text-xl mx-2">:</span>';
		html += '<input class="tp-m-input" readonly type="text" placeholder="__">';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		return createElementFromHTML(html);
	}

	function createElementFromHTML(htmlString)
	{
		var div = document.createElement('div');
		div.innerHTML = htmlString.trim();
		return div.firstChild;
	}

	function getTime()
	{
		var value = self.value;
		if (value !== '' && value !== undefined)
		{
			var data = value.split(':');
			var h = data[0];
			var m = data[1];
			selector.querySelector('.tp-h-input').value = h;
			selector.querySelector('.tp-m-input').value = m;
		}
		else
		{
			if (!opt.nullSelection)
			{
				selector.querySelector('.tp-h-input').value = '00';
				selector.querySelector('.tp-m-input').value = '00';
			}
			else
			{
				selector.querySelector('.tp-h-input').value = '';
				selector.querySelector('.tp-m-input').value = '';
			}
		}
	}

	function setTime(hour, minute = null)
	{
		cleanSelections();
		if (hour !== null && minute !== null)
		{
			self.value = hour + ':' + minute;
			selector.querySelector('.tp-h-input').value = hour;
			selector.querySelector('.tp-m-input').value = minute;
			setSelections(hour, minute);
		}
		else
		{
			self.value = null;
			selector.querySelector('.tp-h-input').value = '';
			selector.querySelector('.tp-m-input').value = '';
		}
		self.dispatchEvent(new Event('change'));
	}

	function setSelections(hour, minute)
	{
		selector.querySelector('.timepicker-hour[param-value="' + hour + '"]').classList.add('selected');
		selector.querySelector('.timepicker-minute[param-value="' + minute + '"]').classList.add('selected');
	}

	function cleanSelections()
	{
		if(selector.querySelectorAll('.timepicker-hour.selected').length > 0)
		{
			[].forEach.call(selector.querySelectorAll('.timepicker-hour.selected'), function(hour)
			{
				hour.classList.remove('selected');
			});
		}
		if(selector.querySelectorAll('.timepicker-minute.selected').length > 0)
		{
			[].forEach.call(selector.querySelectorAll('.timepicker-minute.selected'), function(minute)
			{
				minute.classList.remove('selected');
			});
		}
	}
}
window.timepicker = timepicker;
