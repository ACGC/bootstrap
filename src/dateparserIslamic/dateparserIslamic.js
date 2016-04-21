angular.module('ui.bootstrap.dateparserIslamic', ['ui.bootstrap.islamicDate'])

.service('uibDateParserIslamic', ['$log', '$locale', 'dateFilter', 'orderByFilter', 'islamicDateObject', function($log, $locale, dateFilter, orderByFilter, islamicDateObject) {
  // Pulled from https://github.com/mbostock/d3/blob/master/src/format/requote.js
  var SPECIAL_CHARACTERS_REGEXP = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

  var MONTH_ISLAMIC_FULL_EN = [ "Muharram", "Safar", "Rabi' I", "Rabi' II", "Jumada I","Jumada II",
                                "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu'l-Qi'dah", "Dhu'l-Hijjah" ];
  var MONTH_ISLAMIC_SHORT_EN = [ "Muh", "Saf", "Rab I", "Rab II", "Jum I","Jum II",
                                 "Raj", "Sha", "Ram", "Shaw", "Dhu'l-Q", "Dhu'l-H" ] ;
  var MONTH_ISLAMIC_FULL_AR = [ "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب",
                                "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة" ];
  var ERAS_EN = ['BH', 'AH'];
  var ERAS_AR = ['ق.هـ', 'هـ'];
  var ERANAMES_EN = ['Before Hegirae', 'Anno Hegirae'];
  var ERANAMES_AR = ['قبل الهجرة', 'هجري'];

  var localeId;
  var formatCodeToRegex;

  //https://github.com/angular/angular.js/blob/v1.5.x/src/ng/filter/filters.js#L420
  function weekGetter( date, size ) {
  	var _date = new islamicDateObject( date.getFullYear(), 0, 1 );
  	var dayOfWeekOnFirst = _date.getDay();
  	_date.setDate( ( dayOfWeekOnFirst <= 4 ? 5 : 12 ) - dayOfWeekOnFirst );
  	var firstThurs = _date.valueOf();
  	_date = new islamicDateObject( date.getFullYear(), date.getMonth(), date.getDate() + ( 4 - date.getDay() ) );
      var thisThurs = _date.valueOf();

  	var diff = +thisThurs - +firstThurs,
           result = 1 + Math.round( diff / 6.048e8 ); // 6.048e8 ms per week

  	if ( size === 2 && result < 10 ) {
  		result = '0' + result;
  	}
      return result;
  }

  this.init = function() {
    localeId = $locale.id;

    if ( localeId.indexOf( 'en' ) === 0 ) {
	  	$locale.DATETIME_FORMATS.MONTH = MONTH_ISLAMIC_FULL_EN;
	   	$locale.DATETIME_FORMATS.STANDALONEMONTH = MONTH_ISLAMIC_FULL_EN;
	   	$locale.DATETIME_FORMATS.SHORTMONTH = MONTH_ISLAMIC_SHORT_EN;
	   	$locale.DATETIME_FORMATS.ERAS = ERAS_EN;
	   	$locale.DATETIME_FORMATS.ERANAMES = ERANAMES_EN;
	} else if ( localeId.indexOf( 'ar' ) === 0 ) {
	   	$locale.DATETIME_FORMATS.MONTH = MONTH_ISLAMIC_FULL_AR;
	   	$locale.DATETIME_FORMATS.STANDALONEMONTH = MONTH_ISLAMIC_FULL_AR;
	   	$locale.DATETIME_FORMATS.SHORTMONTH = MONTH_ISLAMIC_FULL_AR;
	   	$locale.DATETIME_FORMATS.ERAS = ERAS_AR;
	   	$locale.DATETIME_FORMATS.ERANAMES = ERANAMES_AR;
	}
    this.parsers = {};
    this.formatters = {};

    formatCodeToRegex = [
      {
        key: 'yyyy',
        regex: '\\d{4}',
        apply: function(value) { this.year = +value; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'yyyy');
        }
      },
      {
        key: 'yy',
        regex: '\\d{2}',
        apply: function(value) { value = +value; this.year = value + 1400; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'yy');
        }
      },
      {
        key: 'y',
        regex: '\\d{1,4}',
        apply: function(value) { this.year = +value; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'y');
        }
      },
      {
        key: 'M!',
        regex: '0?[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) {
          var value = date.getMonth();
          var _date = new Date();
          _date.setMonth(value);
          if (/^[0-9]$/.test(value)) {
            return dateFilter(_date, 'MM');
          }

          return dateFilter(_date, 'M');
        }
      },
      {
        key: 'MMMM',
        regex: $locale.DATETIME_FORMATS.MONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value); },
        formatter: function(date) { return $locale.DATETIME_FORMATS.MONTH[ date.getMonth() ]; }
      },
      {
        key: 'MMM',
        regex: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value); },
        formatter: function(date) { return $locale.DATETIME_FORMATS.SHORTMONTH[ date.getMonth() ]; }
      },
      {
        key: 'MM',
        regex: '0[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) {
        	var _date = new Date();
        	_date.setMonth(date.getMonth());
        	return dateFilter(_date, 'MM'); }
      },
      {
        key: 'M',
        regex: '[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) {
        	var _date = new Date();
        	_date.setMonth(date.getMonth());
        	return dateFilter(_date, 'M');
        }
      },
      {
        key: 'd!',
        regex: '[0-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) {
          var value = date.getDate();
          var _date = new Date();
          _date.setDate(value);
          if (/^[1-9]$/.test(value)) {
            return dateFilter(_date, 'dd');
          }

          return dateFilter(_date, 'd');
        }
      },
      {
        key: 'dd',
        regex: '[0-2][0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) {
        	var _date = new Date();
        	_date.setDate(date.getDate());
        	return dateFilter(_date, 'dd');
        }
      },
      {
        key: 'd',
        regex: '[1-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) {
        	var _date = new Date();
        	_date.setDate(date.getDate());
        	return dateFilter(_date, 'd');
        }
      },
      {
        key: 'EEEE',
        regex: $locale.DATETIME_FORMATS.DAY.join('|'),
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'EEEE');
        }
      },
      {
        key: 'EEE',
        regex: $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'EEE');
        }
      },
      {
        key: 'HH',
        regex: '(?:0|1)[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'HH');
        }
      },
      {
        key: 'hh',
        regex: '0[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'hh');
        }
      },
      {
        key: 'H',
        regex: '1?[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'H');
        }
      },
      {
        key: 'h',
        regex: '[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'h');
        }
      },
      {
        key: 'mm',
        regex: '[0-5][0-9]',
        apply: function(value) { this.minutes = +value; },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'mm');
        }
      },
      {
        key: 'm',
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.minutes = +value; },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'm');
        }
      },
      {
        key: 'sss',
        regex: '[0-9][0-9][0-9]',
        apply: function(value) { this.milliseconds = +value; },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'sss');
        }
      },
      {
        key: 'ss',
        regex: '[0-5][0-9]',
        apply: function(value) { this.seconds = +value; },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'ss');
        }
      },
      {
        key: 's',
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.seconds = +value; },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 's');
        }
      },
      {
        key: 'a',
        regex: $locale.DATETIME_FORMATS.AMPMS.join('|'),
        apply: function(value) {
          if (this.hours === 12) {
            this.hours = 0;
          }

          if (value === 'PM') {
            this.hours += 12;
          }
        },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'a');
        }
      },
      {
        key: 'Z',
        regex: '[+-]\\d{4}',
        apply: function(value) {
          var matches = value.match(/([+-])(\d{2})(\d{2})/),
            sign = matches[1],
            hours = matches[2],
            minutes = matches[3];
          this.hours += toInt(sign + hours);
          this.minutes += toInt(sign + minutes);
        },
        formatter: function(date) {
        	var _date = new Date(date.valueOf());
        	return dateFilter(_date, 'Z');
        }
      },
      {
        key: 'ww',
        regex: '[0-4][0-9]|5[0-2]',
        formatter: function(date) { return weekGetter( date, 2); }
      },
      {
        key: 'w',
        regex: '[0-9]|[1-4][0-9]|5[0-2]',
        formatter: function(date) { return weekGetter( date, 1); }
      },
      {
        key: 'GGGG',
        regex: $locale.DATETIME_FORMATS.ERANAMES.join('|').replace(/\s/g, '\\s'),
        formatter: function(date) { return $locale.DATETIME_FORMATS.ERANAMES[date.getFullYear() > 0 ? 1 : 0]; }
      },
      {
        key: 'GGG',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return $locale.DATETIME_FORMATS.ERAS[date.getFullYear() > 0 ? 1 : 0]; }
      },
      {
        key: 'GG',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return $locale.DATETIME_FORMATS.ERAS[date.getFullYear() > 0 ? 1 : 0]; }
      },
      {
        key: 'G',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return $locale.DATETIME_FORMATS.ERAS[date.getFullYear() > 0 ? 1 : 0]; }
      }
    ];
  };

  this.init();

  function createParser(format, func) {
    var map = [], regex = format.split('');

    // check for literal values
    var quoteIndex = format.indexOf('\'');
    if (quoteIndex > -1) {
      var inLiteral = false;
      format = format.split('');
      for (var i = quoteIndex; i < format.length; i++) {
        if (inLiteral) {
          if (format[i] === '\'') {
            if (i + 1 < format.length && format[i+1] === '\'') { // escaped single quote
              format[i+1] = '$';
              regex[i+1] = '';
            } else { // end of literal
              regex[i] = '';
              inLiteral = false;
            }
          }
          format[i] = '$';
        } else {
          if (format[i] === '\'') { // start of literal
            format[i] = '$';
            regex[i] = '';
            inLiteral = true;
          }
        }
      }

      format = format.join('');
    }

    angular.forEach(formatCodeToRegex, function(data) {
      var index = format.indexOf(data.key);

      if (index > -1) {
        format = format.split('');

        regex[index] = '(' + data.regex + ')';
        format[index] = '$'; // Custom symbol to define consumed part of format
        for (var i = index + 1, n = index + data.key.length; i < n; i++) {
          regex[i] = '';
          format[i] = '$';
        }
        format = format.join('');

        map.push({
          index: index,
          key: data.key,
          apply: data[func],
          matcher: data.regex
        });
      }
    });

    return {
      regex: new RegExp('^' + regex.join('') + '$'),
      map: orderByFilter(map, 'index')
    };
  }

  this.filter = function(date, format) {
    if (!angular.isDate(date.getFake && date.getFake()) || isNaN(date) || !format) {
      return '';
    }

    format = $locale.DATETIME_FORMATS[format] || format;

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.formatters[format]) {
      this.formatters[format] = createParser(format, 'formatter');
    }

    var parser = this.formatters[format],
      map = parser.map;

    var _format = format;

    return map.reduce(function(str, mapper, i) {
      var match = _format.match(new RegExp('(.*)' + mapper.key));
      if (match && angular.isString(match[1])) {
        str += match[1];
        _format = _format.replace(match[1] + mapper.key, '');
      }

      var endStr = i === map.length - 1 ? _format : '';

      if (mapper.apply) {
        return str + mapper.apply.call(null, date) + endStr;
      }

      return str + endStr;
    }, '');
  };

  this.parse = function(input, format, baseDate) {
    if (!angular.isString(input) || !format) {
      return input;
    }

    format = $locale.DATETIME_FORMATS[format] || format;
    format = format.replace(SPECIAL_CHARACTERS_REGEXP, '\\$&');

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.parsers[format]) {
      this.parsers[format] = createParser(format, 'apply');
    }

    var parser = this.parsers[format],
        regex = parser.regex,
        map = parser.map,
        results = input.match(regex),
        tzOffset = false;
    if (results && results.length) {
      var fields, dt;
      if (baseDate && angular.isDate(baseDate.getFake && baseDate.getFake()) && !isNaN(baseDate.getTime())) {
        fields = {
          year: baseDate.getFullYear(),
          month: baseDate.getMonth(),
          date: baseDate.getDate(),
          hours: baseDate.getHours(),
          minutes: baseDate.getMinutes(),
          seconds: baseDate.getSeconds(),
          milliseconds: baseDate.getMilliseconds()
        };
      } else {
        if (baseDate) {
          $log.warn('dateparser:', 'baseDate is not a valid date');
        }
        fields = { year: 1400, month: 0, date: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
      }

      for (var i = 1, n = results.length; i < n; i++) {
        var mapper = map[i - 1];
        if (mapper.matcher === 'Z') {
          tzOffset = true;
        }

        if (mapper.apply) {
          mapper.apply.call(fields, results[i]);
        }
      }
      dt = new islamicDateObject();
      dt.setFullYear( fields.year, fields.month, fields.date );
      dt.setHours( fields.hours, fields.minutes, fields.seconds, fields.milliseconds);

//      var datesetter = tzOffset ? Date.prototype.setUTCFullYear :
//        Date.prototype.setFullYear;
//      var timesetter = tzOffset ? Date.prototype.setUTCHours :
//        Date.prototype.setHours;
//
//      if (angular.isDate(baseDate) && !isNaN(baseDate.getTime()) && !tzOffset) {
//          dt = new Date(baseDate);
//          datesetter.call(dt, fields.year, fields.month, fields.date);
//          timesetter.call(dt, fields.hours, fields.minutes,
//          fields.seconds, fields.milliseconds);
//      } else {
//          dt = new Date(0);
//          datesetter.call(dt, fields.year, fields.month, fields.date);
//          timesetter.call(dt, fields.hours || 0, fields.minutes || 0,
//          ields.seconds || 0, fields.milliseconds || 0);
//      }

      return dt;
    }
  };

  function toInt(str) {
    return parseInt(str, 10);
  }

  this.toTimezone = toTimezone;
  this.fromTimezone = fromTimezone;
  this.timezoneToOffset = timezoneToOffset;
  this.addDateMinutes = addDateMinutes;
  this.convertTimezoneToLocal = convertTimezoneToLocal;

  function toTimezone(date, timezone) {
    return date && timezone ? convertTimezoneToLocal(date, timezone) : date;
  }

  function fromTimezone(date, timezone) {
    return date && timezone ? convertTimezoneToLocal(date, timezone, true) : date;
  }

  //https://github.com/angular/angular.js/blob/4daafd3dbe6a80d578f5a31df1bb99c77559543e/src/Angular.js#L1207
  function timezoneToOffset(timezone, fallback) {
    var requestedTimezoneOffset = Date.parse('Jan 01, 1970 00:00:00 ' + timezone) / 60000;
    return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
  }

  function addDateMinutes(date, minutes) {
    date = new islamicDateObject(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  function convertTimezoneToLocal(date, timezone, reverse) {
    reverse = reverse ? -1 : 1;
    var timezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
    return addDateMinutes(date, reverse * (timezoneOffset - date.getTimezoneOffset()));
  }
}]);
