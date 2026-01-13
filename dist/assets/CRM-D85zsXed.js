import { C as ArrowUp, S as ChevronLeft, _ as differenceInDays, a as TabsContent, b as Users, c as Card, d as CardTitle, f as Calendar$1, g as isBefore, h as PopoverTrigger, i as Tabs, l as CardContent, m as PopoverContent, n as formatLeadsForExport, o as TabsList, p as Popover, s as TabsTrigger, t as ExportButton, u as CardHeader, w as Activity, x as DollarSign } from "./ExportButton-DFN73wSx.js";
import { $t as useLayoutEffect2, Bt as CircleAlert, C as DialogTitle, D as format, E as formatDistanceToNow, Ft as User, G as millisecondsInMinute, Gt as Calendar, H as toDate, It as Search, Jt as cva, Kt as Bell, Lt as RefreshCw, Mt as toast, N as getRoundingMethod, Nt as cn, Pt as X, R as normalizeDates, Rt as LoaderCircle, S as DialogHeader, T as ptBR, U as constructFrom, W as millisecondsInHour, _ as Dialog, _t as Primitive, a as SelectValue, an as createContextScope, at as Description, bt as buttonVariants, c as COLUMNS, cn as composeEventHandlers, ct as Root$1, dt as WarningProvider, ft as createDialogScope, i as SelectTrigger, in as createSlottable, it as Content, l as useCRMStore, lt as Title, n as SelectContent, nt as Skeleton, o as Label, on as require_jsx_runtime, ot as Overlay, pn as __toESM, qt as createLucideIcon, r as SelectItem, rt as Close, sn as useComposedRefs, st as Portal, t as Select, tn as useCallbackRef, tt as require_shim, un as require_react, ut as Trigger, v as DialogClose, vt as Input, x as DialogFooter, xt as useIsMobile, y as DialogContent, yt as Button, zt as Clock } from "./index-C2sUKBF4.js";
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
var CalendarClock = createLucideIcon("calendar-clock", [
	["path", {
		d: "M16 14v2.2l1.6 1",
		key: "fo4ql5"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["path", {
		d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",
		key: "1osxxc"
	}],
	["path", {
		d: "M3 10h5",
		key: "r794hk"
	}],
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["circle", {
		cx: "16",
		cy: "16",
		r: "6",
		key: "qoo3c4"
	}]
]);
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
var FolderOpen = createLucideIcon("folder-open", [["path", {
	d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
	key: "usdka0"
}]]);
var Funnel = createLucideIcon("funnel", [["path", {
	d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
	key: "sc7q7i"
}]]);
var Globe = createLucideIcon("globe", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
		key: "13o1zl"
	}],
	["path", {
		d: "M2 12h20",
		key: "9i4pu4"
	}]
]);
var Hash = createLucideIcon("hash", [
	["line", {
		x1: "4",
		x2: "20",
		y1: "9",
		y2: "9",
		key: "4lhtct"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "15",
		y2: "15",
		key: "vyu0kd"
	}],
	["line", {
		x1: "10",
		x2: "8",
		y1: "3",
		y2: "21",
		key: "1ggp8o"
	}],
	["line", {
		x1: "16",
		x2: "14",
		y1: "3",
		y2: "21",
		key: "weycgp"
	}]
]);
var Mail = createLucideIcon("mail", [["path", {
	d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
	key: "132q7q"
}], ["rect", {
	x: "2",
	y: "4",
	width: "20",
	height: "16",
	rx: "2",
	key: "izxlao"
}]]);
var MessageCircle = createLucideIcon("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]);
var MessageSquarePlus = createLucideIcon("message-square-plus", [
	["path", {
		d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
		key: "18887p"
	}],
	["path", {
		d: "M12 8v6",
		key: "1ib9pf"
	}],
	["path", {
		d: "M9 11h6",
		key: "1fldmi"
	}]
]);
var MessageSquare = createLucideIcon("message-square", [["path", {
	d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	key: "18887p"
}]]);
var Phone = createLucideIcon("phone", [["path", {
	d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	key: "9njp5v"
}]]);
var StickyNote = createLucideIcon("sticky-note", [["path", {
	d: "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",
	key: "1dfntj"
}], ["path", {
	d: "M15 3v5a1 1 0 0 0 1 1h5",
	key: "6s6qgf"
}]]);
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
function differenceInHours(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const diff = (+laterDate_ - +earlierDate_) / millisecondsInHour;
	return getRoundingMethod(options?.roundingMethod)(diff);
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
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function CRMFilters() {
	const { filters, setFilter, clearFilters, filteredLeads } = useCRMStore();
	const [searchValue, setSearchValue] = (0, import_react.useState)(filters.search);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			setFilter("search", searchValue);
		}, 300);
		return () => clearTimeout(timer);
	}, [searchValue, setFilter]);
	(0, import_react.useEffect)(() => {
		setSearchValue(filters.search);
	}, [filters.search]);
	const activeFiltersCount = [
		filters.search,
		filters.origin !== "all",
		filters.dateRange,
		filters.valueRange.min || filters.valueRange.max
	].filter(Boolean).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-4 border-b bg-white p-4 lg:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-4 lg:flex-row lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full lg:w-96",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar por nome, email ou telefone...",
						value: searchValue,
						onChange: (e) => setSearchValue(e.target.value),
						className: "pl-10"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: filters.origin,
							onValueChange: (val) => setFilter("origin", val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[140px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Origem" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "Todas Origens"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Planilha",
									children: "Planilha"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Manual",
									children: "Manual"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Site",
									children: "Site"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: cn("w-[240px] justify-start text-left font-normal", !filters.dateRange && "text-muted-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "mr-2 h-4 w-4" }), filters.dateRange?.from ? filters.dateRange.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									format(filters.dateRange.from, "dd/MM/yyyy"),
									" -",
									" ",
									format(filters.dateRange.to, "dd/MM/yyyy")
								] }) : format(filters.dateRange.from, "dd/MM/yyyy") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Data de Captura" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
							className: "w-auto p-0",
							align: "start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
								initialFocus: true,
								mode: "range",
								defaultMonth: filters.dateRange?.from,
								selected: filters.dateRange,
								onSelect: (range) => setFilter("dateRange", range),
								numberOfMonths: 2,
								locale: ptBR
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "border-dashed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-2 h-4 w-4" }), "Valor Potencial"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
							className: "w-80 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-medium leading-none",
										children: "Valor Potencial"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Filtre por valor estimado (Assentos * R$500)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "min",
											className: "text-xs",
											children: "Mínimo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "min",
											type: "number",
											placeholder: "0",
											value: filters.valueRange.min,
											onChange: (e) => setFilter("valueRange", {
												...filters.valueRange,
												min: e.target.value
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "max",
											className: "text-xs",
											children: "Máximo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "max",
											type: "number",
											placeholder: "10000",
											value: filters.valueRange.max,
											onChange: (e) => setFilter("valueRange", {
												...filters.valueRange,
												max: e.target.value
											})
										})]
									})]
								})]
							})
						})] }),
						activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: clearFilters,
							className: "h-8 px-2 text-xs",
							children: ["Limpar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "ml-2 h-3 w-3" })]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "secondary",
					className: "px-3 py-1 text-sm",
					children: [filteredLeads.length, " Leads Encontrados"]
				})
			})]
		})
	});
}
function CRMMetrics() {
	const { filteredLeads, loading } = useCRMStore();
	const boughtLeads = filteredLeads.filter((l) => l.status === "Comprou").length;
	const totalLeads = filteredLeads.length;
	const conversionRate = totalLeads ? boughtLeads / totalLeads * 100 : 0;
	const finishedLeads = filteredLeads.filter((l) => ["Comprou", "Não Comprou"].includes(l.status));
	const totalDays = finishedLeads.reduce((acc, lead) => {
		return acc + differenceInDays(new Date(lead.lastInteraction), new Date(lead.dataCaptacao));
	}, 0);
	const avgTime = finishedLeads.length ? totalDays / finishedLeads.length : 0;
	const pipelineColumns = [
		"Capturado",
		"Em Contato",
		"Agendado",
		"Aguardando Cliente"
	];
	const pipelineCount = filteredLeads.filter((l) => pipelineColumns.includes(l.status)).length;
	const pipelineValue = filteredLeads.filter((l) => pipelineColumns.includes(l.status)).reduce((acc, l) => acc + l.assentosAdicionais * 500, 0);
	const convertedValue = filteredLeads.filter((l) => l.status === "Comprou").reduce((acc, l) => acc + l.assentosAdicionais * 500, 0);
	const formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(val);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-2 lg:grid-cols-5 p-6 pb-0",
		children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full rounded-xl" }, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-5 lg:p-6 lg:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row items-center justify-between space-y-0 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-sm font-medium",
					children: "Taxa de Conversão"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-muted-foreground" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl font-bold",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: conversionRate >= 5 ? "text-green-600" : conversionRate >= 3 ? "text-yellow-600" : "text-red-600",
					children: [conversionRate.toFixed(1), "%"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					boughtLeads,
					" de ",
					totalLeads,
					" leads"
				]
			})] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row items-center justify-between space-y-0 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-sm font-medium",
					children: "Tempo Médio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-muted-foreground" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-2xl font-bold",
				children: [avgTime.toFixed(1), " dias"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Ciclo de vendas"
			})] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row items-center justify-between space-y-0 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-sm font-medium",
					children: "Leads no Pipeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-muted-foreground" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl font-bold",
				children: pipelineCount
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Em andamento"
			})] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row items-center justify-between space-y-0 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-sm font-medium",
					children: "Valor em Pipeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4 text-muted-foreground" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl font-bold",
				children: formatCurrency(pipelineValue)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Potencial ativo"
			})] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row items-center justify-between space-y-0 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-sm font-medium",
					children: "Valor Convertido"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-muted-foreground" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl font-bold text-green-600",
				children: formatCurrency(convertedValue)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Vendas realizadas"
			})] })] })
		]
	});
}
const CRMCard = (0, import_react.memo)(({ lead, onDragStart, onClick }) => {
	const lastInteraction = new Date(lead.lastInteraction);
	const now = /* @__PURE__ */ new Date();
	const hoursSinceInteraction = differenceInHours(now, lastInteraction);
	const daysSinceInteraction = differenceInDays(now, lastInteraction);
	let borderColorClass = "border-l-green-500";
	if (hoursSinceInteraction > 72) borderColorClass = "border-l-red-500";
	else if (hoursSinceInteraction > 24) borderColorClass = "border-l-yellow-500";
	const isInactive = daysSinceInteraction > 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		draggable: true,
		onDragStart: (e) => {
			e.currentTarget.style.transform = "rotate(-2deg)";
			onDragStart(e, lead.id);
		},
		onDragEnd: (e) => {
			e.currentTarget.style.transform = "none";
		},
		onClick: () => onClick?.(lead),
		className: "cursor-grab active:cursor-grabbing touch-none select-none pb-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: cn("overflow-hidden border-l-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1 active:scale-95", borderColorClass),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "truncate text-sm font-semibold text-gray-900 dark:text-gray-100",
								children: lead.nomeCompleto
							})
						}), isInactive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 shrink-0 text-red-500 animate-pulse" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: lead.email
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lead.telefone })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "text-[10px] font-normal",
							children: lead.origem
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-medium text-gray-600 dark:text-gray-300",
								children: [lead.assentosAdicionais, " assentos"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 text-[10px] text-gray-400 text-right",
						children: [hoursSinceInteraction, "h sem interação"]
					})
				]
			})
		})
	});
});
CRMCard.displayName = "CRMCard";
function VirtualList({ items, height, itemHeight, renderItem, className }) {
	const containerRef = (0, import_react.useRef)(null);
	const [scrollTop, setScrollTop] = (0, import_react.useState)(0);
	const [containerHeight, setContainerHeight] = (0, import_react.useState)(typeof height === "number" ? height : 500);
	(0, import_react.useEffect)(() => {
		if (typeof height === "number") {
			setContainerHeight(height);
			return;
		}
		const el = containerRef.current;
		if (!el) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) setContainerHeight(entry.contentRect.height);
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, [height]);
	const onScroll = (e) => {
		setScrollTop(e.currentTarget.scrollTop);
	};
	const totalHeight = items.length * itemHeight;
	const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
	const endIndex = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / itemHeight) + 2);
	const visibleItems = items.slice(startIndex, endIndex);
	const offsetY = startIndex * itemHeight;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		onScroll,
		className,
		style: {
			height,
			overflowY: "auto",
			position: "relative"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				height: totalHeight,
				position: "relative"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					transform: `translateY(${offsetY}px)`
				},
				children: visibleItems.map((item, index) => renderItem(item, startIndex + index))
			})
		})
	});
}
function EmptyState({ icon: Icon, title, description, className, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center justify-center p-8 text-center animate-fade-in", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-8 w-8 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold text-foreground mb-1",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground max-w-sm mb-6",
				children: description
			}),
			action
		]
	});
}
function CRMColumn({ id, label, color, leads, onDropLead, onCardClick }) {
	const [isOver, setIsOver] = (0, import_react.useState)(false);
	const handleDragOver = (e) => {
		e.preventDefault();
		setIsOver(true);
	};
	const handleDragLeave = () => {
		setIsOver(false);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setIsOver(false);
		const leadId = e.dataTransfer.getData("leadId");
		if (leadId) onDropLead(leadId, id);
	};
	const handleDragStart = (e, leadId) => {
		e.dataTransfer.setData("leadId", leadId);
		e.dataTransfer.effectAllowed = "move";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex h-full min-w-[280px] w-[280px] flex-col rounded-lg border bg-gray-50/50 dark:bg-gray-900/50 transition-colors", isOver && "bg-blue-50 dark:bg-blue-900/20 border-blue-300 border-dashed"),
		onDragOver: handleDragOver,
		onDragLeave: handleDragLeave,
		onDrop: handleDrop,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b p-3 bg-background/50 rounded-t-lg backdrop-blur-sm",
			style: { borderTop: `4px solid ${color}` },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold text-gray-700 dark:text-gray-200",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				className: "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-sm",
				children: leads.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 p-2",
			children: leads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: FolderOpen,
				title: "Vazio",
				className: "h-full"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualList, {
				items: leads,
				height: "100%",
				itemHeight: 160,
				className: "scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700",
				renderItem: (lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMCard, {
					lead,
					onDragStart: handleDragStart,
					onClick: onCardClick
				}, lead.id)
			})
		})]
	});
}
function createContextScope$1(scopeName, createContextScopeDeps = []) {
	let defaultContexts = [];
	function createContext3(rootComponentName, defaultContext) {
		const BaseContext = import_react.createContext(defaultContext);
		BaseContext.displayName = rootComponentName + "Context";
		const index = defaultContexts.length;
		defaultContexts = [...defaultContexts, defaultContext];
		const Provider = (props) => {
			const { scope, children, ...context } = props;
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const value = import_react.useMemo(() => context, Object.values(context));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
				value,
				children
			});
		};
		Provider.displayName = rootComponentName + "Provider";
		function useContext2(consumerName, scope) {
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const context = import_react.useContext(Context);
			if (context) return context;
			if (defaultContext !== void 0) return defaultContext;
			throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
		}
		return [Provider, useContext2];
	}
	const createScope = () => {
		const scopeContexts = defaultContexts.map((defaultContext) => {
			return import_react.createContext(defaultContext);
		});
		return function useScope(scope) {
			const contexts = scope?.[scopeName] || scopeContexts;
			return import_react.useMemo(() => ({ [`__scope${scopeName}`]: {
				...scope,
				[scopeName]: contexts
			} }), [scope, contexts]);
		};
	};
	createScope.scopeName = scopeName;
	return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
	const baseScope = scopes[0];
	if (scopes.length === 1) return baseScope;
	const createScope = () => {
		const scopeHooks = scopes.map((createScope2) => ({
			useScope: createScope2(),
			scopeName: createScope2.scopeName
		}));
		return function useComposedScopes(overrideScopes) {
			const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
				const currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
				return {
					...nextScopes2,
					...currentScope
				};
			}, {});
			return import_react.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
		};
	};
	createScope.scopeName = baseScope.scopeName;
	return createScope;
}
var import_shim = require_shim();
function useIsHydrated() {
	return (0, import_shim.useSyncExternalStore)(subscribe, () => true, () => false);
}
function subscribe() {
	return () => {};
}
var AVATAR_NAME = "Avatar";
var [createAvatarContext, createAvatarScope] = createContextScope$1(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, ...avatarProps } = props;
	const [imageLoadingStatus, setImageLoadingStatus] = import_react.useState("idle");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarProvider, {
		scope: __scopeAvatar,
		imageLoadingStatus,
		onImageLoadingStatusChange: setImageLoadingStatus,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			...avatarProps,
			ref: forwardedRef
		})
	});
});
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, src, onLoadingStatusChange = () => {}, ...imageProps } = props;
	const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
	const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
	const handleLoadingStatusChange = useCallbackRef((status) => {
		onLoadingStatusChange(status);
		context.onImageLoadingStatusChange(status);
	});
	useLayoutEffect2(() => {
		if (imageLoadingStatus !== "idle") handleLoadingStatusChange(imageLoadingStatus);
	}, [imageLoadingStatus, handleLoadingStatusChange]);
	return imageLoadingStatus === "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.img, {
		...imageProps,
		ref: forwardedRef,
		src
	}) : null;
});
AvatarImage$1.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, delayMs, ...fallbackProps } = props;
	const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
	const [canRender, setCanRender] = import_react.useState(delayMs === void 0);
	import_react.useEffect(() => {
		if (delayMs !== void 0) {
			const timerId = window.setTimeout(() => setCanRender(true), delayMs);
			return () => window.clearTimeout(timerId);
		}
	}, [delayMs]);
	return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		...fallbackProps,
		ref: forwardedRef
	}) : null;
});
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
	if (!image) return "idle";
	if (!src) return "error";
	if (image.src !== src) image.src = src;
	return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
	const isHydrated = useIsHydrated();
	const imageRef = import_react.useRef(null);
	const image = (() => {
		if (!isHydrated) return null;
		if (!imageRef.current) imageRef.current = new window.Image();
		return imageRef.current;
	})();
	const [loadingStatus, setLoadingStatus] = import_react.useState(() => resolveLoadingStatus(image, src));
	useLayoutEffect2(() => {
		setLoadingStatus(resolveLoadingStatus(image, src));
	}, [image, src]);
	useLayoutEffect2(() => {
		const updateStatus = (status) => () => {
			setLoadingStatus(status);
		};
		if (!image) return;
		const handleLoad = updateStatus("loaded");
		const handleError = updateStatus("error");
		image.addEventListener("load", handleLoad);
		image.addEventListener("error", handleError);
		if (referrerPolicy) image.referrerPolicy = referrerPolicy;
		if (typeof crossOrigin === "string") image.crossOrigin = crossOrigin;
		return () => {
			image.removeEventListener("load", handleLoad);
			image.removeEventListener("error", handleError);
		};
	}, [
		image,
		crossOrigin,
		referrerPolicy
	]);
	return loadingStatus;
}
var Root = Avatar$1;
var Image = AvatarImage$1;
var Fallback = AvatarFallback$1;
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Root.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = Image.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = Fallback.displayName;
function LeadInfo({ lead }) {
	const initials = lead.nomeCompleto.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
	const potentialValue = lead.assentosAdicionais * 500;
	const statusColor = COLUMNS.find((c) => c.id === lead.status)?.color || "#6B7280";
	const role = "Estrategista de Marketing";
	const location = "São Paulo, BR";
	const probability = 92;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center space-y-4 pt-2 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-24 w-24 border-4 border-white shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: `https://img.usecurling.com/ppl/medium?seed=${lead.id}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "bg-gray-200 text-2xl text-gray-500",
							children: initials
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-gray-900",
							children: lead.nomeCompleto
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "rounded-full border-0 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-600 hover:bg-orange-100",
							children: [
								"HOT LEAD (",
								probability,
								"%)"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center justify-center gap-1.5 text-sm text-gray-500",
						children: [
							role,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gray-300",
								children: "•"
							}),
							" ",
							location
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full max-w-xs items-center justify-center gap-6 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-6 w-6" }),
							label: "Ligar",
							color: "bg-[#007AFF]",
							onClick: () => window.open(`tel:${lead.telefone}`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-6 w-6" }),
							label: "E-mail",
							color: "bg-[#5856D6]",
							onClick: () => window.open(`mailto:${lead.email}`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" }),
							label: "WhatsApp",
							color: "bg-[#34C759]",
							onClick: () => window.open(`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`)
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "pl-4 text-xs font-semibold uppercase tracking-wider text-gray-400",
					children: "Informações Pessoais"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-gray-200/60 bg-white shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-gray-400" }),
							label: "E-mail",
							value: lead.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-gray-400" }),
							label: "Telefone",
							value: lead.telefone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-gray-400" }),
							label: "Status",
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2 w-2 rounded-full",
									style: { backgroundColor: statusColor }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: "#007AFF" },
									children: lead.status
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5 text-gray-400" }),
							label: "Origem",
							value: lead.origem,
							isLast: true
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "pl-4 text-xs font-semibold uppercase tracking-wider text-gray-400",
					children: "Dados da Venda"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-gray-200/60 bg-white shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-gray-400" }),
							label: "Assentos Adicionais",
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "bg-gray-100 font-normal text-gray-700",
								children: [lead.assentosAdicionais, " Unidades"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5 text-gray-400" }),
							label: "Valor Estimado",
							value: new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL"
							}).format(potentialValue)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-5 w-5 text-gray-400" }),
							label: "Probabilidade",
							value: `${probability}%`,
							isLast: true
						})
					]
				})]
			})]
		})]
	});
}
function ActionButton({ icon, label, color, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group flex cursor-pointer flex-col items-center gap-2",
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-transform active:scale-95", color),
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] font-medium uppercase tracking-tight text-blue-600 group-hover:opacity-80",
			children: label
		})]
	});
}
function InfoRow({ icon, label, value, isLast }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center justify-between bg-white p-4", !isLast && "border-b border-gray-100"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-gray-900",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-normal text-gray-500",
			children: value
		})]
	});
}
function LeadTimeline({ lead }) {
	const history = [...lead.history || []].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const getIcon = (type) => {
		switch (type) {
			case "interaction": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-blue-600" });
			case "status_change": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "h-4 w-4 text-orange-600" });
			case "follow_up_set": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-4 w-4 text-purple-600" });
			case "note_added": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "h-4 w-4 text-yellow-600" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-gray-600" });
		}
	};
	const getBgColor = (type) => {
		switch (type) {
			case "interaction": return "bg-blue-100";
			case "status_change": return "bg-orange-100";
			case "follow_up_set": return "bg-purple-100";
			case "note_added": return "bg-yellow-100";
			default: return "bg-gray-100";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "pl-4 text-xs font-semibold uppercase tracking-wider text-gray-400",
			children: "Histórico de Atividade"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-gray-200/60 bg-white p-6 shadow-sm",
			children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-8 text-center text-sm text-gray-400",
				children: "Nenhuma atividade registrada"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative space-y-8 pl-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-2 left-[20px] top-2 w-px -translate-x-1/2 bg-gray-200" }), history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white shadow-sm ring-4 ring-white", getBgColor(item.type)),
						children: getIcon(item.type)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-1 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium leading-none text-gray-900",
							children: item.description
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-gray-500",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: format(new Date(item.date), "d 'de' MMMM 'às' HH:mm", { locale: ptBR }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-gray-600",
									children: item.author
								})
							]
						})]
					})]
				}, item.id))]
			})
		})]
	});
}
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [createDialogScope]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
	const { __scopeAlertDialog, ...alertDialogProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
		...dialogScope,
		...alertDialogProps,
		modal: true
	});
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...triggerProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		...dialogScope,
		...triggerProps,
		ref: forwardedRef
	});
});
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
	const { __scopeAlertDialog, ...portalProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...dialogScope,
		...portalProps
	});
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...overlayProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
		...dialogScope,
		...overlayProps,
		ref: forwardedRef
	});
});
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, children, ...contentProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef);
	const cancelRef = import_react.useRef(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningProvider, {
		contentName: CONTENT_NAME,
		titleName: TITLE_NAME,
		docsSlug: "alert-dialog",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContentProvider, {
			scope: __scopeAlertDialog,
			cancelRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
				role: "alertdialog",
				...dialogScope,
				...contentProps,
				ref: composedRefs,
				onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
					event.preventDefault();
					cancelRef.current?.focus({ preventScroll: true });
				}),
				onPointerDownOutside: (event) => event.preventDefault(),
				onInteractOutside: (event) => event.preventDefault(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slottable, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionWarning, { contentRef })]
			})
		})
	});
});
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...titleProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
		...dialogScope,
		...titleProps,
		ref: forwardedRef
	});
});
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...descriptionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
		...dialogScope,
		...descriptionProps,
		ref: forwardedRef
	});
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...actionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...actionProps,
		ref: forwardedRef
	});
});
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...cancelProps } = props;
	const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const ref = useComposedRefs(forwardedRef, cancelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...cancelProps,
		ref
	});
});
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
	const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
	import_react.useEffect(() => {
		if (!document.getElementById(contentRef.current?.getAttribute("aria-describedby"))) console.warn(MESSAGE);
	}, [MESSAGE, contentRef]);
	return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function LeadNotes({ lead }) {
	const { addNote } = useCRMStore();
	const [noteContent, setNoteContent] = (0, import_react.useState)("");
	const handleAddNote = () => {
		if (!noteContent.trim()) return;
		addNote(lead.id, noteContent);
		setNoteContent("");
		toast.success("Nota adicionada");
	};
	const handleDeleteMock = () => {
		toast.success("Nota removida");
	};
	const notes = [...lead.notes || []].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "pl-4 text-xs font-semibold uppercase tracking-wider text-gray-400",
				children: "Notas Recentes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-gray-200/60 bg-white p-8 text-center text-sm italic text-gray-400",
					children: "Sem notas recentes."
				}) : notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "group rounded-xl border border-gray-200/60 bg-white p-4 shadow-sm transition-all hover:shadow-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "mt-1 h-8 w-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: `https://img.usecurling.com/ppl/thumbnail?seed=${note.author}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "U" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-gray-900",
										children: note.author
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-gray-400",
										children: formatDistanceToNow(new Date(note.createdAt), {
											addSuffix: true,
											locale: ptBR
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-gray-600",
									children: note.content
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "-mr-1 -mt-1 h-6 w-6 text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Excluir nota?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Esta ação é irreversível." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: handleDeleteMock,
							className: "bg-red-600 hover:bg-red-700",
							children: "Excluir"
						})] })] })] })]
					})
				}, note.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-2 rounded-full border border-gray-300 bg-white p-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "h-10 flex-1 border-0 bg-transparent px-4 text-sm shadow-none focus-visible:ring-0",
					placeholder: "Adicionar uma nota...",
					value: noteContent,
					onChange: (e) => setNoteContent(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && handleAddNote()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					className: cn("h-8 w-8 shrink-0 rounded-full transition-all", noteContent.trim() ? "bg-[#007AFF] hover:bg-blue-600" : "cursor-not-allowed bg-gray-200 text-gray-400"),
					onClick: handleAddNote,
					disabled: !noteContent.trim(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" })
				})]
			})
		]
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function LeadInteractionModal({ leadId, open, onOpenChange }) {
	const { addInteraction } = useCRMStore();
	const [type, setType] = (0, import_react.useState)("");
	const [details, setDetails] = (0, import_react.useState)("");
	const handleSave = () => {
		if (!type) {
			toast.error("Selecione o tipo de interação");
			return;
		}
		addInteraction(leadId, type, details);
		toast.success("Interação registrada com sucesso");
		onOpenChange(false);
		setType("");
		setDetails("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-[425px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Registrar Interação" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "type",
							children: "Tipo de Interação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							onValueChange: setType,
							value: type,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione..." }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Ligação",
									children: "Ligação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "WhatsApp",
									children: "WhatsApp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Email",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Reunião",
									children: "Reunião"
								})
							] })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "details",
							children: "Detalhes (Opcional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "details",
							placeholder: "Resumo da conversa...",
							value: details,
							onChange: (e) => setDetails(e.target.value)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "Cancelar"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSave,
					children: "Salvar Interação"
				})] })
			]
		})
	});
}
function LeadFollowUpModal({ leadId, open, onOpenChange }) {
	const { scheduleFollowUp } = useCRMStore();
	const [date, setDate] = (0, import_react.useState)("");
	const handleSave = () => {
		if (!date) {
			toast.error("Selecione uma data e hora");
			return;
		}
		if (isBefore(parseISO(date), /* @__PURE__ */ new Date())) {
			toast.error("A data deve ser futura");
			return;
		}
		scheduleFollowUp(leadId, date);
		toast.success("Follow-up agendado com sucesso");
		onOpenChange(false);
		setDate("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-[425px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Agendar Follow-up" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "date",
							children: "Data e Hora"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "date",
							type: "datetime-local",
							value: date,
							onChange: (e) => setDate(e.target.value),
							min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16)
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "Cancelar"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSave,
					children: "Confirmar Agendamento"
				})] })
			]
		})
	});
}
function LeadDetailsModal({ lead, open, onOpenChange }) {
	const [interactionOpen, setInteractionOpen] = (0, import_react.useState)(false);
	const [followUpOpen, setFollowUpOpen] = (0, import_react.useState)(false);
	if (!lead) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "flex h-[100dvh] max-w-[800px] flex-col gap-0 overflow-hidden border-0 bg-[#F2F2F7] p-0 shadow-2xl outline-none focus:outline-none md:h-[90vh] md:max-h-[850px] md:rounded-[24px] [&>button]:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "supports-[backdrop-filter]:bg-white/60 sticky top-0 z-20 flex items-center justify-between border-b border-gray-200/50 bg-white/80 px-4 py-3 backdrop-blur-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								className: "h-auto gap-1 p-0 pl-1 text-base font-normal text-[#007AFF] hover:bg-transparent hover:opacity-70",
								onClick: () => onOpenChange(false),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "-ml-2 h-6 w-6" }), "Voltar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-base font-semibold text-gray-900",
								children: "Perfil do Lead"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "h-auto p-0 pr-1 text-base font-normal text-[#007AFF] hover:bg-transparent hover:opacity-70",
								onClick: () => {},
								children: "Editar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto overflow-x-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex w-full max-w-3xl flex-col gap-8 p-4 pb-24 md:p-8 md:pb-32",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadInfo, { lead }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadTimeline, { lead }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadNotes, { lead })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "supports-[backdrop-filter]:bg-white/80 absolute bottom-0 left-0 right-0 z-20 border-t border-gray-200/50 bg-white/80 p-4 pb-6 backdrop-blur-xl md:pb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex w-full max-w-3xl flex-col gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "h-12 rounded-xl border-gray-200 bg-white font-semibold text-gray-900 shadow-sm hover:bg-gray-50",
									onClick: () => setFollowUpOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "mr-2 h-5 w-5" }), "Agendar Follow-up"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-12 rounded-xl bg-[#007AFF] font-semibold text-white shadow-sm hover:bg-[#0062CC]",
									onClick: () => setInteractionOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, { className: "mr-2 h-5 w-5" }), "Registrar Interação"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "text-center text-sm text-gray-400 transition-colors hover:text-gray-600",
								onClick: () => onOpenChange(false),
								children: "Fechar Perfil"
							})]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadInteractionModal, {
			leadId: lead.id,
			open: interactionOpen,
			onOpenChange: setInteractionOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadFollowUpModal, {
			leadId: lead.id,
			open: followUpOpen,
			onOpenChange: setFollowUpOpen
		})
	] });
}
function CRMBoard() {
	const { filteredLeads, moveLead } = useCRMStore();
	const isMobile = useIsMobile();
	const [selectedLead, setSelectedLead] = (0, import_react.useState)(null);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const handleDropLead = (leadId, newStatus) => {
		try {
			moveLead(leadId, newStatus);
			toast.success("Lead movido com sucesso", { description: `Novo status: ${newStatus}` });
		} catch (error) {
			toast.error("Erro ao mover lead", { description: "Tente novamente." });
		}
	};
	const handleCardClick = (lead) => {
		setSelectedLead(lead);
		setModalOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex-1 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: COLUMNS[0].id,
			className: "h-full flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
				className: "w-full flex overflow-x-auto justify-start no-scrollbar mb-4 bg-transparent p-0 gap-2",
				children: COLUMNS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: col.id,
					className: "rounded-full border bg-white px-4 data-[state=active]:bg-primary data-[state=active]:text-white whitespace-nowrap",
					children: [col.label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-2 text-xs opacity-70",
						children: [
							"(",
							filteredLeads.filter((l) => l.status === col.id).length,
							")"
						]
					})]
				}, col.id))
			}), COLUMNS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: col.id,
				className: "flex-1 mt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[calc(100vh-280px)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMColumn, {
						id: col.id,
						label: col.label,
						color: col.color,
						leads: filteredLeads.filter((l) => l.status === col.id),
						onDropLead: handleDropLead,
						onCardClick: handleCardClick
					})
				})
			}, col.id))]
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full flex-1 gap-4 overflow-x-auto p-6 pb-2",
		children: COLUMNS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMColumn, {
			id: col.id,
			label: col.label,
			color: col.color,
			leads: filteredLeads.filter((l) => l.status === col.id),
			onDropLead: handleDropLead,
			onCardClick: handleCardClick
		}, col.id))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadDetailsModal, {
		lead: selectedLead,
		open: modalOpen,
		onOpenChange: setModalOpen
	})] });
}
function CRM() {
	const { fetchLeads, loading, error, leads, filteredLeads } = useCRMStore();
	(0, import_react.useEffect)(() => {
		fetchLeads();
	}, [fetchLeads]);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-12 w-12 text-yellow-500" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-gray-900 dark:text-gray-100",
				children: "Erro ao carregar CRM"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => fetchLeads(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-2 h-4 w-4" }), "Tentar Novamente"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-[#F3F4F6] dark:bg-background transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-10 flex items-center justify-between border-b bg-white dark:bg-card px-6 py-4 shadow-sm animate-fade-in-down",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold text-[#1F2937] dark:text-white md:text-2xl",
					children: "🎯 CRM - Pipeline de Vendas"
				}), loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center text-sm text-gray-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Sincronizando..."]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportButton, {
				data: filteredLeads,
				filename: "crm_leads",
				formatData: formatLeadsForExport,
				label: "Exportar Leads"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col overflow-hidden animate-fade-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMMetrics, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMFilters, {}),
				loading && leads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-1 items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMBoard, {})
			]
		})]
	});
}
export { CRM as default };

//# sourceMappingURL=CRM-D85zsXed.js.map