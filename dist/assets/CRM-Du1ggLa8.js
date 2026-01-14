import { _ as ArrowRightLeft, a as parseISO, f as Funnel, g as ArrowUp, h as ChevronLeft, i as PopoverTrigger, l as isSameDay, m as DollarSign, n as Popover, o as subDays, p as Download, r as PopoverContent, s as isBefore, t as Calendar, v as ArrowDown } from "./calendar-CveEDU1m.js";
import { $t as createLucideIcon, A as DropdownMenuItem, Bt as X, C as DialogFooter, Ct as Input, D as ptBR, Et as useIsMobile, F as useCRMStore, G as differenceInDays, Ht as Users, I as formatDistanceToNow, J as constructNow, Jt as CircleAlert, Kt as LoaderCircle, L as format, N as COLUMNS, O as DropdownMenu, P as calculateLeadValue, Qt as Calendar$1, Rt as toast, St as Primitive, T as DialogTitle, Tt as buttonVariants, Ut as TrendingUp, W as getRoundingMethod, Wt as Search, Z as normalizeDates, _t as createDialogScope, a as Select, an as useLayoutEffect2, b as DialogClose, c as SelectTrigger, ct as Close, d as Label, dn as createContextScope, dt as Overlay, en as cva, fn as require_jsx_runtime, ft as Portal, gn as require_react, gt as WarningProvider, ht as Trigger, j as DropdownMenuTrigger, k as DropdownMenuContent, l as SelectValue, lt as Content, mn as composeEventHandlers, mt as Title, nt as constructFrom, o as SelectContent, ot as require_shim, pn as useComposedRefs, pt as Root$1, qt as Clock, rt as millisecondsInHour, s as SelectItem, sn as useCallbackRef, un as createSlottable, ut as Description, w as DialogHeader, wt as Button, x as DialogContent, y as Dialog, yn as __toESM, zt as cn } from "./index-Bv5eVTFr.js";
var Activity = createLucideIcon("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]);
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
var CircleCheckBig = createLucideIcon("circle-check-big", [["path", {
	d: "M21.801 10A10 10 0 1 1 17 3.335",
	key: "yps3ct"
}], ["path", {
	d: "m9 11 3 3L22 4",
	key: "1pflzl"
}]]);
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
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
function isToday(date, options) {
	return isSameDay(constructFrom(options?.in || date, date), constructNow(options?.in || date));
}
function isYesterday(date, options) {
	return isSameDay(constructFrom(options?.in || date, date), subDays(constructNow(options?.in || date), 1));
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cyber-card p-5 mb-8 flex flex-wrap items-center gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5 flex-1 min-w-[250px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500",
					children: "Buscar Lead"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Nome, email ou telefone...",
						value: searchValue,
						onChange: (e) => setSearchValue(e.target.value),
						className: "w-full text-[13px] font-medium pl-10 pr-3 py-2 border border-[#333333] rounded-lg bg-[#1A1A1A] text-white focus:ring-1 focus:ring-[#D9B979] focus:outline-none"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500",
					children: "Origem"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: filters.origin,
					onChange: (e) => setFilter("origin", e.target.value),
					className: "text-[13px] font-medium px-3 py-2 border border-[#333333] rounded-lg bg-[#1A1A1A] text-white focus:ring-1 focus:ring-[#D9B979] min-w-[160px] outline-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "Todas Origens"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Planilha",
							children: "Planilha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Manual",
							children: "Manual"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Site",
							children: "Site"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500",
					children: "Data de Captura"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: cn("flex items-center gap-3 px-3 py-2 border border-[#333333] rounded-lg cursor-pointer text-left min-w-[220px] bg-[#1A1A1A]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[13px] font-medium",
							style: { color: filters.dateRange?.from ? "white" : "#6B7280" },
							children: filters.dateRange?.from ? filters.dateRange.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								format(filters.dateRange.from, "dd/MM/yyyy"),
								" -",
								" ",
								format(filters.dateRange.to, "dd/MM/yyyy")
							] }) : format(filters.dateRange.from, "dd/MM/yyyy") : "Selecione..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, { className: "h-[18px] w-[18px] ml-auto text-gray-500" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
					className: "w-auto p-0 bg-[#1A1A1A] border-[#333333]",
					align: "start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
						initialFocus: true,
						mode: "range",
						defaultMonth: filters.dateRange?.from,
						selected: filters.dateRange,
						onSelect: (range) => setFilter("dateRange", range),
						numberOfMonths: 2,
						locale: ptBR,
						className: "bg-[#1A1A1A] text-white"
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500",
					children: "Valor Potencial"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-2 px-3 py-2 border border-[#333333] rounded-lg cursor-pointer bg-[#1A1A1A]",
						style: { borderColor: filters.valueRange.min || filters.valueRange.max ? "#D9B979" : "#333333" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-[18px] w-[18px] text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[13px] font-medium",
							style: { color: filters.valueRange.min || filters.valueRange.max ? "#D9B979" : "white" },
							children: filters.valueRange.min || filters.valueRange.max ? `R$ ${filters.valueRange.min || "0"} - R$ ${filters.valueRange.max || "∞"}` : "Filtrar valor"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
					className: "w-80 p-4 bg-[#1A1A1A] border-[#333333] rounded-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-medium leading-none text-white",
								children: "Valor Potencial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500",
								children: "Filtre pelo valor total estimado do lead"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium text-gray-500",
									children: "Mínimo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									placeholder: "0",
									value: filters.valueRange.min,
									onChange: (e) => setFilter("valueRange", {
										...filters.valueRange,
										min: e.target.value
									}),
									className: "rounded-lg bg-[#0C0C0D] border-[#333333] text-white"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium text-gray-500",
									children: "Máximo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									placeholder: "10000",
									value: filters.valueRange.max,
									onChange: (e) => setFilter("valueRange", {
										...filters.valueRange,
										max: e.target.value
									}),
									className: "rounded-lg bg-[#0C0C0D] border-[#333333] text-white"
								})]
							})]
						})]
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5 ml-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500",
					children: "Resultados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-2 rounded-xl text-[13px] font-semibold bg-[#D9B979]/10 text-[#D9B979]",
						children: [filteredLeads.length, " Leads"]
					}), activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: clearFilters,
						className: "flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors text-gray-400 hover:bg-white/5 hover:text-white",
						children: ["Limpar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })]
					})]
				})]
			})
		]
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
	const pipelineValue = filteredLeads.filter((l) => pipelineColumns.includes(l.status)).reduce((acc, l) => acc + (l.valorEstimado ?? calculateLeadValue(l)), 0);
	const convertedValue = filteredLeads.filter((l) => l.status === "Comprou").reduce((acc, l) => acc + (l.valorEstimado ?? calculateLeadValue(l)), 0);
	const formatCurrency = (val) => {
		if (val >= 1e3) return `R$ ${(val / 1e3).toFixed(1)}k`;
		return `R$ ${val.toLocaleString("pt-BR")}`;
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8",
		children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cyber-card p-6 animate-pulse",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-start mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-10 rounded-xl bg-[#333333]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-12 bg-[#333333] rounded" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-24 bg-[#333333] rounded mb-2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-20 bg-[#333333] rounded" })
			]
		}, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8",
		children: [
			{
				title: "Taxa de Conversão",
				value: `${conversionRate.toFixed(1)}%`,
				subtitle: `${boughtLeads} de ${totalLeads} leads`,
				icon: TrendingUp,
				iconBg: "#1A1A1A",
				iconColor: "#D9B979",
				trending: conversionRate >= 5 ? "up" : conversionRate >= 3 ? "neutral" : "down"
			},
			{
				title: "Tempo Médio",
				value: `${avgTime.toFixed(1)} dias`,
				subtitle: "Ciclo de vendas",
				icon: Clock,
				iconBg: "#1A1A1A",
				iconColor: "#A3A3A3",
				trending: "neutral"
			},
			{
				title: "Leads no Pipeline",
				value: pipelineCount.toString(),
				subtitle: "Em andamento",
				icon: Users,
				iconBg: "#1A1A1A",
				iconColor: "#D9B979",
				trending: "neutral"
			},
			{
				title: "Valor em Pipeline",
				value: formatCurrency(pipelineValue),
				subtitle: "Potencial ativo",
				icon: DollarSign,
				iconBg: "#1A1A1A",
				iconColor: "#D9B979",
				trending: "neutral"
			},
			{
				title: "Valor Convertido",
				value: formatCurrency(convertedValue),
				subtitle: "Vendas realizadas",
				icon: CircleCheckBig,
				iconBg: "#1A1A1A",
				iconColor: "#27E39F",
				trending: "up"
			}
		].map((metric, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cyber-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-start mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-10 rounded-xl flex items-center justify-center border border-[#333333]",
							style: {
								backgroundColor: metric.iconBg,
								color: metric.iconColor
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(metric.icon, { className: "h-5 w-5" })
						}),
						metric.trending === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[12px] font-bold flex items-center text-[#27E39F]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3.5 w-3.5" })
						}),
						metric.trending === "down" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[12px] font-bold flex items-center text-[#FF453A]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3.5 w-3.5" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] font-semibold uppercase tracking-wider text-gray-500",
					children: metric.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[28px] font-bold tracking-tight mt-1 font-display",
					style: { color: metric.title === "Valor Convertido" ? "#27E39F" : metric.title === "Taxa de Conversão" && conversionRate < 3 ? "#FF453A" : "#FFFFFF" },
					children: metric.value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] mt-1 text-gray-400",
					children: metric.subtitle
				})
			]
		}, index))
	});
}
const CRMCard = (0, import_react.memo)(({ lead, onDragStart, onClick }) => {
	const lastInteraction = new Date(lead.lastInteraction);
	const now = /* @__PURE__ */ new Date();
	const hoursSinceInteraction = differenceInHours(now, lastInteraction);
	const daysSinceInteraction = differenceInDays(now, lastInteraction);
	let borderColor = "#27E39F";
	if (hoursSinceInteraction > 72) borderColor = "#FF453A";
	else if (hoursSinceInteraction > 24) borderColor = "#FF9F0A";
	const isInactive = daysSinceInteraction > 3;
	const potentialValue = lead.valorEstimado ?? calculateLeadValue(lead);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		draggable: true,
		onDragStart: (e) => {
			e.currentTarget.style.transform = "rotate(-2deg)";
			e.currentTarget.style.opacity = "0.8";
			onDragStart(e, lead.id);
		},
		onDragEnd: (e) => {
			e.currentTarget.style.transform = "none";
			e.currentTarget.style.opacity = "1";
		},
		onClick: () => onClick?.(lead),
		className: "cursor-grab active:cursor-grabbing touch-none select-none pb-3 transform transition-all duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] shadow-lg"),
			style: {
				background: "linear-gradient(145deg, #2C2C2E 0%, #1E1E20 100%)",
				borderRadius: "16px",
				border: "1px solid #333333",
				borderLeft: `4px solid ${borderColor}`
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "truncate text-[14px] font-bold text-white font-display",
								children: lead.nomeCompleto
							})
						}), isInactive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-[#FF453A] animate-pulse" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-[12px] text-gray-400",
								children: lead.email
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5 text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[12px] text-gray-400",
								children: lead.telefone
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-3 border-t border-[#333333]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-2 py-1 rounded-md text-[10px] font-medium bg-[#333333] text-gray-300",
							children: lead.origem
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-3.5 w-3.5 text-[#D9B979]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[12px] font-bold text-[#D9B979]",
								children: potentialValue.toLocaleString("pt-BR")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-right text-[10px]",
						style: { color: borderColor },
						children: hoursSinceInteraction < 1 ? "Agora mesmo" : hoursSinceInteraction < 24 ? `${hoursSinceInteraction}h sem interação` : `${daysSinceInteraction}d sem interação`
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
		className: cn("flex h-full min-w-[300px] w-[300px] flex-col rounded-2xl transition-all", isOver && "ring-2 ring-[#D9B979] ring-offset-2 ring-offset-black"),
		style: {
			backgroundColor: isOver ? "rgba(217, 185, 121, 0.05)" : "rgba(26, 26, 26, 0.6)",
			backdropFilter: "blur(10px)",
			WebkitBackdropFilter: "blur(10px)",
			border: isOver ? "2px dashed #D9B979" : "1px solid #333333"
		},
		onDragOver: handleDragOver,
		onDragLeave: handleDragLeave,
		onDrop: handleDrop,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between p-4 rounded-t-2xl bg-[#1A1A1A]/80 border-b border-[#333333]",
			style: { borderTop: `4px solid ${color}` },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-bold text-[14px] font-display text-white",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2.5 py-1 rounded-full text-[12px] font-semibold bg-white/5 text-gray-300",
				children: leads.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 p-3 overflow-hidden",
			children: leads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#333333] bg-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-[32px] mb-2 text-gray-600",
					children: "folder_open"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] font-medium text-gray-500",
					children: "Nenhum lead"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualList, {
				items: leads,
				height: "100%",
				itemHeight: 170,
				className: "scrollbar-thin scrollbar-thumb-[#333333]",
				renderItem: (lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMCard, {
					lead,
					onDragStart: handleDragStart,
					onClick: onCardClick
				}, lead.id)
			})
		})]
	});
}
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
function LeadInfo({ lead }) {
	const statusColor = COLUMNS.find((c) => c.id === lead.status)?.color || "#6B7280";
	const potentialValue = lead.valorEstimado ?? calculateLeadValue(lead);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center space-y-4 pt-2 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-gray-900 tracking-tight font-display",
						children: lead.nomeCompleto
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full max-w-xs items-center justify-center gap-8 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-6 w-6" }),
						label: "Ligar",
						color: "bg-[#007AFF] shadow-blue-200/50",
						onClick: () => window.open(`tel:${lead.telefone}`)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-6 w-6" }),
						label: "E-mail",
						color: "bg-[#5856D6] shadow-indigo-200/50",
						onClick: () => window.open(`mailto:${lead.email}`)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" }),
						label: "WhatsApp",
						color: "bg-[#27E39F] shadow-green-200/50",
						onClick: () => window.open(`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`)
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "pl-4 text-[13px] font-semibold uppercase tracking-wider text-gray-500",
					children: "Informações Pessoais"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-[#007AFF]" }),
							label: "E-mail",
							value: lead.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-[#27E39F]" }),
							label: "Telefone",
							value: lead.telefone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-[#FF9500]" }),
							label: "Status",
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2 w-2 rounded-full",
									style: { backgroundColor: statusColor }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-[#007AFF]",
									children: lead.status
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5 text-[#5856D6]" }),
							label: "Origem",
							value: lead.origem,
							isLast: true
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "pl-4 text-[13px] font-semibold uppercase tracking-wider text-gray-500",
					children: "Dados da Venda"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-gray-500" }),
						label: "Assentos Adicionais",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "bg-gray-100 font-normal text-gray-700 hover:bg-gray-200",
							children: [lead.assentosAdicionais, " Unidades"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5 text-[#D9B979]" }),
						label: "Valor Estimado",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-[#D9B979]",
							children: new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL"
							}).format(potentialValue)
						}),
						isLast: true
					})]
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
			className: cn("flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95", color),
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors",
			children: label
		})]
	});
}
function InfoRow({ icon, label, value, isLast }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center justify-between bg-white px-4 py-3.5", !isLast && "border-b border-gray-100 ml-4 pl-0"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[15px] text-gray-900",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[15px] text-gray-500",
			children: value
		})]
	});
}
function LeadTimeline({ lead }) {
	const history = [...lead.history || []].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const formatTimestamp = (dateStr) => {
		const date = new Date(dateStr);
		if (isToday(date)) return `Hoje, ${format(date, "HH:mm")}`;
		if (isYesterday(date)) return `Ontem, ${format(date, "HH:mm")}`;
		return format(date, "d 'de' MMM, HH:mm", { locale: ptBR });
	};
	const getEventDetails = (item) => {
		const desc = item.description || "";
		if (item.type === "status_change") {
			const match = desc.match(/para (.+)$/);
			return {
				title: match ? `Movido para ${match[1]}` : "Alteração de Status",
				description: desc,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "h-4 w-4" }),
				colorClass: "bg-gray-100 text-gray-500"
			};
		}
		if (item.type === "interaction") {
			const type = desc.split(/[-:]/).map((p) => p.trim()).find((p) => [
				"WhatsApp",
				"Ligação",
				"Email",
				"Reunião"
			].some((t) => p.includes(t))) || "Interação";
			return {
				title: type,
				description: desc.replace(`Interação registrada: ${type} - `, "").replace(`Interação registrada: ${type}`, ""),
				icon: type.includes("Ligação") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }) : type.includes("Email") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }) : type.includes("WhatsApp") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
				colorClass: "bg-[#27E39F]/10 text-[#27E39F]"
			};
		}
		if (item.type === "follow_up_set") {
			const dateMatch = desc.match(/para (.+)$/);
			return {
				title: "Follow-up Agendado",
				description: dateMatch ? dateMatch[1] : desc,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-4 w-4" }),
				colorClass: "bg-[#007AFF]/10 text-[#007AFF]"
			};
		}
		if (item.type === "note_added") return {
			title: "Nota Adicionada",
			description: "Nota interna registrada",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "h-4 w-4" }),
			colorClass: "bg-[#D9B979]/10 text-[#D9B979]"
		};
		return {
			title: desc.includes("capturado") ? "Lead Capturado" : "Evento do Sistema",
			description: desc,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
			colorClass: "bg-gray-100 text-gray-500"
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 animate-fade-in-up",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "pl-4 text-[13px] font-semibold uppercase tracking-wider text-gray-500",
			children: "Histórico de Atividade"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden",
			children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-8 text-center text-[13px] text-gray-400",
				children: "Nenhuma atividade registrada"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col",
				children: history.map((item, index) => {
					const details = getEventDetails(item);
					const isLast = index === history.length - 1;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("group relative flex gap-4 p-4 transition-colors hover:bg-gray-50/50", !isLast && "pb-8"),
						children: [
							!isLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[27.5px] top-[40px] bottom-[-10px] w-[1px] bg-gray-200" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105", details.colorClass),
								children: details.icon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-1 flex-col gap-1 pt-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[15px] font-semibold text-gray-900 truncate",
											children: details.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-[12px] text-gray-400",
											children: formatTimestamp(item.date)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[14px] leading-relaxed text-gray-500 line-clamp-2",
										children: details.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[12px] font-medium text-gray-400",
											children: item.author === "Sistema" ? "Sistema (Auto)" : `@${item.author.toLowerCase().replace(" ", ".")}`
										})
									})
								]
							})
						]
					}, item.id);
				})
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
		className: "space-y-4 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "pl-4 text-[13px] font-semibold uppercase tracking-wider text-gray-500",
				children: "Notas Recentes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white rounded-xl border border-gray-200 p-8 text-center text-sm italic text-gray-400",
					children: "Sem notas recentes."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "group bg-white rounded-xl border border-gray-200 p-4 transition-all hover:shadow-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-full items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "mt-1 h-8 w-8 border border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: `https://img.usecurling.com/ppl/thumbnail?seed=${note.author}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "U" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[14px] font-semibold text-gray-900",
											children: note.author
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[12px] text-gray-400",
											children: formatDistanceToNow(new Date(note.createdAt), {
												addSuffix: true,
												locale: ptBR
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[14px] leading-relaxed text-gray-600",
										children: note.content
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "-mr-1 -mt-1 h-6 w-6 text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100 hover:bg-transparent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
								className: "bg-white border-gray-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
									className: "text-gray-900",
									children: "Excluir nota?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Esta ação é irreversível." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
									className: "border-gray-200 text-gray-700 hover:bg-gray-50",
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
									onClick: handleDeleteMock,
									className: "bg-red-600 hover:bg-red-700 text-white",
									children: "Excluir"
								})] })]
							})] })]
						})
					}, note.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-2 rounded-full border border-gray-300 bg-white p-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "h-10 flex-1 border-0 bg-transparent px-4 text-sm shadow-none focus-visible:ring-0 placeholder:text-gray-400 text-gray-900",
					placeholder: "Adicionar uma nota...",
					value: noteContent,
					onChange: (e) => setNoteContent(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && handleAddNote()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					className: cn("h-8 w-8 shrink-0 rounded-full transition-all duration-300", noteContent.trim() ? "bg-[#007AFF] hover:bg-blue-600 scale-100 text-white" : "scale-90 bg-gray-200 text-gray-400 hover:bg-gray-300"),
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
function LeadEditModal({ lead, open, onOpenChange }) {
	const updateLead = useCRMStore((state) => state.updateLead);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		nomeCompleto: "",
		email: "",
		telefone: "",
		assentosAdicionais: 0,
		origem: "",
		valorEstimado: 0
	});
	(0, import_react.useEffect)(() => {
		if (lead) {
			let initialValor = lead.valorEstimado;
			if (initialValor === void 0) initialValor = lead.origem === "Planilha" ? 2999 + lead.assentosAdicionais * 699 : lead.assentosAdicionais * 500;
			setFormData({
				nomeCompleto: lead.nomeCompleto,
				email: lead.email,
				telefone: lead.telefone,
				assentosAdicionais: lead.assentosAdicionais,
				origem: lead.origem,
				valorEstimado: initialValor
			});
		}
	}, [lead, open]);
	(0, import_react.useEffect)(() => {
		if (formData.origem === "Planilha") {
			const calculated = 2999 + formData.assentosAdicionais * 699;
			setFormData((prev) => ({
				...prev,
				valorEstimado: calculated
			}));
		}
	}, [formData.origem, formData.assentosAdicionais]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			updateLead(lead.id, {
				nomeCompleto: formData.nomeCompleto,
				email: formData.email,
				telefone: formData.telefone,
				assentosAdicionais: formData.assentosAdicionais,
				origem: formData.origem,
				valorEstimado: formData.valorEstimado
			});
			onOpenChange(false);
		} catch (error) {
			console.error("Failed to update lead", error);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-[425px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Editar Lead" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "grid gap-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Nome Completo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							value: formData.nomeCompleto,
							onChange: (e) => setFormData({
								...formData,
								nomeCompleto: e.target.value
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							value: formData.email,
							onChange: (e) => setFormData({
								...formData,
								email: e.target.value
							}),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "phone",
							children: "Telefone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							value: formData.telefone,
							onChange: (e) => setFormData({
								...formData,
								telefone: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "seats",
							children: "Assentos Adicionais"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "seats",
							type: "number",
							min: "0",
							value: formData.assentosAdicionais,
							onChange: (e) => setFormData({
								...formData,
								assentosAdicionais: parseInt(e.target.value) || 0
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "estimatedValue",
							children: "Valor Estimado (R$)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "estimatedValue",
							type: "number",
							min: "0",
							step: "0.01",
							value: formData.valorEstimado,
							onChange: (e) => setFormData({
								...formData,
								valorEstimado: parseFloat(e.target.value) || 0
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "origin",
							children: "Origem"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: formData.origem,
							onValueChange: (val) => setFormData({
								...formData,
								origem: val
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione a origem" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
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
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Indicação",
									children: "Indicação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Instagram",
									children: "Instagram"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "LinkedIn",
									children: "LinkedIn"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: loading,
						children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Salvar Alterações"]
					})] })
				]
			})]
		})
	});
}
function LeadDetailsModal({ lead, open, onOpenChange }) {
	const [interactionOpen, setInteractionOpen] = (0, import_react.useState)(false);
	const [followUpOpen, setFollowUpOpen] = (0, import_react.useState)(false);
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	if (!lead) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "flex h-[100dvh] max-w-[800px] flex-col gap-0 overflow-hidden border-0 bg-[#F2F2F7] p-0 shadow-2xl outline-none focus:outline-none md:h-[90vh] md:max-h-[850px] md:rounded-[24px] [&>button]:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-0 z-20 flex items-center justify-between border-b border-gray-200/50 bg-white/80 px-4 py-3 backdrop-blur-xl",
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
								onClick: () => setEditOpen(true),
								children: "Editar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto overflow-x-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex w-full max-w-3xl flex-col gap-8 p-4 pb-24 md:p-8 md:pb-32",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadInfo, { lead }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadTimeline, { lead }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadNotes, { lead })]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-0 right-0 z-20 border-t border-gray-200/50 bg-white/80 p-4 pb-6 backdrop-blur-xl md:pb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex w-full max-w-3xl flex-col gap-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "h-12 rounded-xl border-gray-200 bg-white font-semibold text-gray-900 shadow-sm hover:bg-gray-50 active:scale-95 transition-transform",
									onClick: () => setFollowUpOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "mr-2 h-5 w-5" }), "Agendar Follow-up"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-12 rounded-xl bg-[#007AFF] font-semibold text-white shadow-sm hover:bg-[#0062CC] active:scale-95 transition-transform",
									onClick: () => setInteractionOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, { className: "mr-2 h-5 w-5" }), "Registrar Interação"]
								})]
							})
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
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadEditModal, {
			lead,
			open: editOpen,
			onOpenChange: setEditOpen
		})
	] });
}
function CRMBoard() {
	const { filteredLeads, moveLead } = useCRMStore();
	const isMobile = useIsMobile();
	const [selectedLead, setSelectedLead] = (0, import_react.useState)(null);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)(COLUMNS[0].id);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-2",
			children: COLUMNS.map((col) => {
				const count = filteredLeads.filter((l) => l.status === col.id).length;
				const isActive = activeTab === col.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab(col.id),
					className: "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all text-[13px] font-medium border",
					style: {
						backgroundColor: isActive ? "#D9B979" : "#1A1A1A",
						color: isActive ? "#000000" : "#FFFFFF",
						borderColor: isActive ? "#D9B979" : "#333333"
					},
					children: [col.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] px-1.5 py-0.5 rounded-full",
						style: { backgroundColor: isActive ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" },
						children: count
					})]
				}, col.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-[calc(100vh-380px)]",
			children: COLUMNS.filter((col) => col.id === activeTab).map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMColumn, {
				id: col.id,
				label: col.label,
				color: col.color,
				leads: filteredLeads.filter((l) => l.status === col.id),
				onDropLead: handleDropLead,
				onCardClick: handleCardClick
			}, col.id))
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full flex-1 gap-4 overflow-x-auto pb-4",
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
const exportToCSV = (data, filename, headers) => {
	if (!data.length) return;
	const csvContent = [headers ? headers.join(",") : Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).map((val) => `"${val}"`).join(","))].join("\n");
	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.setAttribute("href", url);
	link.setAttribute("download", `${filename}.csv`);
	link.style.visibility = "hidden";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
const formatLeadsForExport = (data) => {
	return data.map((lead) => ({
		Nome: lead.nomeCompleto,
		Email: lead.email,
		Telefone: lead.telefone,
		Status: lead.status,
		Origem: lead.origem,
		Assentos: lead.assentosAdicionais,
		"Data Captação": new Date(lead.dataCaptacao).toLocaleDateString("pt-BR"),
		"Última Interação": new Date(lead.lastInteraction).toLocaleString("pt-BR")
	}));
};
function ExportButton({ data, filename = "export", label = "Exportar", formatData, customButton }) {
	const handleExportCSV = () => {
		exportToCSV(formatData ? formatData(data) : data, filename);
	};
	const handleExportPDF = () => {
		window.print();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: customButton || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			className: "gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden sm:inline",
				children: label
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		style: { borderRadius: "12px" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: handleExportCSV,
			className: "cursor-pointer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "material-symbols-outlined text-[16px] mr-2",
				style: { color: "#34C759" },
				children: "table_chart"
			}), "Exportar CSV"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: handleExportPDF,
			className: "cursor-pointer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "material-symbols-outlined text-[16px] mr-2",
				style: { color: "#0071E3" },
				children: "print"
			}), "Imprimir / PDF"]
		})]
	})] });
}
function CRM() {
	const { fetchLeads, loading, error, leads, filteredLeads } = useCRMStore();
	(0, import_react.useEffect)(() => {
		fetchLeads();
	}, [fetchLeads]);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center gap-4 bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "material-symbols-outlined text-[48px] text-[#FF453A]",
				children: "error"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold font-display text-white",
				children: "Erro ao carregar CRM"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => fetchLeads(true),
				className: "bg-[#D9B979] hover:bg-[#D9B979]/90 text-black px-5 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(217,185,121,0.2)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-[20px]",
					children: "refresh"
				}), "Tentar Novamente"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col transition-colors bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap justify-between items-end gap-4 px-10 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[32px] font-bold tracking-tight font-display text-white",
				children: "CRM - Pipeline de Vendas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[15px] mt-1 flex items-center gap-2 text-gray-400",
				children: ["Gerencie seus leads e acompanhe o funil de vendas.", loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center text-[13px] text-[#D9B979]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin mr-1" }), "Sincronizando..."]
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportButton, {
				data: filteredLeads,
				filename: "crm_leads",
				formatData: formatLeadsForExport,
				label: "Exportar Leads",
				customButton: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "bg-[#D9B979] hover:bg-[#D9B979]/90 text-black px-5 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(217,185,121,0.2)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" }), "Exportar Leads"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col overflow-hidden px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMMetrics, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMFilters, {}),
				loading && leads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-1 items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-12 w-12 animate-spin text-[#D9B979]" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRMBoard, {})
			]
		})]
	});
}
export { CRM as default };

//# sourceMappingURL=CRM-Du1ggLa8.js.map