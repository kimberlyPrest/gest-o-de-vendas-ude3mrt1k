import { A as Root$1, Ct as composeEventHandlers, D as Description, E as Content$1, Et as require_react, F as hideOthers, H as Button, I as Combination_default, J as Content, K as Anchor, L as useFocusGuards, M as Trigger$2, O as Overlay, Ot as __export, Q as useId, R as FocusScope, St as useComposedRefs, T as Close, Tt as require_react_dom, U as buttonVariants, X as createPopperScope, Y as Root2$2, _ as millisecondsInHour, _t as createSlot, bt as require_jsx_runtime, ct as useControllableState, d as differenceInCalendarDays, dt as useLayoutEffect2, et as cn, f as startOfDay, ft as DismissableLayer, g as constructFrom, gt as createCollection, h as toDate, it as createLucideIcon, j as Title, k as Portal$3, kt as __toESM, lt as Presence, mt as Primitive, p as normalizeDates, pt as useCallbackRef, q as Arrow, st as VISUALLY_HIDDEN_STYLES, tt as X, ut as Portal, v as millisecondsInMinute, y as millisecondsInWeek, yt as createContextScope } from "./index-_N1K3nDU.js";
var ArrowRightLeft = createLucideIcon("arrow-right-left", [
	["path", {
		d: "m16 3 4 4-4 4",
		key: "1x1c3m"
	}],
	["path", {
		d: "M20 7H4",
		key: "zbl0bi"
	}],
	["path", {
		d: "m8 21-4-4 4-4",
		key: "h9nckh"
	}],
	["path", {
		d: "M4 17h16",
		key: "g4d7ey"
	}]
]);
var ArrowUp = createLucideIcon("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]);
var Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
var ChevronDown = createLucideIcon("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]);
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
var ChevronUp = createLucideIcon("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]);
var DollarSign = createLucideIcon("dollar-sign", [["line", {
	x1: "12",
	x2: "12",
	y1: "2",
	y2: "22",
	key: "7eqyqh"
}], ["path", {
	d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
	key: "1b0p4s"
}]]);
var Users = createLucideIcon("users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["path", {
		d: "M16 3.128a4 4 0 0 1 0 7.744",
		key: "16gr8j"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
function addDays(date, amount, options) {
	const _date = toDate(date, options?.in);
	if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
	if (!amount) return _date;
	_date.setDate(_date.getDate() + amount);
	return _date;
}
function addMonths(date, amount, options) {
	const _date = toDate(date, options?.in);
	if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
	if (!amount) return _date;
	const dayOfMonth = _date.getDate();
	const endOfDesiredMonth = constructFrom(options?.in || date, _date.getTime());
	endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
	if (dayOfMonth >= endOfDesiredMonth.getDate()) return endOfDesiredMonth;
	else {
		_date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
		return _date;
	}
}
var defaultOptions = {};
function getDefaultOptions() {
	return defaultOptions;
}
function startOfWeek(date, options) {
	const defaultOptions$1 = getDefaultOptions();
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions$1.weekStartsOn ?? defaultOptions$1.locale?.options?.weekStartsOn ?? 0;
	const _date = toDate(date, options?.in);
	const day = _date.getDay();
	const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	_date.setDate(_date.getDate() - diff);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
function startOfISOWeek(date, options) {
	return startOfWeek(date, {
		...options,
		weekStartsOn: 1
	});
}
function getISOWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
	fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
	fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
	const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
	fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
	fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
	if (_date.getTime() >= startOfNextYear.getTime()) return year + 1;
	else if (_date.getTime() >= startOfThisYear.getTime()) return year;
	else return year - 1;
}
function startOfISOWeekYear(date, options) {
	const year = getISOWeekYear(date, options);
	const fourthOfJanuary = constructFrom(options?.in || date, 0);
	fourthOfJanuary.setFullYear(year, 0, 4);
	fourthOfJanuary.setHours(0, 0, 0, 0);
	return startOfISOWeek(fourthOfJanuary);
}
function addWeeks(date, amount, options) {
	return addDays(date, amount * 7, options);
}
function addYears(date, amount, options) {
	return addMonths(date, amount * 12, options);
}
function max(dates, options) {
	let result;
	let context = options?.in;
	dates.forEach((date) => {
		if (!context && typeof date === "object") context = constructFrom.bind(null, date);
		const date_ = toDate(date, context);
		if (!result || result < date_ || isNaN(+date_)) result = date_;
	});
	return constructFrom(context, result || NaN);
}
function min(dates, options) {
	let result;
	let context = options?.in;
	dates.forEach((date) => {
		if (!context && typeof date === "object") context = constructFrom.bind(null, date);
		const date_ = toDate(date, context);
		if (!result || result > date_ || isNaN(+date_)) result = date_;
	});
	return constructFrom(context, result || NaN);
}
function isSameDay(laterDate, earlierDate, options) {
	const [dateLeft_, dateRight_] = normalizeDates(options?.in, laterDate, earlierDate);
	return +startOfDay(dateLeft_) === +startOfDay(dateRight_);
}
function isDate(value) {
	return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(date) {
	return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}
function differenceInCalendarMonths(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
	const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
	return yearsDiff * 12 + monthsDiff;
}
function endOfDay(date, options) {
	const _date = toDate(date, options?.in);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
function endOfMonth(date, options) {
	const _date = toDate(date, options?.in);
	const month = _date.getMonth();
	_date.setFullYear(_date.getFullYear(), month + 1, 0);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
function normalizeInterval(context, interval) {
	const [start, end] = normalizeDates(context, interval.start, interval.end);
	return {
		start,
		end
	};
}
function eachMonthOfInterval(interval, options) {
	const { start, end } = normalizeInterval(options?.in, interval);
	let reversed = +start > +end;
	const endTime = reversed ? +start : +end;
	const date = reversed ? end : start;
	date.setHours(0, 0, 0, 0);
	date.setDate(1);
	let step = options?.step ?? 1;
	if (!step) return [];
	if (step < 0) {
		step = -step;
		reversed = !reversed;
	}
	const dates = [];
	while (+date <= endTime) {
		dates.push(constructFrom(start, date));
		date.setMonth(date.getMonth() + step);
	}
	return reversed ? dates.reverse() : dates;
}
function startOfMonth(date, options) {
	const _date = toDate(date, options?.in);
	_date.setDate(1);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
function endOfYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	_date.setFullYear(year + 1, 0, 0);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
function startOfYear(date, options) {
	const date_ = toDate(date, options?.in);
	date_.setFullYear(date_.getFullYear(), 0, 1);
	date_.setHours(0, 0, 0, 0);
	return date_;
}
function eachYearOfInterval(interval, options) {
	const { start, end } = normalizeInterval(options?.in, interval);
	let reversed = +start > +end;
	const endTime = reversed ? +start : +end;
	const date = reversed ? end : start;
	date.setHours(0, 0, 0, 0);
	date.setMonth(0, 1);
	let step = options?.step ?? 1;
	if (!step) return [];
	if (step < 0) {
		step = -step;
		reversed = !reversed;
	}
	const dates = [];
	while (+date <= endTime) {
		dates.push(constructFrom(start, date));
		date.setFullYear(date.getFullYear() + step);
	}
	return reversed ? dates.reverse() : dates;
}
function endOfWeek(date, options) {
	const defaultOptions$1 = getDefaultOptions();
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions$1.weekStartsOn ?? defaultOptions$1.locale?.options?.weekStartsOn ?? 0;
	const _date = toDate(date, options?.in);
	const day = _date.getDay();
	const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
	_date.setDate(_date.getDate() + diff);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
function endOfISOWeek(date, options) {
	return endOfWeek(date, {
		...options,
		weekStartsOn: 1
	});
}
var formatDistanceLocale$1 = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
};
const formatDistance$1 = (token, count, options) => {
	let result;
	const tokenValue = formatDistanceLocale$1[token];
	if (typeof tokenValue === "string") result = tokenValue;
	else if (count === 1) result = tokenValue.one;
	else result = tokenValue.other.replace("{{count}}", count.toString());
	if (options?.addSuffix) if (options.comparison && options.comparison > 0) return "in " + result;
	else return result + " ago";
	return result;
};
function buildFormatLongFn(args) {
	return (options = {}) => {
		const width = options.width ? String(options.width) : args.defaultWidth;
		return args.formats[width] || args.formats[args.defaultWidth];
	};
}
const formatLong$1 = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
var formatRelativeLocale$1 = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
};
const formatRelative$1 = (token, _date, _baseDate, _options) => formatRelativeLocale$1[token];
function buildLocalizeFn(args) {
	return (value, options) => {
		const context = options?.context ? String(options.context) : "standalone";
		let valuesArray;
		if (context === "formatting" && args.formattingValues) {
			const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
			const width = options?.width ? String(options.width) : defaultWidth;
			valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
		} else {
			const defaultWidth = args.defaultWidth;
			const width = options?.width ? String(options.width) : args.defaultWidth;
			valuesArray = args.values[width] || args.values[defaultWidth];
		}
		const index = args.argumentCallback ? args.argumentCallback(value) : value;
		return valuesArray[index];
	};
}
var eraValues$1 = {
	narrow: ["B", "A"],
	abbreviated: ["BC", "AD"],
	wide: ["Before Christ", "Anno Domini"]
};
var quarterValues$1 = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	wide: [
		"1st quarter",
		"2nd quarter",
		"3rd quarter",
		"4th quarter"
	]
};
var monthValues$1 = {
	narrow: [
		"J",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	abbreviated: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	wide: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	]
};
var dayValues$1 = {
	narrow: [
		"S",
		"M",
		"T",
		"W",
		"T",
		"F",
		"S"
	],
	short: [
		"Su",
		"Mo",
		"Tu",
		"We",
		"Th",
		"Fr",
		"Sa"
	],
	abbreviated: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	wide: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	]
};
var dayPeriodValues$1 = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	}
};
var formattingDayPeriodValues$1 = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	}
};
var ordinalNumber$1 = (dirtyNumber, _options) => {
	const number = Number(dirtyNumber);
	const rem100 = number % 100;
	if (rem100 > 20 || rem100 < 10) switch (rem100 % 10) {
		case 1: return number + "st";
		case 2: return number + "nd";
		case 3: return number + "rd";
	}
	return number + "th";
};
const localize$1 = {
	ordinalNumber: ordinalNumber$1,
	era: buildLocalizeFn({
		values: eraValues$1,
		defaultWidth: "wide"
	}),
	quarter: buildLocalizeFn({
		values: quarterValues$1,
		defaultWidth: "wide",
		argumentCallback: (quarter) => quarter - 1
	}),
	month: buildLocalizeFn({
		values: monthValues$1,
		defaultWidth: "wide"
	}),
	day: buildLocalizeFn({
		values: dayValues$1,
		defaultWidth: "wide"
	}),
	dayPeriod: buildLocalizeFn({
		values: dayPeriodValues$1,
		defaultWidth: "wide",
		formattingValues: formattingDayPeriodValues$1,
		defaultFormattingWidth: "wide"
	})
};
function buildMatchFn(args) {
	return (string, options = {}) => {
		const width = options.width;
		const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
		const matchResult = string.match(matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
		const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : findKey(parsePatterns, (pattern) => pattern.test(matchedString));
		let value;
		value = args.valueCallback ? args.valueCallback(key) : key;
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
function findKey(object, predicate) {
	for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) return key;
}
function findIndex(array, predicate) {
	for (let key = 0; key < array.length; key++) if (predicate(array[key])) return key;
}
function buildMatchPatternFn(args) {
	return (string, options = {}) => {
		const matchResult = string.match(args.matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parseResult = string.match(args.parsePattern);
		if (!parseResult) return null;
		let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
const enUS$1 = {
	code: "en-US",
	formatDistance: formatDistance$1,
	formatLong: formatLong$1,
	formatRelative: formatRelative$1,
	localize: localize$1,
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (value) => parseInt(value, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (index) => index + 1
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
function getDayOfYear(date, options) {
	const _date = toDate(date, options?.in);
	return differenceInCalendarDays(_date, startOfYear(_date)) + 1;
}
function getISOWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
	return Math.round(diff / millisecondsInWeek) + 1;
}
function getWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const defaultOptions$1 = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions$1.firstWeekContainsDate ?? defaultOptions$1.locale?.options?.firstWeekContainsDate ?? 1;
	const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
	firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
	firstWeekOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
	const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
	firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
	firstWeekOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
	if (+_date >= +startOfNextYear) return year + 1;
	else if (+_date >= +startOfThisYear) return year;
	else return year - 1;
}
function startOfWeekYear(date, options) {
	const defaultOptions$1 = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions$1.firstWeekContainsDate ?? defaultOptions$1.locale?.options?.firstWeekContainsDate ?? 1;
	const year = getWeekYear(date, options);
	const firstWeek = constructFrom(options?.in || date, 0);
	firstWeek.setFullYear(year, 0, firstWeekContainsDate);
	firstWeek.setHours(0, 0, 0, 0);
	return startOfWeek(firstWeek, options);
}
function getWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
	return Math.round(diff / millisecondsInWeek) + 1;
}
function addLeadingZeros(number, targetLength) {
	return (number < 0 ? "-" : "") + Math.abs(number).toString().padStart(targetLength, "0");
}
const lightFormatters = {
	y(date, token) {
		const signedYear = date.getFullYear();
		const year = signedYear > 0 ? signedYear : 1 - signedYear;
		return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
	},
	M(date, token) {
		const month = date.getMonth();
		return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
	},
	d(date, token) {
		return addLeadingZeros(date.getDate(), token.length);
	},
	a(date, token) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return dayPeriodEnumValue.toUpperCase();
			case "aaa": return dayPeriodEnumValue;
			case "aaaaa": return dayPeriodEnumValue[0];
			case "aaaa":
			default: return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
		}
	},
	h(date, token) {
		return addLeadingZeros(date.getHours() % 12 || 12, token.length);
	},
	H(date, token) {
		return addLeadingZeros(date.getHours(), token.length);
	},
	m(date, token) {
		return addLeadingZeros(date.getMinutes(), token.length);
	},
	s(date, token) {
		return addLeadingZeros(date.getSeconds(), token.length);
	},
	S(date, token) {
		const numberOfDigits = token.length;
		const milliseconds = date.getMilliseconds();
		return addLeadingZeros(Math.trunc(milliseconds * Math.pow(10, numberOfDigits - 3)), token.length);
	}
};
var dayPeriodEnum = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
};
const formatters = {
	G: function(date, token, localize$2) {
		const era = date.getFullYear() > 0 ? 1 : 0;
		switch (token) {
			case "G":
			case "GG":
			case "GGG": return localize$2.era(era, { width: "abbreviated" });
			case "GGGGG": return localize$2.era(era, { width: "narrow" });
			case "GGGG":
			default: return localize$2.era(era, { width: "wide" });
		}
	},
	y: function(date, token, localize$2) {
		if (token === "yo") {
			const signedYear = date.getFullYear();
			const year = signedYear > 0 ? signedYear : 1 - signedYear;
			return localize$2.ordinalNumber(year, { unit: "year" });
		}
		return lightFormatters.y(date, token);
	},
	Y: function(date, token, localize$2, options) {
		const signedWeekYear = getWeekYear(date, options);
		const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
		if (token === "YY") return addLeadingZeros(weekYear % 100, 2);
		if (token === "Yo") return localize$2.ordinalNumber(weekYear, { unit: "year" });
		return addLeadingZeros(weekYear, token.length);
	},
	R: function(date, token) {
		return addLeadingZeros(getISOWeekYear(date), token.length);
	},
	u: function(date, token) {
		return addLeadingZeros(date.getFullYear(), token.length);
	},
	Q: function(date, token, localize$2) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "Q": return String(quarter);
			case "QQ": return addLeadingZeros(quarter, 2);
			case "Qo": return localize$2.ordinalNumber(quarter, { unit: "quarter" });
			case "QQQ": return localize$2.quarter(quarter, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return localize$2.quarter(quarter, {
				width: "narrow",
				context: "formatting"
			});
			case "QQQQ":
			default: return localize$2.quarter(quarter, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(date, token, localize$2) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "q": return String(quarter);
			case "qq": return addLeadingZeros(quarter, 2);
			case "qo": return localize$2.ordinalNumber(quarter, { unit: "quarter" });
			case "qqq": return localize$2.quarter(quarter, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return localize$2.quarter(quarter, {
				width: "narrow",
				context: "standalone"
			});
			case "qqqq":
			default: return localize$2.quarter(quarter, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(date, token, localize$2) {
		const month = date.getMonth();
		switch (token) {
			case "M":
			case "MM": return lightFormatters.M(date, token);
			case "Mo": return localize$2.ordinalNumber(month + 1, { unit: "month" });
			case "MMM": return localize$2.month(month, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return localize$2.month(month, {
				width: "narrow",
				context: "formatting"
			});
			case "MMMM":
			default: return localize$2.month(month, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(date, token, localize$2) {
		const month = date.getMonth();
		switch (token) {
			case "L": return String(month + 1);
			case "LL": return addLeadingZeros(month + 1, 2);
			case "Lo": return localize$2.ordinalNumber(month + 1, { unit: "month" });
			case "LLL": return localize$2.month(month, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return localize$2.month(month, {
				width: "narrow",
				context: "standalone"
			});
			case "LLLL":
			default: return localize$2.month(month, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(date, token, localize$2, options) {
		const week = getWeek(date, options);
		if (token === "wo") return localize$2.ordinalNumber(week, { unit: "week" });
		return addLeadingZeros(week, token.length);
	},
	I: function(date, token, localize$2) {
		const isoWeek = getISOWeek(date);
		if (token === "Io") return localize$2.ordinalNumber(isoWeek, { unit: "week" });
		return addLeadingZeros(isoWeek, token.length);
	},
	d: function(date, token, localize$2) {
		if (token === "do") return localize$2.ordinalNumber(date.getDate(), { unit: "date" });
		return lightFormatters.d(date, token);
	},
	D: function(date, token, localize$2) {
		const dayOfYear = getDayOfYear(date);
		if (token === "Do") return localize$2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
		return addLeadingZeros(dayOfYear, token.length);
	},
	E: function(date, token, localize$2) {
		const dayOfWeek = date.getDay();
		switch (token) {
			case "E":
			case "EE":
			case "EEE": return localize$2.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return localize$2.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return localize$2.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			case "EEEE":
			default: return localize$2.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(date, token, localize$2, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "e": return String(localDayOfWeek);
			case "ee": return addLeadingZeros(localDayOfWeek, 2);
			case "eo": return localize$2.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "eee": return localize$2.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return localize$2.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return localize$2.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			case "eeee":
			default: return localize$2.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(date, token, localize$2, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "c": return String(localDayOfWeek);
			case "cc": return addLeadingZeros(localDayOfWeek, token.length);
			case "co": return localize$2.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "ccc": return localize$2.day(dayOfWeek, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return localize$2.day(dayOfWeek, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return localize$2.day(dayOfWeek, {
				width: "short",
				context: "standalone"
			});
			case "cccc":
			default: return localize$2.day(dayOfWeek, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(date, token, localize$2) {
		const dayOfWeek = date.getDay();
		const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
		switch (token) {
			case "i": return String(isoDayOfWeek);
			case "ii": return addLeadingZeros(isoDayOfWeek, token.length);
			case "io": return localize$2.ordinalNumber(isoDayOfWeek, { unit: "day" });
			case "iii": return localize$2.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return localize$2.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return localize$2.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			case "iiii":
			default: return localize$2.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(date, token, localize$2) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			case "aaaa":
			default: return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(date, token, localize$2) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours === 12) dayPeriodEnumValue = dayPeriodEnum.noon;
		else if (hours === 0) dayPeriodEnumValue = dayPeriodEnum.midnight;
		else dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "b":
			case "bb": return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			case "bbbb":
			default: return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(date, token, localize$2) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours >= 17) dayPeriodEnumValue = dayPeriodEnum.evening;
		else if (hours >= 12) dayPeriodEnumValue = dayPeriodEnum.afternoon;
		else if (hours >= 4) dayPeriodEnumValue = dayPeriodEnum.morning;
		else dayPeriodEnumValue = dayPeriodEnum.night;
		switch (token) {
			case "B":
			case "BB":
			case "BBB": return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			case "BBBB":
			default: return localize$2.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(date, token, localize$2) {
		if (token === "ho") {
			let hours = date.getHours() % 12;
			if (hours === 0) hours = 12;
			return localize$2.ordinalNumber(hours, { unit: "hour" });
		}
		return lightFormatters.h(date, token);
	},
	H: function(date, token, localize$2) {
		if (token === "Ho") return localize$2.ordinalNumber(date.getHours(), { unit: "hour" });
		return lightFormatters.H(date, token);
	},
	K: function(date, token, localize$2) {
		const hours = date.getHours() % 12;
		if (token === "Ko") return localize$2.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	k: function(date, token, localize$2) {
		let hours = date.getHours();
		if (hours === 0) hours = 24;
		if (token === "ko") return localize$2.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	m: function(date, token, localize$2) {
		if (token === "mo") return localize$2.ordinalNumber(date.getMinutes(), { unit: "minute" });
		return lightFormatters.m(date, token);
	},
	s: function(date, token, localize$2) {
		if (token === "so") return localize$2.ordinalNumber(date.getSeconds(), { unit: "second" });
		return lightFormatters.s(date, token);
	},
	S: function(date, token) {
		return lightFormatters.S(date, token);
	},
	X: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		if (timezoneOffset === 0) return "Z";
		switch (token) {
			case "X": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "XXXX":
			case "XX": return formatTimezone(timezoneOffset);
			case "XXXXX":
			case "XXX":
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	x: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "x": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "xxxx":
			case "xx": return formatTimezone(timezoneOffset);
			case "xxxxx":
			case "xxx":
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	O: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			case "OOOO":
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	z: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			case "zzzz":
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	t: function(date, token, _localize) {
		return addLeadingZeros(Math.trunc(+date / 1e3), token.length);
	},
	T: function(date, token, _localize) {
		return addLeadingZeros(+date, token.length);
	}
};
function formatTimezoneShort(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = Math.trunc(absOffset / 60);
	const minutes = absOffset % 60;
	if (minutes === 0) return sign + String(hours);
	return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
	if (offset % 60 === 0) return (offset > 0 ? "-" : "+") + addLeadingZeros(Math.abs(offset) / 60, 2);
	return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
	const minutes = addLeadingZeros(absOffset % 60, 2);
	return sign + hours + delimiter + minutes;
}
var dateLongFormatter = (pattern, formatLong$2) => {
	switch (pattern) {
		case "P": return formatLong$2.date({ width: "short" });
		case "PP": return formatLong$2.date({ width: "medium" });
		case "PPP": return formatLong$2.date({ width: "long" });
		case "PPPP":
		default: return formatLong$2.date({ width: "full" });
	}
};
var timeLongFormatter = (pattern, formatLong$2) => {
	switch (pattern) {
		case "p": return formatLong$2.time({ width: "short" });
		case "pp": return formatLong$2.time({ width: "medium" });
		case "ppp": return formatLong$2.time({ width: "long" });
		case "pppp":
		default: return formatLong$2.time({ width: "full" });
	}
};
var dateTimeLongFormatter = (pattern, formatLong$2) => {
	const matchResult = pattern.match(/(P+)(p+)?/) || [];
	const datePattern = matchResult[1];
	const timePattern = matchResult[2];
	if (!timePattern) return dateLongFormatter(pattern, formatLong$2);
	let dateTimeFormat;
	switch (datePattern) {
		case "P":
			dateTimeFormat = formatLong$2.dateTime({ width: "short" });
			break;
		case "PP":
			dateTimeFormat = formatLong$2.dateTime({ width: "medium" });
			break;
		case "PPP":
			dateTimeFormat = formatLong$2.dateTime({ width: "long" });
			break;
		case "PPPP":
		default:
			dateTimeFormat = formatLong$2.dateTime({ width: "full" });
			break;
	}
	return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong$2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong$2));
};
const longFormatters = {
	p: timeLongFormatter,
	P: dateTimeLongFormatter
};
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function isProtectedDayOfYearToken(token) {
	return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
	return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format$1, input) {
	const _message = message(token, format$1, input);
	console.warn(_message);
	if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format$1, input) {
	const subject = token[0] === "Y" ? "years" : "days of the month";
	return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format$1}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
	const defaultOptions$1 = getDefaultOptions();
	const locale = options?.locale ?? defaultOptions$1.locale ?? enUS$1;
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions$1.firstWeekContainsDate ?? defaultOptions$1.locale?.options?.firstWeekContainsDate ?? 1;
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions$1.weekStartsOn ?? defaultOptions$1.locale?.options?.weekStartsOn ?? 0;
	const originalDate = toDate(date, options?.in);
	if (!isValid(originalDate)) throw new RangeError("Invalid time value");
	let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
		const firstCharacter = substring[0];
		if (firstCharacter === "p" || firstCharacter === "P") {
			const longFormatter = longFormatters[firstCharacter];
			return longFormatter(substring, locale.formatLong);
		}
		return substring;
	}).join("").match(formattingTokensRegExp).map((substring) => {
		if (substring === "''") return {
			isToken: false,
			value: "'"
		};
		const firstCharacter = substring[0];
		if (firstCharacter === "'") return {
			isToken: false,
			value: cleanEscapedString(substring)
		};
		if (formatters[firstCharacter]) return {
			isToken: true,
			value: substring
		};
		if (firstCharacter.match(unescapedLatinCharacterRegExp)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
		return {
			isToken: false,
			value: substring
		};
	});
	if (locale.localize.preprocessor) parts = locale.localize.preprocessor(originalDate, parts);
	const formatterOptions = {
		firstWeekContainsDate,
		weekStartsOn,
		locale
	};
	return parts.map((part) => {
		if (!part.isToken) return part.value;
		const token = part.value;
		if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) warnOrThrowProtectedError(token, formatStr, String(date));
		const formatter = formatters[token[0]];
		return formatter(originalDate, token, locale.localize, formatterOptions);
	}).join("");
}
function cleanEscapedString(input) {
	const matched = input.match(escapedStringRegExp);
	if (!matched) return input;
	return matched[1].replace(doubleQuoteRegExp, "'");
}
function getDaysInMonth(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const monthIndex = _date.getMonth();
	const lastDayOfMonth = constructFrom(_date, 0);
	lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
	lastDayOfMonth.setHours(0, 0, 0, 0);
	return lastDayOfMonth.getDate();
}
function getMonth(date, options) {
	return toDate(date, options?.in).getMonth();
}
function getYear(date, options) {
	return toDate(date, options?.in).getFullYear();
}
function isAfter(date, dateToCompare) {
	return +toDate(date) > +toDate(dateToCompare);
}
function isBefore(date, dateToCompare) {
	return +toDate(date) < +toDate(dateToCompare);
}
function isSameMonth(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	return laterDate_.getFullYear() === earlierDate_.getFullYear() && laterDate_.getMonth() === earlierDate_.getMonth();
}
function isSameYear(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	return laterDate_.getFullYear() === earlierDate_.getFullYear();
}
function subDays(date, amount, options) {
	return addDays(date, -amount, options);
}
function parseISO(argument, options) {
	const invalidDate = () => constructFrom(options?.in, NaN);
	const additionalDigits = options?.additionalDigits ?? 2;
	const dateStrings = splitDateString(argument);
	let date;
	if (dateStrings.date) {
		const parseYearResult = parseYear(dateStrings.date, additionalDigits);
		date = parseDate(parseYearResult.restDateString, parseYearResult.year);
	}
	if (!date || isNaN(+date)) return invalidDate();
	const timestamp = +date;
	let time = 0;
	let offset;
	if (dateStrings.time) {
		time = parseTime(dateStrings.time);
		if (isNaN(time)) return invalidDate();
	}
	if (dateStrings.timezone) {
		offset = parseTimezone(dateStrings.timezone);
		if (isNaN(offset)) return invalidDate();
	} else {
		const tmpDate = new Date(timestamp + time);
		const result = toDate(0, options?.in);
		result.setFullYear(tmpDate.getUTCFullYear(), tmpDate.getUTCMonth(), tmpDate.getUTCDate());
		result.setHours(tmpDate.getUTCHours(), tmpDate.getUTCMinutes(), tmpDate.getUTCSeconds(), tmpDate.getUTCMilliseconds());
		return result;
	}
	return toDate(timestamp + time + offset, options?.in);
}
var patterns = {
	dateTimeDelimiter: /[T ]/,
	timeZoneDelimiter: /[Z ]/i,
	timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
	const dateStrings = {};
	const array = dateString.split(patterns.dateTimeDelimiter);
	let timeString;
	if (array.length > 2) return dateStrings;
	if (/:/.test(array[0])) timeString = array[0];
	else {
		dateStrings.date = array[0];
		timeString = array[1];
		if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
			dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
			timeString = dateString.substr(dateStrings.date.length, dateString.length);
		}
	}
	if (timeString) {
		const token = patterns.timezone.exec(timeString);
		if (token) {
			dateStrings.time = timeString.replace(token[1], "");
			dateStrings.timezone = token[1];
		} else dateStrings.time = timeString;
	}
	return dateStrings;
}
function parseYear(dateString, additionalDigits) {
	const regex = /* @__PURE__ */ new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)");
	const captures = dateString.match(regex);
	if (!captures) return {
		year: NaN,
		restDateString: ""
	};
	const year = captures[1] ? parseInt(captures[1]) : null;
	const century = captures[2] ? parseInt(captures[2]) : null;
	return {
		year: century === null ? year : century * 100,
		restDateString: dateString.slice((captures[1] || captures[2]).length)
	};
}
function parseDate(dateString, year) {
	if (year === null) return /* @__PURE__ */ new Date(NaN);
	const captures = dateString.match(dateRegex);
	if (!captures) return /* @__PURE__ */ new Date(NaN);
	const isWeekDate = !!captures[4];
	const dayOfYear = parseDateUnit(captures[1]);
	const month = parseDateUnit(captures[2]) - 1;
	const day = parseDateUnit(captures[3]);
	const week = parseDateUnit(captures[4]);
	const dayOfWeek = parseDateUnit(captures[5]) - 1;
	if (isWeekDate) {
		if (!validateWeekDate(year, week, dayOfWeek)) return /* @__PURE__ */ new Date(NaN);
		return dayOfISOWeekYear(year, week, dayOfWeek);
	} else {
		const date = /* @__PURE__ */ new Date(0);
		if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) return /* @__PURE__ */ new Date(NaN);
		date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
		return date;
	}
}
function parseDateUnit(value) {
	return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
	const captures = timeString.match(timeRegex);
	if (!captures) return NaN;
	const hours = parseTimeUnit(captures[1]);
	const minutes = parseTimeUnit(captures[2]);
	const seconds = parseTimeUnit(captures[3]);
	if (!validateTime(hours, minutes, seconds)) return NaN;
	return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
	return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
	if (timezoneString === "Z") return 0;
	const captures = timezoneString.match(timezoneRegex);
	if (!captures) return 0;
	const sign = captures[1] === "+" ? -1 : 1;
	const hours = parseInt(captures[2]);
	const minutes = captures[3] && parseInt(captures[3]) || 0;
	if (!validateTimezone(hours, minutes)) return NaN;
	return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
	const date = /* @__PURE__ */ new Date(0);
	date.setUTCFullYear(isoWeekYear, 0, 4);
	const fourthOfJanuaryDay = date.getUTCDay() || 7;
	const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
	date.setUTCDate(date.getUTCDate() + diff);
	return date;
}
var daysInMonths = [
	31,
	null,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
];
function isLeapYearIndex(year) {
	return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
	return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
	return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
	return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
	if (hours === 24) return minutes === 0 && seconds === 0;
	return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
	return minutes >= 0 && minutes <= 59;
}
function setMonth(date, month, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const day = _date.getDate();
	const midMonth = constructFrom(options?.in || date, 0);
	midMonth.setFullYear(year, month, 15);
	midMonth.setHours(0, 0, 0, 0);
	const daysInMonth = getDaysInMonth(midMonth);
	_date.setMonth(month, Math.min(day, daysInMonth));
	return _date;
}
function setYear(date, year, options) {
	const date_ = toDate(date, options?.in);
	if (isNaN(+date_)) return constructFrom(options?.in || date, NaN);
	date_.setFullYear(year);
	return date_;
}
var formatDistanceLocale = {
	lessThanXSeconds: {
		one: "menos de um segundo",
		other: "menos de {{count}} segundos"
	},
	xSeconds: {
		one: "1 segundo",
		other: "{{count}} segundos"
	},
	halfAMinute: "meio minuto",
	lessThanXMinutes: {
		one: "menos de um minuto",
		other: "menos de {{count}} minutos"
	},
	xMinutes: {
		one: "1 minuto",
		other: "{{count}} minutos"
	},
	aboutXHours: {
		one: "cerca de 1 hora",
		other: "cerca de {{count}} horas"
	},
	xHours: {
		one: "1 hora",
		other: "{{count}} horas"
	},
	xDays: {
		one: "1 dia",
		other: "{{count}} dias"
	},
	aboutXWeeks: {
		one: "cerca de 1 semana",
		other: "cerca de {{count}} semanas"
	},
	xWeeks: {
		one: "1 semana",
		other: "{{count}} semanas"
	},
	aboutXMonths: {
		one: "cerca de 1 mês",
		other: "cerca de {{count}} meses"
	},
	xMonths: {
		one: "1 mês",
		other: "{{count}} meses"
	},
	aboutXYears: {
		one: "cerca de 1 ano",
		other: "cerca de {{count}} anos"
	},
	xYears: {
		one: "1 ano",
		other: "{{count}} anos"
	},
	overXYears: {
		one: "mais de 1 ano",
		other: "mais de {{count}} anos"
	},
	almostXYears: {
		one: "quase 1 ano",
		other: "quase {{count}} anos"
	}
};
const formatDistance = (token, count, options) => {
	let result;
	const tokenValue = formatDistanceLocale[token];
	if (typeof tokenValue === "string") result = tokenValue;
	else if (count === 1) result = tokenValue.one;
	else result = tokenValue.other.replace("{{count}}", String(count));
	if (options?.addSuffix) if (options.comparison && options.comparison > 0) return "em " + result;
	else return "há " + result;
	return result;
};
const formatLong = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE, d 'de' MMMM 'de' y",
			long: "d 'de' MMMM 'de' y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'às' {{time}}",
			long: "{{date}} 'às' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
var formatRelativeLocale = {
	lastWeek: (date) => {
		const weekday = date.getDay();
		return "'" + (weekday === 0 || weekday === 6 ? "último" : "última") + "' eeee 'às' p";
	},
	yesterday: "'ontem às' p",
	today: "'hoje às' p",
	tomorrow: "'amanhã às' p",
	nextWeek: "eeee 'às' p",
	other: "P"
};
const formatRelative = (token, date, _baseDate, _options) => {
	const format$1 = formatRelativeLocale[token];
	if (typeof format$1 === "function") return format$1(date);
	return format$1;
};
var eraValues = {
	narrow: ["AC", "DC"],
	abbreviated: ["AC", "DC"],
	wide: ["antes de cristo", "depois de cristo"]
};
var quarterValues = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"T1",
		"T2",
		"T3",
		"T4"
	],
	wide: [
		"1º trimestre",
		"2º trimestre",
		"3º trimestre",
		"4º trimestre"
	]
};
var monthValues = {
	narrow: [
		"j",
		"f",
		"m",
		"a",
		"m",
		"j",
		"j",
		"a",
		"s",
		"o",
		"n",
		"d"
	],
	abbreviated: [
		"jan",
		"fev",
		"mar",
		"abr",
		"mai",
		"jun",
		"jul",
		"ago",
		"set",
		"out",
		"nov",
		"dez"
	],
	wide: [
		"janeiro",
		"fevereiro",
		"março",
		"abril",
		"maio",
		"junho",
		"julho",
		"agosto",
		"setembro",
		"outubro",
		"novembro",
		"dezembro"
	]
};
var dayValues = {
	narrow: [
		"D",
		"S",
		"T",
		"Q",
		"Q",
		"S",
		"S"
	],
	short: [
		"dom",
		"seg",
		"ter",
		"qua",
		"qui",
		"sex",
		"sab"
	],
	abbreviated: [
		"domingo",
		"segunda",
		"terça",
		"quarta",
		"quinta",
		"sexta",
		"sábado"
	],
	wide: [
		"domingo",
		"segunda-feira",
		"terça-feira",
		"quarta-feira",
		"quinta-feira",
		"sexta-feira",
		"sábado"
	]
};
var dayPeriodValues = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mn",
		noon: "md",
		morning: "manhã",
		afternoon: "tarde",
		evening: "tarde",
		night: "noite"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "manhã",
		afternoon: "tarde",
		evening: "tarde",
		night: "noite"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "manhã",
		afternoon: "tarde",
		evening: "tarde",
		night: "noite"
	}
};
var formattingDayPeriodValues = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mn",
		noon: "md",
		morning: "da manhã",
		afternoon: "da tarde",
		evening: "da tarde",
		night: "da noite"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "da manhã",
		afternoon: "da tarde",
		evening: "da tarde",
		night: "da noite"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "da manhã",
		afternoon: "da tarde",
		evening: "da tarde",
		night: "da noite"
	}
};
var ordinalNumber = (dirtyNumber, options) => {
	const number = Number(dirtyNumber);
	if (options?.unit === "week") return number + "ª";
	return number + "º";
};
const ptBR = {
	code: "pt-BR",
	formatDistance,
	formatLong,
	formatRelative,
	localize: {
		ordinalNumber,
		era: buildLocalizeFn({
			values: eraValues,
			defaultWidth: "wide"
		}),
		quarter: buildLocalizeFn({
			values: quarterValues,
			defaultWidth: "wide",
			argumentCallback: (quarter) => quarter - 1
		}),
		month: buildLocalizeFn({
			values: monthValues,
			defaultWidth: "wide"
		}),
		day: buildLocalizeFn({
			values: dayValues,
			defaultWidth: "wide"
		}),
		dayPeriod: buildLocalizeFn({
			values: dayPeriodValues,
			defaultWidth: "wide",
			formattingValues: formattingDayPeriodValues,
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)[ºªo]?/i,
			parsePattern: /\d+/i,
			valueCallback: (value) => parseInt(value, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(ac|dc|a|d)/i,
				abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
				wide: /^(antes de cristo|depois de cristo)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				any: [/^ac/i, /^dc/i],
				wide: [/^antes de cristo/i, /^depois de cristo/i]
			},
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^T[1234]/i,
				wide: /^[1234](º)? trimestre/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (index) => index + 1
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[jfmajsond]/i,
				abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
				wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^fev/i,
					/^mar/i,
					/^abr/i,
					/^mai/i,
					/^jun/i,
					/^jul/i,
					/^ago/i,
					/^set/i,
					/^out/i,
					/^nov/i,
					/^dez/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^(dom|[23456]ª?|s[aá]b)/i,
				short: /^(dom|[23456]ª?|s[aá]b)/i,
				abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
				wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				short: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				narrow: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				any: [
					/^d/i,
					/^seg/i,
					/^t/i,
					/^qua/i,
					/^qui/i,
					/^sex/i,
					/^s[aá]b/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
				any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mn|^meia[-\s]noite/i,
				noon: /^md|^meio[-\s]dia/i,
				morning: /manhã/i,
				afternoon: /tarde/i,
				evening: /tarde/i,
				night: /noite/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var POPOVER_NAME = "Popover";
var [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [createPopperScope]);
var usePopperScope$1 = createPopperScope();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover$1 = (props) => {
	const { __scopePopover, children, open: openProp, defaultOpen, onOpenChange, modal = false } = props;
	const popperScope = usePopperScope$1(__scopePopover);
	const triggerRef = import_react.useRef(null);
	const [hasCustomAnchor, setHasCustomAnchor] = import_react.useState(false);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: POPOVER_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$2, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverProvider, {
			scope: __scopePopover,
			contentId: useId(),
			triggerRef,
			open,
			onOpenChange: setOpen,
			onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
			hasCustomAnchor,
			onCustomAnchorAdd: import_react.useCallback(() => setHasCustomAnchor(true), []),
			onCustomAnchorRemove: import_react.useCallback(() => setHasCustomAnchor(false), []),
			modal,
			children
		})
	});
};
Popover$1.displayName = POPOVER_NAME;
var ANCHOR_NAME = "PopoverAnchor";
var PopoverAnchor = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover, ...anchorProps } = props;
	const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
	const popperScope = usePopperScope$1(__scopePopover);
	const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
	import_react.useEffect(() => {
		onCustomAnchorAdd();
		return () => onCustomAnchorRemove();
	}, [onCustomAnchorAdd, onCustomAnchorRemove]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
		...popperScope,
		...anchorProps,
		ref: forwardedRef
	});
});
PopoverAnchor.displayName = ANCHOR_NAME;
var TRIGGER_NAME$1 = "PopoverTrigger";
var PopoverTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover, ...triggerProps } = props;
	const context = usePopoverContext(TRIGGER_NAME$1, __scopePopover);
	const popperScope = usePopperScope$1(__scopePopover);
	const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
	const trigger = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": context.open,
		"aria-controls": context.contentId,
		"data-state": getState(context.open),
		...triggerProps,
		ref: composedTriggerRef,
		onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
	});
	return context.hasCustomAnchor ? trigger : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
		asChild: true,
		...popperScope,
		children: trigger
	});
});
PopoverTrigger$1.displayName = TRIGGER_NAME$1;
var PORTAL_NAME$1 = "PopoverPortal";
var [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME$1, { forceMount: void 0 });
var PopoverPortal = (props) => {
	const { __scopePopover, forceMount, children, container } = props;
	const context = usePopoverContext(PORTAL_NAME$1, __scopePopover);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: __scopePopover,
		forceMount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
				asChild: true,
				container,
				children
			})
		})
	});
};
PopoverPortal.displayName = PORTAL_NAME$1;
var CONTENT_NAME$1 = "PopoverContent";
var PopoverContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopePopover);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = usePopoverContext(CONTENT_NAME$1, props.__scopePopover);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentModal, {
			...contentProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentNonModal, {
			...contentProps,
			ref: forwardedRef
		})
	});
});
PopoverContent$1.displayName = CONTENT_NAME$1;
var Slot$1 = createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = import_react.forwardRef((props, forwardedRef) => {
	const context = usePopoverContext(CONTENT_NAME$1, props.__scopePopover);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef);
	const isRightClickOutsideRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const content = contentRef.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combination_default, {
		as: Slot$1,
		allowPinchZoom: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentImpl, {
			...props,
			ref: composedRefs,
			trapFocus: context.open,
			disableOutsidePointerEvents: true,
			onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
				event.preventDefault();
				if (!isRightClickOutsideRef.current) context.triggerRef.current?.focus();
			}),
			onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
				const originalEvent = event.detail.originalEvent;
				const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
				isRightClickOutsideRef.current = originalEvent.button === 2 || ctrlLeftClick;
			}, { checkForDefaultPrevented: false }),
			onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault(), { checkForDefaultPrevented: false })
		})
	});
});
var PopoverContentNonModal = import_react.forwardRef((props, forwardedRef) => {
	const context = usePopoverContext(CONTENT_NAME$1, props.__scopePopover);
	const hasInteractedOutsideRef = import_react.useRef(false);
	const hasPointerDownOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		onCloseAutoFocus: (event) => {
			props.onCloseAutoFocus?.(event);
			if (!event.defaultPrevented) {
				if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
				event.preventDefault();
			}
			hasInteractedOutsideRef.current = false;
			hasPointerDownOutsideRef.current = false;
		},
		onInteractOutside: (event) => {
			props.onInteractOutside?.(event);
			if (!event.defaultPrevented) {
				hasInteractedOutsideRef.current = true;
				if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.current = true;
			}
			const target = event.target;
			if (context.triggerRef.current?.contains(target)) event.preventDefault();
			if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) event.preventDefault();
		}
	});
});
var PopoverContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover, trapFocus, onOpenAutoFocus, onCloseAutoFocus, disableOutsidePointerEvents, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, ...contentProps } = props;
	const context = usePopoverContext(CONTENT_NAME$1, __scopePopover);
	const popperScope = usePopperScope$1(__scopePopover);
	useFocusGuards();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
		asChild: true,
		loop: true,
		trapped: trapFocus,
		onMountAutoFocus: onOpenAutoFocus,
		onUnmountAutoFocus: onCloseAutoFocus,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
			asChild: true,
			disableOutsidePointerEvents,
			onInteractOutside,
			onEscapeKeyDown,
			onPointerDownOutside,
			onFocusOutside,
			onDismiss: () => context.onOpenChange(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
				"data-state": getState(context.open),
				role: "dialog",
				id: context.contentId,
				...popperScope,
				...contentProps,
				ref: forwardedRef,
				style: {
					...contentProps.style,
					"--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
					"--radix-popover-content-available-width": "var(--radix-popper-available-width)",
					"--radix-popover-content-available-height": "var(--radix-popper-available-height)",
					"--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
					"--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
				}
			})
		})
	});
});
var CLOSE_NAME = "PopoverClose";
var PopoverClose = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover, ...closeProps } = props;
	const context = usePopoverContext(CLOSE_NAME, __scopePopover);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		...closeProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
	});
});
PopoverClose.displayName = CLOSE_NAME;
var ARROW_NAME$1 = "PopoverArrow";
var PopoverArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopover, ...arrowProps } = props;
	const popperScope = usePopperScope$1(__scopePopover);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
		...popperScope,
		...arrowProps,
		ref: forwardedRef
	});
});
PopoverArrow.displayName = ARROW_NAME$1;
function getState(open) {
	return open ? "open" : "closed";
}
var Root2$1 = Popover$1;
var Trigger$1 = PopoverTrigger$1;
var Portal$2 = PopoverPortal;
var Content2$1 = PopoverContent$1;
var Popover = Root2$1;
var PopoverTrigger = Trigger$1;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]", className),
	...props
}) }));
PopoverContent.displayName = Content2$1.displayName;
function tzName(timeZone, date, format$1 = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone,
		timeZoneName: format$1
	}).format(date).split(/\s/g).slice(2).join(" ");
}
var offsetFormatCache = {};
var offsetCache = {};
function tzOffset(timeZone, date) {
	try {
		const offsetStr = (offsetFormatCache[timeZone] ||= new Intl.DateTimeFormat("en-US", {
			timeZone,
			timeZoneName: "longOffset"
		}).format)(date).split("GMT")[1];
		if (offsetStr in offsetCache) return offsetCache[offsetStr];
		return calcOffset(offsetStr, offsetStr.split(":"));
	} catch {
		if (timeZone in offsetCache) return offsetCache[timeZone];
		const captures = timeZone?.match(offsetRe);
		if (captures) return calcOffset(timeZone, captures.slice(1));
		return NaN;
	}
}
var offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(cacheStr, values) {
	const hours = +(values[0] || 0);
	const minutes = +(values[1] || 0);
	const seconds = +(values[2] || 0) / 60;
	return offsetCache[cacheStr] = hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds;
}
var TZDateMini = class TZDateMini extends Date {
	constructor(...args) {
		super();
		if (args.length > 1 && typeof args[args.length - 1] === "string") this.timeZone = args.pop();
		this.internal = /* @__PURE__ */ new Date();
		if (isNaN(tzOffset(this.timeZone, this))) this.setTime(NaN);
		else if (!args.length) this.setTime(Date.now());
		else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) this.setTime(args[0]);
		else if (typeof args[0] === "string") this.setTime(+new Date(args[0]));
		else if (args[0] instanceof Date) this.setTime(+args[0]);
		else {
			this.setTime(+new Date(...args));
			adjustToSystemTZ(this, NaN);
			syncToInternal(this);
		}
	}
	static tz(tz, ...args) {
		return args.length ? new TZDateMini(...args, tz) : new TZDateMini(Date.now(), tz);
	}
	withTimeZone(timeZone) {
		return new TZDateMini(+this, timeZone);
	}
	getTimezoneOffset() {
		const offset = -tzOffset(this.timeZone, this);
		return offset > 0 ? Math.floor(offset) : Math.ceil(offset);
	}
	setTime(time) {
		Date.prototype.setTime.apply(this, arguments);
		syncToInternal(this);
		return +this;
	}
	[Symbol.for("constructDateFrom")](date) {
		return new TZDateMini(+new Date(date), this.timeZone);
	}
};
var re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
	if (!re.test(method)) return;
	const utcMethod = method.replace(re, "$1UTC");
	if (!TZDateMini.prototype[utcMethod]) return;
	if (method.startsWith("get")) TZDateMini.prototype[method] = function() {
		return this.internal[utcMethod]();
	};
	else {
		TZDateMini.prototype[method] = function() {
			Date.prototype[utcMethod].apply(this.internal, arguments);
			syncFromInternal(this);
			return +this;
		};
		TZDateMini.prototype[utcMethod] = function() {
			Date.prototype[utcMethod].apply(this, arguments);
			syncToInternal(this);
			return +this;
		};
	}
});
function syncToInternal(date) {
	date.internal.setTime(+date);
	date.internal.setUTCSeconds(date.internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, date) * 60));
}
function syncFromInternal(date) {
	Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
	Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());
	adjustToSystemTZ(date);
}
function adjustToSystemTZ(date) {
	const baseOffset = tzOffset(date.timeZone, date);
	const offset = baseOffset > 0 ? Math.floor(baseOffset) : Math.ceil(baseOffset);
	const prevHour = /* @__PURE__ */ new Date(+date);
	prevHour.setUTCHours(prevHour.getUTCHours() - 1);
	const systemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
	const systemDSTChange = systemOffset - -(/* @__PURE__ */ new Date(+prevHour)).getTimezoneOffset();
	const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours();
	if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange);
	const offsetDiff = systemOffset - offset;
	if (offsetDiff) Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);
	const systemDate = /* @__PURE__ */ new Date(+date);
	systemDate.setUTCSeconds(0);
	const systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60;
	const secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60;
	if (secondsOffset || systemSecondsOffset) {
		date.internal.setUTCSeconds(date.internal.getUTCSeconds() + secondsOffset);
		Date.prototype.setUTCSeconds.call(date, Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset);
	}
	const postBaseOffset = tzOffset(date.timeZone, date);
	const postOffset = postBaseOffset > 0 ? Math.floor(postBaseOffset) : Math.ceil(postBaseOffset);
	const postOffsetDiff = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset() - postOffset;
	const offsetChanged = postOffset !== offset;
	const postDiff = postOffsetDiff - offsetDiff;
	if (offsetChanged && postDiff) {
		Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);
		const newBaseOffset = tzOffset(date.timeZone, date);
		const offsetChange = postOffset - (newBaseOffset > 0 ? Math.floor(newBaseOffset) : Math.ceil(newBaseOffset));
		if (offsetChange) {
			date.internal.setUTCMinutes(date.internal.getUTCMinutes() + offsetChange);
			Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
		}
	}
}
var TZDate = class TZDate extends TZDateMini {
	static tz(tz, ...args) {
		return args.length ? new TZDate(...args, tz) : new TZDate(Date.now(), tz);
	}
	toISOString() {
		const [sign, hours, minutes] = this.tzComponents();
		const tz = `${sign}${hours}:${minutes}`;
		return this.internal.toISOString().slice(0, -1) + tz;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		const [day, date, month, year] = this.internal.toUTCString().split(" ");
		return `${day?.slice(0, -1)} ${month} ${date} ${year}`;
	}
	toTimeString() {
		const time = this.internal.toUTCString().split(" ")[4];
		const [sign, hours, minutes] = this.tzComponents();
		return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
	}
	toLocaleString(locales, options) {
		return Date.prototype.toLocaleString.call(this, locales, {
			...options,
			timeZone: options?.timeZone || this.timeZone
		});
	}
	toLocaleDateString(locales, options) {
		return Date.prototype.toLocaleDateString.call(this, locales, {
			...options,
			timeZone: options?.timeZone || this.timeZone
		});
	}
	toLocaleTimeString(locales, options) {
		return Date.prototype.toLocaleTimeString.call(this, locales, {
			...options,
			timeZone: options?.timeZone || this.timeZone
		});
	}
	tzComponents() {
		const offset = this.getTimezoneOffset();
		return [
			offset > 0 ? "-" : "+",
			String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0"),
			String(Math.abs(offset) % 60).padStart(2, "0")
		];
	}
	withTimeZone(timeZone) {
		return new TZDate(+this, timeZone);
	}
	[Symbol.for("constructDateFrom")](date) {
		return new TZDate(+new Date(date), this.timeZone);
	}
};
var FIVE_WEEKS = 5;
var FOUR_WEEKS = 4;
function getBroadcastWeeksInMonth(month, dateLib) {
	const firstDayOfMonth = dateLib.startOfMonth(month);
	const firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7;
	const broadcastStartDate = dateLib.addDays(month, -firstDayOfWeek + 1);
	const lastDateOfLastWeek = dateLib.addDays(broadcastStartDate, FIVE_WEEKS * 7 - 1);
	return dateLib.getMonth(month) === dateLib.getMonth(lastDateOfLastWeek) ? FIVE_WEEKS : FOUR_WEEKS;
}
function startOfBroadcastWeek(date, dateLib) {
	const firstOfMonth = dateLib.startOfMonth(date);
	const dayOfWeek = firstOfMonth.getDay();
	if (dayOfWeek === 1) return firstOfMonth;
	else if (dayOfWeek === 0) return dateLib.addDays(firstOfMonth, -6);
	else return dateLib.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
}
function endOfBroadcastWeek(date, dateLib) {
	const startDate = startOfBroadcastWeek(date, dateLib);
	const numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib);
	return dateLib.addDays(startDate, numberOfWeeks * 7 - 1);
}
const enUS = {
	...enUS$1,
	labels: {
		labelDayButton: (date, modifiers, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			let label = formatDate(date, "PPPP");
			if (modifiers.today) label = `Today, ${label}`;
			if (modifiers.selected) label = `${label}, selected`;
			return label;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (date, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			return formatDate(date, "LLLL yyyy");
		},
		labelGridcell: (date, modifiers, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			let label = formatDate(date, "PPPP");
			if (modifiers?.today) label = `Today, ${label}`;
			return label;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (date, options, dateLib) => {
			let formatDate;
			if (dateLib && typeof dateLib.format === "function") formatDate = dateLib.format.bind(dateLib);
			else formatDate = (d, pattern) => format(d, pattern, {
				locale: enUS$1,
				...options
			});
			return formatDate(date, "cccc");
		}
	}
};
var DateLib = class DateLib {
	constructor(options, overrides) {
		this.Date = Date;
		this.today = () => {
			if (this.overrides?.today) return this.overrides.today();
			if (this.options.timeZone) return TZDate.tz(this.options.timeZone);
			return new this.Date();
		};
		this.newDate = (year, monthIndex, date) => {
			if (this.overrides?.newDate) return this.overrides.newDate(year, monthIndex, date);
			if (this.options.timeZone) return new TZDate(year, monthIndex, date, this.options.timeZone);
			return new Date(year, monthIndex, date);
		};
		this.addDays = (date, amount) => {
			return this.overrides?.addDays ? this.overrides.addDays(date, amount) : addDays(date, amount);
		};
		this.addMonths = (date, amount) => {
			return this.overrides?.addMonths ? this.overrides.addMonths(date, amount) : addMonths(date, amount);
		};
		this.addWeeks = (date, amount) => {
			return this.overrides?.addWeeks ? this.overrides.addWeeks(date, amount) : addWeeks(date, amount);
		};
		this.addYears = (date, amount) => {
			return this.overrides?.addYears ? this.overrides.addYears(date, amount) : addYears(date, amount);
		};
		this.differenceInCalendarDays = (dateLeft, dateRight) => {
			return this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(dateLeft, dateRight) : differenceInCalendarDays(dateLeft, dateRight);
		};
		this.differenceInCalendarMonths = (dateLeft, dateRight) => {
			return this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(dateLeft, dateRight) : differenceInCalendarMonths(dateLeft, dateRight);
		};
		this.eachMonthOfInterval = (interval) => {
			return this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(interval) : eachMonthOfInterval(interval);
		};
		this.eachYearOfInterval = (interval) => {
			const years = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(interval) : eachYearOfInterval(interval);
			const uniqueYears = new Set(years.map((d) => this.getYear(d)));
			if (uniqueYears.size === years.length) return years;
			const yearsArray = [];
			uniqueYears.forEach((y) => {
				yearsArray.push(new Date(y, 0, 1));
			});
			return yearsArray;
		};
		this.endOfBroadcastWeek = (date) => {
			return this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(date) : endOfBroadcastWeek(date, this);
		};
		this.endOfISOWeek = (date) => {
			return this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(date) : endOfISOWeek(date);
		};
		this.endOfMonth = (date) => {
			return this.overrides?.endOfMonth ? this.overrides.endOfMonth(date) : endOfMonth(date);
		};
		this.endOfWeek = (date, options$1) => {
			return this.overrides?.endOfWeek ? this.overrides.endOfWeek(date, options$1) : endOfWeek(date, this.options);
		};
		this.endOfYear = (date) => {
			return this.overrides?.endOfYear ? this.overrides.endOfYear(date) : endOfYear(date);
		};
		this.format = (date, formatStr, _options) => {
			const formatted = this.overrides?.format ? this.overrides.format(date, formatStr, this.options) : format(date, formatStr, this.options);
			if (this.options.numerals && this.options.numerals !== "latn") return this.replaceDigits(formatted);
			return formatted;
		};
		this.getISOWeek = (date) => {
			return this.overrides?.getISOWeek ? this.overrides.getISOWeek(date) : getISOWeek(date);
		};
		this.getMonth = (date, _options) => {
			return this.overrides?.getMonth ? this.overrides.getMonth(date, this.options) : getMonth(date, this.options);
		};
		this.getYear = (date, _options) => {
			return this.overrides?.getYear ? this.overrides.getYear(date, this.options) : getYear(date, this.options);
		};
		this.getWeek = (date, _options) => {
			return this.overrides?.getWeek ? this.overrides.getWeek(date, this.options) : getWeek(date, this.options);
		};
		this.isAfter = (date, dateToCompare) => {
			return this.overrides?.isAfter ? this.overrides.isAfter(date, dateToCompare) : isAfter(date, dateToCompare);
		};
		this.isBefore = (date, dateToCompare) => {
			return this.overrides?.isBefore ? this.overrides.isBefore(date, dateToCompare) : isBefore(date, dateToCompare);
		};
		this.isDate = (value) => {
			return this.overrides?.isDate ? this.overrides.isDate(value) : isDate(value);
		};
		this.isSameDay = (dateLeft, dateRight) => {
			return this.overrides?.isSameDay ? this.overrides.isSameDay(dateLeft, dateRight) : isSameDay(dateLeft, dateRight);
		};
		this.isSameMonth = (dateLeft, dateRight) => {
			return this.overrides?.isSameMonth ? this.overrides.isSameMonth(dateLeft, dateRight) : isSameMonth(dateLeft, dateRight);
		};
		this.isSameYear = (dateLeft, dateRight) => {
			return this.overrides?.isSameYear ? this.overrides.isSameYear(dateLeft, dateRight) : isSameYear(dateLeft, dateRight);
		};
		this.max = (dates) => {
			return this.overrides?.max ? this.overrides.max(dates) : max(dates);
		};
		this.min = (dates) => {
			return this.overrides?.min ? this.overrides.min(dates) : min(dates);
		};
		this.setMonth = (date, month) => {
			return this.overrides?.setMonth ? this.overrides.setMonth(date, month) : setMonth(date, month);
		};
		this.setYear = (date, year) => {
			return this.overrides?.setYear ? this.overrides.setYear(date, year) : setYear(date, year);
		};
		this.startOfBroadcastWeek = (date, _dateLib) => {
			return this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(date, this) : startOfBroadcastWeek(date, this);
		};
		this.startOfDay = (date) => {
			return this.overrides?.startOfDay ? this.overrides.startOfDay(date) : startOfDay(date);
		};
		this.startOfISOWeek = (date) => {
			return this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(date) : startOfISOWeek(date);
		};
		this.startOfMonth = (date) => {
			return this.overrides?.startOfMonth ? this.overrides.startOfMonth(date) : startOfMonth(date);
		};
		this.startOfWeek = (date, _options) => {
			return this.overrides?.startOfWeek ? this.overrides.startOfWeek(date, this.options) : startOfWeek(date, this.options);
		};
		this.startOfYear = (date) => {
			return this.overrides?.startOfYear ? this.overrides.startOfYear(date) : startOfYear(date);
		};
		this.options = {
			locale: enUS,
			...options
		};
		this.overrides = overrides;
	}
	getDigitMap() {
		const { numerals = "latn" } = this.options;
		const formatter = new Intl.NumberFormat("en-US", { numberingSystem: numerals });
		const digitMap = {};
		for (let i = 0; i < 10; i++) digitMap[i.toString()] = formatter.format(i);
		return digitMap;
	}
	replaceDigits(input) {
		const digitMap = this.getDigitMap();
		return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
	}
	formatNumber(value) {
		return this.replaceDigits(value.toString());
	}
	getMonthYearOrder() {
		const code = this.options.locale?.code;
		if (!code) return "month-first";
		return DateLib.yearFirstLocales.has(code) ? "year-first" : "month-first";
	}
	formatMonthYear(date) {
		const { locale, timeZone, numerals } = this.options;
		const localeCode = locale?.code;
		if (localeCode && DateLib.yearFirstLocales.has(localeCode)) try {
			return new Intl.DateTimeFormat(localeCode, {
				month: "long",
				year: "numeric",
				timeZone,
				numberingSystem: numerals
			}).format(date);
		} catch {}
		const pattern = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
		return this.format(date, pattern);
	}
};
DateLib.yearFirstLocales = new Set([
	"eu",
	"hu",
	"ja",
	"ja-Hira",
	"ja-JP",
	"ko",
	"ko-KR",
	"lt",
	"lt-LT",
	"lv",
	"lv-LV",
	"mn",
	"mn-MN",
	"zh",
	"zh-CN",
	"zh-HK",
	"zh-TW"
]);
const defaultDateLib = new DateLib();
var CalendarDay = class {
	constructor(date, displayMonth, dateLib = defaultDateLib) {
		this.date = date;
		this.displayMonth = displayMonth;
		this.outside = Boolean(displayMonth && !dateLib.isSameMonth(date, displayMonth));
		this.dateLib = dateLib;
		this.isoDate = dateLib.format(date, "yyyy-MM-dd");
		this.displayMonthId = dateLib.format(displayMonth, "yyyy-MM");
		this.dateMonthId = dateLib.format(date, "yyyy-MM");
	}
	isEqualTo(day) {
		return this.dateLib.isSameDay(day.date, this.date) && this.dateLib.isSameMonth(day.displayMonth, this.displayMonth);
	}
};
var CalendarMonth = class {
	constructor(month, weeks) {
		this.date = month;
		this.weeks = weeks;
	}
};
var CalendarWeek = class {
	constructor(weekNumber, days) {
		this.days = days;
		this.weekNumber = weekNumber;
	}
};
function Button$1(props) {
	return import_react.createElement("button", { ...props });
}
function CaptionLabel(props) {
	return import_react.createElement("span", { ...props });
}
function Chevron(props) {
	const { size = 24, orientation = "left", className } = props;
	return import_react.createElement("svg", {
		className,
		width: size,
		height: size,
		viewBox: "0 0 24 24"
	}, orientation === "up" && import_react.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }), orientation === "down" && import_react.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }), orientation === "left" && import_react.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }), orientation === "right" && import_react.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" }));
}
function Day(props) {
	const { day, modifiers, ...tdProps } = props;
	return import_react.createElement("td", { ...tdProps });
}
function DayButton(props) {
	const { day, modifiers, ...buttonProps } = props;
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return import_react.createElement("button", {
		ref,
		...buttonProps
	});
}
var UI;
(function(UI$1) {
	UI$1["Root"] = "root";
	UI$1["Chevron"] = "chevron";
	UI$1["Day"] = "day";
	UI$1["DayButton"] = "day_button";
	UI$1["CaptionLabel"] = "caption_label";
	UI$1["Dropdowns"] = "dropdowns";
	UI$1["Dropdown"] = "dropdown";
	UI$1["DropdownRoot"] = "dropdown_root";
	UI$1["Footer"] = "footer";
	UI$1["MonthGrid"] = "month_grid";
	UI$1["MonthCaption"] = "month_caption";
	UI$1["MonthsDropdown"] = "months_dropdown";
	UI$1["Month"] = "month";
	UI$1["Months"] = "months";
	UI$1["Nav"] = "nav";
	UI$1["NextMonthButton"] = "button_next";
	UI$1["PreviousMonthButton"] = "button_previous";
	UI$1["Week"] = "week";
	UI$1["Weeks"] = "weeks";
	UI$1["Weekday"] = "weekday";
	UI$1["Weekdays"] = "weekdays";
	UI$1["WeekNumber"] = "week_number";
	UI$1["WeekNumberHeader"] = "week_number_header";
	UI$1["YearsDropdown"] = "years_dropdown";
})(UI || (UI = {}));
var DayFlag;
(function(DayFlag$1) {
	DayFlag$1["disabled"] = "disabled";
	DayFlag$1["hidden"] = "hidden";
	DayFlag$1["outside"] = "outside";
	DayFlag$1["focused"] = "focused";
	DayFlag$1["today"] = "today";
})(DayFlag || (DayFlag = {}));
var SelectionState;
(function(SelectionState$1) {
	SelectionState$1["range_end"] = "range_end";
	SelectionState$1["range_middle"] = "range_middle";
	SelectionState$1["range_start"] = "range_start";
	SelectionState$1["selected"] = "selected";
})(SelectionState || (SelectionState = {}));
var Animation;
(function(Animation$1) {
	Animation$1["weeks_before_enter"] = "weeks_before_enter";
	Animation$1["weeks_before_exit"] = "weeks_before_exit";
	Animation$1["weeks_after_enter"] = "weeks_after_enter";
	Animation$1["weeks_after_exit"] = "weeks_after_exit";
	Animation$1["caption_after_enter"] = "caption_after_enter";
	Animation$1["caption_after_exit"] = "caption_after_exit";
	Animation$1["caption_before_enter"] = "caption_before_enter";
	Animation$1["caption_before_exit"] = "caption_before_exit";
})(Animation || (Animation = {}));
function Dropdown(props) {
	const { options, className, components, classNames, ...selectProps } = props;
	const cssClassSelect = [classNames[UI.Dropdown], className].join(" ");
	const selectedOption = options?.find(({ value }) => value === selectProps.value);
	return import_react.createElement("span", {
		"data-disabled": selectProps.disabled,
		className: classNames[UI.DropdownRoot]
	}, import_react.createElement(components.Select, {
		className: cssClassSelect,
		...selectProps
	}, options?.map(({ value, label, disabled }) => import_react.createElement(components.Option, {
		key: value,
		value,
		disabled
	}, label))), import_react.createElement("span", {
		className: classNames[UI.CaptionLabel],
		"aria-hidden": true
	}, selectedOption?.label, import_react.createElement(components.Chevron, {
		orientation: "down",
		size: 18,
		className: classNames[UI.Chevron]
	})));
}
function DropdownNav(props) {
	return import_react.createElement("div", { ...props });
}
function Footer(props) {
	return import_react.createElement("div", { ...props });
}
function Month(props) {
	const { calendarMonth, displayIndex, ...divProps } = props;
	return import_react.createElement("div", { ...divProps }, props.children);
}
function MonthCaption(props) {
	const { calendarMonth, displayIndex, ...divProps } = props;
	return import_react.createElement("div", { ...divProps });
}
function MonthGrid(props) {
	return import_react.createElement("table", { ...props });
}
function Months(props) {
	return import_react.createElement("div", { ...props });
}
const dayPickerContext = (0, import_react.createContext)(void 0);
function useDayPicker() {
	const context = (0, import_react.useContext)(dayPickerContext);
	if (context === void 0) throw new Error("useDayPicker() must be used within a custom component.");
	return context;
}
function MonthsDropdown(props) {
	const { components } = useDayPicker();
	return import_react.createElement(components.Dropdown, { ...props });
}
function Nav(props) {
	const { onPreviousClick, onNextClick, previousMonth, nextMonth, ...navProps } = props;
	const { components, classNames, labels: { labelPrevious: labelPrevious$1, labelNext: labelNext$1 } } = useDayPicker();
	const handleNextClick = (0, import_react.useCallback)((e) => {
		if (nextMonth) onNextClick?.(e);
	}, [nextMonth, onNextClick]);
	const handlePreviousClick = (0, import_react.useCallback)((e) => {
		if (previousMonth) onPreviousClick?.(e);
	}, [previousMonth, onPreviousClick]);
	return import_react.createElement("nav", { ...navProps }, import_react.createElement(components.PreviousMonthButton, {
		type: "button",
		className: classNames[UI.PreviousMonthButton],
		tabIndex: previousMonth ? void 0 : -1,
		"aria-disabled": previousMonth ? void 0 : true,
		"aria-label": labelPrevious$1(previousMonth),
		onClick: handlePreviousClick
	}, import_react.createElement(components.Chevron, {
		disabled: previousMonth ? void 0 : true,
		className: classNames[UI.Chevron],
		orientation: "left"
	})), import_react.createElement(components.NextMonthButton, {
		type: "button",
		className: classNames[UI.NextMonthButton],
		tabIndex: nextMonth ? void 0 : -1,
		"aria-disabled": nextMonth ? void 0 : true,
		"aria-label": labelNext$1(nextMonth),
		onClick: handleNextClick
	}, import_react.createElement(components.Chevron, {
		disabled: nextMonth ? void 0 : true,
		orientation: "right",
		className: classNames[UI.Chevron]
	})));
}
function NextMonthButton(props) {
	const { components } = useDayPicker();
	return import_react.createElement(components.Button, { ...props });
}
function Option(props) {
	return import_react.createElement("option", { ...props });
}
function PreviousMonthButton(props) {
	const { components } = useDayPicker();
	return import_react.createElement(components.Button, { ...props });
}
function Root(props) {
	const { rootRef, ...rest } = props;
	return import_react.createElement("div", {
		...rest,
		ref: rootRef
	});
}
function Select$2(props) {
	return import_react.createElement("select", { ...props });
}
function Week(props) {
	const { week, ...trProps } = props;
	return import_react.createElement("tr", { ...trProps });
}
function Weekday(props) {
	return import_react.createElement("th", { ...props });
}
function Weekdays(props) {
	return import_react.createElement("thead", { "aria-hidden": true }, import_react.createElement("tr", { ...props }));
}
function WeekNumber(props) {
	const { week, ...thProps } = props;
	return import_react.createElement("th", { ...thProps });
}
function WeekNumberHeader(props) {
	return import_react.createElement("th", { ...props });
}
function Weeks(props) {
	return import_react.createElement("tbody", { ...props });
}
function YearsDropdown(props) {
	const { components } = useDayPicker();
	return import_react.createElement(components.Dropdown, { ...props });
}
var custom_components_exports = /* @__PURE__ */ __export({
	Button: () => Button$1,
	CaptionLabel: () => CaptionLabel,
	Chevron: () => Chevron,
	Day: () => Day,
	DayButton: () => DayButton,
	Dropdown: () => Dropdown,
	DropdownNav: () => DropdownNav,
	Footer: () => Footer,
	Month: () => Month,
	MonthCaption: () => MonthCaption,
	MonthGrid: () => MonthGrid,
	Months: () => Months,
	MonthsDropdown: () => MonthsDropdown,
	Nav: () => Nav,
	NextMonthButton: () => NextMonthButton,
	Option: () => Option,
	PreviousMonthButton: () => PreviousMonthButton,
	Root: () => Root,
	Select: () => Select$2,
	Week: () => Week,
	WeekNumber: () => WeekNumber,
	WeekNumberHeader: () => WeekNumberHeader,
	Weekday: () => Weekday,
	Weekdays: () => Weekdays,
	Weeks: () => Weeks,
	YearsDropdown: () => YearsDropdown
}, 1);
function rangeIncludesDate(range, date, excludeEnds = false, dateLib = defaultDateLib) {
	let { from, to } = range;
	const { differenceInCalendarDays: differenceInCalendarDays$1, isSameDay: isSameDay$1 } = dateLib;
	if (from && to) {
		if (differenceInCalendarDays$1(to, from) < 0) [from, to] = [to, from];
		return differenceInCalendarDays$1(date, from) >= (excludeEnds ? 1 : 0) && differenceInCalendarDays$1(to, date) >= (excludeEnds ? 1 : 0);
	}
	if (!excludeEnds && to) return isSameDay$1(to, date);
	if (!excludeEnds && from) return isSameDay$1(from, date);
	return false;
}
function isDateInterval(matcher) {
	return Boolean(matcher && typeof matcher === "object" && "before" in matcher && "after" in matcher);
}
function isDateRange(value) {
	return Boolean(value && typeof value === "object" && "from" in value);
}
function isDateAfterType(value) {
	return Boolean(value && typeof value === "object" && "after" in value);
}
function isDateBeforeType(value) {
	return Boolean(value && typeof value === "object" && "before" in value);
}
function isDayOfWeekType(value) {
	return Boolean(value && typeof value === "object" && "dayOfWeek" in value);
}
function isDatesArray(value, dateLib) {
	return Array.isArray(value) && value.every(dateLib.isDate);
}
function dateMatchModifiers(date, matchers, dateLib = defaultDateLib) {
	const matchersArr = !Array.isArray(matchers) ? [matchers] : matchers;
	const { isSameDay: isSameDay$1, differenceInCalendarDays: differenceInCalendarDays$1, isAfter: isAfter$1 } = dateLib;
	return matchersArr.some((matcher) => {
		if (typeof matcher === "boolean") return matcher;
		if (dateLib.isDate(matcher)) return isSameDay$1(date, matcher);
		if (isDatesArray(matcher, dateLib)) return matcher.some((matcherDate) => isSameDay$1(date, matcherDate));
		if (isDateRange(matcher)) return rangeIncludesDate(matcher, date, false, dateLib);
		if (isDayOfWeekType(matcher)) {
			if (!Array.isArray(matcher.dayOfWeek)) return matcher.dayOfWeek === date.getDay();
			return matcher.dayOfWeek.includes(date.getDay());
		}
		if (isDateInterval(matcher)) {
			const diffBefore = differenceInCalendarDays$1(matcher.before, date);
			const diffAfter = differenceInCalendarDays$1(matcher.after, date);
			const isDayBefore = diffBefore > 0;
			const isDayAfter = diffAfter < 0;
			if (isAfter$1(matcher.before, matcher.after)) return isDayAfter && isDayBefore;
			else return isDayBefore || isDayAfter;
		}
		if (isDateAfterType(matcher)) return differenceInCalendarDays$1(date, matcher.after) > 0;
		if (isDateBeforeType(matcher)) return differenceInCalendarDays$1(matcher.before, date) > 0;
		if (typeof matcher === "function") return matcher(date);
		return false;
	});
}
function createGetModifiers(days, props, navStart, navEnd, dateLib) {
	const { disabled, hidden, modifiers, showOutsideDays, broadcastCalendar, today = dateLib.today() } = props;
	const { isSameDay: isSameDay$1, isSameMonth: isSameMonth$1, startOfMonth: startOfMonth$1, isBefore: isBefore$1, endOfMonth: endOfMonth$1, isAfter: isAfter$1 } = dateLib;
	const computedNavStart = navStart && startOfMonth$1(navStart);
	const computedNavEnd = navEnd && endOfMonth$1(navEnd);
	const internalModifiersMap = {
		[DayFlag.focused]: [],
		[DayFlag.outside]: [],
		[DayFlag.disabled]: [],
		[DayFlag.hidden]: [],
		[DayFlag.today]: []
	};
	const customModifiersMap = {};
	for (const day of days) {
		const { date, displayMonth } = day;
		const isOutside = Boolean(displayMonth && !isSameMonth$1(date, displayMonth));
		const isBeforeNavStart = Boolean(computedNavStart && isBefore$1(date, computedNavStart));
		const isAfterNavEnd = Boolean(computedNavEnd && isAfter$1(date, computedNavEnd));
		const isDisabled = Boolean(disabled && dateMatchModifiers(date, disabled, dateLib));
		const isHidden = Boolean(hidden && dateMatchModifiers(date, hidden, dateLib)) || isBeforeNavStart || isAfterNavEnd || !broadcastCalendar && !showOutsideDays && isOutside || broadcastCalendar && showOutsideDays === false && isOutside;
		const isToday = isSameDay$1(date, today);
		if (isOutside) internalModifiersMap.outside.push(day);
		if (isDisabled) internalModifiersMap.disabled.push(day);
		if (isHidden) internalModifiersMap.hidden.push(day);
		if (isToday) internalModifiersMap.today.push(day);
		if (modifiers) Object.keys(modifiers).forEach((name) => {
			const modifierValue = modifiers?.[name];
			if (!(modifierValue ? dateMatchModifiers(date, modifierValue, dateLib) : false)) return;
			if (customModifiersMap[name]) customModifiersMap[name].push(day);
			else customModifiersMap[name] = [day];
		});
	}
	return (day) => {
		const dayFlags = {
			[DayFlag.focused]: false,
			[DayFlag.disabled]: false,
			[DayFlag.hidden]: false,
			[DayFlag.outside]: false,
			[DayFlag.today]: false
		};
		const customModifiers = {};
		for (const name in internalModifiersMap) dayFlags[name] = internalModifiersMap[name].some((d) => d === day);
		for (const name in customModifiersMap) customModifiers[name] = customModifiersMap[name].some((d) => d === day);
		return {
			...dayFlags,
			...customModifiers
		};
	};
}
function getClassNamesForModifiers(modifiers, classNames, modifiersClassNames = {}) {
	return Object.entries(modifiers).filter(([, active]) => active === true).reduce((previousValue, [key]) => {
		if (modifiersClassNames[key]) previousValue.push(modifiersClassNames[key]);
		else if (classNames[DayFlag[key]]) previousValue.push(classNames[DayFlag[key]]);
		else if (classNames[SelectionState[key]]) previousValue.push(classNames[SelectionState[key]]);
		return previousValue;
	}, [classNames[UI.Day]]);
}
function getComponents(customComponents) {
	return {
		...custom_components_exports,
		...customComponents
	};
}
function getDataAttributes(props) {
	const dataAttributes = {
		"data-mode": props.mode ?? void 0,
		"data-required": "required" in props ? props.required : void 0,
		"data-multiple-months": props.numberOfMonths && props.numberOfMonths > 1 || void 0,
		"data-week-numbers": props.showWeekNumber || void 0,
		"data-broadcast-calendar": props.broadcastCalendar || void 0,
		"data-nav-layout": props.navLayout || void 0
	};
	Object.entries(props).forEach(([key, val]) => {
		if (key.startsWith("data-")) dataAttributes[key] = val;
	});
	return dataAttributes;
}
function getDefaultClassNames() {
	const classNames = {};
	for (const key in UI) classNames[UI[key]] = `rdp-${UI[key]}`;
	for (const key in DayFlag) classNames[DayFlag[key]] = `rdp-${DayFlag[key]}`;
	for (const key in SelectionState) classNames[SelectionState[key]] = `rdp-${SelectionState[key]}`;
	for (const key in Animation) classNames[Animation[key]] = `rdp-${Animation[key]}`;
	return classNames;
}
function formatCaption(month, options, dateLib) {
	return (dateLib ?? new DateLib(options)).formatMonthYear(month);
}
const formatMonthCaption = formatCaption;
function formatDay(date, options, dateLib) {
	return (dateLib ?? new DateLib(options)).format(date, "d");
}
function formatMonthDropdown(month, dateLib = defaultDateLib) {
	return dateLib.format(month, "LLLL");
}
function formatWeekdayName(weekday, options, dateLib) {
	return (dateLib ?? new DateLib(options)).format(weekday, "cccccc");
}
function formatWeekNumber(weekNumber, dateLib = defaultDateLib) {
	if (weekNumber < 10) return dateLib.formatNumber(`0${weekNumber.toLocaleString()}`);
	return dateLib.formatNumber(`${weekNumber.toLocaleString()}`);
}
function formatWeekNumberHeader() {
	return ``;
}
function formatYearDropdown(year, dateLib = defaultDateLib) {
	return dateLib.format(year, "yyyy");
}
const formatYearCaption = formatYearDropdown;
var formatters_exports = /* @__PURE__ */ __export({
	formatCaption: () => formatCaption,
	formatDay: () => formatDay,
	formatMonthCaption: () => formatMonthCaption,
	formatMonthDropdown: () => formatMonthDropdown,
	formatWeekNumber: () => formatWeekNumber,
	formatWeekNumberHeader: () => formatWeekNumberHeader,
	formatWeekdayName: () => formatWeekdayName,
	formatYearCaption: () => formatYearCaption,
	formatYearDropdown: () => formatYearDropdown
}, 1);
function getFormatters(customFormatters) {
	if (customFormatters?.formatMonthCaption && !customFormatters.formatCaption) customFormatters.formatCaption = customFormatters.formatMonthCaption;
	if (customFormatters?.formatYearCaption && !customFormatters.formatYearDropdown) customFormatters.formatYearDropdown = customFormatters.formatYearCaption;
	return {
		...formatters_exports,
		...customFormatters
	};
}
function labelDayButton(date, modifiers, options, dateLib) {
	let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
	if (modifiers.today) label = `Today, ${label}`;
	if (modifiers.selected) label = `${label}, selected`;
	return label;
}
const labelDay = labelDayButton;
function labelGrid(date, options, dateLib) {
	return (dateLib ?? new DateLib(options)).formatMonthYear(date);
}
const labelCaption = labelGrid;
function labelGridcell(date, modifiers, options, dateLib) {
	let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
	if (modifiers?.today) label = `Today, ${label}`;
	return label;
}
function labelMonthDropdown(_options) {
	return "Choose the Month";
}
function labelNav() {
	return "";
}
var defaultLabel = "Go to the Next Month";
function labelNext(_month, _options) {
	return defaultLabel;
}
function labelPrevious(_month) {
	return "Go to the Previous Month";
}
function labelWeekday(date, options, dateLib) {
	return (dateLib ?? new DateLib(options)).format(date, "cccc");
}
function labelWeekNumber(weekNumber, _options) {
	return `Week ${weekNumber}`;
}
function labelWeekNumberHeader(_options) {
	return "Week Number";
}
function labelYearDropdown(_options) {
	return "Choose the Year";
}
var labels_exports = /* @__PURE__ */ __export({
	labelCaption: () => labelCaption,
	labelDay: () => labelDay,
	labelDayButton: () => labelDayButton,
	labelGrid: () => labelGrid,
	labelGridcell: () => labelGridcell,
	labelMonthDropdown: () => labelMonthDropdown,
	labelNav: () => labelNav,
	labelNext: () => labelNext,
	labelPrevious: () => labelPrevious,
	labelWeekNumber: () => labelWeekNumber,
	labelWeekNumberHeader: () => labelWeekNumberHeader,
	labelWeekday: () => labelWeekday,
	labelYearDropdown: () => labelYearDropdown
}, 1);
var resolveLabel = (defaultLabel$1, customLabel, localeLabel) => {
	if (customLabel) return customLabel;
	if (localeLabel) return typeof localeLabel === "function" ? localeLabel : (..._args) => localeLabel;
	return defaultLabel$1;
};
function getLabels(customLabels, options) {
	const localeLabels = options.locale?.labels ?? {};
	return {
		...labels_exports,
		...customLabels ?? {},
		labelDayButton: resolveLabel(labelDayButton, customLabels?.labelDayButton, localeLabels.labelDayButton),
		labelMonthDropdown: resolveLabel(labelMonthDropdown, customLabels?.labelMonthDropdown, localeLabels.labelMonthDropdown),
		labelNext: resolveLabel(labelNext, customLabels?.labelNext, localeLabels.labelNext),
		labelPrevious: resolveLabel(labelPrevious, customLabels?.labelPrevious, localeLabels.labelPrevious),
		labelWeekNumber: resolveLabel(labelWeekNumber, customLabels?.labelWeekNumber, localeLabels.labelWeekNumber),
		labelYearDropdown: resolveLabel(labelYearDropdown, customLabels?.labelYearDropdown, localeLabels.labelYearDropdown),
		labelGrid: resolveLabel(labelGrid, customLabels?.labelGrid, localeLabels.labelGrid),
		labelGridcell: resolveLabel(labelGridcell, customLabels?.labelGridcell, localeLabels.labelGridcell),
		labelNav: resolveLabel(labelNav, customLabels?.labelNav, localeLabels.labelNav),
		labelWeekNumberHeader: resolveLabel(labelWeekNumberHeader, customLabels?.labelWeekNumberHeader, localeLabels.labelWeekNumberHeader),
		labelWeekday: resolveLabel(labelWeekday, customLabels?.labelWeekday, localeLabels.labelWeekday)
	};
}
function getMonthOptions(displayMonth, navStart, navEnd, formatters$1, dateLib) {
	const { startOfMonth: startOfMonth$1, startOfYear: startOfYear$1, endOfYear: endOfYear$1, eachMonthOfInterval: eachMonthOfInterval$1, getMonth: getMonth$1 } = dateLib;
	return eachMonthOfInterval$1({
		start: startOfYear$1(displayMonth),
		end: endOfYear$1(displayMonth)
	}).map((month) => {
		const label = formatters$1.formatMonthDropdown(month, dateLib);
		return {
			value: getMonth$1(month),
			label,
			disabled: navStart && month < startOfMonth$1(navStart) || navEnd && month > startOfMonth$1(navEnd) || false
		};
	});
}
function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
	let style = { ...styles?.[UI.Day] };
	Object.entries(dayModifiers).filter(([, active]) => active === true).forEach(([modifier]) => {
		style = {
			...style,
			...modifiersStyles?.[modifier]
		};
	});
	return style;
}
function getWeekdays(dateLib, ISOWeek, broadcastCalendar, today) {
	const referenceToday = today ?? dateLib.today();
	const start = broadcastCalendar ? dateLib.startOfBroadcastWeek(referenceToday, dateLib) : ISOWeek ? dateLib.startOfISOWeek(referenceToday) : dateLib.startOfWeek(referenceToday);
	const days = [];
	for (let i = 0; i < 7; i++) {
		const day = dateLib.addDays(start, i);
		days.push(day);
	}
	return days;
}
function getYearOptions(navStart, navEnd, formatters$1, dateLib, reverse = false) {
	if (!navStart) return void 0;
	if (!navEnd) return void 0;
	const { startOfYear: startOfYear$1, endOfYear: endOfYear$1, eachYearOfInterval: eachYearOfInterval$1, getYear: getYear$1 } = dateLib;
	const years = eachYearOfInterval$1({
		start: startOfYear$1(navStart),
		end: endOfYear$1(navEnd)
	});
	if (reverse) years.reverse();
	return years.map((year) => {
		const label = formatters$1.formatYearDropdown(year, dateLib);
		return {
			value: getYear$1(year),
			label,
			disabled: false
		};
	});
}
function createNoonOverrides(timeZone, options = {}) {
	const { weekStartsOn, locale } = options;
	const fallbackWeekStartsOn = weekStartsOn ?? locale?.options?.weekStartsOn ?? 0;
	const toNoonTZDate = (date) => {
		const normalizedDate = typeof date === "number" || typeof date === "string" ? new Date(date) : date;
		return new TZDate(normalizedDate.getFullYear(), normalizedDate.getMonth(), normalizedDate.getDate(), 12, 0, 0, timeZone);
	};
	const toCalendarDate = (date) => {
		const zoned = toNoonTZDate(date);
		return new Date(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => {
			return toNoonTZDate(TZDate.tz(timeZone));
		},
		newDate: (year, monthIndex, date) => {
			return new TZDate(year, monthIndex, date, 12, 0, 0, timeZone);
		},
		startOfDay: (date) => {
			return toNoonTZDate(date);
		},
		startOfWeek: (date, options$1) => {
			const base = toNoonTZDate(date);
			const weekStartsOnValue = options$1?.weekStartsOn ?? fallbackWeekStartsOn;
			const diff = (base.getDay() - weekStartsOnValue + 7) % 7;
			base.setDate(base.getDate() - diff);
			return base;
		},
		startOfISOWeek: (date) => {
			const base = toNoonTZDate(date);
			const diff = (base.getDay() - 1 + 7) % 7;
			base.setDate(base.getDate() - diff);
			return base;
		},
		startOfMonth: (date) => {
			const base = toNoonTZDate(date);
			base.setDate(1);
			return base;
		},
		startOfYear: (date) => {
			const base = toNoonTZDate(date);
			base.setMonth(0, 1);
			return base;
		},
		endOfWeek: (date, options$1) => {
			const base = toNoonTZDate(date);
			const diff = (((options$1?.weekStartsOn ?? fallbackWeekStartsOn) + 6) % 7 - base.getDay() + 7) % 7;
			base.setDate(base.getDate() + diff);
			return base;
		},
		endOfISOWeek: (date) => {
			const base = toNoonTZDate(date);
			const diff = (7 - base.getDay()) % 7;
			base.setDate(base.getDate() + diff);
			return base;
		},
		endOfMonth: (date) => {
			const base = toNoonTZDate(date);
			base.setMonth(base.getMonth() + 1, 0);
			return base;
		},
		endOfYear: (date) => {
			const base = toNoonTZDate(date);
			base.setMonth(11, 31);
			return base;
		},
		eachMonthOfInterval: (interval) => {
			const start = toNoonTZDate(interval.start);
			const end = toNoonTZDate(interval.end);
			const result = [];
			const cursor = new TZDate(start.getFullYear(), start.getMonth(), 1, 12, 0, 0, timeZone);
			const endKey = end.getFullYear() * 12 + end.getMonth();
			while (cursor.getFullYear() * 12 + cursor.getMonth() <= endKey) {
				result.push(new TZDate(cursor, timeZone));
				cursor.setMonth(cursor.getMonth() + 1, 1);
			}
			return result;
		},
		addDays: (date, amount) => {
			const base = toNoonTZDate(date);
			base.setDate(base.getDate() + amount);
			return base;
		},
		addWeeks: (date, amount) => {
			const base = toNoonTZDate(date);
			base.setDate(base.getDate() + amount * 7);
			return base;
		},
		addMonths: (date, amount) => {
			const base = toNoonTZDate(date);
			base.setMonth(base.getMonth() + amount);
			return base;
		},
		addYears: (date, amount) => {
			const base = toNoonTZDate(date);
			base.setFullYear(base.getFullYear() + amount);
			return base;
		},
		eachYearOfInterval: (interval) => {
			const start = toNoonTZDate(interval.start);
			const end = toNoonTZDate(interval.end);
			const years = [];
			const cursor = new TZDate(start.getFullYear(), 0, 1, 12, 0, 0, timeZone);
			while (cursor.getFullYear() <= end.getFullYear()) {
				years.push(new TZDate(cursor, timeZone));
				cursor.setFullYear(cursor.getFullYear() + 1, 0, 1);
			}
			return years;
		},
		getWeek: (date, options$1) => {
			return getWeek(toCalendarDate(date), {
				weekStartsOn: options$1?.weekStartsOn ?? fallbackWeekStartsOn,
				firstWeekContainsDate: options$1?.firstWeekContainsDate ?? locale?.options?.firstWeekContainsDate ?? 1
			});
		},
		getISOWeek: (date) => {
			return getISOWeek(toCalendarDate(date));
		},
		differenceInCalendarDays: (dateLeft, dateRight) => {
			return differenceInCalendarDays(toCalendarDate(dateLeft), toCalendarDate(dateRight));
		},
		differenceInCalendarMonths: (dateLeft, dateRight) => {
			return differenceInCalendarMonths(toCalendarDate(dateLeft), toCalendarDate(dateRight));
		}
	};
}
var asHtmlElement = (element) => {
	if (element instanceof HTMLElement) return element;
	return null;
};
var queryMonthEls = (element) => [...element.querySelectorAll("[data-animated-month]") ?? []];
var queryMonthEl = (element) => asHtmlElement(element.querySelector("[data-animated-month]"));
var queryCaptionEl = (element) => asHtmlElement(element.querySelector("[data-animated-caption]"));
var queryWeeksEl = (element) => asHtmlElement(element.querySelector("[data-animated-weeks]"));
var queryNavEl = (element) => asHtmlElement(element.querySelector("[data-animated-nav]"));
var queryWeekdaysEl = (element) => asHtmlElement(element.querySelector("[data-animated-weekdays]"));
function useAnimation(rootElRef, enabled, { classNames, months, focused, dateLib }) {
	const previousRootElSnapshotRef = (0, import_react.useRef)(null);
	const previousMonthsRef = (0, import_react.useRef)(months);
	const animatingRef = (0, import_react.useRef)(false);
	(0, import_react.useLayoutEffect)(() => {
		const previousMonths = previousMonthsRef.current;
		previousMonthsRef.current = months;
		if (!enabled || !rootElRef.current || !(rootElRef.current instanceof HTMLElement) || months.length === 0 || previousMonths.length === 0 || months.length !== previousMonths.length) return;
		const isSameMonth$1 = dateLib.isSameMonth(months[0].date, previousMonths[0].date);
		const isAfterPreviousMonth = dateLib.isAfter(months[0].date, previousMonths[0].date);
		const captionAnimationClass = isAfterPreviousMonth ? classNames[Animation.caption_after_enter] : classNames[Animation.caption_before_enter];
		const weeksAnimationClass = isAfterPreviousMonth ? classNames[Animation.weeks_after_enter] : classNames[Animation.weeks_before_enter];
		const previousRootElSnapshot = previousRootElSnapshotRef.current;
		const rootElSnapshot = rootElRef.current.cloneNode(true);
		if (rootElSnapshot instanceof HTMLElement) {
			queryMonthEls(rootElSnapshot).forEach((currentMonthElSnapshot) => {
				if (!(currentMonthElSnapshot instanceof HTMLElement)) return;
				const previousMonthElSnapshot = queryMonthEl(currentMonthElSnapshot);
				if (previousMonthElSnapshot && currentMonthElSnapshot.contains(previousMonthElSnapshot)) currentMonthElSnapshot.removeChild(previousMonthElSnapshot);
				const captionEl = queryCaptionEl(currentMonthElSnapshot);
				if (captionEl) captionEl.classList.remove(captionAnimationClass);
				const weeksEl = queryWeeksEl(currentMonthElSnapshot);
				if (weeksEl) weeksEl.classList.remove(weeksAnimationClass);
			});
			previousRootElSnapshotRef.current = rootElSnapshot;
		} else previousRootElSnapshotRef.current = null;
		if (animatingRef.current || isSameMonth$1 || focused) return;
		const previousMonthEls = previousRootElSnapshot instanceof HTMLElement ? queryMonthEls(previousRootElSnapshot) : [];
		const currentMonthEls = queryMonthEls(rootElRef.current);
		if (currentMonthEls?.every((el) => el instanceof HTMLElement) && previousMonthEls && previousMonthEls.every((el) => el instanceof HTMLElement)) {
			animatingRef.current = true;
			const cleanUpFunctions = [];
			rootElRef.current.style.isolation = "isolate";
			const navEl = queryNavEl(rootElRef.current);
			if (navEl) navEl.style.zIndex = "1";
			currentMonthEls.forEach((currentMonthEl, index) => {
				const previousMonthEl = previousMonthEls[index];
				if (!previousMonthEl) return;
				currentMonthEl.style.position = "relative";
				currentMonthEl.style.overflow = "hidden";
				const captionEl = queryCaptionEl(currentMonthEl);
				if (captionEl) captionEl.classList.add(captionAnimationClass);
				const weeksEl = queryWeeksEl(currentMonthEl);
				if (weeksEl) weeksEl.classList.add(weeksAnimationClass);
				const cleanUp = () => {
					animatingRef.current = false;
					if (rootElRef.current) rootElRef.current.style.isolation = "";
					if (navEl) navEl.style.zIndex = "";
					if (captionEl) captionEl.classList.remove(captionAnimationClass);
					if (weeksEl) weeksEl.classList.remove(weeksAnimationClass);
					currentMonthEl.style.position = "";
					currentMonthEl.style.overflow = "";
					if (currentMonthEl.contains(previousMonthEl)) currentMonthEl.removeChild(previousMonthEl);
				};
				cleanUpFunctions.push(cleanUp);
				previousMonthEl.style.pointerEvents = "none";
				previousMonthEl.style.position = "absolute";
				previousMonthEl.style.overflow = "hidden";
				previousMonthEl.setAttribute("aria-hidden", "true");
				const previousWeekdaysEl = queryWeekdaysEl(previousMonthEl);
				if (previousWeekdaysEl) previousWeekdaysEl.style.opacity = "0";
				const previousCaptionEl = queryCaptionEl(previousMonthEl);
				if (previousCaptionEl) {
					previousCaptionEl.classList.add(isAfterPreviousMonth ? classNames[Animation.caption_before_exit] : classNames[Animation.caption_after_exit]);
					previousCaptionEl.addEventListener("animationend", cleanUp);
				}
				const previousWeeksEl = queryWeeksEl(previousMonthEl);
				if (previousWeeksEl) previousWeeksEl.classList.add(isAfterPreviousMonth ? classNames[Animation.weeks_before_exit] : classNames[Animation.weeks_after_exit]);
				currentMonthEl.insertBefore(previousMonthEl, currentMonthEl.firstChild);
			});
		}
	});
}
function getDates(displayMonths, maxDate, props, dateLib) {
	const firstMonth = displayMonths[0];
	const lastMonth = displayMonths[displayMonths.length - 1];
	const { ISOWeek, fixedWeeks, broadcastCalendar } = props ?? {};
	const { addDays: addDays$1, differenceInCalendarDays: differenceInCalendarDays$1, differenceInCalendarMonths: differenceInCalendarMonths$1, endOfBroadcastWeek: endOfBroadcastWeek$1, endOfISOWeek: endOfISOWeek$1, endOfMonth: endOfMonth$1, endOfWeek: endOfWeek$1, isAfter: isAfter$1, startOfBroadcastWeek: startOfBroadcastWeek$1, startOfISOWeek: startOfISOWeek$1, startOfWeek: startOfWeek$1 } = dateLib;
	const startWeekFirstDate = broadcastCalendar ? startOfBroadcastWeek$1(firstMonth, dateLib) : ISOWeek ? startOfISOWeek$1(firstMonth) : startOfWeek$1(firstMonth);
	const displayMonthsWeekEnd = broadcastCalendar ? endOfBroadcastWeek$1(lastMonth) : ISOWeek ? endOfISOWeek$1(endOfMonth$1(lastMonth)) : endOfWeek$1(endOfMonth$1(lastMonth));
	const constraintWeekEnd = maxDate && (broadcastCalendar ? endOfBroadcastWeek$1(maxDate) : ISOWeek ? endOfISOWeek$1(maxDate) : endOfWeek$1(maxDate));
	const nOfDays = differenceInCalendarDays$1(constraintWeekEnd && isAfter$1(displayMonthsWeekEnd, constraintWeekEnd) ? constraintWeekEnd : displayMonthsWeekEnd, startWeekFirstDate);
	const nOfMonths = differenceInCalendarMonths$1(lastMonth, firstMonth) + 1;
	const dates = [];
	for (let i = 0; i <= nOfDays; i++) {
		const date = addDays$1(startWeekFirstDate, i);
		dates.push(date);
	}
	const extraDates = (broadcastCalendar ? 35 : 42) * nOfMonths;
	if (fixedWeeks && dates.length < extraDates) {
		const daysToAdd = extraDates - dates.length;
		for (let i = 0; i < daysToAdd; i++) {
			const date = addDays$1(dates[dates.length - 1], 1);
			dates.push(date);
		}
	}
	return dates;
}
function getDays(calendarMonths) {
	const initialDays = [];
	return calendarMonths.reduce((days, month) => {
		const weekDays = month.weeks.reduce((weekDays$1, week) => {
			return weekDays$1.concat(week.days.slice());
		}, initialDays.slice());
		return days.concat(weekDays.slice());
	}, initialDays.slice());
}
function getDisplayMonths(firstDisplayedMonth, calendarEndMonth, props, dateLib) {
	const { numberOfMonths = 1 } = props;
	const months = [];
	for (let i = 0; i < numberOfMonths; i++) {
		const month = dateLib.addMonths(firstDisplayedMonth, i);
		if (calendarEndMonth && month > calendarEndMonth) break;
		months.push(month);
	}
	return months;
}
function getInitialMonth(props, navStart, navEnd, dateLib) {
	const { month, defaultMonth, today = dateLib.today(), numberOfMonths = 1 } = props;
	let initialMonth = month || defaultMonth || today;
	const { differenceInCalendarMonths: differenceInCalendarMonths$1, addMonths: addMonths$1, startOfMonth: startOfMonth$1 } = dateLib;
	if (navEnd && differenceInCalendarMonths$1(navEnd, initialMonth) < numberOfMonths - 1) initialMonth = addMonths$1(navEnd, -1 * (numberOfMonths - 1));
	if (navStart && differenceInCalendarMonths$1(initialMonth, navStart) < 0) initialMonth = navStart;
	return startOfMonth$1(initialMonth);
}
function getMonths(displayMonths, dates, props, dateLib) {
	const { addDays: addDays$1, endOfBroadcastWeek: endOfBroadcastWeek$1, endOfISOWeek: endOfISOWeek$1, endOfMonth: endOfMonth$1, endOfWeek: endOfWeek$1, getISOWeek: getISOWeek$1, getWeek: getWeek$1, startOfBroadcastWeek: startOfBroadcastWeek$1, startOfISOWeek: startOfISOWeek$1, startOfWeek: startOfWeek$1 } = dateLib;
	const dayPickerMonths = displayMonths.reduce((months, month) => {
		const firstDateOfFirstWeek = props.broadcastCalendar ? startOfBroadcastWeek$1(month, dateLib) : props.ISOWeek ? startOfISOWeek$1(month) : startOfWeek$1(month);
		const lastDateOfLastWeek = props.broadcastCalendar ? endOfBroadcastWeek$1(month) : props.ISOWeek ? endOfISOWeek$1(endOfMonth$1(month)) : endOfWeek$1(endOfMonth$1(month));
		const monthDates = dates.filter((date) => {
			return date >= firstDateOfFirstWeek && date <= lastDateOfLastWeek;
		});
		const nrOfDaysWithFixedWeeks = props.broadcastCalendar ? 35 : 42;
		if (props.fixedWeeks && monthDates.length < nrOfDaysWithFixedWeeks) {
			const extraDates = dates.filter((date) => {
				const daysToAdd = nrOfDaysWithFixedWeeks - monthDates.length;
				return date > lastDateOfLastWeek && date <= addDays$1(lastDateOfLastWeek, daysToAdd);
			});
			monthDates.push(...extraDates);
		}
		const dayPickerMonth = new CalendarMonth(month, monthDates.reduce((weeks, date) => {
			const weekNumber = props.ISOWeek ? getISOWeek$1(date) : getWeek$1(date);
			const week = weeks.find((week$1) => week$1.weekNumber === weekNumber);
			const day = new CalendarDay(date, month, dateLib);
			if (!week) weeks.push(new CalendarWeek(weekNumber, [day]));
			else week.days.push(day);
			return weeks;
		}, []));
		months.push(dayPickerMonth);
		return months;
	}, []);
	if (!props.reverseMonths) return dayPickerMonths;
	else return dayPickerMonths.reverse();
}
function getNavMonths(props, dateLib) {
	let { startMonth, endMonth } = props;
	const { startOfYear: startOfYear$1, startOfDay: startOfDay$1, startOfMonth: startOfMonth$1, endOfMonth: endOfMonth$1, addYears: addYears$1, endOfYear: endOfYear$1, newDate, today } = dateLib;
	const { fromYear, toYear, fromMonth, toMonth } = props;
	if (!startMonth && fromMonth) startMonth = fromMonth;
	if (!startMonth && fromYear) startMonth = dateLib.newDate(fromYear, 0, 1);
	if (!endMonth && toMonth) endMonth = toMonth;
	if (!endMonth && toYear) endMonth = newDate(toYear, 11, 31);
	const hasYearDropdown = props.captionLayout === "dropdown" || props.captionLayout === "dropdown-years";
	if (startMonth) startMonth = startOfMonth$1(startMonth);
	else if (fromYear) startMonth = newDate(fromYear, 0, 1);
	else if (!startMonth && hasYearDropdown) startMonth = startOfYear$1(addYears$1(props.today ?? today(), -100));
	if (endMonth) endMonth = endOfMonth$1(endMonth);
	else if (toYear) endMonth = newDate(toYear, 11, 31);
	else if (!endMonth && hasYearDropdown) endMonth = endOfYear$1(props.today ?? today());
	return [startMonth ? startOfDay$1(startMonth) : startMonth, endMonth ? startOfDay$1(endMonth) : endMonth];
}
function getNextMonth(firstDisplayedMonth, calendarEndMonth, options, dateLib) {
	if (options.disableNavigation) return;
	const { pagedNavigation, numberOfMonths = 1 } = options;
	const { startOfMonth: startOfMonth$1, addMonths: addMonths$1, differenceInCalendarMonths: differenceInCalendarMonths$1 } = dateLib;
	const offset = pagedNavigation ? numberOfMonths : 1;
	const month = startOfMonth$1(firstDisplayedMonth);
	if (!calendarEndMonth) return addMonths$1(month, offset);
	if (differenceInCalendarMonths$1(calendarEndMonth, firstDisplayedMonth) < numberOfMonths) return;
	return addMonths$1(month, offset);
}
function getPreviousMonth(firstDisplayedMonth, calendarStartMonth, options, dateLib) {
	if (options.disableNavigation) return;
	const { pagedNavigation, numberOfMonths } = options;
	const { startOfMonth: startOfMonth$1, addMonths: addMonths$1, differenceInCalendarMonths: differenceInCalendarMonths$1 } = dateLib;
	const offset = pagedNavigation ? numberOfMonths ?? 1 : 1;
	const month = startOfMonth$1(firstDisplayedMonth);
	if (!calendarStartMonth) return addMonths$1(month, -offset);
	if (differenceInCalendarMonths$1(month, calendarStartMonth) <= 0) return;
	return addMonths$1(month, -offset);
}
function getWeeks(months) {
	return months.reduce((weeks, month) => {
		return weeks.concat(month.weeks.slice());
	}, [].slice());
}
function useControlledValue(defaultValue, controlledValue) {
	const [uncontrolledValue, setValue] = (0, import_react.useState)(defaultValue);
	return [controlledValue === void 0 ? uncontrolledValue : controlledValue, setValue];
}
function useCalendar(props, dateLib) {
	const [navStart, navEnd] = getNavMonths(props, dateLib);
	const { startOfMonth: startOfMonth$1, endOfMonth: endOfMonth$1 } = dateLib;
	const initialMonth = getInitialMonth(props, navStart, navEnd, dateLib);
	const [firstMonth, setFirstMonth] = useControlledValue(initialMonth, props.month ? initialMonth : void 0);
	(0, import_react.useEffect)(() => {
		setFirstMonth(getInitialMonth(props, navStart, navEnd, dateLib));
	}, [props.timeZone]);
	const { months, weeks, days, previousMonth, nextMonth } = (0, import_react.useMemo)(() => {
		const displayMonths = getDisplayMonths(firstMonth, navEnd, { numberOfMonths: props.numberOfMonths }, dateLib);
		const months$1 = getMonths(displayMonths, getDates(displayMonths, props.endMonth ? endOfMonth$1(props.endMonth) : void 0, {
			ISOWeek: props.ISOWeek,
			fixedWeeks: props.fixedWeeks,
			broadcastCalendar: props.broadcastCalendar
		}, dateLib), {
			broadcastCalendar: props.broadcastCalendar,
			fixedWeeks: props.fixedWeeks,
			ISOWeek: props.ISOWeek,
			reverseMonths: props.reverseMonths
		}, dateLib);
		return {
			months: months$1,
			weeks: getWeeks(months$1),
			days: getDays(months$1),
			previousMonth: getPreviousMonth(firstMonth, navStart, props, dateLib),
			nextMonth: getNextMonth(firstMonth, navEnd, props, dateLib)
		};
	}, [
		dateLib,
		firstMonth.getTime(),
		navEnd?.getTime(),
		navStart?.getTime(),
		props.disableNavigation,
		props.broadcastCalendar,
		props.endMonth?.getTime(),
		props.fixedWeeks,
		props.ISOWeek,
		props.numberOfMonths,
		props.pagedNavigation,
		props.reverseMonths
	]);
	const { disableNavigation, onMonthChange } = props;
	const isDayInCalendar = (day) => weeks.some((week) => week.days.some((d) => d.isEqualTo(day)));
	const goToMonth = (date) => {
		if (disableNavigation) return;
		let newMonth = startOfMonth$1(date);
		if (navStart && newMonth < startOfMonth$1(navStart)) newMonth = startOfMonth$1(navStart);
		if (navEnd && newMonth > startOfMonth$1(navEnd)) newMonth = startOfMonth$1(navEnd);
		setFirstMonth(newMonth);
		onMonthChange?.(newMonth);
	};
	const goToDay = (day) => {
		if (isDayInCalendar(day)) return;
		goToMonth(day.date);
	};
	return {
		months,
		weeks,
		days,
		navStart,
		navEnd,
		previousMonth,
		nextMonth,
		goToMonth,
		goToDay
	};
}
var FocusTargetPriority;
(function(FocusTargetPriority$1) {
	FocusTargetPriority$1[FocusTargetPriority$1["Today"] = 0] = "Today";
	FocusTargetPriority$1[FocusTargetPriority$1["Selected"] = 1] = "Selected";
	FocusTargetPriority$1[FocusTargetPriority$1["LastFocused"] = 2] = "LastFocused";
	FocusTargetPriority$1[FocusTargetPriority$1["FocusedModifier"] = 3] = "FocusedModifier";
})(FocusTargetPriority || (FocusTargetPriority = {}));
function isFocusableDay(modifiers) {
	return !modifiers[DayFlag.disabled] && !modifiers[DayFlag.hidden] && !modifiers[DayFlag.outside];
}
function calculateFocusTarget(days, getModifiers, isSelected, lastFocused) {
	let focusTarget;
	let foundFocusTargetPriority = -1;
	for (const day of days) {
		const modifiers = getModifiers(day);
		if (isFocusableDay(modifiers)) {
			if (modifiers[DayFlag.focused] && foundFocusTargetPriority < FocusTargetPriority.FocusedModifier) {
				focusTarget = day;
				foundFocusTargetPriority = FocusTargetPriority.FocusedModifier;
			} else if (lastFocused?.isEqualTo(day) && foundFocusTargetPriority < FocusTargetPriority.LastFocused) {
				focusTarget = day;
				foundFocusTargetPriority = FocusTargetPriority.LastFocused;
			} else if (isSelected(day.date) && foundFocusTargetPriority < FocusTargetPriority.Selected) {
				focusTarget = day;
				foundFocusTargetPriority = FocusTargetPriority.Selected;
			} else if (modifiers[DayFlag.today] && foundFocusTargetPriority < FocusTargetPriority.Today) {
				focusTarget = day;
				foundFocusTargetPriority = FocusTargetPriority.Today;
			}
		}
	}
	if (!focusTarget) focusTarget = days.find((day) => isFocusableDay(getModifiers(day)));
	return focusTarget;
}
function getFocusableDate(moveBy, moveDir, refDate, navStart, navEnd, props, dateLib) {
	const { ISOWeek, broadcastCalendar } = props;
	const { addDays: addDays$1, addMonths: addMonths$1, addWeeks: addWeeks$1, addYears: addYears$1, endOfBroadcastWeek: endOfBroadcastWeek$1, endOfISOWeek: endOfISOWeek$1, endOfWeek: endOfWeek$1, max: max$1, min: min$1, startOfBroadcastWeek: startOfBroadcastWeek$1, startOfISOWeek: startOfISOWeek$1, startOfWeek: startOfWeek$1 } = dateLib;
	let focusableDate = {
		day: addDays$1,
		week: addWeeks$1,
		month: addMonths$1,
		year: addYears$1,
		startOfWeek: (date) => broadcastCalendar ? startOfBroadcastWeek$1(date, dateLib) : ISOWeek ? startOfISOWeek$1(date) : startOfWeek$1(date),
		endOfWeek: (date) => broadcastCalendar ? endOfBroadcastWeek$1(date) : ISOWeek ? endOfISOWeek$1(date) : endOfWeek$1(date)
	}[moveBy](refDate, moveDir === "after" ? 1 : -1);
	if (moveDir === "before" && navStart) focusableDate = max$1([navStart, focusableDate]);
	else if (moveDir === "after" && navEnd) focusableDate = min$1([navEnd, focusableDate]);
	return focusableDate;
}
function getNextFocus(moveBy, moveDir, refDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt = 0) {
	if (attempt > 365) return;
	const focusableDate = getFocusableDate(moveBy, moveDir, refDay.date, calendarStartMonth, calendarEndMonth, props, dateLib);
	const isDisabled = Boolean(props.disabled && dateMatchModifiers(focusableDate, props.disabled, dateLib));
	const isHidden = Boolean(props.hidden && dateMatchModifiers(focusableDate, props.hidden, dateLib));
	const focusDay = new CalendarDay(focusableDate, focusableDate, dateLib);
	if (!isDisabled && !isHidden) return focusDay;
	return getNextFocus(moveBy, moveDir, focusDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt + 1);
}
function useFocus(props, calendar, getModifiers, isSelected, dateLib) {
	const { autoFocus } = props;
	const [lastFocused, setLastFocused] = (0, import_react.useState)();
	const focusTarget = calculateFocusTarget(calendar.days, getModifiers, isSelected || (() => false), lastFocused);
	const [focusedDay, setFocused] = (0, import_react.useState)(autoFocus ? focusTarget : void 0);
	const blur = () => {
		setLastFocused(focusedDay);
		setFocused(void 0);
	};
	const moveFocus = (moveBy, moveDir) => {
		if (!focusedDay) return;
		const nextFocus = getNextFocus(moveBy, moveDir, focusedDay, calendar.navStart, calendar.navEnd, props, dateLib);
		if (!nextFocus) return;
		if (props.disableNavigation) {
			if (!calendar.days.some((day) => day.isEqualTo(nextFocus))) return;
		}
		calendar.goToDay(nextFocus);
		setFocused(nextFocus);
	};
	const isFocusTarget = (day) => {
		return Boolean(focusTarget?.isEqualTo(day));
	};
	return {
		isFocusTarget,
		setFocused,
		focused: focusedDay,
		blur,
		moveFocus
	};
}
function useMulti(props, dateLib) {
	const { selected: initiallySelected, required, onSelect } = props;
	const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
	const selected = !onSelect ? internallySelected : initiallySelected;
	const { isSameDay: isSameDay$1 } = dateLib;
	const isSelected = (date) => {
		return selected?.some((d) => isSameDay$1(d, date)) ?? false;
	};
	const { min: min$1, max: max$1 } = props;
	const select = (triggerDate, modifiers, e) => {
		let newDates = [...selected ?? []];
		if (isSelected(triggerDate)) {
			if (selected?.length === min$1) return;
			if (required && selected?.length === 1) return;
			newDates = selected?.filter((d) => !isSameDay$1(d, triggerDate));
		} else if (selected?.length === max$1) newDates = [triggerDate];
		else newDates = [...newDates, triggerDate];
		if (!onSelect) setSelected(newDates);
		onSelect?.(newDates, triggerDate, modifiers, e);
		return newDates;
	};
	return {
		selected,
		select,
		isSelected
	};
}
function addToRange(date, initialRange, min$1 = 0, max$1 = 0, required = false, dateLib = defaultDateLib) {
	const { from, to } = initialRange || {};
	const { isSameDay: isSameDay$1, isAfter: isAfter$1, isBefore: isBefore$1 } = dateLib;
	let range;
	if (!from && !to) range = {
		from: date,
		to: min$1 > 0 ? void 0 : date
	};
	else if (from && !to) if (isSameDay$1(from, date)) if (min$1 === 0) range = {
		from,
		to: date
	};
	else if (required) range = {
		from,
		to: void 0
	};
	else range = void 0;
	else if (isBefore$1(date, from)) range = {
		from: date,
		to: from
	};
	else range = {
		from,
		to: date
	};
	else if (from && to) if (isSameDay$1(from, date) && isSameDay$1(to, date)) if (required) range = {
		from,
		to
	};
	else range = void 0;
	else if (isSameDay$1(from, date)) range = {
		from,
		to: min$1 > 0 ? void 0 : date
	};
	else if (isSameDay$1(to, date)) range = {
		from: date,
		to: min$1 > 0 ? void 0 : date
	};
	else if (isBefore$1(date, from)) range = {
		from: date,
		to
	};
	else if (isAfter$1(date, from)) range = {
		from,
		to: date
	};
	else if (isAfter$1(date, to)) range = {
		from,
		to: date
	};
	else throw new Error("Invalid range");
	if (range?.from && range?.to) {
		const diff = dateLib.differenceInCalendarDays(range.to, range.from);
		if (max$1 > 0 && diff > max$1) range = {
			from: date,
			to: void 0
		};
		else if (min$1 > 1 && diff < min$1) range = {
			from: date,
			to: void 0
		};
	}
	return range;
}
function rangeContainsDayOfWeek(range, dayOfWeek, dateLib = defaultDateLib) {
	const dayOfWeekArr = !Array.isArray(dayOfWeek) ? [dayOfWeek] : dayOfWeek;
	let date = range.from;
	const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
	const totalDaysLimit = Math.min(totalDays, 6);
	for (let i = 0; i <= totalDaysLimit; i++) {
		if (dayOfWeekArr.includes(date.getDay())) return true;
		date = dateLib.addDays(date, 1);
	}
	return false;
}
function rangeOverlaps(rangeLeft, rangeRight, dateLib = defaultDateLib) {
	return rangeIncludesDate(rangeLeft, rangeRight.from, false, dateLib) || rangeIncludesDate(rangeLeft, rangeRight.to, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.from, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.to, false, dateLib);
}
function rangeContainsModifiers(range, modifiers, dateLib = defaultDateLib) {
	const matchers = Array.isArray(modifiers) ? modifiers : [modifiers];
	if (matchers.filter((matcher) => typeof matcher !== "function").some((matcher) => {
		if (typeof matcher === "boolean") return matcher;
		if (dateLib.isDate(matcher)) return rangeIncludesDate(range, matcher, false, dateLib);
		if (isDatesArray(matcher, dateLib)) return matcher.some((date) => rangeIncludesDate(range, date, false, dateLib));
		if (isDateRange(matcher)) {
			if (matcher.from && matcher.to) return rangeOverlaps(range, {
				from: matcher.from,
				to: matcher.to
			}, dateLib);
			return false;
		}
		if (isDayOfWeekType(matcher)) return rangeContainsDayOfWeek(range, matcher.dayOfWeek, dateLib);
		if (isDateInterval(matcher)) {
			if (dateLib.isAfter(matcher.before, matcher.after)) return rangeOverlaps(range, {
				from: dateLib.addDays(matcher.after, 1),
				to: dateLib.addDays(matcher.before, -1)
			}, dateLib);
			return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
		}
		if (isDateAfterType(matcher) || isDateBeforeType(matcher)) return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
		return false;
	})) return true;
	const functionMatchers = matchers.filter((matcher) => typeof matcher === "function");
	if (functionMatchers.length) {
		let date = range.from;
		const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
		for (let i = 0; i <= totalDays; i++) {
			if (functionMatchers.some((matcher) => matcher(date))) return true;
			date = dateLib.addDays(date, 1);
		}
	}
	return false;
}
function useRange(props, dateLib) {
	const { disabled, excludeDisabled, selected: initiallySelected, required, onSelect } = props;
	const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
	const selected = !onSelect ? internallySelected : initiallySelected;
	const isSelected = (date) => selected && rangeIncludesDate(selected, date, false, dateLib);
	const select = (triggerDate, modifiers, e) => {
		const { min: min$1, max: max$1 } = props;
		const newRange = triggerDate ? addToRange(triggerDate, selected, min$1, max$1, required, dateLib) : void 0;
		if (excludeDisabled && disabled && newRange?.from && newRange.to) {
			if (rangeContainsModifiers({
				from: newRange.from,
				to: newRange.to
			}, disabled, dateLib)) {
				newRange.from = triggerDate;
				newRange.to = void 0;
			}
		}
		if (!onSelect) setSelected(newRange);
		onSelect?.(newRange, triggerDate, modifiers, e);
		return newRange;
	};
	return {
		selected,
		select,
		isSelected
	};
}
function useSingle(props, dateLib) {
	const { selected: initiallySelected, required, onSelect } = props;
	const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
	const selected = !onSelect ? internallySelected : initiallySelected;
	const { isSameDay: isSameDay$1 } = dateLib;
	const isSelected = (compareDate) => {
		return selected ? isSameDay$1(selected, compareDate) : false;
	};
	const select = (triggerDate, modifiers, e) => {
		let newDate = triggerDate;
		if (!required && selected && selected && isSameDay$1(triggerDate, selected)) newDate = void 0;
		if (!onSelect) setSelected(newDate);
		if (required) onSelect?.(newDate, triggerDate, modifiers, e);
		else onSelect?.(newDate, triggerDate, modifiers, e);
		return newDate;
	};
	return {
		selected,
		select,
		isSelected
	};
}
function useSelection(props, dateLib) {
	const single = useSingle(props, dateLib);
	const multi = useMulti(props, dateLib);
	const range = useRange(props, dateLib);
	switch (props.mode) {
		case "single": return single;
		case "multiple": return multi;
		case "range": return range;
		default: return;
	}
}
function toTimeZone(date, timeZone) {
	if (date instanceof TZDate && date.timeZone === timeZone) return date;
	return new TZDate(date, timeZone);
}
function toZoneNoon(date, timeZone, noonSafe) {
	if (!noonSafe) return toTimeZone(date, timeZone);
	const zoned = toTimeZone(date, timeZone);
	const noonZoned = new TZDate(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 12, 0, 0, timeZone);
	return new Date(noonZoned.getTime());
}
function convertMatcher(matcher, timeZone, noonSafe) {
	if (typeof matcher === "boolean" || typeof matcher === "function") return matcher;
	if (matcher instanceof Date) return toZoneNoon(matcher, timeZone, noonSafe);
	if (Array.isArray(matcher)) return matcher.map((value) => value instanceof Date ? toZoneNoon(value, timeZone, noonSafe) : value);
	if (isDateRange(matcher)) return {
		...matcher,
		from: matcher.from ? toTimeZone(matcher.from, timeZone) : matcher.from,
		to: matcher.to ? toTimeZone(matcher.to, timeZone) : matcher.to
	};
	if (isDateInterval(matcher)) return {
		before: toZoneNoon(matcher.before, timeZone, noonSafe),
		after: toZoneNoon(matcher.after, timeZone, noonSafe)
	};
	if (isDateAfterType(matcher)) return { after: toZoneNoon(matcher.after, timeZone, noonSafe) };
	if (isDateBeforeType(matcher)) return { before: toZoneNoon(matcher.before, timeZone, noonSafe) };
	return matcher;
}
function convertMatchersToTimeZone(matchers, timeZone, noonSafe) {
	if (!matchers) return matchers;
	if (Array.isArray(matchers)) return matchers.map((matcher) => convertMatcher(matcher, timeZone, noonSafe));
	return convertMatcher(matchers, timeZone, noonSafe);
}
function DayPicker(initialProps) {
	let props = initialProps;
	const timeZone = props.timeZone;
	if (timeZone) {
		props = {
			...initialProps,
			timeZone
		};
		if (props.today) props.today = toTimeZone(props.today, timeZone);
		if (props.month) props.month = toTimeZone(props.month, timeZone);
		if (props.defaultMonth) props.defaultMonth = toTimeZone(props.defaultMonth, timeZone);
		if (props.startMonth) props.startMonth = toTimeZone(props.startMonth, timeZone);
		if (props.endMonth) props.endMonth = toTimeZone(props.endMonth, timeZone);
		if (props.mode === "single" && props.selected) props.selected = toTimeZone(props.selected, timeZone);
		else if (props.mode === "multiple" && props.selected) props.selected = props.selected?.map((date) => toTimeZone(date, timeZone));
		else if (props.mode === "range" && props.selected) props.selected = {
			from: props.selected.from ? toTimeZone(props.selected.from, timeZone) : props.selected.from,
			to: props.selected.to ? toTimeZone(props.selected.to, timeZone) : props.selected.to
		};
		if (props.disabled !== void 0) props.disabled = convertMatchersToTimeZone(props.disabled, timeZone);
		if (props.hidden !== void 0) props.hidden = convertMatchersToTimeZone(props.hidden, timeZone);
		if (props.modifiers) {
			const nextModifiers = {};
			Object.keys(props.modifiers).forEach((key) => {
				nextModifiers[key] = convertMatchersToTimeZone(props.modifiers?.[key], timeZone);
			});
			props.modifiers = nextModifiers;
		}
	}
	const { components, formatters: formatters$1, labels, dateLib, locale, classNames } = (0, import_react.useMemo)(() => {
		const locale$1 = {
			...enUS,
			...props.locale
		};
		const weekStartsOn = props.broadcastCalendar ? 1 : props.weekStartsOn;
		const noonOverrides = props.noonSafe && props.timeZone ? createNoonOverrides(props.timeZone, {
			weekStartsOn,
			locale: locale$1
		}) : void 0;
		const overrides = props.dateLib && noonOverrides ? {
			...noonOverrides,
			...props.dateLib
		} : props.dateLib ?? noonOverrides;
		const dateLib$1 = new DateLib({
			locale: locale$1,
			weekStartsOn,
			firstWeekContainsDate: props.firstWeekContainsDate,
			useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
			useAdditionalDayOfYearTokens: props.useAdditionalDayOfYearTokens,
			timeZone: props.timeZone,
			numerals: props.numerals
		}, overrides);
		return {
			dateLib: dateLib$1,
			components: getComponents(props.components),
			formatters: getFormatters(props.formatters),
			labels: getLabels(props.labels, dateLib$1.options),
			locale: locale$1,
			classNames: {
				...getDefaultClassNames(),
				...props.classNames
			}
		};
	}, [
		props.locale,
		props.broadcastCalendar,
		props.weekStartsOn,
		props.firstWeekContainsDate,
		props.useAdditionalWeekYearTokens,
		props.useAdditionalDayOfYearTokens,
		props.timeZone,
		props.numerals,
		props.dateLib,
		props.noonSafe,
		props.components,
		props.formatters,
		props.labels,
		props.classNames
	]);
	if (!props.today) props = {
		...props,
		today: dateLib.today()
	};
	const { captionLayout, mode, navLayout, numberOfMonths = 1, onDayBlur, onDayClick, onDayFocus, onDayKeyDown, onDayMouseEnter, onDayMouseLeave, onNextClick, onPrevClick, showWeekNumber, styles } = props;
	const { formatCaption: formatCaption$1, formatDay: formatDay$1, formatMonthDropdown: formatMonthDropdown$1, formatWeekNumber: formatWeekNumber$1, formatWeekNumberHeader: formatWeekNumberHeader$1, formatWeekdayName: formatWeekdayName$1, formatYearDropdown: formatYearDropdown$1 } = formatters$1;
	const calendar = useCalendar(props, dateLib);
	const { days, months, navStart, navEnd, previousMonth, nextMonth, goToMonth } = calendar;
	const getModifiers = createGetModifiers(days, props, navStart, navEnd, dateLib);
	const { isSelected, select, selected: selectedValue } = useSelection(props, dateLib) ?? {};
	const { blur, focused, isFocusTarget, moveFocus, setFocused } = useFocus(props, calendar, getModifiers, isSelected ?? (() => false), dateLib);
	const { labelDayButton: labelDayButton$1, labelGridcell: labelGridcell$1, labelGrid: labelGrid$1, labelMonthDropdown: labelMonthDropdown$1, labelNav: labelNav$1, labelPrevious: labelPrevious$1, labelNext: labelNext$1, labelWeekday: labelWeekday$1, labelWeekNumber: labelWeekNumber$1, labelWeekNumberHeader: labelWeekNumberHeader$1, labelYearDropdown: labelYearDropdown$1 } = labels;
	const weekdays = (0, import_react.useMemo)(() => getWeekdays(dateLib, props.ISOWeek, props.broadcastCalendar, props.today), [
		dateLib,
		props.ISOWeek,
		props.broadcastCalendar,
		props.today
	]);
	const isInteractive = mode !== void 0 || onDayClick !== void 0;
	const handlePreviousClick = (0, import_react.useCallback)(() => {
		if (!previousMonth) return;
		goToMonth(previousMonth);
		onPrevClick?.(previousMonth);
	}, [
		previousMonth,
		goToMonth,
		onPrevClick
	]);
	const handleNextClick = (0, import_react.useCallback)(() => {
		if (!nextMonth) return;
		goToMonth(nextMonth);
		onNextClick?.(nextMonth);
	}, [
		goToMonth,
		nextMonth,
		onNextClick
	]);
	const handleDayClick = (0, import_react.useCallback)((day, m) => (e) => {
		e.preventDefault();
		e.stopPropagation();
		setFocused(day);
		if (m.disabled) return;
		select?.(day.date, m, e);
		onDayClick?.(day.date, m, e);
	}, [
		select,
		onDayClick,
		setFocused
	]);
	const handleDayFocus = (0, import_react.useCallback)((day, m) => (e) => {
		setFocused(day);
		onDayFocus?.(day.date, m, e);
	}, [onDayFocus, setFocused]);
	const handleDayBlur = (0, import_react.useCallback)((day, m) => (e) => {
		blur();
		onDayBlur?.(day.date, m, e);
	}, [blur, onDayBlur]);
	const handleDayKeyDown = (0, import_react.useCallback)((day, modifiers) => (e) => {
		const keyMap = {
			ArrowLeft: [e.shiftKey ? "month" : "day", props.dir === "rtl" ? "after" : "before"],
			ArrowRight: [e.shiftKey ? "month" : "day", props.dir === "rtl" ? "before" : "after"],
			ArrowDown: [e.shiftKey ? "year" : "week", "after"],
			ArrowUp: [e.shiftKey ? "year" : "week", "before"],
			PageUp: [e.shiftKey ? "year" : "month", "before"],
			PageDown: [e.shiftKey ? "year" : "month", "after"],
			Home: ["startOfWeek", "before"],
			End: ["endOfWeek", "after"]
		};
		if (keyMap[e.key]) {
			e.preventDefault();
			e.stopPropagation();
			const [moveBy, moveDir] = keyMap[e.key];
			moveFocus(moveBy, moveDir);
		}
		onDayKeyDown?.(day.date, modifiers, e);
	}, [
		moveFocus,
		onDayKeyDown,
		props.dir
	]);
	const handleDayMouseEnter = (0, import_react.useCallback)((day, modifiers) => (e) => {
		onDayMouseEnter?.(day.date, modifiers, e);
	}, [onDayMouseEnter]);
	const handleDayMouseLeave = (0, import_react.useCallback)((day, modifiers) => (e) => {
		onDayMouseLeave?.(day.date, modifiers, e);
	}, [onDayMouseLeave]);
	const handleMonthChange = (0, import_react.useCallback)((date) => (e) => {
		const selectedMonth = Number(e.target.value);
		goToMonth(dateLib.setMonth(dateLib.startOfMonth(date), selectedMonth));
	}, [dateLib, goToMonth]);
	const handleYearChange = (0, import_react.useCallback)((date) => (e) => {
		const selectedYear = Number(e.target.value);
		goToMonth(dateLib.setYear(dateLib.startOfMonth(date), selectedYear));
	}, [dateLib, goToMonth]);
	const { className, style } = (0, import_react.useMemo)(() => ({
		className: [classNames[UI.Root], props.className].filter(Boolean).join(" "),
		style: {
			...styles?.[UI.Root],
			...props.style
		}
	}), [
		classNames,
		props.className,
		props.style,
		styles
	]);
	const dataAttributes = getDataAttributes(props);
	const rootElRef = (0, import_react.useRef)(null);
	useAnimation(rootElRef, Boolean(props.animate), {
		classNames,
		months,
		focused,
		dateLib
	});
	const contextValue = {
		dayPickerProps: props,
		selected: selectedValue,
		select,
		isSelected,
		months,
		nextMonth,
		previousMonth,
		goToMonth,
		getModifiers,
		components,
		classNames,
		styles,
		labels,
		formatters: formatters$1
	};
	return import_react.createElement(dayPickerContext.Provider, { value: contextValue }, import_react.createElement(components.Root, {
		rootRef: props.animate ? rootElRef : void 0,
		className,
		style,
		dir: props.dir,
		id: props.id,
		lang: props.lang,
		nonce: props.nonce,
		title: props.title,
		role: props.role,
		"aria-label": props["aria-label"],
		"aria-labelledby": props["aria-labelledby"],
		...dataAttributes
	}, import_react.createElement(components.Months, {
		className: classNames[UI.Months],
		style: styles?.[UI.Months]
	}, !props.hideNavigation && !navLayout && import_react.createElement(components.Nav, {
		"data-animated-nav": props.animate ? "true" : void 0,
		className: classNames[UI.Nav],
		style: styles?.[UI.Nav],
		"aria-label": labelNav$1(),
		onPreviousClick: handlePreviousClick,
		onNextClick: handleNextClick,
		previousMonth,
		nextMonth
	}), months.map((calendarMonth, displayIndex) => {
		return import_react.createElement(components.Month, {
			"data-animated-month": props.animate ? "true" : void 0,
			className: classNames[UI.Month],
			style: styles?.[UI.Month],
			key: displayIndex,
			displayIndex,
			calendarMonth
		}, navLayout === "around" && !props.hideNavigation && displayIndex === 0 && import_react.createElement(components.PreviousMonthButton, {
			type: "button",
			className: classNames[UI.PreviousMonthButton],
			tabIndex: previousMonth ? void 0 : -1,
			"aria-disabled": previousMonth ? void 0 : true,
			"aria-label": labelPrevious$1(previousMonth),
			onClick: handlePreviousClick,
			"data-animated-button": props.animate ? "true" : void 0
		}, import_react.createElement(components.Chevron, {
			disabled: previousMonth ? void 0 : true,
			className: classNames[UI.Chevron],
			orientation: props.dir === "rtl" ? "right" : "left"
		})), import_react.createElement(components.MonthCaption, {
			"data-animated-caption": props.animate ? "true" : void 0,
			className: classNames[UI.MonthCaption],
			style: styles?.[UI.MonthCaption],
			calendarMonth,
			displayIndex
		}, captionLayout?.startsWith("dropdown") ? import_react.createElement(components.DropdownNav, {
			className: classNames[UI.Dropdowns],
			style: styles?.[UI.Dropdowns]
		}, (() => {
			const monthControl = captionLayout === "dropdown" || captionLayout === "dropdown-months" ? import_react.createElement(components.MonthsDropdown, {
				key: "month",
				className: classNames[UI.MonthsDropdown],
				"aria-label": labelMonthDropdown$1(),
				classNames,
				components,
				disabled: Boolean(props.disableNavigation),
				onChange: handleMonthChange(calendarMonth.date),
				options: getMonthOptions(calendarMonth.date, navStart, navEnd, formatters$1, dateLib),
				style: styles?.[UI.Dropdown],
				value: dateLib.getMonth(calendarMonth.date)
			}) : import_react.createElement("span", { key: "month" }, formatMonthDropdown$1(calendarMonth.date, dateLib));
			const yearControl = captionLayout === "dropdown" || captionLayout === "dropdown-years" ? import_react.createElement(components.YearsDropdown, {
				key: "year",
				className: classNames[UI.YearsDropdown],
				"aria-label": labelYearDropdown$1(dateLib.options),
				classNames,
				components,
				disabled: Boolean(props.disableNavigation),
				onChange: handleYearChange(calendarMonth.date),
				options: getYearOptions(navStart, navEnd, formatters$1, dateLib, Boolean(props.reverseYears)),
				style: styles?.[UI.Dropdown],
				value: dateLib.getYear(calendarMonth.date)
			}) : import_react.createElement("span", { key: "year" }, formatYearDropdown$1(calendarMonth.date, dateLib));
			return dateLib.getMonthYearOrder() === "year-first" ? [yearControl, monthControl] : [monthControl, yearControl];
		})(), import_react.createElement("span", {
			role: "status",
			"aria-live": "polite",
			style: {
				border: 0,
				clip: "rect(0 0 0 0)",
				height: "1px",
				margin: "-1px",
				overflow: "hidden",
				padding: 0,
				position: "absolute",
				width: "1px",
				whiteSpace: "nowrap",
				wordWrap: "normal"
			}
		}, formatCaption$1(calendarMonth.date, dateLib.options, dateLib))) : import_react.createElement(components.CaptionLabel, {
			className: classNames[UI.CaptionLabel],
			role: "status",
			"aria-live": "polite"
		}, formatCaption$1(calendarMonth.date, dateLib.options, dateLib))), navLayout === "around" && !props.hideNavigation && displayIndex === numberOfMonths - 1 && import_react.createElement(components.NextMonthButton, {
			type: "button",
			className: classNames[UI.NextMonthButton],
			tabIndex: nextMonth ? void 0 : -1,
			"aria-disabled": nextMonth ? void 0 : true,
			"aria-label": labelNext$1(nextMonth),
			onClick: handleNextClick,
			"data-animated-button": props.animate ? "true" : void 0
		}, import_react.createElement(components.Chevron, {
			disabled: nextMonth ? void 0 : true,
			className: classNames[UI.Chevron],
			orientation: props.dir === "rtl" ? "left" : "right"
		})), displayIndex === numberOfMonths - 1 && navLayout === "after" && !props.hideNavigation && import_react.createElement(components.Nav, {
			"data-animated-nav": props.animate ? "true" : void 0,
			className: classNames[UI.Nav],
			style: styles?.[UI.Nav],
			"aria-label": labelNav$1(),
			onPreviousClick: handlePreviousClick,
			onNextClick: handleNextClick,
			previousMonth,
			nextMonth
		}), import_react.createElement(components.MonthGrid, {
			role: "grid",
			"aria-multiselectable": mode === "multiple" || mode === "range",
			"aria-label": labelGrid$1(calendarMonth.date, dateLib.options, dateLib) || void 0,
			className: classNames[UI.MonthGrid],
			style: styles?.[UI.MonthGrid]
		}, !props.hideWeekdays && import_react.createElement(components.Weekdays, {
			"data-animated-weekdays": props.animate ? "true" : void 0,
			className: classNames[UI.Weekdays],
			style: styles?.[UI.Weekdays]
		}, showWeekNumber && import_react.createElement(components.WeekNumberHeader, {
			"aria-label": labelWeekNumberHeader$1(dateLib.options),
			className: classNames[UI.WeekNumberHeader],
			style: styles?.[UI.WeekNumberHeader],
			scope: "col"
		}, formatWeekNumberHeader$1()), weekdays.map((weekday) => import_react.createElement(components.Weekday, {
			"aria-label": labelWeekday$1(weekday, dateLib.options, dateLib),
			className: classNames[UI.Weekday],
			key: String(weekday),
			style: styles?.[UI.Weekday],
			scope: "col"
		}, formatWeekdayName$1(weekday, dateLib.options, dateLib)))), import_react.createElement(components.Weeks, {
			"data-animated-weeks": props.animate ? "true" : void 0,
			className: classNames[UI.Weeks],
			style: styles?.[UI.Weeks]
		}, calendarMonth.weeks.map((week) => {
			return import_react.createElement(components.Week, {
				className: classNames[UI.Week],
				key: week.weekNumber,
				style: styles?.[UI.Week],
				week
			}, showWeekNumber && import_react.createElement(components.WeekNumber, {
				week,
				style: styles?.[UI.WeekNumber],
				"aria-label": labelWeekNumber$1(week.weekNumber, { locale }),
				className: classNames[UI.WeekNumber],
				scope: "row",
				role: "rowheader"
			}, formatWeekNumber$1(week.weekNumber, dateLib)), week.days.map((day) => {
				const { date } = day;
				const modifiers = getModifiers(day);
				modifiers[DayFlag.focused] = !modifiers.hidden && Boolean(focused?.isEqualTo(day));
				modifiers[SelectionState.selected] = isSelected?.(date) || modifiers.selected;
				if (isDateRange(selectedValue)) {
					const { from, to } = selectedValue;
					modifiers[SelectionState.range_start] = Boolean(from && to && dateLib.isSameDay(date, from));
					modifiers[SelectionState.range_end] = Boolean(from && to && dateLib.isSameDay(date, to));
					modifiers[SelectionState.range_middle] = rangeIncludesDate(selectedValue, date, true, dateLib);
				}
				const style$1 = getStyleForModifiers(modifiers, styles, props.modifiersStyles);
				const className$1 = getClassNamesForModifiers(modifiers, classNames, props.modifiersClassNames);
				const ariaLabel = !isInteractive && !modifiers.hidden ? labelGridcell$1(date, modifiers, dateLib.options, dateLib) : void 0;
				return import_react.createElement(components.Day, {
					key: `${day.isoDate}_${day.displayMonthId}`,
					day,
					modifiers,
					className: className$1.join(" "),
					style: style$1,
					role: "gridcell",
					"aria-selected": modifiers.selected || void 0,
					"aria-label": ariaLabel,
					"data-day": day.isoDate,
					"data-month": day.outside ? day.dateMonthId : void 0,
					"data-selected": modifiers.selected || void 0,
					"data-disabled": modifiers.disabled || void 0,
					"data-hidden": modifiers.hidden || void 0,
					"data-outside": day.outside || void 0,
					"data-focused": modifiers.focused || void 0,
					"data-today": modifiers.today || void 0
				}, !modifiers.hidden && isInteractive ? import_react.createElement(components.DayButton, {
					className: classNames[UI.DayButton],
					style: styles?.[UI.DayButton],
					type: "button",
					day,
					modifiers,
					disabled: !modifiers.focused && modifiers.disabled || void 0,
					"aria-disabled": modifiers.focused && modifiers.disabled || void 0,
					tabIndex: isFocusTarget(day) ? 0 : -1,
					"aria-label": labelDayButton$1(date, modifiers, dateLib.options, dateLib),
					onClick: handleDayClick(day, modifiers),
					onBlur: handleDayBlur(day, modifiers),
					onFocus: handleDayFocus(day, modifiers),
					onKeyDown: handleDayKeyDown(day, modifiers),
					onMouseEnter: handleDayMouseEnter(day, modifiers),
					onMouseLeave: handleDayMouseLeave(day, modifiers)
				}, formatDay$1(date, dateLib.options, dateLib)) : !modifiers.hidden && formatDay$1(day.date, dateLib.options, dateLib));
			}));
		}))));
	})), props.footer && import_react.createElement(components.Footer, {
		className: classNames[UI.Footer],
		style: styles?.[UI.Footer],
		role: "status",
		"aria-live": "polite"
	}, props.footer)));
}
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters: formatters$1, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters$1
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]", defaultClassNames.month_caption),
			dropdowns: cn("flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", defaultClassNames.dropdown_root),
			dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
			caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-[--cell-size] select-none", defaultClassNames.week_number_header),
			week_number: cn("text-muted-foreground select-none text-[0.8rem]", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", defaultClassNames.day),
			range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
			today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className: className$1, rootRef, ...props$1 }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className$1),
					...props$1
				});
			},
			Chevron: ({ className: className$1, orientation, ...props$1 }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className$1),
					...props$1
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className$1),
					...props$1
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className$1),
					...props$1
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props$1 }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props$1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-[--cell-size] items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
var Dialog = Root$1;
var DialogTrigger = Trigger$2;
var DialogPortal = Portal$3;
var DialogClose = Close;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg overflow-y-auto max-h-screen", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = Content$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
function clamp(value, [min$1, max$1]) {
	return Math.min(max$1, Math.max(min$1, value));
}
var DirectionContext = import_react.createContext(void 0);
function useDirection(localDir) {
	const globalDir = import_react.useContext(DirectionContext);
	return localDir || globalDir || "ltr";
}
function usePrevious(value) {
	const ref = import_react.useRef({
		value,
		previous: value
	});
	return import_react.useMemo(() => {
		if (ref.current.value !== value) {
			ref.current.previous = ref.current.value;
			ref.current.value = value;
		}
		return ref.current.previous;
	}, [value]);
}
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var OPEN_KEYS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
];
var SELECTION_KEYS = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection, useCollection, createCollectionScope] = createCollection(SELECT_NAME);
var [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME, [createCollectionScope, createPopperScope]);
var usePopperScope = createPopperScope();
var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var Select$1 = (props) => {
	const { __scopeSelect, children, open: openProp, defaultOpen, onOpenChange, value: valueProp, defaultValue, onValueChange, dir, name, autoComplete, disabled, required, form } = props;
	const popperScope = usePopperScope(__scopeSelect);
	const [trigger, setTrigger] = import_react.useState(null);
	const [valueNode, setValueNode] = import_react.useState(null);
	const [valueNodeHasChildren, setValueNodeHasChildren] = import_react.useState(false);
	const direction = useDirection(dir);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: SELECT_NAME
	});
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue,
		onChange: onValueChange,
		caller: SELECT_NAME
	});
	const triggerPointerDownPosRef = import_react.useRef(null);
	const isFormControl = trigger ? form || !!trigger.closest("form") : true;
	const [nativeOptionsSet, setNativeOptionsSet] = import_react.useState(/* @__PURE__ */ new Set());
	const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$2, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectProvider, {
			required,
			scope: __scopeSelect,
			trigger,
			onTriggerChange: setTrigger,
			valueNode,
			onValueNodeChange: setValueNode,
			valueNodeHasChildren,
			onValueNodeHasChildrenChange: setValueNodeHasChildren,
			contentId: useId(),
			value,
			onValueChange: setValue,
			open,
			onOpenChange: setOpen,
			dir: direction,
			triggerPointerDownPosRef,
			disabled,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
				scope: __scopeSelect,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectNativeOptionsProvider, {
					scope: props.__scopeSelect,
					onNativeOptionAdd: import_react.useCallback((option) => {
						setNativeOptionsSet((prev) => new Set(prev).add(option));
					}, []),
					onNativeOptionRemove: import_react.useCallback((option) => {
						setNativeOptionsSet((prev) => {
							const optionsSet = new Set(prev);
							optionsSet.delete(option);
							return optionsSet;
						});
					}, []),
					children
				})
			}), isFormControl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectBubbleInput, {
				"aria-hidden": true,
				required,
				tabIndex: -1,
				name,
				autoComplete,
				value,
				onChange: (event) => setValue(event.target.value),
				disabled,
				form,
				children: [value === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "" }) : null, Array.from(nativeOptionsSet)]
			}, nativeSelectKey) : null]
		})
	});
};
Select$1.displayName = SELECT_NAME;
var TRIGGER_NAME = "SelectTrigger";
var SelectTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, disabled = false, ...triggerProps } = props;
	const popperScope = usePopperScope(__scopeSelect);
	const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
	const isDisabled = context.disabled || disabled;
	const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
	const getItems = useCollection(__scopeSelect);
	const pointerTypeRef = import_react.useRef("touch");
	const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
		const enabledItems = getItems().filter((item) => !item.disabled);
		const nextItem = findNextItem(enabledItems, search, enabledItems.find((item) => item.value === context.value));
		if (nextItem !== void 0) context.onValueChange(nextItem.value);
	});
	const handleOpen = (pointerEvent) => {
		if (!isDisabled) {
			context.onOpenChange(true);
			resetTypeahead();
		}
		if (pointerEvent) context.triggerPointerDownPosRef.current = {
			x: Math.round(pointerEvent.pageX),
			y: Math.round(pointerEvent.pageY)
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
		asChild: true,
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "combobox",
			"aria-controls": context.contentId,
			"aria-expanded": context.open,
			"aria-required": context.required,
			"aria-autocomplete": "none",
			dir: context.dir,
			"data-state": context.open ? "open" : "closed",
			disabled: isDisabled,
			"data-disabled": isDisabled ? "" : void 0,
			"data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
			...triggerProps,
			ref: composedRefs,
			onClick: composeEventHandlers(triggerProps.onClick, (event) => {
				event.currentTarget.focus();
				if (pointerTypeRef.current !== "mouse") handleOpen(event);
			}),
			onPointerDown: composeEventHandlers(triggerProps.onPointerDown, (event) => {
				pointerTypeRef.current = event.pointerType;
				const target = event.target;
				if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
				if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
					handleOpen(event);
					event.preventDefault();
				}
			}),
			onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
				const isTypingAhead = searchRef.current !== "";
				if (!(event.ctrlKey || event.altKey || event.metaKey) && event.key.length === 1) handleTypeaheadSearch(event.key);
				if (isTypingAhead && event.key === " ") return;
				if (OPEN_KEYS.includes(event.key)) {
					handleOpen();
					event.preventDefault();
				}
			})
		})
	});
});
SelectTrigger$1.displayName = TRIGGER_NAME;
var VALUE_NAME = "SelectValue";
var SelectValue$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
	const context = useSelectContext(VALUE_NAME, __scopeSelect);
	const { onValueNodeHasChildrenChange } = context;
	const hasChildren = children !== void 0;
	const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
	useLayoutEffect2(() => {
		onValueNodeHasChildrenChange(hasChildren);
	}, [onValueNodeHasChildrenChange, hasChildren]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		...valueProps,
		ref: composedRefs,
		style: { pointerEvents: "none" },
		children: shouldShowPlaceholder(context.value) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: placeholder }) : children
	});
});
SelectValue$1.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, children, ...iconProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"aria-hidden": true,
		...iconProps,
		ref: forwardedRef,
		children: children || "▼"
	});
});
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME = "SelectPortal";
var SelectPortal = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		asChild: true,
		...props
	});
};
SelectPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "SelectContent";
var SelectContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const context = useSelectContext(CONTENT_NAME, props.__scopeSelect);
	const [fragment, setFragment] = import_react.useState();
	useLayoutEffect2(() => {
		setFragment(new DocumentFragment());
	}, []);
	if (!context.open) {
		const frag = fragment;
		return frag ? import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentProvider, {
			scope: props.__scopeSelect,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeSelect,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: props.children })
			})
		}), frag) : null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentImpl, {
		...props,
		ref: forwardedRef
	});
});
SelectContent$1.displayName = CONTENT_NAME;
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, position = "item-aligned", onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, side, sideOffset, align, alignOffset, arrowPadding, collisionBoundary, collisionPadding, sticky, hideWhenDetached, avoidCollisions, ...contentProps } = props;
	const context = useSelectContext(CONTENT_NAME, __scopeSelect);
	const [content, setContent] = import_react.useState(null);
	const [viewport, setViewport] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
	const [selectedItem, setSelectedItem] = import_react.useState(null);
	const [selectedItemText, setSelectedItemText] = import_react.useState(null);
	const getItems = useCollection(__scopeSelect);
	const [isPositioned, setIsPositioned] = import_react.useState(false);
	const firstValidItemFoundRef = import_react.useRef(false);
	import_react.useEffect(() => {
		if (content) return hideOthers(content);
	}, [content]);
	useFocusGuards();
	const focusFirst = import_react.useCallback((candidates) => {
		const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
		const [lastItem] = restItems.slice(-1);
		const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
		for (const candidate of candidates) {
			if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
			candidate?.scrollIntoView({ block: "nearest" });
			if (candidate === firstItem && viewport) viewport.scrollTop = 0;
			if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
			candidate?.focus();
			if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
		}
	}, [getItems, viewport]);
	const focusSelectedItem = import_react.useCallback(() => focusFirst([selectedItem, content]), [
		focusFirst,
		selectedItem,
		content
	]);
	import_react.useEffect(() => {
		if (isPositioned) focusSelectedItem();
	}, [isPositioned, focusSelectedItem]);
	const { onOpenChange, triggerPointerDownPosRef } = context;
	import_react.useEffect(() => {
		if (content) {
			let pointerMoveDelta = {
				x: 0,
				y: 0
			};
			const handlePointerMove = (event) => {
				pointerMoveDelta = {
					x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.current?.x ?? 0)),
					y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.current?.y ?? 0))
				};
			};
			const handlePointerUp = (event) => {
				if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
				else if (!content.contains(event.target)) onOpenChange(false);
				document.removeEventListener("pointermove", handlePointerMove);
				triggerPointerDownPosRef.current = null;
			};
			if (triggerPointerDownPosRef.current !== null) {
				document.addEventListener("pointermove", handlePointerMove);
				document.addEventListener("pointerup", handlePointerUp, {
					capture: true,
					once: true
				});
			}
			return () => {
				document.removeEventListener("pointermove", handlePointerMove);
				document.removeEventListener("pointerup", handlePointerUp, { capture: true });
			};
		}
	}, [
		content,
		onOpenChange,
		triggerPointerDownPosRef
	]);
	import_react.useEffect(() => {
		const close = () => onOpenChange(false);
		window.addEventListener("blur", close);
		window.addEventListener("resize", close);
		return () => {
			window.removeEventListener("blur", close);
			window.removeEventListener("resize", close);
		};
	}, [onOpenChange]);
	const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
		const enabledItems = getItems().filter((item) => !item.disabled);
		const nextItem = findNextItem(enabledItems, search, enabledItems.find((item) => item.ref.current === document.activeElement));
		if (nextItem) setTimeout(() => nextItem.ref.current.focus());
	});
	const itemRefCallback = import_react.useCallback((node, value, disabled) => {
		const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
		if (context.value !== void 0 && context.value === value || isFirstValidItem) {
			setSelectedItem(node);
			if (isFirstValidItem) firstValidItemFoundRef.current = true;
		}
	}, [context.value]);
	const handleItemLeave = import_react.useCallback(() => content?.focus(), [content]);
	const itemTextRefCallback = import_react.useCallback((node, value, disabled) => {
		const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
		if (context.value !== void 0 && context.value === value || isFirstValidItem) setSelectedItemText(node);
	}, [context.value]);
	const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
	const popperContentProps = SelectPosition === SelectPopperPosition ? {
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		collisionBoundary,
		collisionPadding,
		sticky,
		hideWhenDetached,
		avoidCollisions
	} : {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentProvider, {
		scope: __scopeSelect,
		content,
		viewport,
		onViewportChange: setViewport,
		itemRefCallback,
		selectedItem,
		onItemLeave: handleItemLeave,
		itemTextRefCallback,
		focusSelectedItem,
		selectedItemText,
		position,
		isPositioned,
		searchRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combination_default, {
			as: Slot,
			allowPinchZoom: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
				asChild: true,
				trapped: context.open,
				onMountAutoFocus: (event) => {
					event.preventDefault();
				},
				onUnmountAutoFocus: composeEventHandlers(onCloseAutoFocus, (event) => {
					context.trigger?.focus({ preventScroll: true });
					event.preventDefault();
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
					asChild: true,
					disableOutsidePointerEvents: true,
					onEscapeKeyDown,
					onPointerDownOutside,
					onFocusOutside: (event) => event.preventDefault(),
					onDismiss: () => context.onOpenChange(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPosition, {
						role: "listbox",
						id: context.contentId,
						"data-state": context.open ? "open" : "closed",
						dir: context.dir,
						onContextMenu: (event) => event.preventDefault(),
						...contentProps,
						...popperContentProps,
						onPlaced: () => setIsPositioned(true),
						ref: composedRefs,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...contentProps.style
						},
						onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
							const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
							if (event.key === "Tab") event.preventDefault();
							if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
							if ([
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(event.key)) {
								let candidateNodes = getItems().filter((item) => !item.disabled).map((item) => item.ref.current);
								if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
								if (["ArrowUp", "ArrowDown"].includes(event.key)) {
									const currentElement = event.target;
									const currentIndex = candidateNodes.indexOf(currentElement);
									candidateNodes = candidateNodes.slice(currentIndex + 1);
								}
								setTimeout(() => focusFirst(candidateNodes));
								event.preventDefault();
							}
						})
					})
				})
			})
		})
	});
});
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, onPlaced, ...popperProps } = props;
	const context = useSelectContext(CONTENT_NAME, __scopeSelect);
	const contentContext = useSelectContentContext(CONTENT_NAME, __scopeSelect);
	const [contentWrapper, setContentWrapper] = import_react.useState(null);
	const [content, setContent] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
	const getItems = useCollection(__scopeSelect);
	const shouldExpandOnScrollRef = import_react.useRef(false);
	const shouldRepositionRef = import_react.useRef(true);
	const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
	const position = import_react.useCallback(() => {
		if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
			const triggerRect = context.trigger.getBoundingClientRect();
			const contentRect = content.getBoundingClientRect();
			const valueNodeRect = context.valueNode.getBoundingClientRect();
			const itemTextRect = selectedItemText.getBoundingClientRect();
			if (context.dir !== "rtl") {
				const itemTextOffset = itemTextRect.left - contentRect.left;
				const left = valueNodeRect.left - itemTextOffset;
				const leftDelta = triggerRect.left - left;
				const minContentWidth = triggerRect.width + leftDelta;
				const contentWidth = Math.max(minContentWidth, contentRect.width);
				const rightEdge = window.innerWidth - CONTENT_MARGIN;
				const clampedLeft = clamp(left, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, rightEdge - contentWidth)]);
				contentWrapper.style.minWidth = minContentWidth + "px";
				contentWrapper.style.left = clampedLeft + "px";
			} else {
				const itemTextOffset = contentRect.right - itemTextRect.right;
				const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
				const rightDelta = window.innerWidth - triggerRect.right - right;
				const minContentWidth = triggerRect.width + rightDelta;
				const contentWidth = Math.max(minContentWidth, contentRect.width);
				const leftEdge = window.innerWidth - CONTENT_MARGIN;
				const clampedRight = clamp(right, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, leftEdge - contentWidth)]);
				contentWrapper.style.minWidth = minContentWidth + "px";
				contentWrapper.style.right = clampedRight + "px";
			}
			const items = getItems();
			const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
			const itemsHeight = viewport.scrollHeight;
			const contentStyles = window.getComputedStyle(content);
			const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
			const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
			const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
			const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
			const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
			const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
			const viewportStyles = window.getComputedStyle(viewport);
			const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
			const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
			const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
			const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
			const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
			const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
			const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
			const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
			if (contentTopToItemMiddle <= topEdgeToTriggerMiddle) {
				const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
				contentWrapper.style.bottom = "0px";
				const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
				const height = contentTopToItemMiddle + Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
				contentWrapper.style.height = height + "px";
			} else {
				const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
				contentWrapper.style.top = "0px";
				const height = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight) + itemMiddleToContentBottom;
				contentWrapper.style.height = height + "px";
				viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
			}
			contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
			contentWrapper.style.minHeight = minContentHeight + "px";
			contentWrapper.style.maxHeight = availableHeight + "px";
			onPlaced?.();
			requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
		}
	}, [
		getItems,
		context.trigger,
		context.valueNode,
		contentWrapper,
		content,
		viewport,
		selectedItem,
		selectedItemText,
		context.dir,
		onPlaced
	]);
	useLayoutEffect2(() => position(), [position]);
	const [contentZIndex, setContentZIndex] = import_react.useState();
	useLayoutEffect2(() => {
		if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
	}, [content]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewportProvider, {
		scope: __scopeSelect,
		contentWrapper,
		shouldExpandOnScrollRef,
		onScrollButtonChange: import_react.useCallback((node) => {
			if (node && shouldRepositionRef.current === true) {
				position();
				focusSelectedItem?.();
				shouldRepositionRef.current = false;
			}
		}, [position, focusSelectedItem]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: setContentWrapper,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: contentZIndex
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...popperProps,
				ref: composedRefs,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...popperProps.style
				}
			})
		})
	});
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, align = "start", collisionPadding = CONTENT_MARGIN, ...popperProps } = props;
	const popperScope = usePopperScope(__scopeSelect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		...popperScope,
		...popperProps,
		ref: forwardedRef,
		align,
		collisionPadding,
		style: {
			boxSizing: "border-box",
			...popperProps.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, nonce, ...viewportProps } = props;
	const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
	const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
	const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
	const prevScrollTopRef = import_react.useRef(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
		dangerouslySetInnerHTML: { __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}` },
		nonce
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
		scope: __scopeSelect,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...viewportProps,
			ref: composedRefs,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...viewportProps.style
			},
			onScroll: composeEventHandlers(viewportProps.onScroll, (event) => {
				const viewport = event.currentTarget;
				const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
				if (shouldExpandOnScrollRef?.current && contentWrapper) {
					const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
					if (scrolledBy > 0) {
						const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
						const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
						const cssHeight = parseFloat(contentWrapper.style.height);
						const prevHeight = Math.max(cssMinHeight, cssHeight);
						if (prevHeight < availableHeight) {
							const nextHeight = prevHeight + scrolledBy;
							const clampedNextHeight = Math.min(availableHeight, nextHeight);
							const heightDiff = nextHeight - clampedNextHeight;
							contentWrapper.style.height = clampedNextHeight + "px";
							if (contentWrapper.style.bottom === "0px") {
								viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
								contentWrapper.style.justifyContent = "flex-end";
							}
						}
					}
				}
				prevScrollTopRef.current = viewport.scrollTop;
			})
		})
	})] });
});
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME);
var SelectGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...groupProps } = props;
	const groupId = useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroupContextProvider, {
		scope: __scopeSelect,
		id: groupId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			role: "group",
			"aria-labelledby": groupId,
			...groupProps,
			ref: forwardedRef
		})
	});
});
SelectGroup$1.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel";
var SelectLabel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...labelProps } = props;
	const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		id: groupContext.id,
		...labelProps,
		ref: forwardedRef
	});
});
SelectLabel$1.displayName = LABEL_NAME;
var ITEM_NAME = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME);
var SelectItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, value, disabled = false, textValue: textValueProp, ...itemProps } = props;
	const context = useSelectContext(ITEM_NAME, __scopeSelect);
	const contentContext = useSelectContentContext(ITEM_NAME, __scopeSelect);
	const isSelected = context.value === value;
	const [textValue, setTextValue] = import_react.useState(textValueProp ?? "");
	const [isFocused, setIsFocused] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, (node) => contentContext.itemRefCallback?.(node, value, disabled));
	const textId = useId();
	const pointerTypeRef = import_react.useRef("touch");
	const handleSelect = () => {
		if (!disabled) {
			context.onValueChange(value);
			context.onOpenChange(false);
		}
	};
	if (value === "") throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemContextProvider, {
		scope: __scopeSelect,
		value,
		disabled,
		textId,
		isSelected,
		onItemTextChange: import_react.useCallback((node) => {
			setTextValue((prevTextValue) => prevTextValue || (node?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
			scope: __scopeSelect,
			value,
			disabled,
			textValue,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				role: "option",
				"aria-labelledby": textId,
				"data-highlighted": isFocused ? "" : void 0,
				"aria-selected": isSelected && isFocused,
				"data-state": isSelected ? "checked" : "unchecked",
				"aria-disabled": disabled || void 0,
				"data-disabled": disabled ? "" : void 0,
				tabIndex: disabled ? void 0 : -1,
				...itemProps,
				ref: composedRefs,
				onFocus: composeEventHandlers(itemProps.onFocus, () => setIsFocused(true)),
				onBlur: composeEventHandlers(itemProps.onBlur, () => setIsFocused(false)),
				onClick: composeEventHandlers(itemProps.onClick, () => {
					if (pointerTypeRef.current !== "mouse") handleSelect();
				}),
				onPointerUp: composeEventHandlers(itemProps.onPointerUp, () => {
					if (pointerTypeRef.current === "mouse") handleSelect();
				}),
				onPointerDown: composeEventHandlers(itemProps.onPointerDown, (event) => {
					pointerTypeRef.current = event.pointerType;
				}),
				onPointerMove: composeEventHandlers(itemProps.onPointerMove, (event) => {
					pointerTypeRef.current = event.pointerType;
					if (disabled) contentContext.onItemLeave?.();
					else if (pointerTypeRef.current === "mouse") event.currentTarget.focus({ preventScroll: true });
				}),
				onPointerLeave: composeEventHandlers(itemProps.onPointerLeave, (event) => {
					if (event.currentTarget === document.activeElement) contentContext.onItemLeave?.();
				}),
				onKeyDown: composeEventHandlers(itemProps.onKeyDown, (event) => {
					if (contentContext.searchRef?.current !== "" && event.key === " ") return;
					if (SELECTION_KEYS.includes(event.key)) handleSelect();
					if (event.key === " ") event.preventDefault();
				})
			})
		})
	});
});
SelectItem$1.displayName = ITEM_NAME;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, className, style, ...itemTextProps } = props;
	const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
	const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
	const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
	const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
	const [itemTextNode, setItemTextNode] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setItemTextNode(node), itemContext.onItemTextChange, (node) => contentContext.itemTextRefCallback?.(node, itemContext.value, itemContext.disabled));
	const textContent = itemTextNode?.textContent;
	const nativeOption = import_react.useMemo(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
		value: itemContext.value,
		disabled: itemContext.disabled,
		children: textContent
	}, itemContext.value), [
		itemContext.disabled,
		itemContext.value,
		textContent
	]);
	const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
	useLayoutEffect2(() => {
		onNativeOptionAdd(nativeOption);
		return () => onNativeOptionRemove(nativeOption);
	}, [
		onNativeOptionAdd,
		onNativeOptionRemove,
		nativeOption
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		id: itemContext.textId,
		...itemTextProps,
		ref: composedRefs
	}), itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? import_react_dom.createPortal(itemTextProps.children, context.valueNode) : null] });
});
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...itemIndicatorProps } = props;
	return useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect).isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"aria-hidden": true,
		...itemIndicatorProps,
		ref: forwardedRef
	}) : null;
});
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton$1 = import_react.forwardRef((props, forwardedRef) => {
	const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
	const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
	const [canScrollUp, setCanScrollUp] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
	useLayoutEffect2(() => {
		if (contentContext.viewport && contentContext.isPositioned) {
			let handleScroll2 = function() {
				setCanScrollUp(viewport.scrollTop > 0);
			};
			const viewport = contentContext.viewport;
			handleScroll2();
			viewport.addEventListener("scroll", handleScroll2);
			return () => viewport.removeEventListener("scroll", handleScroll2);
		}
	}, [contentContext.viewport, contentContext.isPositioned]);
	return canScrollUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollButtonImpl, {
		...props,
		ref: composedRefs,
		onAutoScroll: () => {
			const { viewport, selectedItem } = contentContext;
			if (viewport && selectedItem) viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
		}
	}) : null;
});
SelectScrollUpButton$1.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton$1 = import_react.forwardRef((props, forwardedRef) => {
	const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
	const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
	const [canScrollDown, setCanScrollDown] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
	useLayoutEffect2(() => {
		if (contentContext.viewport && contentContext.isPositioned) {
			let handleScroll2 = function() {
				const maxScroll = viewport.scrollHeight - viewport.clientHeight;
				setCanScrollDown(Math.ceil(viewport.scrollTop) < maxScroll);
			};
			const viewport = contentContext.viewport;
			handleScroll2();
			viewport.addEventListener("scroll", handleScroll2);
			return () => viewport.removeEventListener("scroll", handleScroll2);
		}
	}, [contentContext.viewport, contentContext.isPositioned]);
	return canScrollDown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollButtonImpl, {
		...props,
		ref: composedRefs,
		onAutoScroll: () => {
			const { viewport, selectedItem } = contentContext;
			if (viewport && selectedItem) viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
		}
	}) : null;
});
SelectScrollDownButton$1.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
	const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
	const autoScrollTimerRef = import_react.useRef(null);
	const getItems = useCollection(__scopeSelect);
	const clearAutoScrollTimer = import_react.useCallback(() => {
		if (autoScrollTimerRef.current !== null) {
			window.clearInterval(autoScrollTimerRef.current);
			autoScrollTimerRef.current = null;
		}
	}, []);
	import_react.useEffect(() => {
		return () => clearAutoScrollTimer();
	}, [clearAutoScrollTimer]);
	useLayoutEffect2(() => {
		getItems().find((item) => item.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [getItems]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"aria-hidden": true,
		...scrollIndicatorProps,
		ref: forwardedRef,
		style: {
			flexShrink: 0,
			...scrollIndicatorProps.style
		},
		onPointerDown: composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
			if (autoScrollTimerRef.current === null) autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
		}),
		onPointerMove: composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
			contentContext.onItemLeave?.();
			if (autoScrollTimerRef.current === null) autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
		}),
		onPointerLeave: composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
			clearAutoScrollTimer();
		})
	});
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...separatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"aria-hidden": true,
		...separatorProps,
		ref: forwardedRef
	});
});
SelectSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "SelectArrow";
var SelectArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...arrowProps } = props;
	const popperScope = usePopperScope(__scopeSelect);
	const context = useSelectContext(ARROW_NAME, __scopeSelect);
	const contentContext = useSelectContentContext(ARROW_NAME, __scopeSelect);
	return context.open && contentContext.position === "popper" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
		...popperScope,
		...arrowProps,
		ref: forwardedRef
	}) : null;
});
SelectArrow.displayName = ARROW_NAME;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = import_react.forwardRef(({ __scopeSelect, value, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const prevValue = usePrevious(value);
	import_react.useEffect(() => {
		const select = ref.current;
		if (!select) return;
		const selectProto = window.HTMLSelectElement.prototype;
		const setValue = Object.getOwnPropertyDescriptor(selectProto, "value").set;
		if (prevValue !== value && setValue) {
			const event = new Event("change", { bubbles: true });
			setValue.call(select, value);
			select.dispatchEvent(event);
		}
	}, [prevValue, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.select, {
		...props,
		style: {
			...VISUALLY_HIDDEN_STYLES,
			...props.style
		},
		ref: composedRefs,
		defaultValue: value
	});
});
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(value) {
	return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
	const handleSearchChange = useCallbackRef(onSearchChange);
	const searchRef = import_react.useRef("");
	const timerRef = import_react.useRef(0);
	const handleTypeaheadSearch = import_react.useCallback((key) => {
		const search = searchRef.current + key;
		handleSearchChange(search);
		(function updateSearch(value) {
			searchRef.current = value;
			window.clearTimeout(timerRef.current);
			if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
		})(search);
	}, [handleSearchChange]);
	const resetTypeahead = import_react.useCallback(() => {
		searchRef.current = "";
		window.clearTimeout(timerRef.current);
	}, []);
	import_react.useEffect(() => {
		return () => window.clearTimeout(timerRef.current);
	}, []);
	return [
		searchRef,
		handleTypeaheadSearch,
		resetTypeahead
	];
}
function findNextItem(items, search, currentItem) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
	let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0));
	if (normalizedSearch.length === 1) wrappedItems = wrappedItems.filter((v) => v !== currentItem);
	const nextItem = wrappedItems.find((item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root2 = Select$1;
var Trigger = SelectTrigger$1;
var Value = SelectValue$1;
var Icon = SelectIcon;
var Portal$1 = SelectPortal;
var Content2 = SelectContent$1;
var Viewport = SelectViewport;
var Label = SelectLabel$1;
var Item = SelectItem$1;
var ItemText = SelectItemText;
var ItemIndicator = SelectItemIndicator;
var ScrollUpButton = SelectScrollUpButton$1;
var ScrollDownButton = SelectScrollDownButton$1;
var Separator = SelectSeparator$1;
var Select = Root2;
var SelectValue = Value;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = Trigger.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
	ref,
	className: cn("relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = Content2.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
	ref,
	className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = Label.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemText, { children })]
}));
SelectItem.displayName = Item.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = Separator.displayName;
export { isSameDay as A, Check as B, isBefore as C, endOfMonth as D, startOfMonth as E, DollarSign as F, ArrowRightLeft as H, ChevronUp as I, ChevronRight as L, addMonths as M, addDays as N, endOfDay as O, Users as P, ChevronLeft as R, subDays as S, enUS$1 as T, ArrowUp as V, Popover as _, SelectValue as a, ptBR as b, Dialog as c, DialogDescription as d, DialogFooter as f, Calendar as g, DialogTrigger as h, SelectTrigger as i, getDefaultOptions as j, differenceInCalendarMonths as k, DialogClose as l, DialogTitle as m, SelectContent as n, usePrevious as o, DialogHeader as p, SelectItem as r, useDirection as s, Select as t, DialogContent as u, PopoverContent as v, format as w, parseISO as x, PopoverTrigger as y, ChevronDown as z };

//# sourceMappingURL=select-BRXzw63O.js.map