// PTU-Date-en.js

if (!PTS_STR) { var PTS_STR = new Array(); }


// PTDateUtil strings
PTS_STR['PTU-Date-TimeFormatError'] 		= 'The time you have entered is not in the correct format. Enter a time format of HH:MM:SS';


// PTDate object strings
if (!PTDateStrings) { var PTDateStrings = new Object(); }

PTDateStrings.monthsLong = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
PTDateStrings.monthsShort = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
PTDateStrings.daysLong = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
PTDateStrings.daysShort = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
PTDateStrings.daysInitial = new Array('S','M','T','W','T','F','S');
PTDateStrings.ampm = new Array('am','pm');
PTDateStrings.language = 'en';


// PTDateValidator strings
PTS_STR['PTU-DateV-DateFormatError']		= 'There is a problem with the date you have entered.';
PTS_STR['PTU-DateV-ExampleFormats']			= 'Re-enter the date using one of the following formats:';
PTS_STR['PTU-DateV-TimeFormatError'] 		= 'The time you entered is invalid.';
PTS_STR['PTU-DateV-TimeRequired']			= 'You must enter a time with this date.';
PTS_STR['PTU-DateV-TimeForbidden']			= 'You may not enter a time with this date.';
