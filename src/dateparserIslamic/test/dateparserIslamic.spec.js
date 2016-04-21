describe('date parser Islamic', function() {
  var dateParser, islamicDate, oldDate;

  beforeEach(module('ui.bootstrap.dateparserIslamic', 'ui.bootstrap.islamicDate'));
  beforeEach(inject(function (uibDateParserIslamic, islamicDateObject) {
    dateParser = uibDateParserIslamic;
    islamicDate = islamicDateObject;
    oldDate = new islamicDate(1, 2, 6);
    oldDate.setFullYear(1);
  }));
  beforeEach(function(){
	jasmine.addMatchers({
		toEqualIslamicDate: function(){
			return {
				compare: function(actual, expected) {
					var result = {};
					if(expected === undefined){
						result.pass = actual === undefined;
						return result;
			    	}
					result.pass = expected.toString() === actual.toString();
					return result;
				}
			};
		}
	});
  });

  function expectFilter(date, format, display) {
    expect(dateParser.filter(date, format)).toEqual(display);
  }

  function expectParse(input, format, date) {
	expect(dateParser.parse(input, format)).toEqualIslamicDate(date);
  }

  function expectBaseParse(input, format, baseDate, date) {
    expect(dateParser.parse(input, format, baseDate)).toEqualIslamicDate(date);
  }

  describe('filter', function() {
    it('should work correctly for `dd`, `MM`, `yyyy`', function() {
      expectFilter(new islamicDate(1434, 10, 17, 0), 'dd.MM.yyyy', '17.11.1434');
      expectFilter(new islamicDate(1435, 11, 29, 0), 'dd.MM.yyyy', '29.12.1435');
      expectFilter(new islamicDate(1412, 2, 8, 0), 'dd-MM-yyyy', '08-03-1412');
      expectFilter(new islamicDate(1401, 2, 5, 0), 'MM/dd/yyyy', '03/05/1401');
      expectFilter(new islamicDate(1404, 0, 10, 0), 'dd.MM/yyyy', '10.01/1404');
      expectFilter(new islamicDate(1400, 10, 9, 0), 'MM-dd-yyyy', '11-09-1400');
      expectFilter(new islamicDate(1431, 1, 5, 0), 'yyyy/MM/dd', '1431/02/05');
      expectFilter(oldDate, 'yyyy/MM/dd', '0001/03/06');
    });

    it('should work correctly for `yy`', function() {
      expectFilter(new islamicDate(1434, 10, 17, 0), 'dd.MM.yy', '17.11.34');
      expectFilter(new islamicDate(1431, 4, 2, 0), 'dd-MM-yy', '02-05-31');
      expectFilter(new islamicDate(1496, 1, 5, 0), 'MM/dd/yy', '02/05/96');
      expectFilter(new islamicDate(1465, 1, 5, 0), 'yy/MM/dd', '65/02/05');
      expectFilter(new islamicDate(1435, 7, 11, 0), 'dd-MM-yy', '11-08-35');
    });

    it('should work correctly for `y`', function() {
      expectFilter(new islamicDate(1434, 10, 17, 0), 'dd.MM.y', '17.11.1434');
      expectFilter(new islamicDate(1434, 11, 31, 0), 'dd.MM.y', '01.01.1435');
      expectFilter(new islamicDate(1411, 2, 8, 0), 'dd-MM-y', '08-03-1411');
      expectFilter(new islamicDate(1401, 2, 5, 0), 'MM/dd/y', '03/05/1401');
      expectFilter(new islamicDate(1403, 0, 10, 0), 'dd.MM/y', '10.01/1403');
      expectFilter(new islamicDate(1400, 10, 9, 0), 'MM-dd-y', '11-09-1400');
      expectFilter(new islamicDate(1428, 1, 5, 0), 'y/MM/dd', '1428/02/05');
    });

    it('should work correctly for `MMMM`', function() {
      expectFilter(new islamicDate(1434, 10, 17, 0), 'dd.MMMM.yy', "17.Dhu'l-Qi'dah.34");
      expectFilter(new islamicDate(1401, 2, 5, 0), 'dd-MMMM-yyyy', "05-Rabi' I-1401");
      expectFilter(new islamicDate(1401, 1, 5, 0), 'MMMM/dd/yyyy', 'Safar/05/1401');
      expectFilter(new islamicDate(1378, 11, 20, 0), 'yyyy/MMMM/dd', "1378/Dhu'l-Hijjah/20");
      expectFilter(oldDate, 'yyyy/MMMM/dd', "0001/Rabi' I/06");
    });

    it('should work correctly for `MMM`', function() {
      expectFilter(new islamicDate(1428, 8, 30, 0), 'dd.MMM.yy', '30.Ram.28');
      expectFilter(new islamicDate(1429, 4, 2, 0), 'dd-MMM-yy', '02-Jum I-29');
      expectFilter(new islamicDate(1402, 1, 5, 0), 'MMM/dd/yyyy', 'Saf/05/1402');
      expectFilter(new islamicDate(1382, 1, 5, 0), 'yyyy/MMM/dd', '1382/Saf/05');
      expectFilter(oldDate, 'yyyy/MMM/dd', '0001/Rab I/06');
    });

    it('should work correctly for `M`', function() {
      expectFilter(new islamicDate(1436, 7, 11, 0), 'M/dd/yyyy', '8/11/1436');
      expectFilter(new islamicDate(1423, 10, 7, 0), 'dd.M.yy', '07.11.23');
      expectFilter(new islamicDate(1433, 4, 2, 0), 'dd-M-yy', '02-5-33');
      expectFilter(new islamicDate(1384, 1, 5, 0), 'M/dd/yyyy', '2/05/1384');
      expectFilter(new islamicDate(1394, 1, 5, 0), 'yyyy/M/dd', '1394/2/05');
      expectFilter(new islamicDate(1415, 4, 2, 0), 'dd-M-yy', '02-5-15');
    });

    it('should work correctly for `M!`', function() {
      expectFilter(new islamicDate(1417, 7, 11, 0), 'M!/dd/yyyy', '08/11/1417');
      expectFilter(new islamicDate(1390, 10, 7, 0), 'dd.M!.yy', '07.11.90');
      expectFilter(new islamicDate(1430, 4, 2, 0), 'dd-M!-yy', '02-05-30');
      expectFilter(new islamicDate(1360, 1, 5, 0), 'M!/dd/yyyy', '02/05/1360');
      expectFilter(new islamicDate(1370, 1, 5, 0), 'yyyy/M!/dd', '1370/02/05');
      expectFilter(new islamicDate(1416, 4, 2, 0), 'dd-M!-yy', '02-05-16');
      expectFilter(oldDate, 'yyyy/M!/dd', '0001/03/06');
    });

    it('should work correctly for `d`', function() {
      expectFilter(new islamicDate(1435, 10, 17, 0), 'd.MMMM.yy', "17.Dhu'l-Qi'dah.35");
      expectFilter(new islamicDate(1415, 2, 8, 0), 'd-MMMM-yyyy', "8-Rabi' I-1415");
      expectFilter(new islamicDate(1366, 1, 5, 0), 'MMMM/d/yyyy', 'Safar/5/1366');
      expectFilter(new islamicDate(1373, 1, 5, 0), 'yyyy/MMMM/d', '1373/Safar/5');
      expectFilter(new islamicDate(1434, 7, 11, 0), 'd-MM-yy', '11-08-34');
      expectFilter(oldDate, 'yyyy/MM/d', '0001/03/6');
    });

    it('should work correctly for `d!`', function() {
      expectFilter(new islamicDate(1435, 10, 17, 0), 'd!.MMMM.yy', "17.Dhu'l-Qi'dah.35");
      expectFilter(new islamicDate(1415, 2, 8, 0), 'd!-MMMM-yyyy', "08-Rabi' I-1415");
      expectFilter(new islamicDate(1366, 1, 5, 0), 'MMMM/d!/yyyy', 'Safar/05/1366');
      expectFilter(new islamicDate(1373, 1, 5, 0), 'yyyy/MMMM/d!', '1373/Safar/05');
      expectFilter(new islamicDate(1434, 7, 11, 0), 'd!-MM-yy', '11-08-34');
      expectFilter(oldDate, 'yyyy/MM/d!', '0001/03/06');
    });

    it('should work correctly for `EEEE`', function() {
      expectFilter(new islamicDate(new Date(2013, 10, 17, 0)), 'EEEE.d.MMMM.yy', 'Sunday.13.Muharram.35');
      expectFilter(new islamicDate(new Date(1991, 2, 8, 0)), 'd-EEEE-MMMM-yyyy', "21-Friday-Sha'ban-1411");
      expectFilter(new islamicDate(new Date(1980, 1, 5, 0)), 'MMMM/d/yyyy/EEEE', "Rabi' I/18/1400/Tuesday");
      expectFilter(new islamicDate(new Date(1955, 1, 5, 0)), 'yyyy/EEEE/MMMM/d', '1374/Saturday/Jumada II/12');
    });

    it('should work correctly for `EEE`', function() {
      expectFilter(new islamicDate(new Date(2013, 10, 17, 0)), 'EEE.d.MMMM.yy', 'Sun.13.Muharram.35');
      expectFilter(new islamicDate(new Date(1991, 2, 8, 0)), 'd-EEE-MMMM-yyyy', "21-Fri-Sha'ban-1411");
      expectFilter(new islamicDate(new Date(1980, 1, 5, 0)), 'MMMM/d/yyyy/EEE', "Rabi' I/18/1400/Tue");
      expectFilter(new islamicDate(new Date(1955, 1, 5, 0)), 'yyyy/EEE/MMMM/d', '1374/Sat/Jumada II/12');
    });

    it('should work correctly for `HH`', function() {
      expectFilter(new islamicDate(1436, 2, 22, 22), 'd.MMMM.yy.HH', "22.Rabi' I.36.22");
      expectFilter(new islamicDate(1419, 2, 8, 11), 'd-MMMM-yyyy-HH', "8-Rabi' I-1419-11");
      expectFilter(new islamicDate(1393, 1, 5, 0), 'MMMM/d/yyyy/HH', 'Safar/5/1393/00');
      expectFilter(new islamicDate(1353, 1, 5, 3), 'yyyy/MMMM/d HH', '1353/Safar/5 03');
      expectFilter(new islamicDate(1434, 7, 11, 23), 'd-MM-yy HH', '11-08-34 23');
    });

    it('should work correctly for `H`', function() {
    	expectFilter(new islamicDate(1436, 2, 22, 22), 'd.MMMM.yy.H', "22.Rabi' I.36.22");
        expectFilter(new islamicDate(1419, 2, 8, 11), 'd-MMMM-yyyy-H', "8-Rabi' I-1419-11");
        expectFilter(new islamicDate(1393, 1, 5, 0), 'MMMM/d/yyyy/H', 'Safar/5/1393/0');
        expectFilter(new islamicDate(1353, 1, 5, 3), 'yyyy/MMMM/d H', '1353/Safar/5 3');
        expectFilter(new islamicDate(1434, 7, 11, 23), 'd-MM-yy H', '11-08-34 23');
    });

    it('should work correctly for `hh`', function() {
    	expectFilter(new islamicDate(1436, 2, 22, 12), 'd.MMMM.yy.hh', "22.Rabi' I.36.12");
        expectFilter(new islamicDate(1419, 2, 8, 11), 'd-MMMM-yyyy-hh', "8-Rabi' I-1419-11");
        expectFilter(new islamicDate(1393, 1, 5, 0), 'MMMM/d/yyyy/hh', 'Safar/5/1393/12');
        expectFilter(new islamicDate(1353, 1, 5, 3), 'yyyy/MMMM/d hh', '1353/Safar/5 03');
        expectFilter(new islamicDate(1434, 7, 11, 9), 'd-MM-yy hh', '11-08-34 09');
    });

    it('should work correctly for `h`', function() {
    	expectFilter(new islamicDate(1436, 2, 22, 12), 'd.MMMM.yy.h', "22.Rabi' I.36.12");
        expectFilter(new islamicDate(1419, 2, 8, 11), 'd-MMMM-yyyy-h', "8-Rabi' I-1419-11");
        expectFilter(new islamicDate(1393, 1, 5, 0), 'MMMM/d/yyyy/h', 'Safar/5/1393/12');
        expectFilter(new islamicDate(1353, 1, 5, 3), 'yyyy/MMMM/d h', '1353/Safar/5 3');
        expectFilter(new islamicDate(1434, 7, 11, 3), 'd-MM-yy h', '11-08-34 3');
    });

    it('should work correctly for `mm`', function() {
      expectFilter(new islamicDate(1436, 2, 22, 0, 22), 'd.MMMM.yy.mm', "22.Rabi' I.36.22");
      expectFilter(new islamicDate(1419, 2, 8, 0, 59), 'd-MMMM-yyyy-mm', "8-Rabi' I-1419-59");
      expectFilter(new islamicDate(1393, 1, 5, 0, 0), 'MMMM/d/yyyy/mm', 'Safar/5/1393/00');
      expectFilter(new islamicDate(1353, 1, 5, 0, 3), 'yyyy/MMMM/d mm', '1353/Safar/5 03');
      expectFilter(new islamicDate(1434, 7, 11, 0, 46), 'd-MM-yy mm', '11-08-34 46');
      expectFilter(new islamicDate(1435, 2, 22, 22, 33), 'd.MMMM.yy.HH:mm', "22.Rabi' I.35.22:33");
      expectFilter(new islamicDate(1435, 2, 22, 2, 1), 'd.MMMM.yy.H:mm', "22.Rabi' I.35.2:01");
    });

    it('should work correctly for `m`', function() {
    	expectFilter(new islamicDate(1436, 2, 22, 0, 22), 'd.MMMM.yy.m', "22.Rabi' I.36.22");
        expectFilter(new islamicDate(1419, 2, 8, 0, 59), 'd-MMMM-yyyy-m', "8-Rabi' I-1419-59");
        expectFilter(new islamicDate(1393, 1, 5, 0, 0), 'MMMM/d/yyyy/m', 'Safar/5/1393/0');
        expectFilter(new islamicDate(1353, 1, 5, 0, 3), 'yyyy/MMMM/d m', '1353/Safar/5 3');
        expectFilter(new islamicDate(1434, 7, 11, 0, 46), 'd-MM-yy m', '11-08-34 46');
        expectFilter(new islamicDate(1435, 2, 22, 22, 33), 'd.MMMM.yy.HH:m', "22.Rabi' I.35.22:33");
        expectFilter(new islamicDate(1435, 2, 22, 2, 1), 'd.MMMM.yy.H:m', "22.Rabi' I.35.2:1");
    });

    it('should work correctly for `sss`', function() {
      expectFilter(new islamicDate(1436, 0, 22, 0, 0, 0, 123), 'd.MMMM.yy.sss', '22.Muharram.36.123');
      expectFilter(new islamicDate(1419, 0, 8, 0, 0, 0, 59), 'd-MMMM-yyyy-sss', '8-Muharram-1419-059');
      expectFilter(new islamicDate(1393, 1, 5, 0, 0, 0), 'MMMM/d/yyyy/sss', 'Safar/5/1393/000');
      expectFilter(new islamicDate(1353, 1, 5, 0, 0, 0, 3), 'yyyy/MMMM/d sss', '1353/Safar/5 003');
      expectFilter(new islamicDate(1434, 7, 11, 0, 0, 0, 46), 'd-MM-yy sss', '11-08-34 046');
      expectFilter(new islamicDate(1435, 1, 22, 22, 33, 0, 44), 'd.MMMM.yy.HH:mm:sss', '22.Safar.35.22:33:044');
      expectFilter(new islamicDate(1435, 1, 22, 0, 0, 0, 1), 'd.MMMM.yy.H:m:sss', '22.Safar.35.0:0:001');
    });

    it('should work correctly for `ss`', function() {
      expectFilter(new islamicDate(1435, 0, 22, 0, 0, 22), 'd.MMMM.yy.ss', '22.Muharram.35.22');
      expectFilter(new islamicDate(1393, 0, 8, 0, 0, 59), 'd-MMMM-yyyy-ss', '8-Muharram-1393-59');
      expectFilter(new islamicDate(1393, 1, 5, 0, 0, 0), 'MMMM/d/yyyy/ss', 'Safar/5/1393/00');
      expectFilter(new islamicDate(1353, 1, 5, 0, 0, 3), 'yyyy/MMMM/d ss', '1353/Safar/5 03');
      expectFilter(new islamicDate(1434, 7, 11, 0, 0, 46), 'd-MM-yy ss', '11-08-34 46');
      expectFilter(new islamicDate(1435, 0, 22, 22, 33, 44), 'd.MMMM.yy.HH:mm:ss', '22.Muharram.35.22:33:44');
      expectFilter(new islamicDate(1435, 0, 22, 0, 0, 1), 'd.MMMM.yy.H:m:ss', '22.Muharram.35.0:0:01');
    });

    it('should work correctly for `s`', function() {
    	expectFilter(new islamicDate(1435, 0, 22, 0, 0, 22), 'd.MMMM.yy.s', '22.Muharram.35.22');
        expectFilter(new islamicDate(1393, 0, 8, 0, 0, 59), 'd-MMMM-yyyy-s', '8-Muharram-1393-59');
        expectFilter(new islamicDate(1393, 1, 5, 0, 0, 0), 'MMMM/d/yyyy/s', 'Safar/5/1393/0');
        expectFilter(new islamicDate(1353, 1, 5, 0, 0, 3), 'yyyy/MMMM/d s', '1353/Safar/5 3');
        expectFilter(new islamicDate(1434, 7, 11, 0, 0, 46), 'd-MM-yy s', '11-08-34 46');
        expectFilter(new islamicDate(1435, 0, 22, 22, 33, 44), 'd.MMMM.yy.HH:mm:s', '22.Muharram.35.22:33:44');
        expectFilter(new islamicDate(1435, 0, 22, 0, 0, 4), 'd.MMMM.yy.H:m:s', '22.Muharram.35.0:0:4');
    });

    it('should work correctly for `a`', function() {
      expectFilter(new islamicDate(1435, 0, 22, 10), 'd.MMMM.yy.hha', '22.Muharram.35.10AM');
      expectFilter(new islamicDate(1435, 0, 22, 22), 'd.MMMM.yy.hha', '22.Muharram.35.10PM');
      expectFilter(new islamicDate(1393, 0, 8, 11), 'd-MMMM-yyyy-hha', '8-Muharram-1393-11AM');
      expectFilter(new islamicDate(1393, 0, 8, 23), 'd-MMMM-yyyy-hha', '8-Muharram-1393-11PM');
      expectFilter(new islamicDate(1353, 1, 5, 0), 'MMMM/d/yyyy/hha', 'Safar/5/1353/12AM');
      expectFilter(new islamicDate(1353, 1, 5, 12), 'MMMM/d/yyyy/hha', 'Safar/5/1353/12PM');
      expectFilter(new islamicDate(1343, 1, 5, 3), 'yyyy/MMMM/d hha', '1343/Safar/5 03AM');
      expectFilter(new islamicDate(1343, 1, 5, 15), 'yyyy/MMMM/d hha', '1343/Safar/5 03PM');
      expectFilter(new islamicDate(1434, 7, 11, 9), 'd-MM-yy hha', '11-08-34 09AM');
      expectFilter(new islamicDate(1434, 7, 11, 21), 'd-MM-yy hha', '11-08-34 09PM');
    });

    it('should work correctly for `ww`', function() {
      expectFilter(new islamicDate(1437, 0, 1, 0), 'EEE d.MMMM.yy.ww', 'Thu 1.Muharram.37.01');
      expectFilter(new islamicDate(1437, 0, 29, 0), 'EEE d-MMMM-yyyy-ww', 'Thu 29-Muharram-1437-05');
      expectFilter(new islamicDate(1437, 1, 1, 0), 'EEE MMMM/d/yyyy/ww', 'Sat Safar/1/1437/05');
      expectFilter(new islamicDate(1437, 1, 29, 0), 'EEE yyyy/MMMM/d/ww', 'Sat 1437/Safar/29/09');
      expectFilter(new islamicDate(1437, 8, 1, 0), 'EEE MMMM/d/yyyy/ww', "Tue Ramadan/1/1437/35");
      expectFilter(new islamicDate(1437, 8, 29, 0), 'EEE yyyy/MMMM/d/ww', "Tue 1437/Ramadan/29/39");
      expectFilter(new islamicDate(1437, 11, 1, 0), 'EEE MMMM/d/yyyy/ww', "Sun Dhu'l-Hijjah/1/1437/48");
      expectFilter(new islamicDate(1437, 11, 29, 0), 'EEE yyyy/MMMM/d/ww', "Sun 1437/Dhu'l-Hijjah/29/52");
    });

    it('should work correctly for `w`', function() {
    	expectFilter(new islamicDate(1437, 0, 1, 0), 'EEE d.MMMM.yy.w', 'Thu 1.Muharram.37.1');
        expectFilter(new islamicDate(1437, 0, 29, 0), 'EEE d-MMMM-yyyy-w', 'Thu 29-Muharram-1437-5');
        expectFilter(new islamicDate(1437, 1, 1, 0), 'EEE MMMM/d/yyyy/w', 'Sat Safar/1/1437/5');
        expectFilter(new islamicDate(1437, 1, 29, 0), 'EEE yyyy/MMMM/d/w', 'Sat 1437/Safar/29/9');
        expectFilter(new islamicDate(1437, 8, 1, 0), 'EEE MMMM/d/yyyy/w', "Tue Ramadan/1/1437/35");
        expectFilter(new islamicDate(1437, 8, 29, 0), 'EEE yyyy/MMMM/d/w', "Tue 1437/Ramadan/29/39");
        expectFilter(new islamicDate(1437, 11, 1, 0), 'EEE MMMM/d/yyyy/w', "Sun Dhu'l-Hijjah/1/1437/48");
        expectFilter(new islamicDate(1437, 11, 29, 0), 'EEE yyyy/MMMM/d/w', "Sun 1437/Dhu'l-Hijjah/29/52");
    });

    it('should work correctly for `G`', function() {
      expectFilter(new islamicDate(1437, 9, 17, 0), 'd.MMMM.yy.G', '17.Shawwal.37.AH');
      expectFilter(new islamicDate(-10, 6, 8, 0), 'd-MMMM-yyyy-G', '8-Rajab-0010-BH');
      expectFilter(new islamicDate(1435, 1, 5, 0), 'MMMM/d/yyyy/G', 'Safar/5/1435/AH');
      expectFilter(new islamicDate(-100, 1, 5, 0), 'yyyy/MMMM/d/G', '0100/Safar/5/BH');
      expectFilter(new islamicDate(1345, 7, 11, 0), 'd-MM-yy G', '11-08-45 AH');
    });

    it('should work correctly for `GG`', function() {
    	expectFilter(new islamicDate(1437, 9, 17, 0), 'd.MMMM.yy.GG', '17.Shawwal.37.AH');
        expectFilter(new islamicDate(-10, 6, 8, 0), 'd-MMMM-yyyy-GG', '8-Rajab-0010-BH');
        expectFilter(new islamicDate(1435, 1, 5, 0), 'MMMM/d/yyyy/GG', 'Safar/5/1435/AH');
        expectFilter(new islamicDate(-100, 1, 5, 0), 'yyyy/MMMM/d/GG', '0100/Safar/5/BH');
        expectFilter(new islamicDate(1345, 7, 11, 0), 'd-MM-yy GG', '11-08-45 AH');
    });

    it('should work correctly for `GGG`', function() {
    	expectFilter(new islamicDate(1437, 9, 17, 0), 'd.MMMM.yy.GGG', '17.Shawwal.37.AH');
        expectFilter(new islamicDate(-10, 6, 8, 0), 'd-MMMM-yyyy-GGG', '8-Rajab-0010-BH');
        expectFilter(new islamicDate(1435, 1, 5, 0), 'MMMM/d/yyyy/GGG', 'Safar/5/1435/AH');
        expectFilter(new islamicDate(-100, 1, 5, 0), 'yyyy/MMMM/d/GGG', '0100/Safar/5/BH');
        expectFilter(new islamicDate(1345, 7, 11, 0), 'd-MM-yy GGG', '11-08-45 AH');
    });

    it('should work correctly for `GGGG`', function() {
    	expectFilter(new islamicDate(1437, 9, 17, 0), 'd.MMMM.yy.GGGG', '17.Shawwal.37.Anno Hegirae');
        expectFilter(new islamicDate(-10, 6, 8, 0), 'd-MMMM-yyyy-GGGG', '8-Rajab-0010-Before Hegirae');
        expectFilter(new islamicDate(1435, 1, 5, 0), 'MMMM/d/yyyy/GGGG', 'Safar/5/1435/Anno Hegirae');
        expectFilter(new islamicDate(-100, 1, 5, 0), 'yyyy/MMMM/d/GGGG', '0100/Safar/5/Before Hegirae');
        expectFilter(new islamicDate(1345, 7, 11, 0), 'd-MM-yy GGGG', '11-08-45 Anno Hegirae');
    });

    it('should work correctly for literal text', function() {
      expectFilter(new islamicDate(1437, 10, 17, 0), 'dd.MM.yyyy foo', '17.11.1437 foo');
    });
  });

  describe('with custom formats', function() {
    it('should work correctly for `dd`, `MM`, `yyyy`', function() {
      expectParse('17.11.1435', 'dd.MM.yyyy', new islamicDate(1435, 10, 17, 0));
      expectParse('31.12.1435', 'dd.MM.yyyy', new islamicDate(1436, 0, 2, 0));
      expectParse('08-03-1410', 'dd-MM-yyyy', new islamicDate(1410, 2, 8, 0));
      expectParse('03/05/1385', 'MM/dd/yyyy', new islamicDate(1385, 2, 5, 0));
      expectParse('10.01/1385', 'dd.MM/yyyy', new islamicDate(1385, 0, 10, 0));
      expectParse('11-09-1385', 'MM-dd-yyyy', new islamicDate(1385, 10, 9, 0));
      expectParse('1425/02/05', 'yyyy/MM/dd', new islamicDate(1425, 1, 5, 0));
      expectParse('0001/03/06', 'yyyy/MM/dd', oldDate);
    });

    it('should work correctly for `yy`', function() {
      expectParse('31.12.35', 'dd.MM.yy', new islamicDate(1436, 0, 2, 0));
      expectParse('08-03-10', 'dd-MM-yy', new islamicDate(1410, 2, 8, 0));
      expectParse('03/05/37', 'MM/dd/yy', new islamicDate(1437, 2, 5, 0));
      expectParse('10.01/22', 'dd.MM/yy', new islamicDate(1422, 0, 10, 0));
      expectParse('11-09-29', 'MM-dd-yy', new islamicDate(1429, 10, 9, 0));
    });

    it('should work correctly for `y`', function() {
      expectParse('17.11.1435', 'dd.MM.y', new islamicDate(1435, 10, 17, 0));
      expectParse('31.12.1435', 'dd.MM.y', new islamicDate(1436, 0, 2, 0));
      expectParse('08-03-1410', 'dd-MM-y', new islamicDate(1410, 2, 8, 0));
      expectParse('03/05/1385', 'MM/dd/y', new islamicDate(1385, 2, 5, 0));
      expectParse('10.01/1385', 'dd.MM/y', new islamicDate(1385, 0, 10, 0));
      expectParse('11-09-1385', 'MM-dd-y', new islamicDate(1385, 10, 9, 0));
      expectParse('1425/02/05', 'y/MM/dd', new islamicDate(1425, 1, 5, 0));
    });

    it('should work correctly for `MMMM`', function() {
      expectParse('17.Muharram.13', 'dd.MMMM.yy', new islamicDate(1413, 0, 17, 0));
      expectParse('05-Safar-1313', 'dd-MMMM-yyyy', new islamicDate(1313, 1, 5, 0));
      expectParse('Rajab/05/1363', 'MMMM/dd/yyyy', new islamicDate(1363, 6, 5, 0));
      expectParse('1403/Ramadan/20', 'yyyy/MMMM/dd', new islamicDate(1403, 8, 20, 0));
      expectParse("0001/Rabi' I/06", 'yyyy/MMMM/dd', oldDate);
    });

    it('should work correctly for `MMM`', function() {
      expectParse('17.Muh.13', 'dd.MMM.yy', new islamicDate(1413, 0, 17, 0));
      expectParse('05-Saf-1313', 'dd-MMM-yyyy', new islamicDate(1313, 1, 5, 0));
      expectParse('Raj/05/1363', 'MMM/dd/yyyy', new islamicDate(1363, 6, 5, 0));
      expectParse('1403/Ram/20', 'yyyy/MMM/dd', new islamicDate(1403, 8, 20, 0));
      expectParse('0001/Rab I/06', 'yyyy/MMM/dd', oldDate);
    });

    it('should work correctly for `M`', function() {
      expectParse('17.1.13', 'dd.M.yy', new islamicDate(1413, 0, 17, 0));
      expectParse('05-2-1313', 'dd-M-yyyy', new islamicDate(1313, 1, 5, 0));
      expectParse('7/05/1363', 'M/dd/yyyy', new islamicDate(1363, 6, 5, 0));
      expectParse('1403/9/20', 'yyyy/M/dd', new islamicDate(1403, 8, 20, 0));
      expectParse('0001/3/06', 'yyyy/M/dd', oldDate);
    });

    it('should work correctly for `M!`', function() {
      expectParse('17.1.13', 'dd.M!.yy', new islamicDate(1413, 0, 17, 0));
      expectParse('05-02-1313', 'dd-M!-yyyy', new islamicDate(1313, 1, 5, 0));
      expectParse('7/05/1363', 'M!/dd/yyyy', new islamicDate(1363, 6, 5, 0));
      expectParse('1403/09/20', 'yyyy/M!/dd', new islamicDate(1403, 8, 20, 0));
      expectParse('0001/3/06', 'yyyy/M!/dd', oldDate);
    });

    it('should work correctly for `d`', function() {
      expectParse('17.Safar.13', 'd.MMMM.yy', new islamicDate(1413, 1, 17, 0));
      expectParse('8-Rajab-1391', 'd-MMMM-yyyy', new islamicDate(1391, 6, 8, 0));
      expectParse('Ramadan/5/1380', 'MMMM/d/yyyy', new islamicDate(1380, 8, 5, 0));
      expectParse('1355/Ramadan/5', 'yyyy/MMMM/d', new islamicDate(1355, 8, 5, 0));
      expectParse('11-08-13', 'd-MM-yy', new islamicDate(1413, 7, 11, 0));
      expectParse('0001/03/6', 'yyyy/MM/d', oldDate);
    });

    it('should work correctly for `d!`', function() {
      expectParse('17.Safar.13', 'd!.MMMM.yy', new islamicDate(1413, 1, 17, 0));
      expectParse('8-Rajab-1391', 'd!-MMMM-yyyy', new islamicDate(1391, 6, 8, 0));
      expectParse('Ramadan/05/1380', 'MMMM/d!/yyyy', new islamicDate(1380, 8, 5, 0));
      expectParse('1355/Ramadan/5', 'yyyy/MMMM/d!', new islamicDate(1355, 8, 5, 0));
      expectParse('11-08-13', 'd!-MM-yy', new islamicDate(1413, 7, 11, 0));
      expectParse('0001/03/06', 'yyyy/MM/d!', oldDate);
    });

    it('should work correctly for `EEEE`', function() {
      expectParse('Sunday.13.Muharram.35', 'EEEE.d.MMMM.yy', new islamicDate(1435, 0, 13));
      expectParse("21-Friday-Sha'ban-1411", 'd-EEEE-MMMM-yyyy', new islamicDate(1411, 7, 21));
      expectParse("Rabi' I/18/1400/Tuesday", 'MMMM/d/yyyy/EEEE', new islamicDate(1400, 2, 18));
      expectParse('1374/Saturday/Jumada II/12', 'yyyy/EEEE/MMMM/d', new islamicDate(1374, 5, 12));
    });

    it('should work correctly for `EEE`', function() {
      expectParse('Sun.13.Muharram.35', 'EEE.d.MMMM.yy', new islamicDate(1435, 0, 13));
      expectParse("21-Fri-Sha'ban-1411", 'd-EEE-MMMM-yyyy', new islamicDate(1411, 7, 21));
      expectParse("Rabi' I/18/1400/Tue", 'MMMM/d/yyyy/EEE', new islamicDate(1400, 2, 18));
      expectParse('1374/Sat/Jumada II/12', 'yyyy/EEE/MMMM/d', new islamicDate(1374, 5, 12));
    });

    it('should work correctly for `HH`', function() {
      expectParse('22.Muharram.15.22', 'd.MMMM.yy.HH', new islamicDate(1415, 0, 22, 22));
      expectParse('8-Safar-1391-11', 'd-MMMM-yyyy-HH', new islamicDate(1391, 1, 8, 11));
      expectParse('Rajab/5/1380/00', 'MMMM/d/yyyy/HH', new islamicDate(1380, 6, 5, 0));
      expectParse('1355/Rajab/5 03', 'yyyy/MMMM/d HH', new islamicDate(1355, 6, 5, 3));
      expectParse('11-08-13 23', 'd-MM-yy HH', new islamicDate(1413, 7, 11, 23));
    });

    it('should work correctly for `H`', function() {
      expectParse('22.Muharram.15.22', 'd.MMMM.yy.H', new islamicDate(1415, 0, 22, 22));
      expectParse('8-Safar-1391-11', 'd-MMMM-yyyy-H', new islamicDate(1391, 1, 8, 11));
      expectParse('Rajab/5/1380/0', 'MMMM/d/yyyy/H', new islamicDate(1380, 6, 5, 0));
      expectParse('1355/Rajab/5 3', 'yyyy/MMMM/d H', new islamicDate(1355, 6, 5, 3));
      expectParse('11-08-13 23', 'd-MM-yy H', new islamicDate(1413, 7, 11, 23));
    });

    it('should work correctly for `hh`', function() {
      expectParse('22.Safar.15.22', 'd.MMMM.yy.hh', undefined);
      expectParse('22.Safar.15.12', 'd.MMMM.yy.hh', new islamicDate(1415, 1, 22, 12));
      expectParse('8-Rajab-1391-11', 'd-MMMM-yyyy-hh', new islamicDate(1391, 6, 8, 11));
      expectParse('Ramadan/5/1380/00', 'MMMM/d/yyyy/hh', new islamicDate(1380, 8, 5, 0));
      expectParse('1355/Ramadan/5 03', 'yyyy/MMMM/d hh', new islamicDate(1355, 8, 5, 3));
      expectParse('11-08-13 23', 'd-MM-yy hh', undefined);
      expectParse('11-08-13 09', 'd-MM-yy hh', new islamicDate(1413, 7, 11, 9));
    });

    it('should work correctly for `h`', function() {
      expectParse('22.Safar.15.12', 'd.MMMM.yy.h', new islamicDate(1415, 1, 22, 12));
      expectParse('8-Rajab-1391-11', 'd-MMMM-yyyy-h', new islamicDate(1391, 6, 8, 11));
      expectParse('Ramadan/5/1380/0', 'MMMM/d/yyyy/h', new islamicDate(1380, 8, 5, 0));
      expectParse('1355/Ramadan/5 3', 'yyyy/MMMM/d h', new islamicDate(1355, 8, 5, 3));
      expectParse('11-08-13 9', 'd-MM-yy h', new islamicDate(1413, 7, 11, 9));
    });

    it('should work correctly for `mm`', function() {
      expectParse('22.Safar.15.22', 'd.MMMM.yy.mm', new islamicDate(1415, 1, 22, 0, 22));
      expectParse('8-Safar-1391-59', 'd-MMMM-yyyy-mm', new islamicDate(1391, 1, 8, 0, 59));
      expectParse('Rajab/5/1380/00', 'MMMM/d/yyyy/mm', new islamicDate(1380, 6, 5, 0, 0));
      expectParse('1355/Rajab/5 03', 'yyyy/MMMM/d mm', new islamicDate(1355, 6, 5, 0, 3));
      expectParse('11-08-13 46', 'd-MM-yy mm', new islamicDate(1413, 7, 11, 0, 46));
      expectParse('22.Safar.15.22:33', 'd.MMMM.yy.HH:mm', new islamicDate(1415, 1, 22, 22, 33));
      expectParse('22.Safar.15.2:01', 'd.MMMM.yy.H:mm', new islamicDate(1415, 1, 22, 2, 1));
    });

    it('should work correctly for `m`', function() {
      expectParse('22.Safar.15.22', 'd.MMMM.yy.m', new islamicDate(1415, 1, 22, 0, 22));
      expectParse('8-Safar-1391-59', 'd-MMMM-yyyy-m', new islamicDate(1391, 1, 8, 0, 59));
      expectParse('Rajab/5/1380/0', 'MMMM/d/yyyy/m', new islamicDate(1380, 6, 5, 0, 0));
      expectParse('1355/Rajab/5 3', 'yyyy/MMMM/d m', new islamicDate(1355, 6, 5, 0, 3));
      expectParse('11-08-13 46', 'd-MM-yy m', new islamicDate(1413, 7, 11, 0, 46));
      expectParse('22.Safar.15.22:33', 'd.MMMM.yy.HH:m', new islamicDate(1415, 1, 22, 22, 33));
      expectParse('22.Safar.15.2:1', 'd.MMMM.yy.H:m', new islamicDate(1415, 1, 22, 2, 1));
    });

    it('should work correctly for `sss`', function() {
      expectParse('22.Safar.15.123', 'd.MMMM.yy.sss', new islamicDate(1415, 1, 22, 0, 0, 0, 123));
      expectParse('8-Safar-1391-059', 'd-MMMM-yyyy-sss', new islamicDate(1391, 1, 8, 0, 0, 0, 59));
      expectParse('Rajab/5/1380/000', 'MMMM/d/yyyy/sss', new islamicDate(1380, 6, 5, 0, 0, 0));
      expectParse('1355/Rajab/5 003', 'yyyy/MMMM/d sss', new islamicDate(1355, 6, 5, 0, 0, 0, 3));
      expectParse('11-08-13 046', 'd-MM-yy sss', new islamicDate(1413, 7, 11, 0, 0, 0, 46));
      expectParse('22.Safar.15.22:33:044', 'd.MMMM.yy.HH:mm:sss', new islamicDate(1415, 1, 22, 22, 33, 0, 44));
      expectParse('22.Safar.15.0:0:001', 'd.MMMM.yy.H:m:sss', new islamicDate(1415, 1, 22, 0, 0, 0, 1));
    });

    it('should work correctly for `ss`', function() {
      expectParse('22.Safar.15.22', 'd.MMMM.yy.ss', new islamicDate(1415, 1, 22, 0, 0, 22));
      expectParse('8-Safar-1391-59', 'd-MMMM-yyyy-ss', new islamicDate(1391, 1, 8, 0, 0, 59));
      expectParse('Rajab/5/1380/00', 'MMMM/d/yyyy/ss', new islamicDate(1380, 6, 5, 0, 0, 0));
      expectParse('1355/Rajab/5 03', 'yyyy/MMMM/d ss', new islamicDate(1355, 6, 5, 0, 0, 3));
      expectParse('11-08-13 46', 'd-MM-yy ss', new islamicDate(1413, 7, 11, 0, 0, 46));
      expectParse('22.Safar.15.22:33:44', 'd.MMMM.yy.HH:mm:ss', new islamicDate(1415, 1, 22, 22, 33, 44));
      expectParse('22.Safar.15.0:0:01', 'd.MMMM.yy.H:m:ss', new islamicDate(1415, 1, 22, 0, 0, 1));
    });

    it('should work correctly for `s`', function() {
      expectParse('22.Safar.15.22', 'd.MMMM.yy.s', new islamicDate(1415, 1, 22, 0, 0, 22));
      expectParse('8-Safar-1391-59', 'd-MMMM-yyyy-s', new islamicDate(1391, 1, 8, 0, 0, 59));
      expectParse('Rajab/5/1380/0', 'MMMM/d/yyyy/s', new islamicDate(1380, 6, 5, 0, 0, 0));
      expectParse('1355/Rajab/5 3', 'yyyy/MMMM/d s', new islamicDate(1355, 6, 5, 0, 0, 3));
      expectParse('11-08-13 46', 'd-MM-yy s', new islamicDate(1413, 7, 11, 0, 0, 46));
      expectParse('22.Safar.15.22:33:4', 'd.MMMM.yy.HH:mm:s', new islamicDate(1415, 1, 22, 22, 33, 4));
      expectParse('22.Safar.15.22:3:4', 'd.MMMM.yy.HH:m:s', new islamicDate(1415, 1, 22, 22, 3, 4));
    });

    it('should work correctly for `a`', function() {
      expectParse('22.Safar.15.10AM', 'd.MMMM.yy.hha', new islamicDate(1415, 1, 22, 10));
      expectParse('22.Safar.15.10PM', 'd.MMMM.yy.hha', new islamicDate(1415, 1, 22, 22));
      expectParse('8-Safar-1391-11AM', 'd-MMMM-yyyy-hha', new islamicDate(1391, 1, 8, 11));
      expectParse('8-Safar-1391-11PM', 'd-MMMM-yyyy-hha', new islamicDate(1391, 1, 8, 23));
      expectParse('Rajab/5/1380/12AM', 'MMMM/d/yyyy/hha', new islamicDate(1380, 6, 5, 0));
      expectParse('Rajab/5/1380/12PM', 'MMMM/d/yyyy/hha', new islamicDate(1380, 6, 5, 12));
      expectParse('1355/Rajab/5 03AM', 'yyyy/MMMM/d hha', new islamicDate(1355, 6, 5, 3));
      expectParse('1355/Rajab/5 03PM', 'yyyy/MMMM/d hha', new islamicDate(1355, 6, 5, 15));
      expectParse('11-08-13 09AM', 'd-MM-yy hha', new islamicDate(1413, 7, 11, 9));
      expectParse('11-08-13 09PM', 'd-MM-yy hha', new islamicDate(1413, 7, 11, 21));
    });

    it('should work correctly for `Z`', function() {
      expectParse('22.Safar.15 -0700', 'd.MMMM.yy Z', new islamicDate(1415, 1, 21, 17, 0, 0));
      expectParse('8-Safar-1391 +0800', 'd-MMMM-yyyy Z', new islamicDate(1391, 1, 8, 8, 0, 0));
      expectParse('Rajab/5/1380 -0200', 'MMMM/d/yyyy Z', new islamicDate(1380, 6, 4, 22, 0, 0));
      expectParse('1355/Rajab/5 +0400', 'yyyy/MMMM/d Z', new islamicDate(1355, 6, 5, 4, 0, 0));
      expectParse('11-08-13 -1234', 'd-MM-yy Z', new islamicDate(1413, 7, 10, 11, 26, 0));
      expectParse('22.Safar.15.22:33:4 -1200', 'd.MMMM.yy.HH:mm:s Z', new islamicDate(1415, 1, 22, 10, 33, 4));
      expectParse('22.Safar.15.22:3:4 +1500', 'd.MMMM.yy.HH:m:s Z', new islamicDate(1415, 1, 23, 13, 3, 4));
    });

    it('should work correctly for `ww`', function() {
      expectParse('Thu 1.Muharram.37.01', 'EEE d.MMMM.yy.ww', new islamicDate(1437, 0, 1, 0));
      expectParse('Thu 29-Muharram-1437-05', 'EEE d-MMMM-yyyy-ww', new islamicDate(1437, 0, 29, 0));
      expectParse('Sat Safar/1/1437/05', 'EEE MMMM/d/yyyy/ww', new islamicDate(1437, 1, 1, 0));
      expectParse('Sat 1437/Safar/29/09', 'EEE yyyy/MMMM/d/ww', new islamicDate(1437, 1, 29, 0));
      expectParse("Tue Ramadan/1/1437/35", 'EEE MMMM/d/yyyy/ww', new islamicDate(1437, 8, 1, 0));
      expectParse("Tue 1437/Ramadan/29/39", 'EEE yyyy/MMMM/d/ww', new islamicDate(1437, 8, 29, 0));
      expectParse("Sun Dhu'l-Hijjah/1/1437/48", 'EEE MMMM/d/yyyy/ww', new islamicDate(1437, 11, 1, 0));
      expectParse("Sun 1437/Dhu'l-Hijjah/29/52", 'EEE yyyy/MMMM/d/ww', new islamicDate(1437, 11, 29, 0));
    });

    it('should work correctly for `w`', function() {
      expectParse('Thu 1.Muharram.37.1', 'EEE d.MMMM.yy.w', new islamicDate(1437, 0, 1, 0));
      expectParse('Thu 29-Muharram-1437-5', 'EEE d-MMMM-yyyy-w', new islamicDate(1437, 0, 29, 0));
      expectParse('Sat Safar/1/1437/5', 'EEE MMMM/d/yyyy/w', new islamicDate(1437, 1, 1, 0));
      expectParse('Sat 1437/Safar/29/9', 'EEE yyyy/MMMM/d/w', new islamicDate(1437, 1, 29, 0));
      expectParse("Tue Ramadan/1/1437/35", 'EEE MMMM/d/yyyy/w', new islamicDate(1437, 8, 1, 0));
      expectParse("Tue 1437/Ramadan/29/39", 'EEE yyyy/MMMM/d/w', new islamicDate(1437, 8, 29, 0));
      expectParse("Sun Dhu'l-Hijjah/1/1437/48", 'EEE MMMM/d/yyyy/w', new islamicDate(1437, 11, 1, 0));
      expectParse("Sun 1437/Dhu'l-Hijjah/29/52", 'EEE yyyy/MMMM/d/w', new islamicDate(1437, 11, 29, 0));
    });

    it('should work correctly for `G`', function() {
      expectParse('17.Muharram.13.AH', 'd.MMMM.yy.G', new islamicDate(1413, 0, 17, 0));
      expectParse('8-Safar-1391-AH', 'd-MMMM-yyyy-G', new islamicDate(1391, 1, 8, 0));
      expectParse('Ramadan/5/1380/AH', 'MMMM/d/yyyy/G', new islamicDate(1380, 8, 5, 0));
      expectParse('1355/Ramadan/5/BH', 'yyyy/MMMM/d/G', new islamicDate(1355, 8, 5, 0));
      expectParse('11-08-13 AH', 'd-MM-yy G', new islamicDate(1413, 7, 11, 0));
      expectParse('0001/03/6 AH', 'yyyy/MM/d G', oldDate);
    });

    it('should work correctly for `GG`', function() {
      expectParse('17.Muharram.13.AH', 'd.MMMM.yy.GG', new islamicDate(1413, 0, 17, 0));
      expectParse('8-Safar-1391-AH', 'd-MMMM-yyyy-GG', new islamicDate(1391, 1, 8, 0));
      expectParse('Ramadan/5/1380/AH', 'MMMM/d/yyyy/GG', new islamicDate(1380, 8, 5, 0));
      expectParse('1355/Ramadan/5/BH', 'yyyy/MMMM/d/GG', new islamicDate(1355, 8, 5, 0));
      expectParse('11-08-13 AH', 'd-MM-yy GG', new islamicDate(1413, 7, 11, 0));
      expectParse('0001/03/6 AH', 'yyyy/MM/d GG', oldDate);
    });

    it('should work correctly for `GGG`', function() {
      expectParse('17.Muharram.13.AH', 'd.MMMM.yy.GGG', new islamicDate(1413, 0, 17, 0));
      expectParse('8-Safar-1391-AH', 'd-MMMM-yyyy-GGG', new islamicDate(1391, 1, 8, 0));
      expectParse('Ramadan/5/1380/AH', 'MMMM/d/yyyy/GGG', new islamicDate(1380, 8, 5, 0));
      expectParse('1355/Ramadan/5/BH', 'yyyy/MMMM/d/GGG', new islamicDate(1355, 8, 5, 0));
      expectParse('11-08-13 AH', 'd-MM-yy GGG', new islamicDate(1413, 7, 11, 0));
      expectParse('0001/03/6 AH', 'yyyy/MM/d GGG', oldDate);
    });

    it('should work correctly for `GGGG`', function() {
      expectParse('17.Muharram.13.Anno Hegirae', 'd.MMMM.yy.GGGG', new islamicDate(1413, 0, 17, 0));
      expectParse('8-Safar-1391-Anno Hegirae', 'd-MMMM-yyyy-GGGG', new islamicDate(1391, 1, 8, 0));
      expectParse('Ramadan/5/1380/Anno Hegirae', 'MMMM/d/yyyy/GGGG', new islamicDate(1380, 8, 5, 0));
      expectParse('1355/Ramadan/5/Before Hegirae', 'yyyy/MMMM/d/GGGG', new islamicDate(1355, 8, 5, 0));
      expectParse('11-08-13 Anno Hegirae', 'd-MM-yy GGGG', new islamicDate(1413, 7, 11, 0));
      expectParse('0001/03/6 Anno Hegirae', 'yyyy/MM/d GGGG', oldDate);
    });
  });

  describe('with predefined formats', function() {
    it('should work correctly for `shortDate`', function() {
      expectParse('9/3/34', 'shortDate', new islamicDate(1434, 8, 3, 0));
    });

    it('should work correctly for `mediumDate`', function() {
      expectParse('Ram 3, 1437', 'mediumDate', new islamicDate(1437, 8, 3, 0));
    });

    it('should work correctly for `longDate`', function() {
      expectParse('Ramadan 3, 1437', 'longDate', new islamicDate(1437, 8, 3, 0));
    });

    it('should work correctly for `fullDate`', function() {
      expectParse('Friday, Ramadan 3, 1437', 'fullDate', new islamicDate(1437, 8, 3, 0));
    });
  });

  describe('with value literals', function() {
    describe('parse', function() {
      it('should work with multiple literals', function() {
        expectParse('29 de Muharram de 1413', 'd \'de\' MMMM \'de\' y', new islamicDate(1413, 0, 29));
      });

      it('should work with escaped single quote', function() {
        expectParse('22.Safar.15 12 o\'clock', 'd.MMMM.yy h \'o\'\'clock\'', new islamicDate(1415, 1, 22, 12));
      });

      it('should work with only a single quote', function() {
        expectParse('22.Safar.15 \'', 'd.MMMM.yy \'\'\'', new islamicDate(1415, 1, 22));
      });

      it('should work with trailing literal', function() {
        expectParse('year 1413', '\'year\' y', new islamicDate(1413, 0, 1));

      });

      it('should work without whitespace', function() {
        expectParse('year:1413', '\'year:\'y', new islamicDate(1413, 0, 1));
      });
    });
  });

  describe('with edge case', function() {
    it('should work for days more than 30', function() {
      expectParse('31.02.1413', 'dd.MM.yyyy', new islamicDate(1413, 2, 2));
    });

    it('should work for 0 number of days', function() {
      expectParse('00.02.1413', 'dd.MM.yyyy', new islamicDate(1413, 0, 30));
    });
    
    it('should not work for days less than 0', function() {
      expectParse('-1.02.1413', 'dd.MM.yyyy', undefined);
    });
    
  });

  describe('base date', function() {
    var baseDate;

    beforeEach(function() {
      baseDate = new islamicDate(1410, 10, 10);
    });

    it('should pre-initialize our date with a base date', function() {
      expect(expectBaseParse('1415', 'yyyy', baseDate, new islamicDate(1415, 10, 10)));
      expect(expectBaseParse('1', 'M', baseDate, new islamicDate(1410, 0, 10)));
      expect(expectBaseParse('1', 'd', baseDate, new islamicDate(1410, 10, 1)));
    });

    it('should ignore the base date when it is an invalid date', inject(function($log) {
      spyOn($log, 'warn');
      expect(expectBaseParse('30-12', 'dd-MM', new islamicDate('foo'), new islamicDate(1400, 11, 30)));
      expect(expectBaseParse('30-1415', 'dd-yyyy', 'I am a cat', new islamicDate(1415, 0, 30)));
      expect($log.warn).toHaveBeenCalledWith('dateparser:', 'baseDate is not a valid date');
    }));
  });

  it('should not parse non-string inputs', function() {
    expectParse(123456, 'dd.MM.yyyy', 123456);
    var date = new islamicDate();
    expectParse(date, 'dd.MM.yyyy', date);
  });

  it('should not parse if no format is specified', function() {
    expectParse('21.08.1351', '', '21.08.1351');
  });

  it('should reinitialize when locale changes', inject(function($locale) {
    spyOn(dateParser, 'init').and.callThrough();
    expect($locale.id).toBe('en-us');

    $locale.id = 'ar-eg';

    dateParser.parse('22.محرم.15.22', 'd.MMMM.yy.s');

    expect(dateParser.init).toHaveBeenCalled();
  }));

  describe('timezone functions', function() {
    describe('toTimezone', function() {
      it('adjusts date: PST - EST', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.toTimezone(date, 'PST');
        var toEastDate = dateParser.toTimezone(date, 'EST');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 3);
      });

      it('adjusts date: GMT-0500 - GMT+0500', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.toTimezone(date, 'GMT-0500');
        var toEastDate = dateParser.toTimezone(date, 'GMT+0500');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 10);
      });

      it('adjusts date: -600 - +600', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.toTimezone(date, '-600');
        var toEastDate = dateParser.toTimezone(date, '+600');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 12);
      });

      it('tolerates null date', function() {
        var date = null;
        var toNullDate = dateParser.toTimezone(date, '-600');
        expect(toNullDate).toEqual(date);
      });

      it('tolerates null timezone', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var toNullTimezoneDate = dateParser.toTimezone(date, null);
        expect(toNullTimezoneDate).toEqual(date);
      });
    });

    describe('fromTimezone', function() {
      it('adjusts date: PST - EST', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var fromWestDate = dateParser.fromTimezone(date, 'PST');
        var fromEastDate = dateParser.fromTimezone(date, 'EST');
        expect(fromWestDate.getTime() - fromEastDate.getTime()).toEqual(1000 * 60 * 60 * -3);
      });

      it('adjusts date: GMT-0500 - GMT+0500', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var fromWestDate = dateParser.fromTimezone(date, 'GMT-0500');
        var fromEastDate = dateParser.fromTimezone(date, 'GMT+0500');
        expect(fromWestDate.getTime() - fromEastDate.getTime()).toEqual(1000 * 60 * 60 * -10);
      });

      it('adjusts date: -600 - +600', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var fromWestDate = dateParser.fromTimezone(date, '-600');
        var fromEastDate = dateParser.fromTimezone(date, '+600');
        expect(fromWestDate.getTime() - fromEastDate.getTime()).toEqual(1000 * 60 * 60 * -12);
      });

      it('tolerates null date', function() {
        var date = null;
        var toNullDate = dateParser.fromTimezone(date, '-600');
        expect(toNullDate).toEqual(date);
      });

      it('tolerates null timezone', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var toNullTimezoneDate = dateParser.fromTimezone(date, null);
        expect(toNullTimezoneDate).toEqual(date);
      });
    });

    describe('timezoneToOffset', function() {
      it('calculates minutes off from current timezone', function() {
        var offsetMinutesUtc = dateParser.timezoneToOffset('UTC');
        var offsetMinutesUtcPlus1 = dateParser.timezoneToOffset('GMT+0100');
        expect(offsetMinutesUtc - offsetMinutesUtcPlus1).toEqual(60);
      });
    });

    describe('addDateMinutes', function() {
      it('adds minutes to a date', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var oneHourMore = dateParser.addDateMinutes(date, 60);
        expect(oneHourMore).toEqualIslamicDate(new islamicDate('2008-01-01T01:00:00.000Z'));
      });
    });

    describe('convertTimezoneToLocal', function() {
      it('adjusts date: PST - EST', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.convertTimezoneToLocal(date, 'PST');
        var toEastDate = dateParser.convertTimezoneToLocal(date, 'EST');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 3);
      });

      it('adjusts date: GMT-0500 - GMT+0500', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.convertTimezoneToLocal(date, 'GMT-0500');
        var toEastDate = dateParser.convertTimezoneToLocal(date, 'GMT+0500');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 10);
      });

      it('adjusts date: -600 - +600', function() {
        var date = new islamicDate('2008-01-01T00:00:00.000Z');
        var toWestDate = dateParser.convertTimezoneToLocal(date, '-600');
        var toEastDate = dateParser.convertTimezoneToLocal(date, '+600');
        expect(toWestDate.getTime() - toEastDate.getTime()).toEqual(1000 * 60 * 60 * 12);
      });
    });
  });
});
