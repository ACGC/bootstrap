'use strict';

angular.module( 'ui.bootstrap.islamicDate', [] ).service( 'islamicDateObject', function() {

	var _GREGORIAN_EPOCH = 1721425.5;
	var _ISLAMIC_EPOCH = 1948439.5;

	var _isCivilLeapYear = function( year ) {
		return ( 14 + 11 * year ) % 30 < 11;
	};

	var _yearStart = function( year ) {
		return ( year - 1 ) * 354 + Math.floor( ( 3 + 11 * year ) / 30.0 );
	};

	var _monthStart = function( year, month ) {
		return Math.ceil( 29.5 * month ) + ( year - 1 ) * 354 + Math.floor( ( 3 + 11 * year ) / 30.0 );
	};

	var _isGregorianLeapYear = function( dateObject ) {
		var year = dateObject.getFullYear();
		return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	};

	var _mod = function( a, b ) {
		return a - b * Math.floor( a / b );
	};

	var _getDaysInIslamicMonth = function ( month, year ) {
		var length = 0;
		year = year + Math.floor( month / 12 );
		month = ( month + 12 ) % 12;
		length = 29 + ( month + 1 ) % 2;
		if ( month === 11 && _isCivilLeapYear( year ) ) {
			length++;
		}
		return length;
	};

	/*
	 * Hijri date params: yyyy, MM, D, HH, mm, ss, sss
	 * or 
	 * Gregorian date object/timestamp: new Date()  
	 */
	function IslamicDateObject() {
		var _date = 0;
		var _month = 0;
		var _year = 0;
		var _hours = 0;
		var _minutes = 0;
		var _seconds = 0;
		var _milliseconds = 0;
		var _day = 0;

		function _toGregorian() {
			var hYear = _year;
			var hMonth = _month;
			var hDate = _date;
			var julianDay = hDate + Math.ceil( 29.5 * hMonth ) + ( hYear - 1 ) * 354
							+ Math.floor( ( 3 + 11 * hYear ) / 30 ) + _ISLAMIC_EPOCH - 1;

			var wjd = Math.floor( julianDay - 0.5 ) + 0.5,
				depoch = wjd - _GREGORIAN_EPOCH,
				quadricent = Math.floor( depoch / 146097 ),
				dqc = _mod( depoch, 146097 ),
				cent = Math.floor( dqc / 36524 ),
				dcent = _mod( dqc, 36524 ),
				quad = Math.floor( dcent / 1461 ),
				dquad = _mod( dcent, 1461 ),
				yindex = Math.floor( dquad / 365 ),
				year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
			if ( !( cent === 4 || yindex === 4 ) ) {
				year++;
			}

			var gYearStart = _GREGORIAN_EPOCH + 365 * ( year - 1 ) + Math.floor( ( year - 1 ) / 4 )
							- Math.floor( ( year - 1 ) / 100 ) + Math.floor( ( year - 1 ) / 400 );

			var yearday = wjd - gYearStart;

			var tjd = _GREGORIAN_EPOCH - 1 + 365 * ( year - 1 ) + Math.floor( ( year - 1 ) / 4 )
					- Math.floor( ( year - 1 ) / 100 ) + Math.floor( ( year - 1 ) / 400 ) + Math.floor( 739 / 12
					+ ( _isGregorianLeapYear( new Date( year, 3, 1 ) ) ? -1 : -2 ) + 1 );
					
			var leapadj = wjd < tjd ? 0 : _isGregorianLeapYear( new Date( year, 3, 1 ) ) ? 1 : 2;

			var month = Math.floor( ( ( yearday + leapadj ) * 12 + 373 ) / 367 );
			var tjd2 = _GREGORIAN_EPOCH - 1 + 365 * ( year - 1 )
						+ Math.floor( ( year - 1 ) / 4 ) - Math.floor( ( year - 1 ) / 100 )
						+ Math.floor( ( year - 1 ) / 400 ) + Math.floor( ( 367 * month - 362 ) / 12
						+ ( month <= 2 ? 0 : _isGregorianLeapYear( new Date( year, month - 1, 1 ) ) ? -1 : -2 ) + 1 );

			var day = wjd - tjd2 + 1;

			var gdate = new Date( year, month - 1, day, _hours, _minutes, _seconds, _milliseconds );

			return gdate;
		}

		function _fromGregorian( gdate ) {
			var date = new Date( gdate );
			var gYear = date.getFullYear(),
				gMonth = date.getMonth(),
				gDay = date.getDate();

			var julianDay = _GREGORIAN_EPOCH - 1 + 365 * ( gYear - 1 ) + Math.floor( ( gYear - 1 ) / 4 )
						+ -Math.floor( ( gYear - 1 ) / 100 ) + Math.floor( ( gYear - 1 ) / 400)
						+ Math.floor( ( 367 * ( gMonth + 1 ) - 362 ) / 12
						+ ( gMonth + 1 <= 2 ? 0 : _isGregorianLeapYear( date ) ? -1 : -2 ) + gDay );
			julianDay = Math.floor( julianDay ) + 0.5;

			var days = julianDay - _ISLAMIC_EPOCH;
			var hYear = Math.floor( ( 30 * days + 10646 ) / 10631.0 );
			var hMonth = Math.ceil( ( days - 29 - _yearStart( hYear ) ) / 29.5 );
			hMonth = Math.min( hMonth, 11 );
			var hDay = Math.ceil( days - _monthStart( hYear, hMonth ) ) + 1;

			_date = hDay;
			_month = hMonth;
			_year = hYear;
			_hours = date.getHours();
			_minutes = date.getMinutes();
			_seconds = date.getSeconds();
			_milliseconds = date.getMilliseconds();
			_day = date.getDay();
		}
		
		this.getDate = function() {
			return _date;
		};

		this.getDay = function() {
			return _toGregorian().getDay();
		};

		this.getFullYear = function() {
			return _year;
		};

		this.getHours = function() {
			return _hours;
		};

		this.getMilliseconds = function() {
			return _milliseconds;
		};

		this.getMinutes = function() {
			return _minutes;
		};

		this.getMonth = function() {
			return _month;
		};

		this.getSeconds = function() {
			return _seconds;
		};

		this.getTime = function() {
			return _toGregorian().getTime();
		};

		this.getTimezoneOffset = function() {
			return _toGregorian().getTimezoneOffset();
		};

		this.setDate = function( dayValue ) {
			dayValue = +dayValue;
			var mdays = _getDaysInIslamicMonth(_month, _year );
			if (dayValue <= 0) {
				while ( dayValue <= 0 ) {
					this.setMonth( _month - 1 );
					mdays = _getDaysInIslamicMonth( _month, _year );
					dayValue += mdays;
				}
			} else if (dayValue > mdays) {
				while ( dayValue > mdays ) {
					dayValue -= mdays;
					this.setMonth( _month + 1 );
					mdays = _getDaysInIslamicMonth( _month, _year );
				}
			}
			_date = dayValue;
			return this;
		};

		this.setFullYear = function( yearValue, monthValue, dayValue ) {
			_year = +yearValue;
			if ( !isNaN(+monthValue) ) {
				this.setMonth( monthValue, dayValue );
			}
			return this;
		};

		this.setHours = function( hoursValue, minutesValue, secondsValue, msValue ) {
			hoursValue = +hoursValue;
			if ( hoursValue >= 24 ) {
				while ( hoursValue >= 24 ) {
					hoursValue -= 24;
					this.setDate( _date + 1 );
				} 
			} else if ( hoursValue < 0 ) {
				while ( hoursValue < 0 ) {
					hoursValue += 24;
					this.setDate( _date - 1 );
				}
			}
			_hours = hoursValue;
			if ( !isNaN( +minutesValue ) ) {
				this.setMinutes( minutesValue, secondsValue, msValue );
			}
			return this;
		};

		this.setMilliseconds = function( millisecondsValue ) {
			millisecondsValue = +millisecondsValue;
			if ( millisecondsValue >= 1000 ) {
				while ( millisecondsValue >= 1000 ) {
					millisecondsValue -= 1000;
					this.setSeconds( _seconds + 1 );
				} 
			} else if ( millisecondsValue < 0 ) {
				while ( millisecondsValue < 0 ) {
					millisecondsValue += 1000;
					this.setSeconds( _seconds - 1 );
				}
			}
			_milliseconds = millisecondsValue;
			return this;
		};

		this.setMinutes = function( minutesValue, secondsValue, msValue ) {
			minutesValue = +minutesValue;
			if ( minutesValue >= 60 ) {
				while ( minutesValue >= 60 ) {
					minutesValue -= 60;
					this.setHours( _hours + 1 );
				} 
			} else if ( minutesValue < 0 ) {
				while ( minutesValue < 0 ) {
					minutesValue += 60;
					this.setHours( _hours - 1 );
				}
			}
			_minutes = minutesValue;
			if ( !isNaN( +secondsValue ) ) {
				this.setSeconds( secondsValue, msValue );
			}
			return this;
		};

		this.setMonth = function( month, dayValue ) {
			month = +month;
			_year = _year + Math.floor( month / 12 );
			_month = Math.floor( ( month % 12 + 12 ) % 12 );
			if ( !isNaN( +dayValue ) ) {
				this.setDate( dayValue );
			}
			return this;
		};

		this.setSeconds = function( secondsValue, msValue ) {
			secondsValue = +secondsValue;
			if ( secondsValue >= 60 ) {
				while ( secondsValue >= 60 ) {
					secondsValue -= 60;
					this.setMinutes( _minutes + 1 );
				} 
			} else if ( secondsValue < 0 ) {
				while ( secondsValue < 0 ) {
					secondsValue += 60;
					this.setMinutes( _minutes - 1 );
				}
			}
			_seconds = secondsValue;
			if ( !isNaN( +msValue ) ) {
				this.setMilliseconds( msValue );
			}
			return this;
		};

		this.setTime = function( timeValue ) {
			var gDate = new Date( timeValue );
			_fromGregorian( gDate );
			return this;
		};

		this.toDateString = function() {
			return _month + " " + _date + " " + _year;
		};

		this.toJSON = function() {
			return this.toString();
		};

		this.toString = function() {
			//return formatter["EEE MMM d yyyy HH:mm:ss Z"];
			if ( isNaN( _date ) || isNaN( _month ) || isNaN( _year ) ) {
				return "Invalidate Date";
			}

			var x = new Date();
			x.setHours( _hours, _minutes, _seconds, _milliseconds );
			var timezone = x.toTimeString();
			timezone = timezone.substring(timezone.indexOf(' '));
			return _month + "-" + _date + "-" + _year + " " + _hours + ":" + _minutes + ":" + _seconds + ":" + _milliseconds + " " + timezone;
		};

		this.toTimeString = function() {
			var x = new Date();
			x.setHours( _hours, _minutes, _seconds, _milliseconds );
			return x.toTimeString();
		};

		this.valueOf = function() {
			return _toGregorian().valueOf();
		};

		this.getFake = function() {
			var date = new Date();
			date.setFullYear( _year , _month, _date );
			date.setHours( _hours, _minutes, _seconds, _milliseconds );
			return date;
		};
		
		// initialization
		if (arguments.length >= 3) {
			// YYYY MM DD arguments passed, month is from 0-11
			this.setFullYear( +arguments[0], +arguments[1], +arguments[2] );
			this.setHours( +arguments[3] || 0, +arguments[4] || 0, +arguments[5] || 0, +arguments[6] || 0 );
		} else {
			var arg0 = arguments[0] || new Date();
			_fromGregorian( new Date( arg0 ) );
		}
	}

	return IslamicDateObject;
});