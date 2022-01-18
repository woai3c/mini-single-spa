var SingleSPA = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var dist = {};

	var comment = {};

	var node$1 = {};

	var he = {exports: {}};

	/*! https://mths.be/he v1.2.0 by @mathias | MIT license */

	(function (module, exports) {
	(function(root) {

		// Detect free variables `exports`.
		var freeExports = exports;

		// Detect free variable `module`.
		var freeModule = module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`.
		var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		// All astral symbols.
		var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
		// All ASCII symbols (not just printable ASCII) except those listed in the
		// first column of the overrides table.
		// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
		var regexAsciiWhitelist = /[\x01-\x7F]/g;
		// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
		// code points listed in the first column of the overrides table on
		// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
		var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

		var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
		var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

		var regexEscape = /["&'<>`]/g;
		var escapeMap = {
			'"': '&quot;',
			'&': '&amp;',
			'\'': '&#x27;',
			'<': '&lt;',
			// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
			// following is not strictly necessary unless it’s part of a tag or an
			// unquoted attribute value. We’re only escaping it to support those
			// situations, and for XML support.
			'>': '&gt;',
			// In Internet Explorer ≤ 8, the backtick character can be used
			// to break out of (un)quoted attribute values or HTML comments.
			// See http://html5sec.org/#102, http://html5sec.org/#108, and
			// http://html5sec.org/#133.
			'`': '&#x60;'
		};

		var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
		var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
		var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
		var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
		var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
		var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
		var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		var object = {};
		var hasOwnProperty = object.hasOwnProperty;
		var has = function(object, propertyName) {
			return hasOwnProperty.call(object, propertyName);
		};

		var contains = function(array, value) {
			var index = -1;
			var length = array.length;
			while (++index < length) {
				if (array[index] == value) {
					return true;
				}
			}
			return false;
		};

		var merge = function(options, defaults) {
			if (!options) {
				return defaults;
			}
			var result = {};
			var key;
			for (key in defaults) {
				// A `hasOwnProperty` check is not needed here, since only recognized
				// option names are used anyway. Any others are ignored.
				result[key] = has(options, key) ? options[key] : defaults[key];
			}
			return result;
		};

		// Modified version of `ucs2encode`; see https://mths.be/punycode.
		var codePointToSymbol = function(codePoint, strict) {
			var output = '';
			if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
				// See issue #4:
				// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
				// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
				// REPLACEMENT CHARACTER.”
				if (strict) {
					parseError('character reference outside the permissible Unicode range');
				}
				return '\uFFFD';
			}
			if (has(decodeMapNumeric, codePoint)) {
				if (strict) {
					parseError('disallowed character reference');
				}
				return decodeMapNumeric[codePoint];
			}
			if (strict && contains(invalidReferenceCodePoints, codePoint)) {
				parseError('disallowed character reference');
			}
			if (codePoint > 0xFFFF) {
				codePoint -= 0x10000;
				output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
				codePoint = 0xDC00 | codePoint & 0x3FF;
			}
			output += stringFromCharCode(codePoint);
			return output;
		};

		var hexEscape = function(codePoint) {
			return '&#x' + codePoint.toString(16).toUpperCase() + ';';
		};

		var decEscape = function(codePoint) {
			return '&#' + codePoint + ';';
		};

		var parseError = function(message) {
			throw Error('Parse error: ' + message);
		};

		/*--------------------------------------------------------------------------*/

		var encode = function(string, options) {
			options = merge(options, encode.options);
			var strict = options.strict;
			if (strict && regexInvalidRawCodePoint.test(string)) {
				parseError('forbidden code point');
			}
			var encodeEverything = options.encodeEverything;
			var useNamedReferences = options.useNamedReferences;
			var allowUnsafeSymbols = options.allowUnsafeSymbols;
			var escapeCodePoint = options.decimal ? decEscape : hexEscape;

			var escapeBmpSymbol = function(symbol) {
				return escapeCodePoint(symbol.charCodeAt(0));
			};

			if (encodeEverything) {
				// Encode ASCII symbols.
				string = string.replace(regexAsciiWhitelist, function(symbol) {
					// Use named references if requested & possible.
					if (useNamedReferences && has(encodeMap, symbol)) {
						return '&' + encodeMap[symbol] + ';';
					}
					return escapeBmpSymbol(symbol);
				});
				// Shorten a few escapes that represent two symbols, of which at least one
				// is within the ASCII range.
				if (useNamedReferences) {
					string = string
						.replace(/&gt;\u20D2/g, '&nvgt;')
						.replace(/&lt;\u20D2/g, '&nvlt;')
						.replace(/&#x66;&#x6A;/g, '&fjlig;');
				}
				// Encode non-ASCII symbols.
				if (useNamedReferences) {
					// Encode non-ASCII symbols that can be replaced with a named reference.
					string = string.replace(regexEncodeNonAscii, function(string) {
						// Note: there is no need to check `has(encodeMap, string)` here.
						return '&' + encodeMap[string] + ';';
					});
				}
				// Note: any remaining non-ASCII symbols are handled outside of the `if`.
			} else if (useNamedReferences) {
				// Apply named character references.
				// Encode `<>"'&` using named character references.
				if (!allowUnsafeSymbols) {
					string = string.replace(regexEscape, function(string) {
						return '&' + encodeMap[string] + ';'; // no need to check `has()` here
					});
				}
				// Shorten escapes that represent two symbols, of which at least one is
				// `<>"'&`.
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;');
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			} else if (!allowUnsafeSymbols) {
				// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
				// using named character references.
				string = string.replace(regexEscape, escapeBmpSymbol);
			}
			return string
				// Encode astral symbols.
				.replace(regexAstralSymbols, function($0) {
					// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
					var high = $0.charCodeAt(0);
					var low = $0.charCodeAt(1);
					var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
					return escapeCodePoint(codePoint);
				})
				// Encode any remaining BMP symbols that are not printable ASCII symbols
				// using a hexadecimal escape.
				.replace(regexBmpWhitelist, escapeBmpSymbol);
		};
		// Expose default options (so they can be overridden globally).
		encode.options = {
			'allowUnsafeSymbols': false,
			'encodeEverything': false,
			'strict': false,
			'useNamedReferences': false,
			'decimal' : false
		};

		var decode = function(html, options) {
			options = merge(options, decode.options);
			var strict = options.strict;
			if (strict && regexInvalidEntity.test(html)) {
				parseError('malformed character reference');
			}
			return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
				var codePoint;
				var semicolon;
				var decDigits;
				var hexDigits;
				var reference;
				var next;

				if ($1) {
					reference = $1;
					// Note: there is no need to check `has(decodeMap, reference)`.
					return decodeMap[reference];
				}

				if ($2) {
					// Decode named character references without trailing `;`, e.g. `&amp`.
					// This is only a parse error if it gets converted to `&`, or if it is
					// followed by `=` in an attribute context.
					reference = $2;
					next = $3;
					if (next && options.isAttributeValue) {
						if (strict && next == '=') {
							parseError('`&` did not start a character reference');
						}
						return $0;
					} else {
						if (strict) {
							parseError(
								'named character reference was not terminated by a semicolon'
							);
						}
						// Note: there is no need to check `has(decodeMapLegacy, reference)`.
						return decodeMapLegacy[reference] + (next || '');
					}
				}

				if ($4) {
					// Decode decimal escapes, e.g. `&#119558;`.
					decDigits = $4;
					semicolon = $5;
					if (strict && !semicolon) {
						parseError('character reference was not terminated by a semicolon');
					}
					codePoint = parseInt(decDigits, 10);
					return codePointToSymbol(codePoint, strict);
				}

				if ($6) {
					// Decode hexadecimal escapes, e.g. `&#x1D306;`.
					hexDigits = $6;
					semicolon = $7;
					if (strict && !semicolon) {
						parseError('character reference was not terminated by a semicolon');
					}
					codePoint = parseInt(hexDigits, 16);
					return codePointToSymbol(codePoint, strict);
				}

				// If we’re still here, `if ($7)` is implied; it’s an ambiguous
				// ampersand for sure. https://mths.be/notes/ambiguous-ampersands
				if (strict) {
					parseError(
						'named character reference was not terminated by a semicolon'
					);
				}
				return $0;
			});
		};
		// Expose default options (so they can be overridden globally).
		decode.options = {
			'isAttributeValue': false,
			'strict': false
		};

		var escape = function(string) {
			return string.replace(regexEscape, function($0) {
				// Note: there is no need to check `has(escapeMap, $0)` here.
				return escapeMap[$0];
			});
		};

		/*--------------------------------------------------------------------------*/

		var he = {
			'version': '1.2.0',
			'encode': encode,
			'decode': decode,
			'escape': escape,
			'unescape': decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = he;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (var key in he) {
					has(he, key) && (freeExports[key] = he[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.he = he;
		}

	}(commonjsGlobal));
	}(he, he.exports));

	Object.defineProperty(node$1, "__esModule", { value: true });
	var he_1$2 = he.exports;
	/**
	 * Node Class as base class for TextNode and HTMLElement.
	 */
	var Node$1 = /** @class */ (function () {
	    function Node(parentNode, range) {
	        if (parentNode === void 0) { parentNode = null; }
	        this.parentNode = parentNode;
	        this.childNodes = [];
	        Object.defineProperty(this, 'range', {
	            enumerable: false,
	            writable: true,
	            configurable: true,
	            value: range !== null && range !== void 0 ? range : [-1, -1]
	        });
	    }
	    Object.defineProperty(Node.prototype, "innerText", {
	        get: function () {
	            return this.rawText;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "textContent", {
	        get: function () {
	            return (0, he_1$2.decode)(this.rawText);
	        },
	        set: function (val) {
	            this.rawText = (0, he_1$2.encode)(val);
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Node;
	}());
	node$1.default = Node$1;

	var type = {};

	Object.defineProperty(type, "__esModule", { value: true });
	var NodeType;
	(function (NodeType) {
	    NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
	    NodeType[NodeType["TEXT_NODE"] = 3] = "TEXT_NODE";
	    NodeType[NodeType["COMMENT_NODE"] = 8] = "COMMENT_NODE";
	})(NodeType || (NodeType = {}));
	type.default = NodeType;

	var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __importDefault$8 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(comment, "__esModule", { value: true });
	var node_1$2 = __importDefault$8(node$1);
	var type_1$3 = __importDefault$8(type);
	var CommentNode = /** @class */ (function (_super) {
	    __extends$3(CommentNode, _super);
	    function CommentNode(rawText, parentNode, range) {
	        var _this = _super.call(this, parentNode, range) || this;
	        _this.rawText = rawText;
	        /**
	         * Node Type declaration.
	         * @type {Number}
	         */
	        _this.nodeType = type_1$3.default.COMMENT_NODE;
	        return _this;
	    }
	    Object.defineProperty(CommentNode.prototype, "text", {
	        /**
	         * Get unescaped text value of current node and its children.
	         * @return {string} text content
	         */
	        get: function () {
	            return this.rawText;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    CommentNode.prototype.toString = function () {
	        return "<!--" + this.rawText + "-->";
	    };
	    return CommentNode;
	}(node_1$2.default));
	comment.default = CommentNode;

	var html = {};

	var lib$7 = {};

	var lib$6 = {};

	var stringify$2 = {};

	var lib$5 = {};

	var lib$4 = {};

	(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
	/** Types of elements found in htmlparser2's DOM */
	var ElementType;
	(function (ElementType) {
	    /** Type for the root element of a document */
	    ElementType["Root"] = "root";
	    /** Type for Text */
	    ElementType["Text"] = "text";
	    /** Type for <? ... ?> */
	    ElementType["Directive"] = "directive";
	    /** Type for <!-- ... --> */
	    ElementType["Comment"] = "comment";
	    /** Type for <script> tags */
	    ElementType["Script"] = "script";
	    /** Type for <style> tags */
	    ElementType["Style"] = "style";
	    /** Type for Any tag */
	    ElementType["Tag"] = "tag";
	    /** Type for <![CDATA[ ... ]]> */
	    ElementType["CDATA"] = "cdata";
	    /** Type for <!doctype ...> */
	    ElementType["Doctype"] = "doctype";
	})(ElementType = exports.ElementType || (exports.ElementType = {}));
	/**
	 * Tests whether an element is a tag or not.
	 *
	 * @param elem Element to test
	 */
	function isTag(elem) {
	    return (elem.type === ElementType.Tag ||
	        elem.type === ElementType.Script ||
	        elem.type === ElementType.Style);
	}
	exports.isTag = isTag;
	// Exports for backwards compatibility
	/** Type for the root element of a document */
	exports.Root = ElementType.Root;
	/** Type for Text */
	exports.Text = ElementType.Text;
	/** Type for <? ... ?> */
	exports.Directive = ElementType.Directive;
	/** Type for <!-- ... --> */
	exports.Comment = ElementType.Comment;
	/** Type for <script> tags */
	exports.Script = ElementType.Script;
	/** Type for <style> tags */
	exports.Style = ElementType.Style;
	/** Type for Any tag */
	exports.Tag = ElementType.Tag;
	/** Type for <![CDATA[ ... ]]> */
	exports.CDATA = ElementType.CDATA;
	/** Type for <!doctype ...> */
	exports.Doctype = ElementType.Doctype;
	}(lib$4));

	var node = {};

	var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign$2 = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign$2 = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign$2.apply(this, arguments);
	};
	Object.defineProperty(node, "__esModule", { value: true });
	node.cloneNode = node.hasChildren = node.isDocument = node.isDirective = node.isComment = node.isText = node.isCDATA = node.isTag = node.Element = node.Document = node.NodeWithChildren = node.ProcessingInstruction = node.Comment = node.Text = node.DataNode = node.Node = void 0;
	var domelementtype_1$1 = lib$4;
	var nodeTypes = new Map([
	    [domelementtype_1$1.ElementType.Tag, 1],
	    [domelementtype_1$1.ElementType.Script, 1],
	    [domelementtype_1$1.ElementType.Style, 1],
	    [domelementtype_1$1.ElementType.Directive, 1],
	    [domelementtype_1$1.ElementType.Text, 3],
	    [domelementtype_1$1.ElementType.CDATA, 4],
	    [domelementtype_1$1.ElementType.Comment, 8],
	    [domelementtype_1$1.ElementType.Root, 9],
	]);
	/**
	 * This object will be used as the prototype for Nodes when creating a
	 * DOM-Level-1-compliant structure.
	 */
	var Node = /** @class */ (function () {
	    /**
	     *
	     * @param type The type of the node.
	     */
	    function Node(type) {
	        this.type = type;
	        /** Parent of the node */
	        this.parent = null;
	        /** Previous sibling */
	        this.prev = null;
	        /** Next sibling */
	        this.next = null;
	        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
	        this.startIndex = null;
	        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
	        this.endIndex = null;
	    }
	    Object.defineProperty(Node.prototype, "nodeType", {
	        // Read-only aliases
	        /**
	         * [DOM spec](https://dom.spec.whatwg.org/#dom-node-nodetype)-compatible
	         * node {@link type}.
	         */
	        get: function () {
	            var _a;
	            return (_a = nodeTypes.get(this.type)) !== null && _a !== void 0 ? _a : 1;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "parentNode", {
	        // Read-write aliases for properties
	        /**
	         * Same as {@link parent}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.parent;
	        },
	        set: function (parent) {
	            this.parent = parent;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "previousSibling", {
	        /**
	         * Same as {@link prev}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.prev;
	        },
	        set: function (prev) {
	            this.prev = prev;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "nextSibling", {
	        /**
	         * Same as {@link next}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.next;
	        },
	        set: function (next) {
	            this.next = next;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Clone this node, and optionally its children.
	     *
	     * @param recursive Clone child nodes as well.
	     * @returns A clone of the node.
	     */
	    Node.prototype.cloneNode = function (recursive) {
	        if (recursive === void 0) { recursive = false; }
	        return cloneNode(this, recursive);
	    };
	    return Node;
	}());
	node.Node = Node;
	/**
	 * A node that contains some data.
	 */
	var DataNode = /** @class */ (function (_super) {
	    __extends$2(DataNode, _super);
	    /**
	     * @param type The type of the node
	     * @param data The content of the data node
	     */
	    function DataNode(type, data) {
	        var _this = _super.call(this, type) || this;
	        _this.data = data;
	        return _this;
	    }
	    Object.defineProperty(DataNode.prototype, "nodeValue", {
	        /**
	         * Same as {@link data}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.data;
	        },
	        set: function (data) {
	            this.data = data;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return DataNode;
	}(Node));
	node.DataNode = DataNode;
	/**
	 * Text within the document.
	 */
	var Text = /** @class */ (function (_super) {
	    __extends$2(Text, _super);
	    function Text(data) {
	        return _super.call(this, domelementtype_1$1.ElementType.Text, data) || this;
	    }
	    return Text;
	}(DataNode));
	node.Text = Text;
	/**
	 * Comments within the document.
	 */
	var Comment = /** @class */ (function (_super) {
	    __extends$2(Comment, _super);
	    function Comment(data) {
	        return _super.call(this, domelementtype_1$1.ElementType.Comment, data) || this;
	    }
	    return Comment;
	}(DataNode));
	node.Comment = Comment;
	/**
	 * Processing instructions, including doc types.
	 */
	var ProcessingInstruction = /** @class */ (function (_super) {
	    __extends$2(ProcessingInstruction, _super);
	    function ProcessingInstruction(name, data) {
	        var _this = _super.call(this, domelementtype_1$1.ElementType.Directive, data) || this;
	        _this.name = name;
	        return _this;
	    }
	    return ProcessingInstruction;
	}(DataNode));
	node.ProcessingInstruction = ProcessingInstruction;
	/**
	 * A `Node` that can have children.
	 */
	var NodeWithChildren = /** @class */ (function (_super) {
	    __extends$2(NodeWithChildren, _super);
	    /**
	     * @param type Type of the node.
	     * @param children Children of the node. Only certain node types can have children.
	     */
	    function NodeWithChildren(type, children) {
	        var _this = _super.call(this, type) || this;
	        _this.children = children;
	        return _this;
	    }
	    Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
	        // Aliases
	        /** First child of the node. */
	        get: function () {
	            var _a;
	            return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
	        /** Last child of the node. */
	        get: function () {
	            return this.children.length > 0
	                ? this.children[this.children.length - 1]
	                : null;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
	        /**
	         * Same as {@link children}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.children;
	        },
	        set: function (children) {
	            this.children = children;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return NodeWithChildren;
	}(Node));
	node.NodeWithChildren = NodeWithChildren;
	/**
	 * The root node of the document.
	 */
	var Document = /** @class */ (function (_super) {
	    __extends$2(Document, _super);
	    function Document(children) {
	        return _super.call(this, domelementtype_1$1.ElementType.Root, children) || this;
	    }
	    return Document;
	}(NodeWithChildren));
	node.Document = Document;
	/**
	 * An element within the DOM.
	 */
	var Element$1 = /** @class */ (function (_super) {
	    __extends$2(Element, _super);
	    /**
	     * @param name Name of the tag, eg. `div`, `span`.
	     * @param attribs Object mapping attribute names to attribute values.
	     * @param children Children of the node.
	     */
	    function Element(name, attribs, children, type) {
	        if (children === void 0) { children = []; }
	        if (type === void 0) { type = name === "script"
	            ? domelementtype_1$1.ElementType.Script
	            : name === "style"
	                ? domelementtype_1$1.ElementType.Style
	                : domelementtype_1$1.ElementType.Tag; }
	        var _this = _super.call(this, type, children) || this;
	        _this.name = name;
	        _this.attribs = attribs;
	        return _this;
	    }
	    Object.defineProperty(Element.prototype, "tagName", {
	        // DOM Level 1 aliases
	        /**
	         * Same as {@link name}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.name;
	        },
	        set: function (name) {
	            this.name = name;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Element.prototype, "attributes", {
	        get: function () {
	            var _this = this;
	            return Object.keys(this.attribs).map(function (name) {
	                var _a, _b;
	                return ({
	                    name: name,
	                    value: _this.attribs[name],
	                    namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
	                    prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name],
	                });
	            });
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Element;
	}(NodeWithChildren));
	node.Element = Element$1;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node is a `Element`, `false` otherwise.
	 */
	function isTag$1(node) {
	    return (0, domelementtype_1$1.isTag)(node);
	}
	node.isTag = isTag$1;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
	 */
	function isCDATA(node) {
	    return node.type === domelementtype_1$1.ElementType.CDATA;
	}
	node.isCDATA = isCDATA;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `Text`, `false` otherwise.
	 */
	function isText(node) {
	    return node.type === domelementtype_1$1.ElementType.Text;
	}
	node.isText = isText;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `Comment`, `false` otherwise.
	 */
	function isComment(node) {
	    return node.type === domelementtype_1$1.ElementType.Comment;
	}
	node.isComment = isComment;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
	 */
	function isDirective(node) {
	    return node.type === domelementtype_1$1.ElementType.Directive;
	}
	node.isDirective = isDirective;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
	 */
	function isDocument(node) {
	    return node.type === domelementtype_1$1.ElementType.Root;
	}
	node.isDocument = isDocument;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node is a `NodeWithChildren` (has children), `false` otherwise.
	 */
	function hasChildren(node) {
	    return Object.prototype.hasOwnProperty.call(node, "children");
	}
	node.hasChildren = hasChildren;
	/**
	 * Clone a node, and optionally its children.
	 *
	 * @param recursive Clone child nodes as well.
	 * @returns A clone of the node.
	 */
	function cloneNode(node, recursive) {
	    if (recursive === void 0) { recursive = false; }
	    var result;
	    if (isText(node)) {
	        result = new Text(node.data);
	    }
	    else if (isComment(node)) {
	        result = new Comment(node.data);
	    }
	    else if (isTag$1(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_1 = new Element$1(node.name, __assign$2({}, node.attribs), children);
	        children.forEach(function (child) { return (child.parent = clone_1); });
	        if (node.namespace != null) {
	            clone_1.namespace = node.namespace;
	        }
	        if (node["x-attribsNamespace"]) {
	            clone_1["x-attribsNamespace"] = __assign$2({}, node["x-attribsNamespace"]);
	        }
	        if (node["x-attribsPrefix"]) {
	            clone_1["x-attribsPrefix"] = __assign$2({}, node["x-attribsPrefix"]);
	        }
	        result = clone_1;
	    }
	    else if (isCDATA(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_2 = new NodeWithChildren(domelementtype_1$1.ElementType.CDATA, children);
	        children.forEach(function (child) { return (child.parent = clone_2); });
	        result = clone_2;
	    }
	    else if (isDocument(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_3 = new Document(children);
	        children.forEach(function (child) { return (child.parent = clone_3); });
	        if (node["x-mode"]) {
	            clone_3["x-mode"] = node["x-mode"];
	        }
	        result = clone_3;
	    }
	    else if (isDirective(node)) {
	        var instruction = new ProcessingInstruction(node.name, node.data);
	        if (node["x-name"] != null) {
	            instruction["x-name"] = node["x-name"];
	            instruction["x-publicId"] = node["x-publicId"];
	            instruction["x-systemId"] = node["x-systemId"];
	        }
	        result = instruction;
	    }
	    else {
	        throw new Error("Not implemented yet: ".concat(node.type));
	    }
	    result.startIndex = node.startIndex;
	    result.endIndex = node.endIndex;
	    if (node.sourceCodeLocation != null) {
	        result.sourceCodeLocation = node.sourceCodeLocation;
	    }
	    return result;
	}
	node.cloneNode = cloneNode;
	function cloneChildren(childs) {
	    var children = childs.map(function (child) { return cloneNode(child, true); });
	    for (var i = 1; i < children.length; i++) {
	        children[i].prev = children[i - 1];
	        children[i - 1].next = children[i];
	    }
	    return children;
	}

	(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DomHandler = void 0;
	var domelementtype_1 = lib$4;
	var node_1 = node;
	__exportStar(node, exports);
	var reWhitespace = /\s+/g;
	// Default options
	var defaultOpts = {
	    normalizeWhitespace: false,
	    withStartIndices: false,
	    withEndIndices: false,
	    xmlMode: false,
	};
	var DomHandler = /** @class */ (function () {
	    /**
	     * @param callback Called once parsing has completed.
	     * @param options Settings for the handler.
	     * @param elementCB Callback whenever a tag is closed.
	     */
	    function DomHandler(callback, options, elementCB) {
	        /** The elements of the DOM */
	        this.dom = [];
	        /** The root element for the DOM */
	        this.root = new node_1.Document(this.dom);
	        /** Indicated whether parsing has been completed. */
	        this.done = false;
	        /** Stack of open tags. */
	        this.tagStack = [this.root];
	        /** A data node that is still being written to. */
	        this.lastNode = null;
	        /** Reference to the parser instance. Used for location information. */
	        this.parser = null;
	        // Make it possible to skip arguments, for backwards-compatibility
	        if (typeof options === "function") {
	            elementCB = options;
	            options = defaultOpts;
	        }
	        if (typeof callback === "object") {
	            options = callback;
	            callback = undefined;
	        }
	        this.callback = callback !== null && callback !== void 0 ? callback : null;
	        this.options = options !== null && options !== void 0 ? options : defaultOpts;
	        this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
	    }
	    DomHandler.prototype.onparserinit = function (parser) {
	        this.parser = parser;
	    };
	    // Resets the handler back to starting state
	    DomHandler.prototype.onreset = function () {
	        this.dom = [];
	        this.root = new node_1.Document(this.dom);
	        this.done = false;
	        this.tagStack = [this.root];
	        this.lastNode = null;
	        this.parser = null;
	    };
	    // Signals the handler that parsing is done
	    DomHandler.prototype.onend = function () {
	        if (this.done)
	            return;
	        this.done = true;
	        this.parser = null;
	        this.handleCallback(null);
	    };
	    DomHandler.prototype.onerror = function (error) {
	        this.handleCallback(error);
	    };
	    DomHandler.prototype.onclosetag = function () {
	        this.lastNode = null;
	        var elem = this.tagStack.pop();
	        if (this.options.withEndIndices) {
	            elem.endIndex = this.parser.endIndex;
	        }
	        if (this.elementCB)
	            this.elementCB(elem);
	    };
	    DomHandler.prototype.onopentag = function (name, attribs) {
	        var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : undefined;
	        var element = new node_1.Element(name, attribs, undefined, type);
	        this.addNode(element);
	        this.tagStack.push(element);
	    };
	    DomHandler.prototype.ontext = function (data) {
	        var normalizeWhitespace = this.options.normalizeWhitespace;
	        var lastNode = this.lastNode;
	        if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
	            if (normalizeWhitespace) {
	                lastNode.data = (lastNode.data + data).replace(reWhitespace, " ");
	            }
	            else {
	                lastNode.data += data;
	            }
	            if (this.options.withEndIndices) {
	                lastNode.endIndex = this.parser.endIndex;
	            }
	        }
	        else {
	            if (normalizeWhitespace) {
	                data = data.replace(reWhitespace, " ");
	            }
	            var node = new node_1.Text(data);
	            this.addNode(node);
	            this.lastNode = node;
	        }
	    };
	    DomHandler.prototype.oncomment = function (data) {
	        if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
	            this.lastNode.data += data;
	            return;
	        }
	        var node = new node_1.Comment(data);
	        this.addNode(node);
	        this.lastNode = node;
	    };
	    DomHandler.prototype.oncommentend = function () {
	        this.lastNode = null;
	    };
	    DomHandler.prototype.oncdatastart = function () {
	        var text = new node_1.Text("");
	        var node = new node_1.NodeWithChildren(domelementtype_1.ElementType.CDATA, [text]);
	        this.addNode(node);
	        text.parent = node;
	        this.lastNode = text;
	    };
	    DomHandler.prototype.oncdataend = function () {
	        this.lastNode = null;
	    };
	    DomHandler.prototype.onprocessinginstruction = function (name, data) {
	        var node = new node_1.ProcessingInstruction(name, data);
	        this.addNode(node);
	    };
	    DomHandler.prototype.handleCallback = function (error) {
	        if (typeof this.callback === "function") {
	            this.callback(error, this.dom);
	        }
	        else if (error) {
	            throw error;
	        }
	    };
	    DomHandler.prototype.addNode = function (node) {
	        var parent = this.tagStack[this.tagStack.length - 1];
	        var previousSibling = parent.children[parent.children.length - 1];
	        if (this.options.withStartIndices) {
	            node.startIndex = this.parser.startIndex;
	        }
	        if (this.options.withEndIndices) {
	            node.endIndex = this.parser.endIndex;
	        }
	        parent.children.push(node);
	        if (previousSibling) {
	            node.prev = previousSibling;
	            previousSibling.next = node;
	        }
	        node.parent = parent;
	        this.lastNode = null;
	    };
	    return DomHandler;
	}());
	exports.DomHandler = DomHandler;
	exports.default = DomHandler;
	}(lib$5));

	var lib$3 = {};

	var lib$2 = {};

	var decode$1 = {};

	var Aacute$1="Á";var aacute$1="á";var Abreve="Ă";var abreve="ă";var ac="∾";var acd="∿";var acE="∾̳";var Acirc$1="Â";var acirc$1="â";var acute$1="´";var Acy="А";var acy="а";var AElig$1="Æ";var aelig$1="æ";var af="⁡";var Afr="𝔄";var afr="𝔞";var Agrave$1="À";var agrave$1="à";var alefsym="ℵ";var aleph="ℵ";var Alpha="Α";var alpha="α";var Amacr="Ā";var amacr="ā";var amalg="⨿";var amp$2="&";var AMP$1="&";var andand="⩕";var And="⩓";var and="∧";var andd="⩜";var andslope="⩘";var andv="⩚";var ang="∠";var ange="⦤";var angle="∠";var angmsdaa="⦨";var angmsdab="⦩";var angmsdac="⦪";var angmsdad="⦫";var angmsdae="⦬";var angmsdaf="⦭";var angmsdag="⦮";var angmsdah="⦯";var angmsd="∡";var angrt="∟";var angrtvb="⊾";var angrtvbd="⦝";var angsph="∢";var angst="Å";var angzarr="⍼";var Aogon="Ą";var aogon="ą";var Aopf="𝔸";var aopf="𝕒";var apacir="⩯";var ap="≈";var apE="⩰";var ape="≊";var apid="≋";var apos$1="'";var ApplyFunction="⁡";var approx="≈";var approxeq="≊";var Aring$1="Å";var aring$1="å";var Ascr="𝒜";var ascr="𝒶";var Assign="≔";var ast="*";var asymp="≈";var asympeq="≍";var Atilde$1="Ã";var atilde$1="ã";var Auml$1="Ä";var auml$1="ä";var awconint="∳";var awint="⨑";var backcong="≌";var backepsilon="϶";var backprime="‵";var backsim="∽";var backsimeq="⋍";var Backslash="∖";var Barv="⫧";var barvee="⊽";var barwed="⌅";var Barwed="⌆";var barwedge="⌅";var bbrk="⎵";var bbrktbrk="⎶";var bcong="≌";var Bcy="Б";var bcy="б";var bdquo="„";var becaus="∵";var because="∵";var Because="∵";var bemptyv="⦰";var bepsi="϶";var bernou="ℬ";var Bernoullis="ℬ";var Beta="Β";var beta="β";var beth="ℶ";var between="≬";var Bfr="𝔅";var bfr="𝔟";var bigcap="⋂";var bigcirc="◯";var bigcup="⋃";var bigodot="⨀";var bigoplus="⨁";var bigotimes="⨂";var bigsqcup="⨆";var bigstar="★";var bigtriangledown="▽";var bigtriangleup="△";var biguplus="⨄";var bigvee="⋁";var bigwedge="⋀";var bkarow="⤍";var blacklozenge="⧫";var blacksquare="▪";var blacktriangle="▴";var blacktriangledown="▾";var blacktriangleleft="◂";var blacktriangleright="▸";var blank="␣";var blk12="▒";var blk14="░";var blk34="▓";var block="█";var bne="=⃥";var bnequiv="≡⃥";var bNot="⫭";var bnot="⌐";var Bopf="𝔹";var bopf="𝕓";var bot="⊥";var bottom="⊥";var bowtie="⋈";var boxbox="⧉";var boxdl="┐";var boxdL="╕";var boxDl="╖";var boxDL="╗";var boxdr="┌";var boxdR="╒";var boxDr="╓";var boxDR="╔";var boxh="─";var boxH="═";var boxhd="┬";var boxHd="╤";var boxhD="╥";var boxHD="╦";var boxhu="┴";var boxHu="╧";var boxhU="╨";var boxHU="╩";var boxminus="⊟";var boxplus="⊞";var boxtimes="⊠";var boxul="┘";var boxuL="╛";var boxUl="╜";var boxUL="╝";var boxur="└";var boxuR="╘";var boxUr="╙";var boxUR="╚";var boxv="│";var boxV="║";var boxvh="┼";var boxvH="╪";var boxVh="╫";var boxVH="╬";var boxvl="┤";var boxvL="╡";var boxVl="╢";var boxVL="╣";var boxvr="├";var boxvR="╞";var boxVr="╟";var boxVR="╠";var bprime="‵";var breve="˘";var Breve="˘";var brvbar$1="¦";var bscr="𝒷";var Bscr="ℬ";var bsemi="⁏";var bsim="∽";var bsime="⋍";var bsolb="⧅";var bsol="\\";var bsolhsub="⟈";var bull="•";var bullet="•";var bump="≎";var bumpE="⪮";var bumpe="≏";var Bumpeq="≎";var bumpeq="≏";var Cacute="Ć";var cacute="ć";var capand="⩄";var capbrcup="⩉";var capcap="⩋";var cap="∩";var Cap="⋒";var capcup="⩇";var capdot="⩀";var CapitalDifferentialD="ⅅ";var caps="∩︀";var caret="⁁";var caron="ˇ";var Cayleys="ℭ";var ccaps="⩍";var Ccaron="Č";var ccaron="č";var Ccedil$1="Ç";var ccedil$1="ç";var Ccirc="Ĉ";var ccirc="ĉ";var Cconint="∰";var ccups="⩌";var ccupssm="⩐";var Cdot="Ċ";var cdot="ċ";var cedil$1="¸";var Cedilla="¸";var cemptyv="⦲";var cent$1="¢";var centerdot="·";var CenterDot="·";var cfr="𝔠";var Cfr="ℭ";var CHcy="Ч";var chcy="ч";var check="✓";var checkmark="✓";var Chi="Χ";var chi="χ";var circ="ˆ";var circeq="≗";var circlearrowleft="↺";var circlearrowright="↻";var circledast="⊛";var circledcirc="⊚";var circleddash="⊝";var CircleDot="⊙";var circledR="®";var circledS="Ⓢ";var CircleMinus="⊖";var CirclePlus="⊕";var CircleTimes="⊗";var cir="○";var cirE="⧃";var cire="≗";var cirfnint="⨐";var cirmid="⫯";var cirscir="⧂";var ClockwiseContourIntegral="∲";var CloseCurlyDoubleQuote="”";var CloseCurlyQuote="’";var clubs="♣";var clubsuit="♣";var colon=":";var Colon="∷";var Colone="⩴";var colone="≔";var coloneq="≔";var comma=",";var commat="@";var comp="∁";var compfn="∘";var complement="∁";var complexes="ℂ";var cong="≅";var congdot="⩭";var Congruent="≡";var conint="∮";var Conint="∯";var ContourIntegral="∮";var copf="𝕔";var Copf="ℂ";var coprod="∐";var Coproduct="∐";var copy$1="©";var COPY$1="©";var copysr="℗";var CounterClockwiseContourIntegral="∳";var crarr="↵";var cross="✗";var Cross="⨯";var Cscr="𝒞";var cscr="𝒸";var csub="⫏";var csube="⫑";var csup="⫐";var csupe="⫒";var ctdot="⋯";var cudarrl="⤸";var cudarrr="⤵";var cuepr="⋞";var cuesc="⋟";var cularr="↶";var cularrp="⤽";var cupbrcap="⩈";var cupcap="⩆";var CupCap="≍";var cup="∪";var Cup="⋓";var cupcup="⩊";var cupdot="⊍";var cupor="⩅";var cups="∪︀";var curarr="↷";var curarrm="⤼";var curlyeqprec="⋞";var curlyeqsucc="⋟";var curlyvee="⋎";var curlywedge="⋏";var curren$1="¤";var curvearrowleft="↶";var curvearrowright="↷";var cuvee="⋎";var cuwed="⋏";var cwconint="∲";var cwint="∱";var cylcty="⌭";var dagger="†";var Dagger="‡";var daleth="ℸ";var darr="↓";var Darr="↡";var dArr="⇓";var dash="‐";var Dashv="⫤";var dashv="⊣";var dbkarow="⤏";var dblac="˝";var Dcaron="Ď";var dcaron="ď";var Dcy="Д";var dcy="д";var ddagger="‡";var ddarr="⇊";var DD="ⅅ";var dd="ⅆ";var DDotrahd="⤑";var ddotseq="⩷";var deg$1="°";var Del="∇";var Delta="Δ";var delta="δ";var demptyv="⦱";var dfisht="⥿";var Dfr="𝔇";var dfr="𝔡";var dHar="⥥";var dharl="⇃";var dharr="⇂";var DiacriticalAcute="´";var DiacriticalDot="˙";var DiacriticalDoubleAcute="˝";var DiacriticalGrave="`";var DiacriticalTilde="˜";var diam="⋄";var diamond="⋄";var Diamond="⋄";var diamondsuit="♦";var diams="♦";var die="¨";var DifferentialD="ⅆ";var digamma="ϝ";var disin="⋲";var div="÷";var divide$1="÷";var divideontimes="⋇";var divonx="⋇";var DJcy="Ђ";var djcy="ђ";var dlcorn="⌞";var dlcrop="⌍";var dollar="$";var Dopf="𝔻";var dopf="𝕕";var Dot="¨";var dot="˙";var DotDot="⃜";var doteq="≐";var doteqdot="≑";var DotEqual="≐";var dotminus="∸";var dotplus="∔";var dotsquare="⊡";var doublebarwedge="⌆";var DoubleContourIntegral="∯";var DoubleDot="¨";var DoubleDownArrow="⇓";var DoubleLeftArrow="⇐";var DoubleLeftRightArrow="⇔";var DoubleLeftTee="⫤";var DoubleLongLeftArrow="⟸";var DoubleLongLeftRightArrow="⟺";var DoubleLongRightArrow="⟹";var DoubleRightArrow="⇒";var DoubleRightTee="⊨";var DoubleUpArrow="⇑";var DoubleUpDownArrow="⇕";var DoubleVerticalBar="∥";var DownArrowBar="⤓";var downarrow="↓";var DownArrow="↓";var Downarrow="⇓";var DownArrowUpArrow="⇵";var DownBreve="̑";var downdownarrows="⇊";var downharpoonleft="⇃";var downharpoonright="⇂";var DownLeftRightVector="⥐";var DownLeftTeeVector="⥞";var DownLeftVectorBar="⥖";var DownLeftVector="↽";var DownRightTeeVector="⥟";var DownRightVectorBar="⥗";var DownRightVector="⇁";var DownTeeArrow="↧";var DownTee="⊤";var drbkarow="⤐";var drcorn="⌟";var drcrop="⌌";var Dscr="𝒟";var dscr="𝒹";var DScy="Ѕ";var dscy="ѕ";var dsol="⧶";var Dstrok="Đ";var dstrok="đ";var dtdot="⋱";var dtri="▿";var dtrif="▾";var duarr="⇵";var duhar="⥯";var dwangle="⦦";var DZcy="Џ";var dzcy="џ";var dzigrarr="⟿";var Eacute$1="É";var eacute$1="é";var easter="⩮";var Ecaron="Ě";var ecaron="ě";var Ecirc$1="Ê";var ecirc$1="ê";var ecir="≖";var ecolon="≕";var Ecy="Э";var ecy="э";var eDDot="⩷";var Edot="Ė";var edot="ė";var eDot="≑";var ee="ⅇ";var efDot="≒";var Efr="𝔈";var efr="𝔢";var eg="⪚";var Egrave$1="È";var egrave$1="è";var egs="⪖";var egsdot="⪘";var el="⪙";var Element="∈";var elinters="⏧";var ell="ℓ";var els="⪕";var elsdot="⪗";var Emacr="Ē";var emacr="ē";var empty="∅";var emptyset="∅";var EmptySmallSquare="◻";var emptyv="∅";var EmptyVerySmallSquare="▫";var emsp13=" ";var emsp14=" ";var emsp=" ";var ENG="Ŋ";var eng="ŋ";var ensp=" ";var Eogon="Ę";var eogon="ę";var Eopf="𝔼";var eopf="𝕖";var epar="⋕";var eparsl="⧣";var eplus="⩱";var epsi="ε";var Epsilon="Ε";var epsilon="ε";var epsiv="ϵ";var eqcirc="≖";var eqcolon="≕";var eqsim="≂";var eqslantgtr="⪖";var eqslantless="⪕";var Equal="⩵";var equals="=";var EqualTilde="≂";var equest="≟";var Equilibrium="⇌";var equiv="≡";var equivDD="⩸";var eqvparsl="⧥";var erarr="⥱";var erDot="≓";var escr="ℯ";var Escr="ℰ";var esdot="≐";var Esim="⩳";var esim="≂";var Eta="Η";var eta="η";var ETH$1="Ð";var eth$1="ð";var Euml$1="Ë";var euml$1="ë";var euro="€";var excl="!";var exist="∃";var Exists="∃";var expectation="ℰ";var exponentiale="ⅇ";var ExponentialE="ⅇ";var fallingdotseq="≒";var Fcy="Ф";var fcy="ф";var female="♀";var ffilig="ﬃ";var fflig="ﬀ";var ffllig="ﬄ";var Ffr="𝔉";var ffr="𝔣";var filig="ﬁ";var FilledSmallSquare="◼";var FilledVerySmallSquare="▪";var fjlig="fj";var flat="♭";var fllig="ﬂ";var fltns="▱";var fnof="ƒ";var Fopf="𝔽";var fopf="𝕗";var forall="∀";var ForAll="∀";var fork="⋔";var forkv="⫙";var Fouriertrf="ℱ";var fpartint="⨍";var frac12$1="½";var frac13="⅓";var frac14$1="¼";var frac15="⅕";var frac16="⅙";var frac18="⅛";var frac23="⅔";var frac25="⅖";var frac34$1="¾";var frac35="⅗";var frac38="⅜";var frac45="⅘";var frac56="⅚";var frac58="⅝";var frac78="⅞";var frasl="⁄";var frown="⌢";var fscr="𝒻";var Fscr="ℱ";var gacute="ǵ";var Gamma="Γ";var gamma="γ";var Gammad="Ϝ";var gammad="ϝ";var gap="⪆";var Gbreve="Ğ";var gbreve="ğ";var Gcedil="Ģ";var Gcirc="Ĝ";var gcirc="ĝ";var Gcy="Г";var gcy="г";var Gdot="Ġ";var gdot="ġ";var ge="≥";var gE="≧";var gEl="⪌";var gel="⋛";var geq="≥";var geqq="≧";var geqslant="⩾";var gescc="⪩";var ges="⩾";var gesdot="⪀";var gesdoto="⪂";var gesdotol="⪄";var gesl="⋛︀";var gesles="⪔";var Gfr="𝔊";var gfr="𝔤";var gg="≫";var Gg="⋙";var ggg="⋙";var gimel="ℷ";var GJcy="Ѓ";var gjcy="ѓ";var gla="⪥";var gl="≷";var glE="⪒";var glj="⪤";var gnap="⪊";var gnapprox="⪊";var gne="⪈";var gnE="≩";var gneq="⪈";var gneqq="≩";var gnsim="⋧";var Gopf="𝔾";var gopf="𝕘";var grave="`";var GreaterEqual="≥";var GreaterEqualLess="⋛";var GreaterFullEqual="≧";var GreaterGreater="⪢";var GreaterLess="≷";var GreaterSlantEqual="⩾";var GreaterTilde="≳";var Gscr="𝒢";var gscr="ℊ";var gsim="≳";var gsime="⪎";var gsiml="⪐";var gtcc="⪧";var gtcir="⩺";var gt$2=">";var GT$1=">";var Gt="≫";var gtdot="⋗";var gtlPar="⦕";var gtquest="⩼";var gtrapprox="⪆";var gtrarr="⥸";var gtrdot="⋗";var gtreqless="⋛";var gtreqqless="⪌";var gtrless="≷";var gtrsim="≳";var gvertneqq="≩︀";var gvnE="≩︀";var Hacek="ˇ";var hairsp=" ";var half="½";var hamilt="ℋ";var HARDcy="Ъ";var hardcy="ъ";var harrcir="⥈";var harr="↔";var hArr="⇔";var harrw="↭";var Hat="^";var hbar="ℏ";var Hcirc="Ĥ";var hcirc="ĥ";var hearts="♥";var heartsuit="♥";var hellip="…";var hercon="⊹";var hfr="𝔥";var Hfr="ℌ";var HilbertSpace="ℋ";var hksearow="⤥";var hkswarow="⤦";var hoarr="⇿";var homtht="∻";var hookleftarrow="↩";var hookrightarrow="↪";var hopf="𝕙";var Hopf="ℍ";var horbar="―";var HorizontalLine="─";var hscr="𝒽";var Hscr="ℋ";var hslash="ℏ";var Hstrok="Ħ";var hstrok="ħ";var HumpDownHump="≎";var HumpEqual="≏";var hybull="⁃";var hyphen="‐";var Iacute$1="Í";var iacute$1="í";var ic="⁣";var Icirc$1="Î";var icirc$1="î";var Icy="И";var icy="и";var Idot="İ";var IEcy="Е";var iecy="е";var iexcl$1="¡";var iff="⇔";var ifr="𝔦";var Ifr="ℑ";var Igrave$1="Ì";var igrave$1="ì";var ii="ⅈ";var iiiint="⨌";var iiint="∭";var iinfin="⧜";var iiota="℩";var IJlig="Ĳ";var ijlig="ĳ";var Imacr="Ī";var imacr="ī";var image="ℑ";var ImaginaryI="ⅈ";var imagline="ℐ";var imagpart="ℑ";var imath="ı";var Im="ℑ";var imof="⊷";var imped="Ƶ";var Implies="⇒";var incare="℅";var infin="∞";var infintie="⧝";var inodot="ı";var intcal="⊺";var int="∫";var Int="∬";var integers="ℤ";var Integral="∫";var intercal="⊺";var Intersection="⋂";var intlarhk="⨗";var intprod="⨼";var InvisibleComma="⁣";var InvisibleTimes="⁢";var IOcy="Ё";var iocy="ё";var Iogon="Į";var iogon="į";var Iopf="𝕀";var iopf="𝕚";var Iota="Ι";var iota="ι";var iprod="⨼";var iquest$1="¿";var iscr="𝒾";var Iscr="ℐ";var isin="∈";var isindot="⋵";var isinE="⋹";var isins="⋴";var isinsv="⋳";var isinv="∈";var it="⁢";var Itilde="Ĩ";var itilde="ĩ";var Iukcy="І";var iukcy="і";var Iuml$1="Ï";var iuml$1="ï";var Jcirc="Ĵ";var jcirc="ĵ";var Jcy="Й";var jcy="й";var Jfr="𝔍";var jfr="𝔧";var jmath="ȷ";var Jopf="𝕁";var jopf="𝕛";var Jscr="𝒥";var jscr="𝒿";var Jsercy="Ј";var jsercy="ј";var Jukcy="Є";var jukcy="є";var Kappa="Κ";var kappa="κ";var kappav="ϰ";var Kcedil="Ķ";var kcedil="ķ";var Kcy="К";var kcy="к";var Kfr="𝔎";var kfr="𝔨";var kgreen="ĸ";var KHcy="Х";var khcy="х";var KJcy="Ќ";var kjcy="ќ";var Kopf="𝕂";var kopf="𝕜";var Kscr="𝒦";var kscr="𝓀";var lAarr="⇚";var Lacute="Ĺ";var lacute="ĺ";var laemptyv="⦴";var lagran="ℒ";var Lambda="Λ";var lambda="λ";var lang="⟨";var Lang="⟪";var langd="⦑";var langle="⟨";var lap="⪅";var Laplacetrf="ℒ";var laquo$1="«";var larrb="⇤";var larrbfs="⤟";var larr="←";var Larr="↞";var lArr="⇐";var larrfs="⤝";var larrhk="↩";var larrlp="↫";var larrpl="⤹";var larrsim="⥳";var larrtl="↢";var latail="⤙";var lAtail="⤛";var lat="⪫";var late="⪭";var lates="⪭︀";var lbarr="⤌";var lBarr="⤎";var lbbrk="❲";var lbrace="{";var lbrack="[";var lbrke="⦋";var lbrksld="⦏";var lbrkslu="⦍";var Lcaron="Ľ";var lcaron="ľ";var Lcedil="Ļ";var lcedil="ļ";var lceil="⌈";var lcub="{";var Lcy="Л";var lcy="л";var ldca="⤶";var ldquo="“";var ldquor="„";var ldrdhar="⥧";var ldrushar="⥋";var ldsh="↲";var le="≤";var lE="≦";var LeftAngleBracket="⟨";var LeftArrowBar="⇤";var leftarrow="←";var LeftArrow="←";var Leftarrow="⇐";var LeftArrowRightArrow="⇆";var leftarrowtail="↢";var LeftCeiling="⌈";var LeftDoubleBracket="⟦";var LeftDownTeeVector="⥡";var LeftDownVectorBar="⥙";var LeftDownVector="⇃";var LeftFloor="⌊";var leftharpoondown="↽";var leftharpoonup="↼";var leftleftarrows="⇇";var leftrightarrow="↔";var LeftRightArrow="↔";var Leftrightarrow="⇔";var leftrightarrows="⇆";var leftrightharpoons="⇋";var leftrightsquigarrow="↭";var LeftRightVector="⥎";var LeftTeeArrow="↤";var LeftTee="⊣";var LeftTeeVector="⥚";var leftthreetimes="⋋";var LeftTriangleBar="⧏";var LeftTriangle="⊲";var LeftTriangleEqual="⊴";var LeftUpDownVector="⥑";var LeftUpTeeVector="⥠";var LeftUpVectorBar="⥘";var LeftUpVector="↿";var LeftVectorBar="⥒";var LeftVector="↼";var lEg="⪋";var leg="⋚";var leq="≤";var leqq="≦";var leqslant="⩽";var lescc="⪨";var les="⩽";var lesdot="⩿";var lesdoto="⪁";var lesdotor="⪃";var lesg="⋚︀";var lesges="⪓";var lessapprox="⪅";var lessdot="⋖";var lesseqgtr="⋚";var lesseqqgtr="⪋";var LessEqualGreater="⋚";var LessFullEqual="≦";var LessGreater="≶";var lessgtr="≶";var LessLess="⪡";var lesssim="≲";var LessSlantEqual="⩽";var LessTilde="≲";var lfisht="⥼";var lfloor="⌊";var Lfr="𝔏";var lfr="𝔩";var lg="≶";var lgE="⪑";var lHar="⥢";var lhard="↽";var lharu="↼";var lharul="⥪";var lhblk="▄";var LJcy="Љ";var ljcy="љ";var llarr="⇇";var ll="≪";var Ll="⋘";var llcorner="⌞";var Lleftarrow="⇚";var llhard="⥫";var lltri="◺";var Lmidot="Ŀ";var lmidot="ŀ";var lmoustache="⎰";var lmoust="⎰";var lnap="⪉";var lnapprox="⪉";var lne="⪇";var lnE="≨";var lneq="⪇";var lneqq="≨";var lnsim="⋦";var loang="⟬";var loarr="⇽";var lobrk="⟦";var longleftarrow="⟵";var LongLeftArrow="⟵";var Longleftarrow="⟸";var longleftrightarrow="⟷";var LongLeftRightArrow="⟷";var Longleftrightarrow="⟺";var longmapsto="⟼";var longrightarrow="⟶";var LongRightArrow="⟶";var Longrightarrow="⟹";var looparrowleft="↫";var looparrowright="↬";var lopar="⦅";var Lopf="𝕃";var lopf="𝕝";var loplus="⨭";var lotimes="⨴";var lowast="∗";var lowbar="_";var LowerLeftArrow="↙";var LowerRightArrow="↘";var loz="◊";var lozenge="◊";var lozf="⧫";var lpar="(";var lparlt="⦓";var lrarr="⇆";var lrcorner="⌟";var lrhar="⇋";var lrhard="⥭";var lrm="‎";var lrtri="⊿";var lsaquo="‹";var lscr="𝓁";var Lscr="ℒ";var lsh="↰";var Lsh="↰";var lsim="≲";var lsime="⪍";var lsimg="⪏";var lsqb="[";var lsquo="‘";var lsquor="‚";var Lstrok="Ł";var lstrok="ł";var ltcc="⪦";var ltcir="⩹";var lt$2="<";var LT$1="<";var Lt="≪";var ltdot="⋖";var lthree="⋋";var ltimes="⋉";var ltlarr="⥶";var ltquest="⩻";var ltri="◃";var ltrie="⊴";var ltrif="◂";var ltrPar="⦖";var lurdshar="⥊";var luruhar="⥦";var lvertneqq="≨︀";var lvnE="≨︀";var macr$1="¯";var male="♂";var malt="✠";var maltese="✠";var map="↦";var mapsto="↦";var mapstodown="↧";var mapstoleft="↤";var mapstoup="↥";var marker="▮";var mcomma="⨩";var Mcy="М";var mcy="м";var mdash="—";var mDDot="∺";var measuredangle="∡";var MediumSpace=" ";var Mellintrf="ℳ";var Mfr="𝔐";var mfr="𝔪";var mho="℧";var micro$1="µ";var midast="*";var midcir="⫰";var mid="∣";var middot$1="·";var minusb="⊟";var minus="−";var minusd="∸";var minusdu="⨪";var MinusPlus="∓";var mlcp="⫛";var mldr="…";var mnplus="∓";var models="⊧";var Mopf="𝕄";var mopf="𝕞";var mp="∓";var mscr="𝓂";var Mscr="ℳ";var mstpos="∾";var Mu="Μ";var mu="μ";var multimap="⊸";var mumap="⊸";var nabla="∇";var Nacute="Ń";var nacute="ń";var nang="∠⃒";var nap="≉";var napE="⩰̸";var napid="≋̸";var napos="ŉ";var napprox="≉";var natural="♮";var naturals="ℕ";var natur="♮";var nbsp$1=" ";var nbump="≎̸";var nbumpe="≏̸";var ncap="⩃";var Ncaron="Ň";var ncaron="ň";var Ncedil="Ņ";var ncedil="ņ";var ncong="≇";var ncongdot="⩭̸";var ncup="⩂";var Ncy="Н";var ncy="н";var ndash="–";var nearhk="⤤";var nearr="↗";var neArr="⇗";var nearrow="↗";var ne="≠";var nedot="≐̸";var NegativeMediumSpace="​";var NegativeThickSpace="​";var NegativeThinSpace="​";var NegativeVeryThinSpace="​";var nequiv="≢";var nesear="⤨";var nesim="≂̸";var NestedGreaterGreater="≫";var NestedLessLess="≪";var NewLine="\n";var nexist="∄";var nexists="∄";var Nfr="𝔑";var nfr="𝔫";var ngE="≧̸";var nge="≱";var ngeq="≱";var ngeqq="≧̸";var ngeqslant="⩾̸";var nges="⩾̸";var nGg="⋙̸";var ngsim="≵";var nGt="≫⃒";var ngt="≯";var ngtr="≯";var nGtv="≫̸";var nharr="↮";var nhArr="⇎";var nhpar="⫲";var ni="∋";var nis="⋼";var nisd="⋺";var niv="∋";var NJcy="Њ";var njcy="њ";var nlarr="↚";var nlArr="⇍";var nldr="‥";var nlE="≦̸";var nle="≰";var nleftarrow="↚";var nLeftarrow="⇍";var nleftrightarrow="↮";var nLeftrightarrow="⇎";var nleq="≰";var nleqq="≦̸";var nleqslant="⩽̸";var nles="⩽̸";var nless="≮";var nLl="⋘̸";var nlsim="≴";var nLt="≪⃒";var nlt="≮";var nltri="⋪";var nltrie="⋬";var nLtv="≪̸";var nmid="∤";var NoBreak="⁠";var NonBreakingSpace=" ";var nopf="𝕟";var Nopf="ℕ";var Not="⫬";var not$1="¬";var NotCongruent="≢";var NotCupCap="≭";var NotDoubleVerticalBar="∦";var NotElement="∉";var NotEqual="≠";var NotEqualTilde="≂̸";var NotExists="∄";var NotGreater="≯";var NotGreaterEqual="≱";var NotGreaterFullEqual="≧̸";var NotGreaterGreater="≫̸";var NotGreaterLess="≹";var NotGreaterSlantEqual="⩾̸";var NotGreaterTilde="≵";var NotHumpDownHump="≎̸";var NotHumpEqual="≏̸";var notin="∉";var notindot="⋵̸";var notinE="⋹̸";var notinva="∉";var notinvb="⋷";var notinvc="⋶";var NotLeftTriangleBar="⧏̸";var NotLeftTriangle="⋪";var NotLeftTriangleEqual="⋬";var NotLess="≮";var NotLessEqual="≰";var NotLessGreater="≸";var NotLessLess="≪̸";var NotLessSlantEqual="⩽̸";var NotLessTilde="≴";var NotNestedGreaterGreater="⪢̸";var NotNestedLessLess="⪡̸";var notni="∌";var notniva="∌";var notnivb="⋾";var notnivc="⋽";var NotPrecedes="⊀";var NotPrecedesEqual="⪯̸";var NotPrecedesSlantEqual="⋠";var NotReverseElement="∌";var NotRightTriangleBar="⧐̸";var NotRightTriangle="⋫";var NotRightTriangleEqual="⋭";var NotSquareSubset="⊏̸";var NotSquareSubsetEqual="⋢";var NotSquareSuperset="⊐̸";var NotSquareSupersetEqual="⋣";var NotSubset="⊂⃒";var NotSubsetEqual="⊈";var NotSucceeds="⊁";var NotSucceedsEqual="⪰̸";var NotSucceedsSlantEqual="⋡";var NotSucceedsTilde="≿̸";var NotSuperset="⊃⃒";var NotSupersetEqual="⊉";var NotTilde="≁";var NotTildeEqual="≄";var NotTildeFullEqual="≇";var NotTildeTilde="≉";var NotVerticalBar="∤";var nparallel="∦";var npar="∦";var nparsl="⫽⃥";var npart="∂̸";var npolint="⨔";var npr="⊀";var nprcue="⋠";var nprec="⊀";var npreceq="⪯̸";var npre="⪯̸";var nrarrc="⤳̸";var nrarr="↛";var nrArr="⇏";var nrarrw="↝̸";var nrightarrow="↛";var nRightarrow="⇏";var nrtri="⋫";var nrtrie="⋭";var nsc="⊁";var nsccue="⋡";var nsce="⪰̸";var Nscr="𝒩";var nscr="𝓃";var nshortmid="∤";var nshortparallel="∦";var nsim="≁";var nsime="≄";var nsimeq="≄";var nsmid="∤";var nspar="∦";var nsqsube="⋢";var nsqsupe="⋣";var nsub="⊄";var nsubE="⫅̸";var nsube="⊈";var nsubset="⊂⃒";var nsubseteq="⊈";var nsubseteqq="⫅̸";var nsucc="⊁";var nsucceq="⪰̸";var nsup="⊅";var nsupE="⫆̸";var nsupe="⊉";var nsupset="⊃⃒";var nsupseteq="⊉";var nsupseteqq="⫆̸";var ntgl="≹";var Ntilde$1="Ñ";var ntilde$1="ñ";var ntlg="≸";var ntriangleleft="⋪";var ntrianglelefteq="⋬";var ntriangleright="⋫";var ntrianglerighteq="⋭";var Nu="Ν";var nu="ν";var num="#";var numero="№";var numsp=" ";var nvap="≍⃒";var nvdash="⊬";var nvDash="⊭";var nVdash="⊮";var nVDash="⊯";var nvge="≥⃒";var nvgt=">⃒";var nvHarr="⤄";var nvinfin="⧞";var nvlArr="⤂";var nvle="≤⃒";var nvlt="<⃒";var nvltrie="⊴⃒";var nvrArr="⤃";var nvrtrie="⊵⃒";var nvsim="∼⃒";var nwarhk="⤣";var nwarr="↖";var nwArr="⇖";var nwarrow="↖";var nwnear="⤧";var Oacute$1="Ó";var oacute$1="ó";var oast="⊛";var Ocirc$1="Ô";var ocirc$1="ô";var ocir="⊚";var Ocy="О";var ocy="о";var odash="⊝";var Odblac="Ő";var odblac="ő";var odiv="⨸";var odot="⊙";var odsold="⦼";var OElig="Œ";var oelig="œ";var ofcir="⦿";var Ofr="𝔒";var ofr="𝔬";var ogon="˛";var Ograve$1="Ò";var ograve$1="ò";var ogt="⧁";var ohbar="⦵";var ohm="Ω";var oint="∮";var olarr="↺";var olcir="⦾";var olcross="⦻";var oline="‾";var olt="⧀";var Omacr="Ō";var omacr="ō";var Omega="Ω";var omega="ω";var Omicron="Ο";var omicron="ο";var omid="⦶";var ominus="⊖";var Oopf="𝕆";var oopf="𝕠";var opar="⦷";var OpenCurlyDoubleQuote="“";var OpenCurlyQuote="‘";var operp="⦹";var oplus="⊕";var orarr="↻";var Or="⩔";var or="∨";var ord="⩝";var order="ℴ";var orderof="ℴ";var ordf$1="ª";var ordm$1="º";var origof="⊶";var oror="⩖";var orslope="⩗";var orv="⩛";var oS="Ⓢ";var Oscr="𝒪";var oscr="ℴ";var Oslash$1="Ø";var oslash$1="ø";var osol="⊘";var Otilde$1="Õ";var otilde$1="õ";var otimesas="⨶";var Otimes="⨷";var otimes="⊗";var Ouml$1="Ö";var ouml$1="ö";var ovbar="⌽";var OverBar="‾";var OverBrace="⏞";var OverBracket="⎴";var OverParenthesis="⏜";var para$1="¶";var parallel="∥";var par="∥";var parsim="⫳";var parsl="⫽";var part="∂";var PartialD="∂";var Pcy="П";var pcy="п";var percnt="%";var period=".";var permil="‰";var perp="⊥";var pertenk="‱";var Pfr="𝔓";var pfr="𝔭";var Phi="Φ";var phi="φ";var phiv="ϕ";var phmmat="ℳ";var phone="☎";var Pi="Π";var pi="π";var pitchfork="⋔";var piv="ϖ";var planck="ℏ";var planckh="ℎ";var plankv="ℏ";var plusacir="⨣";var plusb="⊞";var pluscir="⨢";var plus="+";var plusdo="∔";var plusdu="⨥";var pluse="⩲";var PlusMinus="±";var plusmn$1="±";var plussim="⨦";var plustwo="⨧";var pm="±";var Poincareplane="ℌ";var pointint="⨕";var popf="𝕡";var Popf="ℙ";var pound$1="£";var prap="⪷";var Pr="⪻";var pr="≺";var prcue="≼";var precapprox="⪷";var prec="≺";var preccurlyeq="≼";var Precedes="≺";var PrecedesEqual="⪯";var PrecedesSlantEqual="≼";var PrecedesTilde="≾";var preceq="⪯";var precnapprox="⪹";var precneqq="⪵";var precnsim="⋨";var pre="⪯";var prE="⪳";var precsim="≾";var prime="′";var Prime="″";var primes="ℙ";var prnap="⪹";var prnE="⪵";var prnsim="⋨";var prod="∏";var Product="∏";var profalar="⌮";var profline="⌒";var profsurf="⌓";var prop="∝";var Proportional="∝";var Proportion="∷";var propto="∝";var prsim="≾";var prurel="⊰";var Pscr="𝒫";var pscr="𝓅";var Psi="Ψ";var psi="ψ";var puncsp=" ";var Qfr="𝔔";var qfr="𝔮";var qint="⨌";var qopf="𝕢";var Qopf="ℚ";var qprime="⁗";var Qscr="𝒬";var qscr="𝓆";var quaternions="ℍ";var quatint="⨖";var quest="?";var questeq="≟";var quot$2="\"";var QUOT$1="\"";var rAarr="⇛";var race="∽̱";var Racute="Ŕ";var racute="ŕ";var radic="√";var raemptyv="⦳";var rang="⟩";var Rang="⟫";var rangd="⦒";var range="⦥";var rangle="⟩";var raquo$1="»";var rarrap="⥵";var rarrb="⇥";var rarrbfs="⤠";var rarrc="⤳";var rarr="→";var Rarr="↠";var rArr="⇒";var rarrfs="⤞";var rarrhk="↪";var rarrlp="↬";var rarrpl="⥅";var rarrsim="⥴";var Rarrtl="⤖";var rarrtl="↣";var rarrw="↝";var ratail="⤚";var rAtail="⤜";var ratio="∶";var rationals="ℚ";var rbarr="⤍";var rBarr="⤏";var RBarr="⤐";var rbbrk="❳";var rbrace="}";var rbrack="]";var rbrke="⦌";var rbrksld="⦎";var rbrkslu="⦐";var Rcaron="Ř";var rcaron="ř";var Rcedil="Ŗ";var rcedil="ŗ";var rceil="⌉";var rcub="}";var Rcy="Р";var rcy="р";var rdca="⤷";var rdldhar="⥩";var rdquo="”";var rdquor="”";var rdsh="↳";var real="ℜ";var realine="ℛ";var realpart="ℜ";var reals="ℝ";var Re="ℜ";var rect="▭";var reg$1="®";var REG$1="®";var ReverseElement="∋";var ReverseEquilibrium="⇋";var ReverseUpEquilibrium="⥯";var rfisht="⥽";var rfloor="⌋";var rfr="𝔯";var Rfr="ℜ";var rHar="⥤";var rhard="⇁";var rharu="⇀";var rharul="⥬";var Rho="Ρ";var rho="ρ";var rhov="ϱ";var RightAngleBracket="⟩";var RightArrowBar="⇥";var rightarrow="→";var RightArrow="→";var Rightarrow="⇒";var RightArrowLeftArrow="⇄";var rightarrowtail="↣";var RightCeiling="⌉";var RightDoubleBracket="⟧";var RightDownTeeVector="⥝";var RightDownVectorBar="⥕";var RightDownVector="⇂";var RightFloor="⌋";var rightharpoondown="⇁";var rightharpoonup="⇀";var rightleftarrows="⇄";var rightleftharpoons="⇌";var rightrightarrows="⇉";var rightsquigarrow="↝";var RightTeeArrow="↦";var RightTee="⊢";var RightTeeVector="⥛";var rightthreetimes="⋌";var RightTriangleBar="⧐";var RightTriangle="⊳";var RightTriangleEqual="⊵";var RightUpDownVector="⥏";var RightUpTeeVector="⥜";var RightUpVectorBar="⥔";var RightUpVector="↾";var RightVectorBar="⥓";var RightVector="⇀";var ring="˚";var risingdotseq="≓";var rlarr="⇄";var rlhar="⇌";var rlm="‏";var rmoustache="⎱";var rmoust="⎱";var rnmid="⫮";var roang="⟭";var roarr="⇾";var robrk="⟧";var ropar="⦆";var ropf="𝕣";var Ropf="ℝ";var roplus="⨮";var rotimes="⨵";var RoundImplies="⥰";var rpar=")";var rpargt="⦔";var rppolint="⨒";var rrarr="⇉";var Rrightarrow="⇛";var rsaquo="›";var rscr="𝓇";var Rscr="ℛ";var rsh="↱";var Rsh="↱";var rsqb="]";var rsquo="’";var rsquor="’";var rthree="⋌";var rtimes="⋊";var rtri="▹";var rtrie="⊵";var rtrif="▸";var rtriltri="⧎";var RuleDelayed="⧴";var ruluhar="⥨";var rx="℞";var Sacute="Ś";var sacute="ś";var sbquo="‚";var scap="⪸";var Scaron="Š";var scaron="š";var Sc="⪼";var sc="≻";var sccue="≽";var sce="⪰";var scE="⪴";var Scedil="Ş";var scedil="ş";var Scirc="Ŝ";var scirc="ŝ";var scnap="⪺";var scnE="⪶";var scnsim="⋩";var scpolint="⨓";var scsim="≿";var Scy="С";var scy="с";var sdotb="⊡";var sdot="⋅";var sdote="⩦";var searhk="⤥";var searr="↘";var seArr="⇘";var searrow="↘";var sect$1="§";var semi=";";var seswar="⤩";var setminus="∖";var setmn="∖";var sext="✶";var Sfr="𝔖";var sfr="𝔰";var sfrown="⌢";var sharp="♯";var SHCHcy="Щ";var shchcy="щ";var SHcy="Ш";var shcy="ш";var ShortDownArrow="↓";var ShortLeftArrow="←";var shortmid="∣";var shortparallel="∥";var ShortRightArrow="→";var ShortUpArrow="↑";var shy$1="­";var Sigma="Σ";var sigma="σ";var sigmaf="ς";var sigmav="ς";var sim="∼";var simdot="⩪";var sime="≃";var simeq="≃";var simg="⪞";var simgE="⪠";var siml="⪝";var simlE="⪟";var simne="≆";var simplus="⨤";var simrarr="⥲";var slarr="←";var SmallCircle="∘";var smallsetminus="∖";var smashp="⨳";var smeparsl="⧤";var smid="∣";var smile="⌣";var smt="⪪";var smte="⪬";var smtes="⪬︀";var SOFTcy="Ь";var softcy="ь";var solbar="⌿";var solb="⧄";var sol="/";var Sopf="𝕊";var sopf="𝕤";var spades="♠";var spadesuit="♠";var spar="∥";var sqcap="⊓";var sqcaps="⊓︀";var sqcup="⊔";var sqcups="⊔︀";var Sqrt="√";var sqsub="⊏";var sqsube="⊑";var sqsubset="⊏";var sqsubseteq="⊑";var sqsup="⊐";var sqsupe="⊒";var sqsupset="⊐";var sqsupseteq="⊒";var square="□";var Square="□";var SquareIntersection="⊓";var SquareSubset="⊏";var SquareSubsetEqual="⊑";var SquareSuperset="⊐";var SquareSupersetEqual="⊒";var SquareUnion="⊔";var squarf="▪";var squ="□";var squf="▪";var srarr="→";var Sscr="𝒮";var sscr="𝓈";var ssetmn="∖";var ssmile="⌣";var sstarf="⋆";var Star="⋆";var star="☆";var starf="★";var straightepsilon="ϵ";var straightphi="ϕ";var strns="¯";var sub="⊂";var Sub="⋐";var subdot="⪽";var subE="⫅";var sube="⊆";var subedot="⫃";var submult="⫁";var subnE="⫋";var subne="⊊";var subplus="⪿";var subrarr="⥹";var subset="⊂";var Subset="⋐";var subseteq="⊆";var subseteqq="⫅";var SubsetEqual="⊆";var subsetneq="⊊";var subsetneqq="⫋";var subsim="⫇";var subsub="⫕";var subsup="⫓";var succapprox="⪸";var succ="≻";var succcurlyeq="≽";var Succeeds="≻";var SucceedsEqual="⪰";var SucceedsSlantEqual="≽";var SucceedsTilde="≿";var succeq="⪰";var succnapprox="⪺";var succneqq="⪶";var succnsim="⋩";var succsim="≿";var SuchThat="∋";var sum="∑";var Sum="∑";var sung="♪";var sup1$1="¹";var sup2$1="²";var sup3$1="³";var sup="⊃";var Sup="⋑";var supdot="⪾";var supdsub="⫘";var supE="⫆";var supe="⊇";var supedot="⫄";var Superset="⊃";var SupersetEqual="⊇";var suphsol="⟉";var suphsub="⫗";var suplarr="⥻";var supmult="⫂";var supnE="⫌";var supne="⊋";var supplus="⫀";var supset="⊃";var Supset="⋑";var supseteq="⊇";var supseteqq="⫆";var supsetneq="⊋";var supsetneqq="⫌";var supsim="⫈";var supsub="⫔";var supsup="⫖";var swarhk="⤦";var swarr="↙";var swArr="⇙";var swarrow="↙";var swnwar="⤪";var szlig$1="ß";var Tab="\t";var target="⌖";var Tau="Τ";var tau="τ";var tbrk="⎴";var Tcaron="Ť";var tcaron="ť";var Tcedil="Ţ";var tcedil="ţ";var Tcy="Т";var tcy="т";var tdot="⃛";var telrec="⌕";var Tfr="𝔗";var tfr="𝔱";var there4="∴";var therefore="∴";var Therefore="∴";var Theta="Θ";var theta="θ";var thetasym="ϑ";var thetav="ϑ";var thickapprox="≈";var thicksim="∼";var ThickSpace="  ";var ThinSpace=" ";var thinsp=" ";var thkap="≈";var thksim="∼";var THORN$1="Þ";var thorn$1="þ";var tilde="˜";var Tilde="∼";var TildeEqual="≃";var TildeFullEqual="≅";var TildeTilde="≈";var timesbar="⨱";var timesb="⊠";var times$1="×";var timesd="⨰";var tint="∭";var toea="⤨";var topbot="⌶";var topcir="⫱";var top="⊤";var Topf="𝕋";var topf="𝕥";var topfork="⫚";var tosa="⤩";var tprime="‴";var trade="™";var TRADE="™";var triangle="▵";var triangledown="▿";var triangleleft="◃";var trianglelefteq="⊴";var triangleq="≜";var triangleright="▹";var trianglerighteq="⊵";var tridot="◬";var trie="≜";var triminus="⨺";var TripleDot="⃛";var triplus="⨹";var trisb="⧍";var tritime="⨻";var trpezium="⏢";var Tscr="𝒯";var tscr="𝓉";var TScy="Ц";var tscy="ц";var TSHcy="Ћ";var tshcy="ћ";var Tstrok="Ŧ";var tstrok="ŧ";var twixt="≬";var twoheadleftarrow="↞";var twoheadrightarrow="↠";var Uacute$1="Ú";var uacute$1="ú";var uarr="↑";var Uarr="↟";var uArr="⇑";var Uarrocir="⥉";var Ubrcy="Ў";var ubrcy="ў";var Ubreve="Ŭ";var ubreve="ŭ";var Ucirc$1="Û";var ucirc$1="û";var Ucy="У";var ucy="у";var udarr="⇅";var Udblac="Ű";var udblac="ű";var udhar="⥮";var ufisht="⥾";var Ufr="𝔘";var ufr="𝔲";var Ugrave$1="Ù";var ugrave$1="ù";var uHar="⥣";var uharl="↿";var uharr="↾";var uhblk="▀";var ulcorn="⌜";var ulcorner="⌜";var ulcrop="⌏";var ultri="◸";var Umacr="Ū";var umacr="ū";var uml$1="¨";var UnderBar="_";var UnderBrace="⏟";var UnderBracket="⎵";var UnderParenthesis="⏝";var Union="⋃";var UnionPlus="⊎";var Uogon="Ų";var uogon="ų";var Uopf="𝕌";var uopf="𝕦";var UpArrowBar="⤒";var uparrow="↑";var UpArrow="↑";var Uparrow="⇑";var UpArrowDownArrow="⇅";var updownarrow="↕";var UpDownArrow="↕";var Updownarrow="⇕";var UpEquilibrium="⥮";var upharpoonleft="↿";var upharpoonright="↾";var uplus="⊎";var UpperLeftArrow="↖";var UpperRightArrow="↗";var upsi="υ";var Upsi="ϒ";var upsih="ϒ";var Upsilon="Υ";var upsilon="υ";var UpTeeArrow="↥";var UpTee="⊥";var upuparrows="⇈";var urcorn="⌝";var urcorner="⌝";var urcrop="⌎";var Uring="Ů";var uring="ů";var urtri="◹";var Uscr="𝒰";var uscr="𝓊";var utdot="⋰";var Utilde="Ũ";var utilde="ũ";var utri="▵";var utrif="▴";var uuarr="⇈";var Uuml$1="Ü";var uuml$1="ü";var uwangle="⦧";var vangrt="⦜";var varepsilon="ϵ";var varkappa="ϰ";var varnothing="∅";var varphi="ϕ";var varpi="ϖ";var varpropto="∝";var varr="↕";var vArr="⇕";var varrho="ϱ";var varsigma="ς";var varsubsetneq="⊊︀";var varsubsetneqq="⫋︀";var varsupsetneq="⊋︀";var varsupsetneqq="⫌︀";var vartheta="ϑ";var vartriangleleft="⊲";var vartriangleright="⊳";var vBar="⫨";var Vbar="⫫";var vBarv="⫩";var Vcy="В";var vcy="в";var vdash="⊢";var vDash="⊨";var Vdash="⊩";var VDash="⊫";var Vdashl="⫦";var veebar="⊻";var vee="∨";var Vee="⋁";var veeeq="≚";var vellip="⋮";var verbar="|";var Verbar="‖";var vert="|";var Vert="‖";var VerticalBar="∣";var VerticalLine="|";var VerticalSeparator="❘";var VerticalTilde="≀";var VeryThinSpace=" ";var Vfr="𝔙";var vfr="𝔳";var vltri="⊲";var vnsub="⊂⃒";var vnsup="⊃⃒";var Vopf="𝕍";var vopf="𝕧";var vprop="∝";var vrtri="⊳";var Vscr="𝒱";var vscr="𝓋";var vsubnE="⫋︀";var vsubne="⊊︀";var vsupnE="⫌︀";var vsupne="⊋︀";var Vvdash="⊪";var vzigzag="⦚";var Wcirc="Ŵ";var wcirc="ŵ";var wedbar="⩟";var wedge="∧";var Wedge="⋀";var wedgeq="≙";var weierp="℘";var Wfr="𝔚";var wfr="𝔴";var Wopf="𝕎";var wopf="𝕨";var wp="℘";var wr="≀";var wreath="≀";var Wscr="𝒲";var wscr="𝓌";var xcap="⋂";var xcirc="◯";var xcup="⋃";var xdtri="▽";var Xfr="𝔛";var xfr="𝔵";var xharr="⟷";var xhArr="⟺";var Xi="Ξ";var xi="ξ";var xlarr="⟵";var xlArr="⟸";var xmap="⟼";var xnis="⋻";var xodot="⨀";var Xopf="𝕏";var xopf="𝕩";var xoplus="⨁";var xotime="⨂";var xrarr="⟶";var xrArr="⟹";var Xscr="𝒳";var xscr="𝓍";var xsqcup="⨆";var xuplus="⨄";var xutri="△";var xvee="⋁";var xwedge="⋀";var Yacute$1="Ý";var yacute$1="ý";var YAcy="Я";var yacy="я";var Ycirc="Ŷ";var ycirc="ŷ";var Ycy="Ы";var ycy="ы";var yen$1="¥";var Yfr="𝔜";var yfr="𝔶";var YIcy="Ї";var yicy="ї";var Yopf="𝕐";var yopf="𝕪";var Yscr="𝒴";var yscr="𝓎";var YUcy="Ю";var yucy="ю";var yuml$1="ÿ";var Yuml="Ÿ";var Zacute="Ź";var zacute="ź";var Zcaron="Ž";var zcaron="ž";var Zcy="З";var zcy="з";var Zdot="Ż";var zdot="ż";var zeetrf="ℨ";var ZeroWidthSpace="​";var Zeta="Ζ";var zeta="ζ";var zfr="𝔷";var Zfr="ℨ";var ZHcy="Ж";var zhcy="ж";var zigrarr="⇝";var zopf="𝕫";var Zopf="ℤ";var Zscr="𝒵";var zscr="𝓏";var zwj="‍";var zwnj="‌";var require$$1$1 = {Aacute:Aacute$1,aacute:aacute$1,Abreve:Abreve,abreve:abreve,ac:ac,acd:acd,acE:acE,Acirc:Acirc$1,acirc:acirc$1,acute:acute$1,Acy:Acy,acy:acy,AElig:AElig$1,aelig:aelig$1,af:af,Afr:Afr,afr:afr,Agrave:Agrave$1,agrave:agrave$1,alefsym:alefsym,aleph:aleph,Alpha:Alpha,alpha:alpha,Amacr:Amacr,amacr:amacr,amalg:amalg,amp:amp$2,AMP:AMP$1,andand:andand,And:And,and:and,andd:andd,andslope:andslope,andv:andv,ang:ang,ange:ange,angle:angle,angmsdaa:angmsdaa,angmsdab:angmsdab,angmsdac:angmsdac,angmsdad:angmsdad,angmsdae:angmsdae,angmsdaf:angmsdaf,angmsdag:angmsdag,angmsdah:angmsdah,angmsd:angmsd,angrt:angrt,angrtvb:angrtvb,angrtvbd:angrtvbd,angsph:angsph,angst:angst,angzarr:angzarr,Aogon:Aogon,aogon:aogon,Aopf:Aopf,aopf:aopf,apacir:apacir,ap:ap,apE:apE,ape:ape,apid:apid,apos:apos$1,ApplyFunction:ApplyFunction,approx:approx,approxeq:approxeq,Aring:Aring$1,aring:aring$1,Ascr:Ascr,ascr:ascr,Assign:Assign,ast:ast,asymp:asymp,asympeq:asympeq,Atilde:Atilde$1,atilde:atilde$1,Auml:Auml$1,auml:auml$1,awconint:awconint,awint:awint,backcong:backcong,backepsilon:backepsilon,backprime:backprime,backsim:backsim,backsimeq:backsimeq,Backslash:Backslash,Barv:Barv,barvee:barvee,barwed:barwed,Barwed:Barwed,barwedge:barwedge,bbrk:bbrk,bbrktbrk:bbrktbrk,bcong:bcong,Bcy:Bcy,bcy:bcy,bdquo:bdquo,becaus:becaus,because:because,Because:Because,bemptyv:bemptyv,bepsi:bepsi,bernou:bernou,Bernoullis:Bernoullis,Beta:Beta,beta:beta,beth:beth,between:between,Bfr:Bfr,bfr:bfr,bigcap:bigcap,bigcirc:bigcirc,bigcup:bigcup,bigodot:bigodot,bigoplus:bigoplus,bigotimes:bigotimes,bigsqcup:bigsqcup,bigstar:bigstar,bigtriangledown:bigtriangledown,bigtriangleup:bigtriangleup,biguplus:biguplus,bigvee:bigvee,bigwedge:bigwedge,bkarow:bkarow,blacklozenge:blacklozenge,blacksquare:blacksquare,blacktriangle:blacktriangle,blacktriangledown:blacktriangledown,blacktriangleleft:blacktriangleleft,blacktriangleright:blacktriangleright,blank:blank,blk12:blk12,blk14:blk14,blk34:blk34,block:block,bne:bne,bnequiv:bnequiv,bNot:bNot,bnot:bnot,Bopf:Bopf,bopf:bopf,bot:bot,bottom:bottom,bowtie:bowtie,boxbox:boxbox,boxdl:boxdl,boxdL:boxdL,boxDl:boxDl,boxDL:boxDL,boxdr:boxdr,boxdR:boxdR,boxDr:boxDr,boxDR:boxDR,boxh:boxh,boxH:boxH,boxhd:boxhd,boxHd:boxHd,boxhD:boxhD,boxHD:boxHD,boxhu:boxhu,boxHu:boxHu,boxhU:boxhU,boxHU:boxHU,boxminus:boxminus,boxplus:boxplus,boxtimes:boxtimes,boxul:boxul,boxuL:boxuL,boxUl:boxUl,boxUL:boxUL,boxur:boxur,boxuR:boxuR,boxUr:boxUr,boxUR:boxUR,boxv:boxv,boxV:boxV,boxvh:boxvh,boxvH:boxvH,boxVh:boxVh,boxVH:boxVH,boxvl:boxvl,boxvL:boxvL,boxVl:boxVl,boxVL:boxVL,boxvr:boxvr,boxvR:boxvR,boxVr:boxVr,boxVR:boxVR,bprime:bprime,breve:breve,Breve:Breve,brvbar:brvbar$1,bscr:bscr,Bscr:Bscr,bsemi:bsemi,bsim:bsim,bsime:bsime,bsolb:bsolb,bsol:bsol,bsolhsub:bsolhsub,bull:bull,bullet:bullet,bump:bump,bumpE:bumpE,bumpe:bumpe,Bumpeq:Bumpeq,bumpeq:bumpeq,Cacute:Cacute,cacute:cacute,capand:capand,capbrcup:capbrcup,capcap:capcap,cap:cap,Cap:Cap,capcup:capcup,capdot:capdot,CapitalDifferentialD:CapitalDifferentialD,caps:caps,caret:caret,caron:caron,Cayleys:Cayleys,ccaps:ccaps,Ccaron:Ccaron,ccaron:ccaron,Ccedil:Ccedil$1,ccedil:ccedil$1,Ccirc:Ccirc,ccirc:ccirc,Cconint:Cconint,ccups:ccups,ccupssm:ccupssm,Cdot:Cdot,cdot:cdot,cedil:cedil$1,Cedilla:Cedilla,cemptyv:cemptyv,cent:cent$1,centerdot:centerdot,CenterDot:CenterDot,cfr:cfr,Cfr:Cfr,CHcy:CHcy,chcy:chcy,check:check,checkmark:checkmark,Chi:Chi,chi:chi,circ:circ,circeq:circeq,circlearrowleft:circlearrowleft,circlearrowright:circlearrowright,circledast:circledast,circledcirc:circledcirc,circleddash:circleddash,CircleDot:CircleDot,circledR:circledR,circledS:circledS,CircleMinus:CircleMinus,CirclePlus:CirclePlus,CircleTimes:CircleTimes,cir:cir,cirE:cirE,cire:cire,cirfnint:cirfnint,cirmid:cirmid,cirscir:cirscir,ClockwiseContourIntegral:ClockwiseContourIntegral,CloseCurlyDoubleQuote:CloseCurlyDoubleQuote,CloseCurlyQuote:CloseCurlyQuote,clubs:clubs,clubsuit:clubsuit,colon:colon,Colon:Colon,Colone:Colone,colone:colone,coloneq:coloneq,comma:comma,commat:commat,comp:comp,compfn:compfn,complement:complement,complexes:complexes,cong:cong,congdot:congdot,Congruent:Congruent,conint:conint,Conint:Conint,ContourIntegral:ContourIntegral,copf:copf,Copf:Copf,coprod:coprod,Coproduct:Coproduct,copy:copy$1,COPY:COPY$1,copysr:copysr,CounterClockwiseContourIntegral:CounterClockwiseContourIntegral,crarr:crarr,cross:cross,Cross:Cross,Cscr:Cscr,cscr:cscr,csub:csub,csube:csube,csup:csup,csupe:csupe,ctdot:ctdot,cudarrl:cudarrl,cudarrr:cudarrr,cuepr:cuepr,cuesc:cuesc,cularr:cularr,cularrp:cularrp,cupbrcap:cupbrcap,cupcap:cupcap,CupCap:CupCap,cup:cup,Cup:Cup,cupcup:cupcup,cupdot:cupdot,cupor:cupor,cups:cups,curarr:curarr,curarrm:curarrm,curlyeqprec:curlyeqprec,curlyeqsucc:curlyeqsucc,curlyvee:curlyvee,curlywedge:curlywedge,curren:curren$1,curvearrowleft:curvearrowleft,curvearrowright:curvearrowright,cuvee:cuvee,cuwed:cuwed,cwconint:cwconint,cwint:cwint,cylcty:cylcty,dagger:dagger,Dagger:Dagger,daleth:daleth,darr:darr,Darr:Darr,dArr:dArr,dash:dash,Dashv:Dashv,dashv:dashv,dbkarow:dbkarow,dblac:dblac,Dcaron:Dcaron,dcaron:dcaron,Dcy:Dcy,dcy:dcy,ddagger:ddagger,ddarr:ddarr,DD:DD,dd:dd,DDotrahd:DDotrahd,ddotseq:ddotseq,deg:deg$1,Del:Del,Delta:Delta,delta:delta,demptyv:demptyv,dfisht:dfisht,Dfr:Dfr,dfr:dfr,dHar:dHar,dharl:dharl,dharr:dharr,DiacriticalAcute:DiacriticalAcute,DiacriticalDot:DiacriticalDot,DiacriticalDoubleAcute:DiacriticalDoubleAcute,DiacriticalGrave:DiacriticalGrave,DiacriticalTilde:DiacriticalTilde,diam:diam,diamond:diamond,Diamond:Diamond,diamondsuit:diamondsuit,diams:diams,die:die,DifferentialD:DifferentialD,digamma:digamma,disin:disin,div:div,divide:divide$1,divideontimes:divideontimes,divonx:divonx,DJcy:DJcy,djcy:djcy,dlcorn:dlcorn,dlcrop:dlcrop,dollar:dollar,Dopf:Dopf,dopf:dopf,Dot:Dot,dot:dot,DotDot:DotDot,doteq:doteq,doteqdot:doteqdot,DotEqual:DotEqual,dotminus:dotminus,dotplus:dotplus,dotsquare:dotsquare,doublebarwedge:doublebarwedge,DoubleContourIntegral:DoubleContourIntegral,DoubleDot:DoubleDot,DoubleDownArrow:DoubleDownArrow,DoubleLeftArrow:DoubleLeftArrow,DoubleLeftRightArrow:DoubleLeftRightArrow,DoubleLeftTee:DoubleLeftTee,DoubleLongLeftArrow:DoubleLongLeftArrow,DoubleLongLeftRightArrow:DoubleLongLeftRightArrow,DoubleLongRightArrow:DoubleLongRightArrow,DoubleRightArrow:DoubleRightArrow,DoubleRightTee:DoubleRightTee,DoubleUpArrow:DoubleUpArrow,DoubleUpDownArrow:DoubleUpDownArrow,DoubleVerticalBar:DoubleVerticalBar,DownArrowBar:DownArrowBar,downarrow:downarrow,DownArrow:DownArrow,Downarrow:Downarrow,DownArrowUpArrow:DownArrowUpArrow,DownBreve:DownBreve,downdownarrows:downdownarrows,downharpoonleft:downharpoonleft,downharpoonright:downharpoonright,DownLeftRightVector:DownLeftRightVector,DownLeftTeeVector:DownLeftTeeVector,DownLeftVectorBar:DownLeftVectorBar,DownLeftVector:DownLeftVector,DownRightTeeVector:DownRightTeeVector,DownRightVectorBar:DownRightVectorBar,DownRightVector:DownRightVector,DownTeeArrow:DownTeeArrow,DownTee:DownTee,drbkarow:drbkarow,drcorn:drcorn,drcrop:drcrop,Dscr:Dscr,dscr:dscr,DScy:DScy,dscy:dscy,dsol:dsol,Dstrok:Dstrok,dstrok:dstrok,dtdot:dtdot,dtri:dtri,dtrif:dtrif,duarr:duarr,duhar:duhar,dwangle:dwangle,DZcy:DZcy,dzcy:dzcy,dzigrarr:dzigrarr,Eacute:Eacute$1,eacute:eacute$1,easter:easter,Ecaron:Ecaron,ecaron:ecaron,Ecirc:Ecirc$1,ecirc:ecirc$1,ecir:ecir,ecolon:ecolon,Ecy:Ecy,ecy:ecy,eDDot:eDDot,Edot:Edot,edot:edot,eDot:eDot,ee:ee,efDot:efDot,Efr:Efr,efr:efr,eg:eg,Egrave:Egrave$1,egrave:egrave$1,egs:egs,egsdot:egsdot,el:el,Element:Element,elinters:elinters,ell:ell,els:els,elsdot:elsdot,Emacr:Emacr,emacr:emacr,empty:empty,emptyset:emptyset,EmptySmallSquare:EmptySmallSquare,emptyv:emptyv,EmptyVerySmallSquare:EmptyVerySmallSquare,emsp13:emsp13,emsp14:emsp14,emsp:emsp,ENG:ENG,eng:eng,ensp:ensp,Eogon:Eogon,eogon:eogon,Eopf:Eopf,eopf:eopf,epar:epar,eparsl:eparsl,eplus:eplus,epsi:epsi,Epsilon:Epsilon,epsilon:epsilon,epsiv:epsiv,eqcirc:eqcirc,eqcolon:eqcolon,eqsim:eqsim,eqslantgtr:eqslantgtr,eqslantless:eqslantless,Equal:Equal,equals:equals,EqualTilde:EqualTilde,equest:equest,Equilibrium:Equilibrium,equiv:equiv,equivDD:equivDD,eqvparsl:eqvparsl,erarr:erarr,erDot:erDot,escr:escr,Escr:Escr,esdot:esdot,Esim:Esim,esim:esim,Eta:Eta,eta:eta,ETH:ETH$1,eth:eth$1,Euml:Euml$1,euml:euml$1,euro:euro,excl:excl,exist:exist,Exists:Exists,expectation:expectation,exponentiale:exponentiale,ExponentialE:ExponentialE,fallingdotseq:fallingdotseq,Fcy:Fcy,fcy:fcy,female:female,ffilig:ffilig,fflig:fflig,ffllig:ffllig,Ffr:Ffr,ffr:ffr,filig:filig,FilledSmallSquare:FilledSmallSquare,FilledVerySmallSquare:FilledVerySmallSquare,fjlig:fjlig,flat:flat,fllig:fllig,fltns:fltns,fnof:fnof,Fopf:Fopf,fopf:fopf,forall:forall,ForAll:ForAll,fork:fork,forkv:forkv,Fouriertrf:Fouriertrf,fpartint:fpartint,frac12:frac12$1,frac13:frac13,frac14:frac14$1,frac15:frac15,frac16:frac16,frac18:frac18,frac23:frac23,frac25:frac25,frac34:frac34$1,frac35:frac35,frac38:frac38,frac45:frac45,frac56:frac56,frac58:frac58,frac78:frac78,frasl:frasl,frown:frown,fscr:fscr,Fscr:Fscr,gacute:gacute,Gamma:Gamma,gamma:gamma,Gammad:Gammad,gammad:gammad,gap:gap,Gbreve:Gbreve,gbreve:gbreve,Gcedil:Gcedil,Gcirc:Gcirc,gcirc:gcirc,Gcy:Gcy,gcy:gcy,Gdot:Gdot,gdot:gdot,ge:ge,gE:gE,gEl:gEl,gel:gel,geq:geq,geqq:geqq,geqslant:geqslant,gescc:gescc,ges:ges,gesdot:gesdot,gesdoto:gesdoto,gesdotol:gesdotol,gesl:gesl,gesles:gesles,Gfr:Gfr,gfr:gfr,gg:gg,Gg:Gg,ggg:ggg,gimel:gimel,GJcy:GJcy,gjcy:gjcy,gla:gla,gl:gl,glE:glE,glj:glj,gnap:gnap,gnapprox:gnapprox,gne:gne,gnE:gnE,gneq:gneq,gneqq:gneqq,gnsim:gnsim,Gopf:Gopf,gopf:gopf,grave:grave,GreaterEqual:GreaterEqual,GreaterEqualLess:GreaterEqualLess,GreaterFullEqual:GreaterFullEqual,GreaterGreater:GreaterGreater,GreaterLess:GreaterLess,GreaterSlantEqual:GreaterSlantEqual,GreaterTilde:GreaterTilde,Gscr:Gscr,gscr:gscr,gsim:gsim,gsime:gsime,gsiml:gsiml,gtcc:gtcc,gtcir:gtcir,gt:gt$2,GT:GT$1,Gt:Gt,gtdot:gtdot,gtlPar:gtlPar,gtquest:gtquest,gtrapprox:gtrapprox,gtrarr:gtrarr,gtrdot:gtrdot,gtreqless:gtreqless,gtreqqless:gtreqqless,gtrless:gtrless,gtrsim:gtrsim,gvertneqq:gvertneqq,gvnE:gvnE,Hacek:Hacek,hairsp:hairsp,half:half,hamilt:hamilt,HARDcy:HARDcy,hardcy:hardcy,harrcir:harrcir,harr:harr,hArr:hArr,harrw:harrw,Hat:Hat,hbar:hbar,Hcirc:Hcirc,hcirc:hcirc,hearts:hearts,heartsuit:heartsuit,hellip:hellip,hercon:hercon,hfr:hfr,Hfr:Hfr,HilbertSpace:HilbertSpace,hksearow:hksearow,hkswarow:hkswarow,hoarr:hoarr,homtht:homtht,hookleftarrow:hookleftarrow,hookrightarrow:hookrightarrow,hopf:hopf,Hopf:Hopf,horbar:horbar,HorizontalLine:HorizontalLine,hscr:hscr,Hscr:Hscr,hslash:hslash,Hstrok:Hstrok,hstrok:hstrok,HumpDownHump:HumpDownHump,HumpEqual:HumpEqual,hybull:hybull,hyphen:hyphen,Iacute:Iacute$1,iacute:iacute$1,ic:ic,Icirc:Icirc$1,icirc:icirc$1,Icy:Icy,icy:icy,Idot:Idot,IEcy:IEcy,iecy:iecy,iexcl:iexcl$1,iff:iff,ifr:ifr,Ifr:Ifr,Igrave:Igrave$1,igrave:igrave$1,ii:ii,iiiint:iiiint,iiint:iiint,iinfin:iinfin,iiota:iiota,IJlig:IJlig,ijlig:ijlig,Imacr:Imacr,imacr:imacr,image:image,ImaginaryI:ImaginaryI,imagline:imagline,imagpart:imagpart,imath:imath,Im:Im,imof:imof,imped:imped,Implies:Implies,incare:incare,"in":"∈",infin:infin,infintie:infintie,inodot:inodot,intcal:intcal,int:int,Int:Int,integers:integers,Integral:Integral,intercal:intercal,Intersection:Intersection,intlarhk:intlarhk,intprod:intprod,InvisibleComma:InvisibleComma,InvisibleTimes:InvisibleTimes,IOcy:IOcy,iocy:iocy,Iogon:Iogon,iogon:iogon,Iopf:Iopf,iopf:iopf,Iota:Iota,iota:iota,iprod:iprod,iquest:iquest$1,iscr:iscr,Iscr:Iscr,isin:isin,isindot:isindot,isinE:isinE,isins:isins,isinsv:isinsv,isinv:isinv,it:it,Itilde:Itilde,itilde:itilde,Iukcy:Iukcy,iukcy:iukcy,Iuml:Iuml$1,iuml:iuml$1,Jcirc:Jcirc,jcirc:jcirc,Jcy:Jcy,jcy:jcy,Jfr:Jfr,jfr:jfr,jmath:jmath,Jopf:Jopf,jopf:jopf,Jscr:Jscr,jscr:jscr,Jsercy:Jsercy,jsercy:jsercy,Jukcy:Jukcy,jukcy:jukcy,Kappa:Kappa,kappa:kappa,kappav:kappav,Kcedil:Kcedil,kcedil:kcedil,Kcy:Kcy,kcy:kcy,Kfr:Kfr,kfr:kfr,kgreen:kgreen,KHcy:KHcy,khcy:khcy,KJcy:KJcy,kjcy:kjcy,Kopf:Kopf,kopf:kopf,Kscr:Kscr,kscr:kscr,lAarr:lAarr,Lacute:Lacute,lacute:lacute,laemptyv:laemptyv,lagran:lagran,Lambda:Lambda,lambda:lambda,lang:lang,Lang:Lang,langd:langd,langle:langle,lap:lap,Laplacetrf:Laplacetrf,laquo:laquo$1,larrb:larrb,larrbfs:larrbfs,larr:larr,Larr:Larr,lArr:lArr,larrfs:larrfs,larrhk:larrhk,larrlp:larrlp,larrpl:larrpl,larrsim:larrsim,larrtl:larrtl,latail:latail,lAtail:lAtail,lat:lat,late:late,lates:lates,lbarr:lbarr,lBarr:lBarr,lbbrk:lbbrk,lbrace:lbrace,lbrack:lbrack,lbrke:lbrke,lbrksld:lbrksld,lbrkslu:lbrkslu,Lcaron:Lcaron,lcaron:lcaron,Lcedil:Lcedil,lcedil:lcedil,lceil:lceil,lcub:lcub,Lcy:Lcy,lcy:lcy,ldca:ldca,ldquo:ldquo,ldquor:ldquor,ldrdhar:ldrdhar,ldrushar:ldrushar,ldsh:ldsh,le:le,lE:lE,LeftAngleBracket:LeftAngleBracket,LeftArrowBar:LeftArrowBar,leftarrow:leftarrow,LeftArrow:LeftArrow,Leftarrow:Leftarrow,LeftArrowRightArrow:LeftArrowRightArrow,leftarrowtail:leftarrowtail,LeftCeiling:LeftCeiling,LeftDoubleBracket:LeftDoubleBracket,LeftDownTeeVector:LeftDownTeeVector,LeftDownVectorBar:LeftDownVectorBar,LeftDownVector:LeftDownVector,LeftFloor:LeftFloor,leftharpoondown:leftharpoondown,leftharpoonup:leftharpoonup,leftleftarrows:leftleftarrows,leftrightarrow:leftrightarrow,LeftRightArrow:LeftRightArrow,Leftrightarrow:Leftrightarrow,leftrightarrows:leftrightarrows,leftrightharpoons:leftrightharpoons,leftrightsquigarrow:leftrightsquigarrow,LeftRightVector:LeftRightVector,LeftTeeArrow:LeftTeeArrow,LeftTee:LeftTee,LeftTeeVector:LeftTeeVector,leftthreetimes:leftthreetimes,LeftTriangleBar:LeftTriangleBar,LeftTriangle:LeftTriangle,LeftTriangleEqual:LeftTriangleEqual,LeftUpDownVector:LeftUpDownVector,LeftUpTeeVector:LeftUpTeeVector,LeftUpVectorBar:LeftUpVectorBar,LeftUpVector:LeftUpVector,LeftVectorBar:LeftVectorBar,LeftVector:LeftVector,lEg:lEg,leg:leg,leq:leq,leqq:leqq,leqslant:leqslant,lescc:lescc,les:les,lesdot:lesdot,lesdoto:lesdoto,lesdotor:lesdotor,lesg:lesg,lesges:lesges,lessapprox:lessapprox,lessdot:lessdot,lesseqgtr:lesseqgtr,lesseqqgtr:lesseqqgtr,LessEqualGreater:LessEqualGreater,LessFullEqual:LessFullEqual,LessGreater:LessGreater,lessgtr:lessgtr,LessLess:LessLess,lesssim:lesssim,LessSlantEqual:LessSlantEqual,LessTilde:LessTilde,lfisht:lfisht,lfloor:lfloor,Lfr:Lfr,lfr:lfr,lg:lg,lgE:lgE,lHar:lHar,lhard:lhard,lharu:lharu,lharul:lharul,lhblk:lhblk,LJcy:LJcy,ljcy:ljcy,llarr:llarr,ll:ll,Ll:Ll,llcorner:llcorner,Lleftarrow:Lleftarrow,llhard:llhard,lltri:lltri,Lmidot:Lmidot,lmidot:lmidot,lmoustache:lmoustache,lmoust:lmoust,lnap:lnap,lnapprox:lnapprox,lne:lne,lnE:lnE,lneq:lneq,lneqq:lneqq,lnsim:lnsim,loang:loang,loarr:loarr,lobrk:lobrk,longleftarrow:longleftarrow,LongLeftArrow:LongLeftArrow,Longleftarrow:Longleftarrow,longleftrightarrow:longleftrightarrow,LongLeftRightArrow:LongLeftRightArrow,Longleftrightarrow:Longleftrightarrow,longmapsto:longmapsto,longrightarrow:longrightarrow,LongRightArrow:LongRightArrow,Longrightarrow:Longrightarrow,looparrowleft:looparrowleft,looparrowright:looparrowright,lopar:lopar,Lopf:Lopf,lopf:lopf,loplus:loplus,lotimes:lotimes,lowast:lowast,lowbar:lowbar,LowerLeftArrow:LowerLeftArrow,LowerRightArrow:LowerRightArrow,loz:loz,lozenge:lozenge,lozf:lozf,lpar:lpar,lparlt:lparlt,lrarr:lrarr,lrcorner:lrcorner,lrhar:lrhar,lrhard:lrhard,lrm:lrm,lrtri:lrtri,lsaquo:lsaquo,lscr:lscr,Lscr:Lscr,lsh:lsh,Lsh:Lsh,lsim:lsim,lsime:lsime,lsimg:lsimg,lsqb:lsqb,lsquo:lsquo,lsquor:lsquor,Lstrok:Lstrok,lstrok:lstrok,ltcc:ltcc,ltcir:ltcir,lt:lt$2,LT:LT$1,Lt:Lt,ltdot:ltdot,lthree:lthree,ltimes:ltimes,ltlarr:ltlarr,ltquest:ltquest,ltri:ltri,ltrie:ltrie,ltrif:ltrif,ltrPar:ltrPar,lurdshar:lurdshar,luruhar:luruhar,lvertneqq:lvertneqq,lvnE:lvnE,macr:macr$1,male:male,malt:malt,maltese:maltese,"Map":"⤅",map:map,mapsto:mapsto,mapstodown:mapstodown,mapstoleft:mapstoleft,mapstoup:mapstoup,marker:marker,mcomma:mcomma,Mcy:Mcy,mcy:mcy,mdash:mdash,mDDot:mDDot,measuredangle:measuredangle,MediumSpace:MediumSpace,Mellintrf:Mellintrf,Mfr:Mfr,mfr:mfr,mho:mho,micro:micro$1,midast:midast,midcir:midcir,mid:mid,middot:middot$1,minusb:minusb,minus:minus,minusd:minusd,minusdu:minusdu,MinusPlus:MinusPlus,mlcp:mlcp,mldr:mldr,mnplus:mnplus,models:models,Mopf:Mopf,mopf:mopf,mp:mp,mscr:mscr,Mscr:Mscr,mstpos:mstpos,Mu:Mu,mu:mu,multimap:multimap,mumap:mumap,nabla:nabla,Nacute:Nacute,nacute:nacute,nang:nang,nap:nap,napE:napE,napid:napid,napos:napos,napprox:napprox,natural:natural,naturals:naturals,natur:natur,nbsp:nbsp$1,nbump:nbump,nbumpe:nbumpe,ncap:ncap,Ncaron:Ncaron,ncaron:ncaron,Ncedil:Ncedil,ncedil:ncedil,ncong:ncong,ncongdot:ncongdot,ncup:ncup,Ncy:Ncy,ncy:ncy,ndash:ndash,nearhk:nearhk,nearr:nearr,neArr:neArr,nearrow:nearrow,ne:ne,nedot:nedot,NegativeMediumSpace:NegativeMediumSpace,NegativeThickSpace:NegativeThickSpace,NegativeThinSpace:NegativeThinSpace,NegativeVeryThinSpace:NegativeVeryThinSpace,nequiv:nequiv,nesear:nesear,nesim:nesim,NestedGreaterGreater:NestedGreaterGreater,NestedLessLess:NestedLessLess,NewLine:NewLine,nexist:nexist,nexists:nexists,Nfr:Nfr,nfr:nfr,ngE:ngE,nge:nge,ngeq:ngeq,ngeqq:ngeqq,ngeqslant:ngeqslant,nges:nges,nGg:nGg,ngsim:ngsim,nGt:nGt,ngt:ngt,ngtr:ngtr,nGtv:nGtv,nharr:nharr,nhArr:nhArr,nhpar:nhpar,ni:ni,nis:nis,nisd:nisd,niv:niv,NJcy:NJcy,njcy:njcy,nlarr:nlarr,nlArr:nlArr,nldr:nldr,nlE:nlE,nle:nle,nleftarrow:nleftarrow,nLeftarrow:nLeftarrow,nleftrightarrow:nleftrightarrow,nLeftrightarrow:nLeftrightarrow,nleq:nleq,nleqq:nleqq,nleqslant:nleqslant,nles:nles,nless:nless,nLl:nLl,nlsim:nlsim,nLt:nLt,nlt:nlt,nltri:nltri,nltrie:nltrie,nLtv:nLtv,nmid:nmid,NoBreak:NoBreak,NonBreakingSpace:NonBreakingSpace,nopf:nopf,Nopf:Nopf,Not:Not,not:not$1,NotCongruent:NotCongruent,NotCupCap:NotCupCap,NotDoubleVerticalBar:NotDoubleVerticalBar,NotElement:NotElement,NotEqual:NotEqual,NotEqualTilde:NotEqualTilde,NotExists:NotExists,NotGreater:NotGreater,NotGreaterEqual:NotGreaterEqual,NotGreaterFullEqual:NotGreaterFullEqual,NotGreaterGreater:NotGreaterGreater,NotGreaterLess:NotGreaterLess,NotGreaterSlantEqual:NotGreaterSlantEqual,NotGreaterTilde:NotGreaterTilde,NotHumpDownHump:NotHumpDownHump,NotHumpEqual:NotHumpEqual,notin:notin,notindot:notindot,notinE:notinE,notinva:notinva,notinvb:notinvb,notinvc:notinvc,NotLeftTriangleBar:NotLeftTriangleBar,NotLeftTriangle:NotLeftTriangle,NotLeftTriangleEqual:NotLeftTriangleEqual,NotLess:NotLess,NotLessEqual:NotLessEqual,NotLessGreater:NotLessGreater,NotLessLess:NotLessLess,NotLessSlantEqual:NotLessSlantEqual,NotLessTilde:NotLessTilde,NotNestedGreaterGreater:NotNestedGreaterGreater,NotNestedLessLess:NotNestedLessLess,notni:notni,notniva:notniva,notnivb:notnivb,notnivc:notnivc,NotPrecedes:NotPrecedes,NotPrecedesEqual:NotPrecedesEqual,NotPrecedesSlantEqual:NotPrecedesSlantEqual,NotReverseElement:NotReverseElement,NotRightTriangleBar:NotRightTriangleBar,NotRightTriangle:NotRightTriangle,NotRightTriangleEqual:NotRightTriangleEqual,NotSquareSubset:NotSquareSubset,NotSquareSubsetEqual:NotSquareSubsetEqual,NotSquareSuperset:NotSquareSuperset,NotSquareSupersetEqual:NotSquareSupersetEqual,NotSubset:NotSubset,NotSubsetEqual:NotSubsetEqual,NotSucceeds:NotSucceeds,NotSucceedsEqual:NotSucceedsEqual,NotSucceedsSlantEqual:NotSucceedsSlantEqual,NotSucceedsTilde:NotSucceedsTilde,NotSuperset:NotSuperset,NotSupersetEqual:NotSupersetEqual,NotTilde:NotTilde,NotTildeEqual:NotTildeEqual,NotTildeFullEqual:NotTildeFullEqual,NotTildeTilde:NotTildeTilde,NotVerticalBar:NotVerticalBar,nparallel:nparallel,npar:npar,nparsl:nparsl,npart:npart,npolint:npolint,npr:npr,nprcue:nprcue,nprec:nprec,npreceq:npreceq,npre:npre,nrarrc:nrarrc,nrarr:nrarr,nrArr:nrArr,nrarrw:nrarrw,nrightarrow:nrightarrow,nRightarrow:nRightarrow,nrtri:nrtri,nrtrie:nrtrie,nsc:nsc,nsccue:nsccue,nsce:nsce,Nscr:Nscr,nscr:nscr,nshortmid:nshortmid,nshortparallel:nshortparallel,nsim:nsim,nsime:nsime,nsimeq:nsimeq,nsmid:nsmid,nspar:nspar,nsqsube:nsqsube,nsqsupe:nsqsupe,nsub:nsub,nsubE:nsubE,nsube:nsube,nsubset:nsubset,nsubseteq:nsubseteq,nsubseteqq:nsubseteqq,nsucc:nsucc,nsucceq:nsucceq,nsup:nsup,nsupE:nsupE,nsupe:nsupe,nsupset:nsupset,nsupseteq:nsupseteq,nsupseteqq:nsupseteqq,ntgl:ntgl,Ntilde:Ntilde$1,ntilde:ntilde$1,ntlg:ntlg,ntriangleleft:ntriangleleft,ntrianglelefteq:ntrianglelefteq,ntriangleright:ntriangleright,ntrianglerighteq:ntrianglerighteq,Nu:Nu,nu:nu,num:num,numero:numero,numsp:numsp,nvap:nvap,nvdash:nvdash,nvDash:nvDash,nVdash:nVdash,nVDash:nVDash,nvge:nvge,nvgt:nvgt,nvHarr:nvHarr,nvinfin:nvinfin,nvlArr:nvlArr,nvle:nvle,nvlt:nvlt,nvltrie:nvltrie,nvrArr:nvrArr,nvrtrie:nvrtrie,nvsim:nvsim,nwarhk:nwarhk,nwarr:nwarr,nwArr:nwArr,nwarrow:nwarrow,nwnear:nwnear,Oacute:Oacute$1,oacute:oacute$1,oast:oast,Ocirc:Ocirc$1,ocirc:ocirc$1,ocir:ocir,Ocy:Ocy,ocy:ocy,odash:odash,Odblac:Odblac,odblac:odblac,odiv:odiv,odot:odot,odsold:odsold,OElig:OElig,oelig:oelig,ofcir:ofcir,Ofr:Ofr,ofr:ofr,ogon:ogon,Ograve:Ograve$1,ograve:ograve$1,ogt:ogt,ohbar:ohbar,ohm:ohm,oint:oint,olarr:olarr,olcir:olcir,olcross:olcross,oline:oline,olt:olt,Omacr:Omacr,omacr:omacr,Omega:Omega,omega:omega,Omicron:Omicron,omicron:omicron,omid:omid,ominus:ominus,Oopf:Oopf,oopf:oopf,opar:opar,OpenCurlyDoubleQuote:OpenCurlyDoubleQuote,OpenCurlyQuote:OpenCurlyQuote,operp:operp,oplus:oplus,orarr:orarr,Or:Or,or:or,ord:ord,order:order,orderof:orderof,ordf:ordf$1,ordm:ordm$1,origof:origof,oror:oror,orslope:orslope,orv:orv,oS:oS,Oscr:Oscr,oscr:oscr,Oslash:Oslash$1,oslash:oslash$1,osol:osol,Otilde:Otilde$1,otilde:otilde$1,otimesas:otimesas,Otimes:Otimes,otimes:otimes,Ouml:Ouml$1,ouml:ouml$1,ovbar:ovbar,OverBar:OverBar,OverBrace:OverBrace,OverBracket:OverBracket,OverParenthesis:OverParenthesis,para:para$1,parallel:parallel,par:par,parsim:parsim,parsl:parsl,part:part,PartialD:PartialD,Pcy:Pcy,pcy:pcy,percnt:percnt,period:period,permil:permil,perp:perp,pertenk:pertenk,Pfr:Pfr,pfr:pfr,Phi:Phi,phi:phi,phiv:phiv,phmmat:phmmat,phone:phone,Pi:Pi,pi:pi,pitchfork:pitchfork,piv:piv,planck:planck,planckh:planckh,plankv:plankv,plusacir:plusacir,plusb:plusb,pluscir:pluscir,plus:plus,plusdo:plusdo,plusdu:plusdu,pluse:pluse,PlusMinus:PlusMinus,plusmn:plusmn$1,plussim:plussim,plustwo:plustwo,pm:pm,Poincareplane:Poincareplane,pointint:pointint,popf:popf,Popf:Popf,pound:pound$1,prap:prap,Pr:Pr,pr:pr,prcue:prcue,precapprox:precapprox,prec:prec,preccurlyeq:preccurlyeq,Precedes:Precedes,PrecedesEqual:PrecedesEqual,PrecedesSlantEqual:PrecedesSlantEqual,PrecedesTilde:PrecedesTilde,preceq:preceq,precnapprox:precnapprox,precneqq:precneqq,precnsim:precnsim,pre:pre,prE:prE,precsim:precsim,prime:prime,Prime:Prime,primes:primes,prnap:prnap,prnE:prnE,prnsim:prnsim,prod:prod,Product:Product,profalar:profalar,profline:profline,profsurf:profsurf,prop:prop,Proportional:Proportional,Proportion:Proportion,propto:propto,prsim:prsim,prurel:prurel,Pscr:Pscr,pscr:pscr,Psi:Psi,psi:psi,puncsp:puncsp,Qfr:Qfr,qfr:qfr,qint:qint,qopf:qopf,Qopf:Qopf,qprime:qprime,Qscr:Qscr,qscr:qscr,quaternions:quaternions,quatint:quatint,quest:quest,questeq:questeq,quot:quot$2,QUOT:QUOT$1,rAarr:rAarr,race:race,Racute:Racute,racute:racute,radic:radic,raemptyv:raemptyv,rang:rang,Rang:Rang,rangd:rangd,range:range,rangle:rangle,raquo:raquo$1,rarrap:rarrap,rarrb:rarrb,rarrbfs:rarrbfs,rarrc:rarrc,rarr:rarr,Rarr:Rarr,rArr:rArr,rarrfs:rarrfs,rarrhk:rarrhk,rarrlp:rarrlp,rarrpl:rarrpl,rarrsim:rarrsim,Rarrtl:Rarrtl,rarrtl:rarrtl,rarrw:rarrw,ratail:ratail,rAtail:rAtail,ratio:ratio,rationals:rationals,rbarr:rbarr,rBarr:rBarr,RBarr:RBarr,rbbrk:rbbrk,rbrace:rbrace,rbrack:rbrack,rbrke:rbrke,rbrksld:rbrksld,rbrkslu:rbrkslu,Rcaron:Rcaron,rcaron:rcaron,Rcedil:Rcedil,rcedil:rcedil,rceil:rceil,rcub:rcub,Rcy:Rcy,rcy:rcy,rdca:rdca,rdldhar:rdldhar,rdquo:rdquo,rdquor:rdquor,rdsh:rdsh,real:real,realine:realine,realpart:realpart,reals:reals,Re:Re,rect:rect,reg:reg$1,REG:REG$1,ReverseElement:ReverseElement,ReverseEquilibrium:ReverseEquilibrium,ReverseUpEquilibrium:ReverseUpEquilibrium,rfisht:rfisht,rfloor:rfloor,rfr:rfr,Rfr:Rfr,rHar:rHar,rhard:rhard,rharu:rharu,rharul:rharul,Rho:Rho,rho:rho,rhov:rhov,RightAngleBracket:RightAngleBracket,RightArrowBar:RightArrowBar,rightarrow:rightarrow,RightArrow:RightArrow,Rightarrow:Rightarrow,RightArrowLeftArrow:RightArrowLeftArrow,rightarrowtail:rightarrowtail,RightCeiling:RightCeiling,RightDoubleBracket:RightDoubleBracket,RightDownTeeVector:RightDownTeeVector,RightDownVectorBar:RightDownVectorBar,RightDownVector:RightDownVector,RightFloor:RightFloor,rightharpoondown:rightharpoondown,rightharpoonup:rightharpoonup,rightleftarrows:rightleftarrows,rightleftharpoons:rightleftharpoons,rightrightarrows:rightrightarrows,rightsquigarrow:rightsquigarrow,RightTeeArrow:RightTeeArrow,RightTee:RightTee,RightTeeVector:RightTeeVector,rightthreetimes:rightthreetimes,RightTriangleBar:RightTriangleBar,RightTriangle:RightTriangle,RightTriangleEqual:RightTriangleEqual,RightUpDownVector:RightUpDownVector,RightUpTeeVector:RightUpTeeVector,RightUpVectorBar:RightUpVectorBar,RightUpVector:RightUpVector,RightVectorBar:RightVectorBar,RightVector:RightVector,ring:ring,risingdotseq:risingdotseq,rlarr:rlarr,rlhar:rlhar,rlm:rlm,rmoustache:rmoustache,rmoust:rmoust,rnmid:rnmid,roang:roang,roarr:roarr,robrk:robrk,ropar:ropar,ropf:ropf,Ropf:Ropf,roplus:roplus,rotimes:rotimes,RoundImplies:RoundImplies,rpar:rpar,rpargt:rpargt,rppolint:rppolint,rrarr:rrarr,Rrightarrow:Rrightarrow,rsaquo:rsaquo,rscr:rscr,Rscr:Rscr,rsh:rsh,Rsh:Rsh,rsqb:rsqb,rsquo:rsquo,rsquor:rsquor,rthree:rthree,rtimes:rtimes,rtri:rtri,rtrie:rtrie,rtrif:rtrif,rtriltri:rtriltri,RuleDelayed:RuleDelayed,ruluhar:ruluhar,rx:rx,Sacute:Sacute,sacute:sacute,sbquo:sbquo,scap:scap,Scaron:Scaron,scaron:scaron,Sc:Sc,sc:sc,sccue:sccue,sce:sce,scE:scE,Scedil:Scedil,scedil:scedil,Scirc:Scirc,scirc:scirc,scnap:scnap,scnE:scnE,scnsim:scnsim,scpolint:scpolint,scsim:scsim,Scy:Scy,scy:scy,sdotb:sdotb,sdot:sdot,sdote:sdote,searhk:searhk,searr:searr,seArr:seArr,searrow:searrow,sect:sect$1,semi:semi,seswar:seswar,setminus:setminus,setmn:setmn,sext:sext,Sfr:Sfr,sfr:sfr,sfrown:sfrown,sharp:sharp,SHCHcy:SHCHcy,shchcy:shchcy,SHcy:SHcy,shcy:shcy,ShortDownArrow:ShortDownArrow,ShortLeftArrow:ShortLeftArrow,shortmid:shortmid,shortparallel:shortparallel,ShortRightArrow:ShortRightArrow,ShortUpArrow:ShortUpArrow,shy:shy$1,Sigma:Sigma,sigma:sigma,sigmaf:sigmaf,sigmav:sigmav,sim:sim,simdot:simdot,sime:sime,simeq:simeq,simg:simg,simgE:simgE,siml:siml,simlE:simlE,simne:simne,simplus:simplus,simrarr:simrarr,slarr:slarr,SmallCircle:SmallCircle,smallsetminus:smallsetminus,smashp:smashp,smeparsl:smeparsl,smid:smid,smile:smile,smt:smt,smte:smte,smtes:smtes,SOFTcy:SOFTcy,softcy:softcy,solbar:solbar,solb:solb,sol:sol,Sopf:Sopf,sopf:sopf,spades:spades,spadesuit:spadesuit,spar:spar,sqcap:sqcap,sqcaps:sqcaps,sqcup:sqcup,sqcups:sqcups,Sqrt:Sqrt,sqsub:sqsub,sqsube:sqsube,sqsubset:sqsubset,sqsubseteq:sqsubseteq,sqsup:sqsup,sqsupe:sqsupe,sqsupset:sqsupset,sqsupseteq:sqsupseteq,square:square,Square:Square,SquareIntersection:SquareIntersection,SquareSubset:SquareSubset,SquareSubsetEqual:SquareSubsetEqual,SquareSuperset:SquareSuperset,SquareSupersetEqual:SquareSupersetEqual,SquareUnion:SquareUnion,squarf:squarf,squ:squ,squf:squf,srarr:srarr,Sscr:Sscr,sscr:sscr,ssetmn:ssetmn,ssmile:ssmile,sstarf:sstarf,Star:Star,star:star,starf:starf,straightepsilon:straightepsilon,straightphi:straightphi,strns:strns,sub:sub,Sub:Sub,subdot:subdot,subE:subE,sube:sube,subedot:subedot,submult:submult,subnE:subnE,subne:subne,subplus:subplus,subrarr:subrarr,subset:subset,Subset:Subset,subseteq:subseteq,subseteqq:subseteqq,SubsetEqual:SubsetEqual,subsetneq:subsetneq,subsetneqq:subsetneqq,subsim:subsim,subsub:subsub,subsup:subsup,succapprox:succapprox,succ:succ,succcurlyeq:succcurlyeq,Succeeds:Succeeds,SucceedsEqual:SucceedsEqual,SucceedsSlantEqual:SucceedsSlantEqual,SucceedsTilde:SucceedsTilde,succeq:succeq,succnapprox:succnapprox,succneqq:succneqq,succnsim:succnsim,succsim:succsim,SuchThat:SuchThat,sum:sum,Sum:Sum,sung:sung,sup1:sup1$1,sup2:sup2$1,sup3:sup3$1,sup:sup,Sup:Sup,supdot:supdot,supdsub:supdsub,supE:supE,supe:supe,supedot:supedot,Superset:Superset,SupersetEqual:SupersetEqual,suphsol:suphsol,suphsub:suphsub,suplarr:suplarr,supmult:supmult,supnE:supnE,supne:supne,supplus:supplus,supset:supset,Supset:Supset,supseteq:supseteq,supseteqq:supseteqq,supsetneq:supsetneq,supsetneqq:supsetneqq,supsim:supsim,supsub:supsub,supsup:supsup,swarhk:swarhk,swarr:swarr,swArr:swArr,swarrow:swarrow,swnwar:swnwar,szlig:szlig$1,Tab:Tab,target:target,Tau:Tau,tau:tau,tbrk:tbrk,Tcaron:Tcaron,tcaron:tcaron,Tcedil:Tcedil,tcedil:tcedil,Tcy:Tcy,tcy:tcy,tdot:tdot,telrec:telrec,Tfr:Tfr,tfr:tfr,there4:there4,therefore:therefore,Therefore:Therefore,Theta:Theta,theta:theta,thetasym:thetasym,thetav:thetav,thickapprox:thickapprox,thicksim:thicksim,ThickSpace:ThickSpace,ThinSpace:ThinSpace,thinsp:thinsp,thkap:thkap,thksim:thksim,THORN:THORN$1,thorn:thorn$1,tilde:tilde,Tilde:Tilde,TildeEqual:TildeEqual,TildeFullEqual:TildeFullEqual,TildeTilde:TildeTilde,timesbar:timesbar,timesb:timesb,times:times$1,timesd:timesd,tint:tint,toea:toea,topbot:topbot,topcir:topcir,top:top,Topf:Topf,topf:topf,topfork:topfork,tosa:tosa,tprime:tprime,trade:trade,TRADE:TRADE,triangle:triangle,triangledown:triangledown,triangleleft:triangleleft,trianglelefteq:trianglelefteq,triangleq:triangleq,triangleright:triangleright,trianglerighteq:trianglerighteq,tridot:tridot,trie:trie,triminus:triminus,TripleDot:TripleDot,triplus:triplus,trisb:trisb,tritime:tritime,trpezium:trpezium,Tscr:Tscr,tscr:tscr,TScy:TScy,tscy:tscy,TSHcy:TSHcy,tshcy:tshcy,Tstrok:Tstrok,tstrok:tstrok,twixt:twixt,twoheadleftarrow:twoheadleftarrow,twoheadrightarrow:twoheadrightarrow,Uacute:Uacute$1,uacute:uacute$1,uarr:uarr,Uarr:Uarr,uArr:uArr,Uarrocir:Uarrocir,Ubrcy:Ubrcy,ubrcy:ubrcy,Ubreve:Ubreve,ubreve:ubreve,Ucirc:Ucirc$1,ucirc:ucirc$1,Ucy:Ucy,ucy:ucy,udarr:udarr,Udblac:Udblac,udblac:udblac,udhar:udhar,ufisht:ufisht,Ufr:Ufr,ufr:ufr,Ugrave:Ugrave$1,ugrave:ugrave$1,uHar:uHar,uharl:uharl,uharr:uharr,uhblk:uhblk,ulcorn:ulcorn,ulcorner:ulcorner,ulcrop:ulcrop,ultri:ultri,Umacr:Umacr,umacr:umacr,uml:uml$1,UnderBar:UnderBar,UnderBrace:UnderBrace,UnderBracket:UnderBracket,UnderParenthesis:UnderParenthesis,Union:Union,UnionPlus:UnionPlus,Uogon:Uogon,uogon:uogon,Uopf:Uopf,uopf:uopf,UpArrowBar:UpArrowBar,uparrow:uparrow,UpArrow:UpArrow,Uparrow:Uparrow,UpArrowDownArrow:UpArrowDownArrow,updownarrow:updownarrow,UpDownArrow:UpDownArrow,Updownarrow:Updownarrow,UpEquilibrium:UpEquilibrium,upharpoonleft:upharpoonleft,upharpoonright:upharpoonright,uplus:uplus,UpperLeftArrow:UpperLeftArrow,UpperRightArrow:UpperRightArrow,upsi:upsi,Upsi:Upsi,upsih:upsih,Upsilon:Upsilon,upsilon:upsilon,UpTeeArrow:UpTeeArrow,UpTee:UpTee,upuparrows:upuparrows,urcorn:urcorn,urcorner:urcorner,urcrop:urcrop,Uring:Uring,uring:uring,urtri:urtri,Uscr:Uscr,uscr:uscr,utdot:utdot,Utilde:Utilde,utilde:utilde,utri:utri,utrif:utrif,uuarr:uuarr,Uuml:Uuml$1,uuml:uuml$1,uwangle:uwangle,vangrt:vangrt,varepsilon:varepsilon,varkappa:varkappa,varnothing:varnothing,varphi:varphi,varpi:varpi,varpropto:varpropto,varr:varr,vArr:vArr,varrho:varrho,varsigma:varsigma,varsubsetneq:varsubsetneq,varsubsetneqq:varsubsetneqq,varsupsetneq:varsupsetneq,varsupsetneqq:varsupsetneqq,vartheta:vartheta,vartriangleleft:vartriangleleft,vartriangleright:vartriangleright,vBar:vBar,Vbar:Vbar,vBarv:vBarv,Vcy:Vcy,vcy:vcy,vdash:vdash,vDash:vDash,Vdash:Vdash,VDash:VDash,Vdashl:Vdashl,veebar:veebar,vee:vee,Vee:Vee,veeeq:veeeq,vellip:vellip,verbar:verbar,Verbar:Verbar,vert:vert,Vert:Vert,VerticalBar:VerticalBar,VerticalLine:VerticalLine,VerticalSeparator:VerticalSeparator,VerticalTilde:VerticalTilde,VeryThinSpace:VeryThinSpace,Vfr:Vfr,vfr:vfr,vltri:vltri,vnsub:vnsub,vnsup:vnsup,Vopf:Vopf,vopf:vopf,vprop:vprop,vrtri:vrtri,Vscr:Vscr,vscr:vscr,vsubnE:vsubnE,vsubne:vsubne,vsupnE:vsupnE,vsupne:vsupne,Vvdash:Vvdash,vzigzag:vzigzag,Wcirc:Wcirc,wcirc:wcirc,wedbar:wedbar,wedge:wedge,Wedge:Wedge,wedgeq:wedgeq,weierp:weierp,Wfr:Wfr,wfr:wfr,Wopf:Wopf,wopf:wopf,wp:wp,wr:wr,wreath:wreath,Wscr:Wscr,wscr:wscr,xcap:xcap,xcirc:xcirc,xcup:xcup,xdtri:xdtri,Xfr:Xfr,xfr:xfr,xharr:xharr,xhArr:xhArr,Xi:Xi,xi:xi,xlarr:xlarr,xlArr:xlArr,xmap:xmap,xnis:xnis,xodot:xodot,Xopf:Xopf,xopf:xopf,xoplus:xoplus,xotime:xotime,xrarr:xrarr,xrArr:xrArr,Xscr:Xscr,xscr:xscr,xsqcup:xsqcup,xuplus:xuplus,xutri:xutri,xvee:xvee,xwedge:xwedge,Yacute:Yacute$1,yacute:yacute$1,YAcy:YAcy,yacy:yacy,Ycirc:Ycirc,ycirc:ycirc,Ycy:Ycy,ycy:ycy,yen:yen$1,Yfr:Yfr,yfr:yfr,YIcy:YIcy,yicy:yicy,Yopf:Yopf,yopf:yopf,Yscr:Yscr,yscr:yscr,YUcy:YUcy,yucy:yucy,yuml:yuml$1,Yuml:Yuml,Zacute:Zacute,zacute:zacute,Zcaron:Zcaron,zcaron:zcaron,Zcy:Zcy,zcy:zcy,Zdot:Zdot,zdot:zdot,zeetrf:zeetrf,ZeroWidthSpace:ZeroWidthSpace,Zeta:Zeta,zeta:zeta,zfr:zfr,Zfr:Zfr,ZHcy:ZHcy,zhcy:zhcy,zigrarr:zigrarr,zopf:zopf,Zopf:Zopf,Zscr:Zscr,zscr:zscr,zwj:zwj,zwnj:zwnj};

	var Aacute="Á";var aacute="á";var Acirc="Â";var acirc="â";var acute="´";var AElig="Æ";var aelig="æ";var Agrave="À";var agrave="à";var amp$1="&";var AMP="&";var Aring="Å";var aring="å";var Atilde="Ã";var atilde="ã";var Auml="Ä";var auml="ä";var brvbar="¦";var Ccedil="Ç";var ccedil="ç";var cedil="¸";var cent="¢";var copy="©";var COPY="©";var curren="¤";var deg="°";var divide="÷";var Eacute="É";var eacute="é";var Ecirc="Ê";var ecirc="ê";var Egrave="È";var egrave="è";var ETH="Ð";var eth="ð";var Euml="Ë";var euml="ë";var frac12="½";var frac14="¼";var frac34="¾";var gt$1=">";var GT=">";var Iacute="Í";var iacute="í";var Icirc="Î";var icirc="î";var iexcl="¡";var Igrave="Ì";var igrave="ì";var iquest="¿";var Iuml="Ï";var iuml="ï";var laquo="«";var lt$1="<";var LT="<";var macr="¯";var micro="µ";var middot="·";var nbsp=" ";var not="¬";var Ntilde="Ñ";var ntilde="ñ";var Oacute="Ó";var oacute="ó";var Ocirc="Ô";var ocirc="ô";var Ograve="Ò";var ograve="ò";var ordf="ª";var ordm="º";var Oslash="Ø";var oslash="ø";var Otilde="Õ";var otilde="õ";var Ouml="Ö";var ouml="ö";var para="¶";var plusmn="±";var pound="£";var quot$1="\"";var QUOT="\"";var raquo="»";var reg="®";var REG="®";var sect="§";var shy="­";var sup1="¹";var sup2="²";var sup3="³";var szlig="ß";var THORN="Þ";var thorn="þ";var times="×";var Uacute="Ú";var uacute="ú";var Ucirc="Û";var ucirc="û";var Ugrave="Ù";var ugrave="ù";var uml="¨";var Uuml="Ü";var uuml="ü";var Yacute="Ý";var yacute="ý";var yen="¥";var yuml="ÿ";var require$$1 = {Aacute:Aacute,aacute:aacute,Acirc:Acirc,acirc:acirc,acute:acute,AElig:AElig,aelig:aelig,Agrave:Agrave,agrave:agrave,amp:amp$1,AMP:AMP,Aring:Aring,aring:aring,Atilde:Atilde,atilde:atilde,Auml:Auml,auml:auml,brvbar:brvbar,Ccedil:Ccedil,ccedil:ccedil,cedil:cedil,cent:cent,copy:copy,COPY:COPY,curren:curren,deg:deg,divide:divide,Eacute:Eacute,eacute:eacute,Ecirc:Ecirc,ecirc:ecirc,Egrave:Egrave,egrave:egrave,ETH:ETH,eth:eth,Euml:Euml,euml:euml,frac12:frac12,frac14:frac14,frac34:frac34,gt:gt$1,GT:GT,Iacute:Iacute,iacute:iacute,Icirc:Icirc,icirc:icirc,iexcl:iexcl,Igrave:Igrave,igrave:igrave,iquest:iquest,Iuml:Iuml,iuml:iuml,laquo:laquo,lt:lt$1,LT:LT,macr:macr,micro:micro,middot:middot,nbsp:nbsp,not:not,Ntilde:Ntilde,ntilde:ntilde,Oacute:Oacute,oacute:oacute,Ocirc:Ocirc,ocirc:ocirc,Ograve:Ograve,ograve:ograve,ordf:ordf,ordm:ordm,Oslash:Oslash,oslash:oslash,Otilde:Otilde,otilde:otilde,Ouml:Ouml,ouml:ouml,para:para,plusmn:plusmn,pound:pound,quot:quot$1,QUOT:QUOT,raquo:raquo,reg:reg,REG:REG,sect:sect,shy:shy,sup1:sup1,sup2:sup2,sup3:sup3,szlig:szlig,THORN:THORN,thorn:thorn,times:times,Uacute:Uacute,uacute:uacute,Ucirc:Ucirc,ucirc:ucirc,Ugrave:Ugrave,ugrave:ugrave,uml:uml,Uuml:Uuml,uuml:uuml,Yacute:Yacute,yacute:yacute,yen:yen,yuml:yuml};

	var amp="&";var apos="'";var gt=">";var lt="<";var quot="\"";var require$$0$1 = {amp:amp,apos:apos,gt:gt,lt:lt,quot:quot};

	var decode_codepoint = {};

	var require$$0 = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376};

	var __importDefault$7 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(decode_codepoint, "__esModule", { value: true });
	var decode_json_1 = __importDefault$7(require$$0);
	// Adapted from https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
	var fromCodePoint = 
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	String.fromCodePoint ||
	    function (codePoint) {
	        var output = "";
	        if (codePoint > 0xffff) {
	            codePoint -= 0x10000;
	            output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
	            codePoint = 0xdc00 | (codePoint & 0x3ff);
	        }
	        output += String.fromCharCode(codePoint);
	        return output;
	    };
	function decodeCodePoint(codePoint) {
	    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
	        return "\uFFFD";
	    }
	    if (codePoint in decode_json_1.default) {
	        codePoint = decode_json_1.default[codePoint];
	    }
	    return fromCodePoint(codePoint);
	}
	decode_codepoint.default = decodeCodePoint;

	var __importDefault$6 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(decode$1, "__esModule", { value: true });
	decode$1.decodeHTML = decode$1.decodeHTMLStrict = decode$1.decodeXML = void 0;
	var entities_json_1$1 = __importDefault$6(require$$1$1);
	var legacy_json_1 = __importDefault$6(require$$1);
	var xml_json_1$1 = __importDefault$6(require$$0$1);
	var decode_codepoint_1 = __importDefault$6(decode_codepoint);
	var strictEntityRe = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
	decode$1.decodeXML = getStrictDecoder(xml_json_1$1.default);
	decode$1.decodeHTMLStrict = getStrictDecoder(entities_json_1$1.default);
	function getStrictDecoder(map) {
	    var replace = getReplacer(map);
	    return function (str) { return String(str).replace(strictEntityRe, replace); };
	}
	var sorter = function (a, b) { return (a < b ? 1 : -1); };
	decode$1.decodeHTML = (function () {
	    var legacy = Object.keys(legacy_json_1.default).sort(sorter);
	    var keys = Object.keys(entities_json_1$1.default).sort(sorter);
	    for (var i = 0, j = 0; i < keys.length; i++) {
	        if (legacy[j] === keys[i]) {
	            keys[i] += ";?";
	            j++;
	        }
	        else {
	            keys[i] += ";";
	        }
	    }
	    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
	    var replace = getReplacer(entities_json_1$1.default);
	    function replacer(str) {
	        if (str.substr(-1) !== ";")
	            str += ";";
	        return replace(str);
	    }
	    // TODO consider creating a merged map
	    return function (str) { return String(str).replace(re, replacer); };
	})();
	function getReplacer(map) {
	    return function replace(str) {
	        if (str.charAt(1) === "#") {
	            var secondChar = str.charAt(2);
	            if (secondChar === "X" || secondChar === "x") {
	                return decode_codepoint_1.default(parseInt(str.substr(3), 16));
	            }
	            return decode_codepoint_1.default(parseInt(str.substr(2), 10));
	        }
	        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	        return map[str.slice(1, -1)] || str;
	    };
	}

	var encode = {};

	var __importDefault$5 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(encode, "__esModule", { value: true });
	encode.escapeUTF8 = encode.escape = encode.encodeNonAsciiHTML = encode.encodeHTML = encode.encodeXML = void 0;
	var xml_json_1 = __importDefault$5(require$$0$1);
	var inverseXML = getInverseObj(xml_json_1.default);
	var xmlReplacer = getInverseReplacer(inverseXML);
	/**
	 * Encodes all non-ASCII characters, as well as characters not valid in XML
	 * documents using XML entities.
	 *
	 * If a character has no equivalent entity, a
	 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
	 */
	encode.encodeXML = getASCIIEncoder(inverseXML);
	var entities_json_1 = __importDefault$5(require$$1$1);
	var inverseHTML = getInverseObj(entities_json_1.default);
	var htmlReplacer = getInverseReplacer(inverseHTML);
	/**
	 * Encodes all entities and non-ASCII characters in the input.
	 *
	 * This includes characters that are valid ASCII characters in HTML documents.
	 * For example `#` will be encoded as `&num;`. To get a more compact output,
	 * consider using the `encodeNonAsciiHTML` function.
	 *
	 * If a character has no equivalent entity, a
	 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
	 */
	encode.encodeHTML = getInverse(inverseHTML, htmlReplacer);
	/**
	 * Encodes all non-ASCII characters, as well as characters not valid in HTML
	 * documents using HTML entities.
	 *
	 * If a character has no equivalent entity, a
	 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
	 */
	encode.encodeNonAsciiHTML = getASCIIEncoder(inverseHTML);
	function getInverseObj(obj) {
	    return Object.keys(obj)
	        .sort()
	        .reduce(function (inverse, name) {
	        inverse[obj[name]] = "&" + name + ";";
	        return inverse;
	    }, {});
	}
	function getInverseReplacer(inverse) {
	    var single = [];
	    var multiple = [];
	    for (var _i = 0, _a = Object.keys(inverse); _i < _a.length; _i++) {
	        var k = _a[_i];
	        if (k.length === 1) {
	            // Add value to single array
	            single.push("\\" + k);
	        }
	        else {
	            // Add value to multiple array
	            multiple.push(k);
	        }
	    }
	    // Add ranges to single characters.
	    single.sort();
	    for (var start = 0; start < single.length - 1; start++) {
	        // Find the end of a run of characters
	        var end = start;
	        while (end < single.length - 1 &&
	            single[end].charCodeAt(1) + 1 === single[end + 1].charCodeAt(1)) {
	            end += 1;
	        }
	        var count = 1 + end - start;
	        // We want to replace at least three characters
	        if (count < 3)
	            continue;
	        single.splice(start, count, single[start] + "-" + single[end]);
	    }
	    multiple.unshift("[" + single.join("") + "]");
	    return new RegExp(multiple.join("|"), "g");
	}
	// /[^\0-\x7F]/gu
	var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
	var getCodePoint = 
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	String.prototype.codePointAt != null
	    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	        function (str) { return str.codePointAt(0); }
	    : // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	        function (c) {
	            return (c.charCodeAt(0) - 0xd800) * 0x400 +
	                c.charCodeAt(1) -
	                0xdc00 +
	                0x10000;
	        };
	function singleCharReplacer(c) {
	    return "&#x" + (c.length > 1 ? getCodePoint(c) : c.charCodeAt(0))
	        .toString(16)
	        .toUpperCase() + ";";
	}
	function getInverse(inverse, re) {
	    return function (data) {
	        return data
	            .replace(re, function (name) { return inverse[name]; })
	            .replace(reNonASCII, singleCharReplacer);
	    };
	}
	var reEscapeChars = new RegExp(xmlReplacer.source + "|" + reNonASCII.source, "g");
	/**
	 * Encodes all non-ASCII characters, as well as characters not valid in XML
	 * documents using numeric hexadecimal reference (eg. `&#xfc;`).
	 *
	 * Have a look at `escapeUTF8` if you want a more concise output at the expense
	 * of reduced transportability.
	 *
	 * @param data String to escape.
	 */
	function escape(data) {
	    return data.replace(reEscapeChars, singleCharReplacer);
	}
	encode.escape = escape;
	/**
	 * Encodes all characters not valid in XML documents using numeric hexadecimal
	 * reference (eg. `&#xfc;`).
	 *
	 * Note that the output will be character-set dependent.
	 *
	 * @param data String to escape.
	 */
	function escapeUTF8(data) {
	    return data.replace(xmlReplacer, singleCharReplacer);
	}
	encode.escapeUTF8 = escapeUTF8;
	function getASCIIEncoder(obj) {
	    return function (data) {
	        return data.replace(reEscapeChars, function (c) { return obj[c] || singleCharReplacer(c); });
	    };
	}

	(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.encodeHTML5 = exports.encodeHTML4 = exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = void 0;
	var decode_1 = decode$1;
	var encode_1 = encode;
	/**
	 * Decodes a string with entities.
	 *
	 * @param data String to decode.
	 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
	 * @deprecated Use `decodeXML` or `decodeHTML` directly.
	 */
	function decode(data, level) {
	    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
	}
	exports.decode = decode;
	/**
	 * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
	 *
	 * @param data String to decode.
	 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
	 * @deprecated Use `decodeHTMLStrict` or `decodeXML` directly.
	 */
	function decodeStrict(data, level) {
	    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
	}
	exports.decodeStrict = decodeStrict;
	/**
	 * Encodes a string with entities.
	 *
	 * @param data String to encode.
	 * @param level Optional level to encode at. 0 = XML, 1 = HTML. Default is 0.
	 * @deprecated Use `encodeHTML`, `encodeXML` or `encodeNonAsciiHTML` directly.
	 */
	function encode$1(data, level) {
	    return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
	}
	exports.encode = encode$1;
	var encode_2 = encode;
	Object.defineProperty(exports, "encodeXML", { enumerable: true, get: function () { return encode_2.encodeXML; } });
	Object.defineProperty(exports, "encodeHTML", { enumerable: true, get: function () { return encode_2.encodeHTML; } });
	Object.defineProperty(exports, "encodeNonAsciiHTML", { enumerable: true, get: function () { return encode_2.encodeNonAsciiHTML; } });
	Object.defineProperty(exports, "escape", { enumerable: true, get: function () { return encode_2.escape; } });
	Object.defineProperty(exports, "escapeUTF8", { enumerable: true, get: function () { return encode_2.escapeUTF8; } });
	// Legacy aliases (deprecated)
	Object.defineProperty(exports, "encodeHTML4", { enumerable: true, get: function () { return encode_2.encodeHTML; } });
	Object.defineProperty(exports, "encodeHTML5", { enumerable: true, get: function () { return encode_2.encodeHTML; } });
	var decode_2 = decode$1;
	Object.defineProperty(exports, "decodeXML", { enumerable: true, get: function () { return decode_2.decodeXML; } });
	Object.defineProperty(exports, "decodeHTML", { enumerable: true, get: function () { return decode_2.decodeHTML; } });
	Object.defineProperty(exports, "decodeHTMLStrict", { enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } });
	// Legacy aliases (deprecated)
	Object.defineProperty(exports, "decodeHTML4", { enumerable: true, get: function () { return decode_2.decodeHTML; } });
	Object.defineProperty(exports, "decodeHTML5", { enumerable: true, get: function () { return decode_2.decodeHTML; } });
	Object.defineProperty(exports, "decodeHTML4Strict", { enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } });
	Object.defineProperty(exports, "decodeHTML5Strict", { enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } });
	Object.defineProperty(exports, "decodeXMLStrict", { enumerable: true, get: function () { return decode_2.decodeXML; } });
	}(lib$2));

	var foreignNames = {};

	Object.defineProperty(foreignNames, "__esModule", { value: true });
	foreignNames.attributeNames = foreignNames.elementNames = void 0;
	foreignNames.elementNames = new Map([
	    ["altglyph", "altGlyph"],
	    ["altglyphdef", "altGlyphDef"],
	    ["altglyphitem", "altGlyphItem"],
	    ["animatecolor", "animateColor"],
	    ["animatemotion", "animateMotion"],
	    ["animatetransform", "animateTransform"],
	    ["clippath", "clipPath"],
	    ["feblend", "feBlend"],
	    ["fecolormatrix", "feColorMatrix"],
	    ["fecomponenttransfer", "feComponentTransfer"],
	    ["fecomposite", "feComposite"],
	    ["feconvolvematrix", "feConvolveMatrix"],
	    ["fediffuselighting", "feDiffuseLighting"],
	    ["fedisplacementmap", "feDisplacementMap"],
	    ["fedistantlight", "feDistantLight"],
	    ["fedropshadow", "feDropShadow"],
	    ["feflood", "feFlood"],
	    ["fefunca", "feFuncA"],
	    ["fefuncb", "feFuncB"],
	    ["fefuncg", "feFuncG"],
	    ["fefuncr", "feFuncR"],
	    ["fegaussianblur", "feGaussianBlur"],
	    ["feimage", "feImage"],
	    ["femerge", "feMerge"],
	    ["femergenode", "feMergeNode"],
	    ["femorphology", "feMorphology"],
	    ["feoffset", "feOffset"],
	    ["fepointlight", "fePointLight"],
	    ["fespecularlighting", "feSpecularLighting"],
	    ["fespotlight", "feSpotLight"],
	    ["fetile", "feTile"],
	    ["feturbulence", "feTurbulence"],
	    ["foreignobject", "foreignObject"],
	    ["glyphref", "glyphRef"],
	    ["lineargradient", "linearGradient"],
	    ["radialgradient", "radialGradient"],
	    ["textpath", "textPath"],
	]);
	foreignNames.attributeNames = new Map([
	    ["definitionurl", "definitionURL"],
	    ["attributename", "attributeName"],
	    ["attributetype", "attributeType"],
	    ["basefrequency", "baseFrequency"],
	    ["baseprofile", "baseProfile"],
	    ["calcmode", "calcMode"],
	    ["clippathunits", "clipPathUnits"],
	    ["diffuseconstant", "diffuseConstant"],
	    ["edgemode", "edgeMode"],
	    ["filterunits", "filterUnits"],
	    ["glyphref", "glyphRef"],
	    ["gradienttransform", "gradientTransform"],
	    ["gradientunits", "gradientUnits"],
	    ["kernelmatrix", "kernelMatrix"],
	    ["kernelunitlength", "kernelUnitLength"],
	    ["keypoints", "keyPoints"],
	    ["keysplines", "keySplines"],
	    ["keytimes", "keyTimes"],
	    ["lengthadjust", "lengthAdjust"],
	    ["limitingconeangle", "limitingConeAngle"],
	    ["markerheight", "markerHeight"],
	    ["markerunits", "markerUnits"],
	    ["markerwidth", "markerWidth"],
	    ["maskcontentunits", "maskContentUnits"],
	    ["maskunits", "maskUnits"],
	    ["numoctaves", "numOctaves"],
	    ["pathlength", "pathLength"],
	    ["patterncontentunits", "patternContentUnits"],
	    ["patterntransform", "patternTransform"],
	    ["patternunits", "patternUnits"],
	    ["pointsatx", "pointsAtX"],
	    ["pointsaty", "pointsAtY"],
	    ["pointsatz", "pointsAtZ"],
	    ["preservealpha", "preserveAlpha"],
	    ["preserveaspectratio", "preserveAspectRatio"],
	    ["primitiveunits", "primitiveUnits"],
	    ["refx", "refX"],
	    ["refy", "refY"],
	    ["repeatcount", "repeatCount"],
	    ["repeatdur", "repeatDur"],
	    ["requiredextensions", "requiredExtensions"],
	    ["requiredfeatures", "requiredFeatures"],
	    ["specularconstant", "specularConstant"],
	    ["specularexponent", "specularExponent"],
	    ["spreadmethod", "spreadMethod"],
	    ["startoffset", "startOffset"],
	    ["stddeviation", "stdDeviation"],
	    ["stitchtiles", "stitchTiles"],
	    ["surfacescale", "surfaceScale"],
	    ["systemlanguage", "systemLanguage"],
	    ["tablevalues", "tableValues"],
	    ["targetx", "targetX"],
	    ["targety", "targetY"],
	    ["textlength", "textLength"],
	    ["viewbox", "viewBox"],
	    ["viewtarget", "viewTarget"],
	    ["xchannelselector", "xChannelSelector"],
	    ["ychannelselector", "yChannelSelector"],
	    ["zoomandpan", "zoomAndPan"],
	]);

	var __assign$1 = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign$1 = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign$1.apply(this, arguments);
	};
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(lib$3, "__esModule", { value: true });
	/*
	 * Module dependencies
	 */
	var ElementType = __importStar(lib$4);
	var entities_1 = lib$2;
	/**
	 * Mixed-case SVG and MathML tags & attributes
	 * recognized by the HTML parser.
	 *
	 * @see https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
	 */
	var foreignNames_1 = foreignNames;
	var unencodedElements = new Set([
	    "style",
	    "script",
	    "xmp",
	    "iframe",
	    "noembed",
	    "noframes",
	    "plaintext",
	    "noscript",
	]);
	/**
	 * Format attributes
	 */
	function formatAttributes(attributes, opts) {
	    if (!attributes)
	        return;
	    return Object.keys(attributes)
	        .map(function (key) {
	        var _a, _b;
	        var value = (_a = attributes[key]) !== null && _a !== void 0 ? _a : "";
	        if (opts.xmlMode === "foreign") {
	            /* Fix up mixed-case attribute names */
	            key = (_b = foreignNames_1.attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
	        }
	        if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
	            return key;
	        }
	        return key + "=\"" + (opts.decodeEntities !== false
	            ? entities_1.encodeXML(value)
	            : value.replace(/"/g, "&quot;")) + "\"";
	    })
	        .join(" ");
	}
	/**
	 * Self-enclosing tags
	 */
	var singleTag = new Set([
	    "area",
	    "base",
	    "basefont",
	    "br",
	    "col",
	    "command",
	    "embed",
	    "frame",
	    "hr",
	    "img",
	    "input",
	    "isindex",
	    "keygen",
	    "link",
	    "meta",
	    "param",
	    "source",
	    "track",
	    "wbr",
	]);
	/**
	 * Renders a DOM node or an array of DOM nodes to a string.
	 *
	 * Can be thought of as the equivalent of the `outerHTML` of the passed node(s).
	 *
	 * @param node Node to be rendered.
	 * @param options Changes serialization behavior
	 */
	function render(node, options) {
	    if (options === void 0) { options = {}; }
	    var nodes = "length" in node ? node : [node];
	    var output = "";
	    for (var i = 0; i < nodes.length; i++) {
	        output += renderNode(nodes[i], options);
	    }
	    return output;
	}
	lib$3.default = render;
	function renderNode(node, options) {
	    switch (node.type) {
	        case ElementType.Root:
	            return render(node.children, options);
	        case ElementType.Directive:
	        case ElementType.Doctype:
	            return renderDirective(node);
	        case ElementType.Comment:
	            return renderComment(node);
	        case ElementType.CDATA:
	            return renderCdata(node);
	        case ElementType.Script:
	        case ElementType.Style:
	        case ElementType.Tag:
	            return renderTag(node, options);
	        case ElementType.Text:
	            return renderText(node, options);
	    }
	}
	var foreignModeIntegrationPoints = new Set([
	    "mi",
	    "mo",
	    "mn",
	    "ms",
	    "mtext",
	    "annotation-xml",
	    "foreignObject",
	    "desc",
	    "title",
	]);
	var foreignElements = new Set(["svg", "math"]);
	function renderTag(elem, opts) {
	    var _a;
	    // Handle SVG / MathML in HTML
	    if (opts.xmlMode === "foreign") {
	        /* Fix up mixed-case element names */
	        elem.name = (_a = foreignNames_1.elementNames.get(elem.name)) !== null && _a !== void 0 ? _a : elem.name;
	        /* Exit foreign mode at integration points */
	        if (elem.parent &&
	            foreignModeIntegrationPoints.has(elem.parent.name)) {
	            opts = __assign$1(__assign$1({}, opts), { xmlMode: false });
	        }
	    }
	    if (!opts.xmlMode && foreignElements.has(elem.name)) {
	        opts = __assign$1(__assign$1({}, opts), { xmlMode: "foreign" });
	    }
	    var tag = "<" + elem.name;
	    var attribs = formatAttributes(elem.attribs, opts);
	    if (attribs) {
	        tag += " " + attribs;
	    }
	    if (elem.children.length === 0 &&
	        (opts.xmlMode
	            ? // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
	                opts.selfClosingTags !== false
	            : // User explicitly asked for self-closing tags, even in HTML mode
	                opts.selfClosingTags && singleTag.has(elem.name))) {
	        if (!opts.xmlMode)
	            tag += " ";
	        tag += "/>";
	    }
	    else {
	        tag += ">";
	        if (elem.children.length > 0) {
	            tag += render(elem.children, opts);
	        }
	        if (opts.xmlMode || !singleTag.has(elem.name)) {
	            tag += "</" + elem.name + ">";
	        }
	    }
	    return tag;
	}
	function renderDirective(elem) {
	    return "<" + elem.data + ">";
	}
	function renderText(elem, opts) {
	    var data = elem.data || "";
	    // If entities weren't decoded, no need to encode them back
	    if (opts.decodeEntities !== false &&
	        !(!opts.xmlMode &&
	            elem.parent &&
	            unencodedElements.has(elem.parent.name))) {
	        data = entities_1.encodeXML(data);
	    }
	    return data;
	}
	function renderCdata(elem) {
	    return "<![CDATA[" + elem.children[0].data + "]]>";
	}
	function renderComment(elem) {
	    return "<!--" + elem.data + "-->";
	}

	var __importDefault$4 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(stringify$2, "__esModule", { value: true });
	stringify$2.innerText = stringify$2.textContent = stringify$2.getText = stringify$2.getInnerHTML = stringify$2.getOuterHTML = void 0;
	var domhandler_1$4 = lib$5;
	var dom_serializer_1 = __importDefault$4(lib$3);
	var domelementtype_1 = lib$4;
	/**
	 * @param node Node to get the outer HTML of.
	 * @param options Options for serialization.
	 * @deprecated Use the `dom-serializer` module directly.
	 * @returns `node`'s outer HTML.
	 */
	function getOuterHTML(node, options) {
	    return (0, dom_serializer_1.default)(node, options);
	}
	stringify$2.getOuterHTML = getOuterHTML;
	/**
	 * @param node Node to get the inner HTML of.
	 * @param options Options for serialization.
	 * @deprecated Use the `dom-serializer` module directly.
	 * @returns `node`'s inner HTML.
	 */
	function getInnerHTML(node, options) {
	    return (0, domhandler_1$4.hasChildren)(node)
	        ? node.children.map(function (node) { return getOuterHTML(node, options); }).join("")
	        : "";
	}
	stringify$2.getInnerHTML = getInnerHTML;
	/**
	 * Get a node's inner text. Same as `textContent`, but inserts newlines for `<br>` tags.
	 *
	 * @deprecated Use `textContent` instead.
	 * @param node Node to get the inner text of.
	 * @returns `node`'s inner text.
	 */
	function getText$1(node) {
	    if (Array.isArray(node))
	        return node.map(getText$1).join("");
	    if ((0, domhandler_1$4.isTag)(node))
	        return node.name === "br" ? "\n" : getText$1(node.children);
	    if ((0, domhandler_1$4.isCDATA)(node))
	        return getText$1(node.children);
	    if ((0, domhandler_1$4.isText)(node))
	        return node.data;
	    return "";
	}
	stringify$2.getText = getText$1;
	/**
	 * Get a node's text content.
	 *
	 * @param node Node to get the text content of.
	 * @returns `node`'s text content.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}
	 */
	function textContent(node) {
	    if (Array.isArray(node))
	        return node.map(textContent).join("");
	    if ((0, domhandler_1$4.hasChildren)(node) && !(0, domhandler_1$4.isComment)(node)) {
	        return textContent(node.children);
	    }
	    if ((0, domhandler_1$4.isText)(node))
	        return node.data;
	    return "";
	}
	stringify$2.textContent = textContent;
	/**
	 * Get a node's inner text.
	 *
	 * @param node Node to get the inner text of.
	 * @returns `node`'s inner text.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText}
	 */
	function innerText(node) {
	    if (Array.isArray(node))
	        return node.map(innerText).join("");
	    if ((0, domhandler_1$4.hasChildren)(node) && (node.type === domelementtype_1.ElementType.Tag || (0, domhandler_1$4.isCDATA)(node))) {
	        return innerText(node.children);
	    }
	    if ((0, domhandler_1$4.isText)(node))
	        return node.data;
	    return "";
	}
	stringify$2.innerText = innerText;

	var traversal = {};

	Object.defineProperty(traversal, "__esModule", { value: true });
	traversal.prevElementSibling = traversal.nextElementSibling = traversal.getName = traversal.hasAttrib = traversal.getAttributeValue = traversal.getSiblings = traversal.getParent = traversal.getChildren = void 0;
	var domhandler_1$3 = lib$5;
	var emptyArray = [];
	/**
	 * Get a node's children.
	 *
	 * @param elem Node to get the children of.
	 * @returns `elem`'s children, or an empty array.
	 */
	function getChildren$1(elem) {
	    var _a;
	    return (_a = elem.children) !== null && _a !== void 0 ? _a : emptyArray;
	}
	traversal.getChildren = getChildren$1;
	/**
	 * Get a node's parent.
	 *
	 * @param elem Node to get the parent of.
	 * @returns `elem`'s parent node.
	 */
	function getParent$1(elem) {
	    return elem.parent || null;
	}
	traversal.getParent = getParent$1;
	/**
	 * Gets an elements siblings, including the element itself.
	 *
	 * Attempts to get the children through the element's parent first.
	 * If we don't have a parent (the element is a root node),
	 * we walk the element's `prev` & `next` to get all remaining nodes.
	 *
	 * @param elem Element to get the siblings of.
	 * @returns `elem`'s siblings.
	 */
	function getSiblings$1(elem) {
	    var _a, _b;
	    var parent = getParent$1(elem);
	    if (parent != null)
	        return getChildren$1(parent);
	    var siblings = [elem];
	    var prev = elem.prev, next = elem.next;
	    while (prev != null) {
	        siblings.unshift(prev);
	        (_a = prev, prev = _a.prev);
	    }
	    while (next != null) {
	        siblings.push(next);
	        (_b = next, next = _b.next);
	    }
	    return siblings;
	}
	traversal.getSiblings = getSiblings$1;
	/**
	 * Gets an attribute from an element.
	 *
	 * @param elem Element to check.
	 * @param name Attribute name to retrieve.
	 * @returns The element's attribute value, or `undefined`.
	 */
	function getAttributeValue$1(elem, name) {
	    var _a;
	    return (_a = elem.attribs) === null || _a === void 0 ? void 0 : _a[name];
	}
	traversal.getAttributeValue = getAttributeValue$1;
	/**
	 * Checks whether an element has an attribute.
	 *
	 * @param elem Element to check.
	 * @param name Attribute name to look for.
	 * @returns Returns whether `elem` has the attribute `name`.
	 */
	function hasAttrib$1(elem, name) {
	    return (elem.attribs != null &&
	        Object.prototype.hasOwnProperty.call(elem.attribs, name) &&
	        elem.attribs[name] != null);
	}
	traversal.hasAttrib = hasAttrib$1;
	/**
	 * Get the tag name of an element.
	 *
	 * @param elem The element to get the name for.
	 * @returns The tag name of `elem`.
	 */
	function getName$1(elem) {
	    return elem.name;
	}
	traversal.getName = getName$1;
	/**
	 * Returns the next element sibling of a node.
	 *
	 * @param elem The element to get the next sibling of.
	 * @returns `elem`'s next sibling that is a tag.
	 */
	function nextElementSibling(elem) {
	    var _a;
	    var next = elem.next;
	    while (next !== null && !(0, domhandler_1$3.isTag)(next))
	        (_a = next, next = _a.next);
	    return next;
	}
	traversal.nextElementSibling = nextElementSibling;
	/**
	 * Returns the previous element sibling of a node.
	 *
	 * @param elem The element to get the previous sibling of.
	 * @returns `elem`'s previous sibling that is a tag.
	 */
	function prevElementSibling(elem) {
	    var _a;
	    var prev = elem.prev;
	    while (prev !== null && !(0, domhandler_1$3.isTag)(prev))
	        (_a = prev, prev = _a.prev);
	    return prev;
	}
	traversal.prevElementSibling = prevElementSibling;

	var manipulation = {};

	Object.defineProperty(manipulation, "__esModule", { value: true });
	manipulation.prepend = manipulation.prependChild = manipulation.append = manipulation.appendChild = manipulation.replaceElement = manipulation.removeElement = void 0;
	/**
	 * Remove an element from the dom
	 *
	 * @param elem The element to be removed
	 */
	function removeElement(elem) {
	    if (elem.prev)
	        elem.prev.next = elem.next;
	    if (elem.next)
	        elem.next.prev = elem.prev;
	    if (elem.parent) {
	        var childs = elem.parent.children;
	        childs.splice(childs.lastIndexOf(elem), 1);
	    }
	}
	manipulation.removeElement = removeElement;
	/**
	 * Replace an element in the dom
	 *
	 * @param elem The element to be replaced
	 * @param replacement The element to be added
	 */
	function replaceElement(elem, replacement) {
	    var prev = (replacement.prev = elem.prev);
	    if (prev) {
	        prev.next = replacement;
	    }
	    var next = (replacement.next = elem.next);
	    if (next) {
	        next.prev = replacement;
	    }
	    var parent = (replacement.parent = elem.parent);
	    if (parent) {
	        var childs = parent.children;
	        childs[childs.lastIndexOf(elem)] = replacement;
	    }
	}
	manipulation.replaceElement = replaceElement;
	/**
	 * Append a child to an element.
	 *
	 * @param elem The element to append to.
	 * @param child The element to be added as a child.
	 */
	function appendChild(elem, child) {
	    removeElement(child);
	    child.next = null;
	    child.parent = elem;
	    if (elem.children.push(child) > 1) {
	        var sibling = elem.children[elem.children.length - 2];
	        sibling.next = child;
	        child.prev = sibling;
	    }
	    else {
	        child.prev = null;
	    }
	}
	manipulation.appendChild = appendChild;
	/**
	 * Append an element after another.
	 *
	 * @param elem The element to append after.
	 * @param next The element be added.
	 */
	function append(elem, next) {
	    removeElement(next);
	    var parent = elem.parent;
	    var currNext = elem.next;
	    next.next = currNext;
	    next.prev = elem;
	    elem.next = next;
	    next.parent = parent;
	    if (currNext) {
	        currNext.prev = next;
	        if (parent) {
	            var childs = parent.children;
	            childs.splice(childs.lastIndexOf(currNext), 0, next);
	        }
	    }
	    else if (parent) {
	        parent.children.push(next);
	    }
	}
	manipulation.append = append;
	/**
	 * Prepend a child to an element.
	 *
	 * @param elem The element to prepend before.
	 * @param child The element to be added as a child.
	 */
	function prependChild(elem, child) {
	    removeElement(child);
	    child.parent = elem;
	    child.prev = null;
	    if (elem.children.unshift(child) !== 1) {
	        var sibling = elem.children[1];
	        sibling.prev = child;
	        child.next = sibling;
	    }
	    else {
	        child.next = null;
	    }
	}
	manipulation.prependChild = prependChild;
	/**
	 * Prepend an element before another.
	 *
	 * @param elem The element to prepend before.
	 * @param prev The element be added.
	 */
	function prepend(elem, prev) {
	    removeElement(prev);
	    var parent = elem.parent;
	    if (parent) {
	        var childs = parent.children;
	        childs.splice(childs.indexOf(elem), 0, prev);
	    }
	    if (elem.prev) {
	        elem.prev.next = prev;
	    }
	    prev.parent = parent;
	    prev.prev = elem.prev;
	    prev.next = elem;
	    elem.prev = prev;
	}
	manipulation.prepend = prepend;

	var querying = {};

	Object.defineProperty(querying, "__esModule", { value: true });
	querying.findAll = querying.existsOne = querying.findOne = querying.findOneChild = querying.find = querying.filter = void 0;
	var domhandler_1$2 = lib$5;
	/**
	 * Search a node and its children for nodes passing a test function.
	 *
	 * @param test Function to test nodes on.
	 * @param node Node to search. Will be included in the result set if it matches.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes passing `test`.
	 */
	function filter(test, node, recurse, limit) {
	    if (recurse === void 0) { recurse = true; }
	    if (limit === void 0) { limit = Infinity; }
	    if (!Array.isArray(node))
	        node = [node];
	    return find(test, node, recurse, limit);
	}
	querying.filter = filter;
	/**
	 * Search an array of node and its children for nodes passing a test function.
	 *
	 * @param test Function to test nodes on.
	 * @param nodes Array of nodes to search.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes passing `test`.
	 */
	function find(test, nodes, recurse, limit) {
	    var result = [];
	    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
	        var elem = nodes_1[_i];
	        if (test(elem)) {
	            result.push(elem);
	            if (--limit <= 0)
	                break;
	        }
	        if (recurse && (0, domhandler_1$2.hasChildren)(elem) && elem.children.length > 0) {
	            var children = find(test, elem.children, recurse, limit);
	            result.push.apply(result, children);
	            limit -= children.length;
	            if (limit <= 0)
	                break;
	        }
	    }
	    return result;
	}
	querying.find = find;
	/**
	 * Finds the first element inside of an array that matches a test function.
	 *
	 * @param test Function to test nodes on.
	 * @param nodes Array of nodes to search.
	 * @returns The first node in the array that passes `test`.
	 */
	function findOneChild(test, nodes) {
	    return nodes.find(test);
	}
	querying.findOneChild = findOneChild;
	/**
	 * Finds one element in a tree that passes a test.
	 *
	 * @param test Function to test nodes on.
	 * @param nodes Array of nodes to search.
	 * @param recurse Also consider child nodes.
	 * @returns The first child node that passes `test`.
	 */
	function findOne$1(test, nodes, recurse) {
	    if (recurse === void 0) { recurse = true; }
	    var elem = null;
	    for (var i = 0; i < nodes.length && !elem; i++) {
	        var checked = nodes[i];
	        if (!(0, domhandler_1$2.isTag)(checked)) {
	            continue;
	        }
	        else if (test(checked)) {
	            elem = checked;
	        }
	        else if (recurse && checked.children.length > 0) {
	            elem = findOne$1(test, checked.children);
	        }
	    }
	    return elem;
	}
	querying.findOne = findOne$1;
	/**
	 * @param test Function to test nodes on.
	 * @param nodes Array of nodes to search.
	 * @returns Whether a tree of nodes contains at least one node passing a test.
	 */
	function existsOne$1(test, nodes) {
	    return nodes.some(function (checked) {
	        return (0, domhandler_1$2.isTag)(checked) &&
	            (test(checked) ||
	                (checked.children.length > 0 &&
	                    existsOne$1(test, checked.children)));
	    });
	}
	querying.existsOne = existsOne$1;
	/**
	 * Search and array of nodes and its children for nodes passing a test function.
	 *
	 * Same as `find`, only with less options, leading to reduced complexity.
	 *
	 * @param test Function to test nodes on.
	 * @param nodes Array of nodes to search.
	 * @returns All nodes passing `test`.
	 */
	function findAll$1(test, nodes) {
	    var _a;
	    var result = [];
	    var stack = nodes.filter(domhandler_1$2.isTag);
	    var elem;
	    while ((elem = stack.shift())) {
	        var children = (_a = elem.children) === null || _a === void 0 ? void 0 : _a.filter(domhandler_1$2.isTag);
	        if (children && children.length > 0) {
	            stack.unshift.apply(stack, children);
	        }
	        if (test(elem))
	            result.push(elem);
	    }
	    return result;
	}
	querying.findAll = findAll$1;

	var legacy = {};

	Object.defineProperty(legacy, "__esModule", { value: true });
	legacy.getElementsByTagType = legacy.getElementsByTagName = legacy.getElementById = legacy.getElements = legacy.testElement = void 0;
	var domhandler_1$1 = lib$5;
	var querying_1 = querying;
	var Checks = {
	    tag_name: function (name) {
	        if (typeof name === "function") {
	            return function (elem) { return (0, domhandler_1$1.isTag)(elem) && name(elem.name); };
	        }
	        else if (name === "*") {
	            return domhandler_1$1.isTag;
	        }
	        return function (elem) { return (0, domhandler_1$1.isTag)(elem) && elem.name === name; };
	    },
	    tag_type: function (type) {
	        if (typeof type === "function") {
	            return function (elem) { return type(elem.type); };
	        }
	        return function (elem) { return elem.type === type; };
	    },
	    tag_contains: function (data) {
	        if (typeof data === "function") {
	            return function (elem) { return (0, domhandler_1$1.isText)(elem) && data(elem.data); };
	        }
	        return function (elem) { return (0, domhandler_1$1.isText)(elem) && elem.data === data; };
	    },
	};
	/**
	 * @param attrib Attribute to check.
	 * @param value Attribute value to look for.
	 * @returns A function to check whether the a node has an attribute with a particular value.
	 */
	function getAttribCheck(attrib, value) {
	    if (typeof value === "function") {
	        return function (elem) { return (0, domhandler_1$1.isTag)(elem) && value(elem.attribs[attrib]); };
	    }
	    return function (elem) { return (0, domhandler_1$1.isTag)(elem) && elem.attribs[attrib] === value; };
	}
	/**
	 * @param a First function to combine.
	 * @param b Second function to combine.
	 * @returns A function taking a node and returning `true` if either
	 * of the input functions returns `true` for the node.
	 */
	function combineFuncs(a, b) {
	    return function (elem) { return a(elem) || b(elem); };
	}
	/**
	 * @param options An object describing nodes to look for.
	 * @returns A function executing all checks in `options` and returning `true`
	 * if any of them match a node.
	 */
	function compileTest(options) {
	    var funcs = Object.keys(options).map(function (key) {
	        var value = options[key];
	        return Object.prototype.hasOwnProperty.call(Checks, key)
	            ? Checks[key](value)
	            : getAttribCheck(key, value);
	    });
	    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
	}
	/**
	 * @param options An object describing nodes to look for.
	 * @param node The element to test.
	 * @returns Whether the element matches the description in `options`.
	 */
	function testElement(options, node) {
	    var test = compileTest(options);
	    return test ? test(node) : true;
	}
	legacy.testElement = testElement;
	/**
	 * @param options An object describing nodes to look for.
	 * @param nodes Nodes to search through.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes that match `options`.
	 */
	function getElements(options, nodes, recurse, limit) {
	    if (limit === void 0) { limit = Infinity; }
	    var test = compileTest(options);
	    return test ? (0, querying_1.filter)(test, nodes, recurse, limit) : [];
	}
	legacy.getElements = getElements;
	/**
	 * @param id The unique ID attribute value to look for.
	 * @param nodes Nodes to search through.
	 * @param recurse Also consider child nodes.
	 * @returns The node with the supplied ID.
	 */
	function getElementById(id, nodes, recurse) {
	    if (recurse === void 0) { recurse = true; }
	    if (!Array.isArray(nodes))
	        nodes = [nodes];
	    return (0, querying_1.findOne)(getAttribCheck("id", id), nodes, recurse);
	}
	legacy.getElementById = getElementById;
	/**
	 * @param tagName Tag name to search for.
	 * @param nodes Nodes to search through.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes with the supplied `tagName`.
	 */
	function getElementsByTagName(tagName, nodes, recurse, limit) {
	    if (recurse === void 0) { recurse = true; }
	    if (limit === void 0) { limit = Infinity; }
	    return (0, querying_1.filter)(Checks.tag_name(tagName), nodes, recurse, limit);
	}
	legacy.getElementsByTagName = getElementsByTagName;
	/**
	 * @param type Element type to look for.
	 * @param nodes Nodes to search through.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes with the supplied `type`.
	 */
	function getElementsByTagType(type, nodes, recurse, limit) {
	    if (recurse === void 0) { recurse = true; }
	    if (limit === void 0) { limit = Infinity; }
	    return (0, querying_1.filter)(Checks.tag_type(type), nodes, recurse, limit);
	}
	legacy.getElementsByTagType = getElementsByTagType;

	var helpers = {};

	Object.defineProperty(helpers, "__esModule", { value: true });
	helpers.uniqueSort = helpers.compareDocumentPosition = helpers.removeSubsets = void 0;
	var domhandler_1 = lib$5;
	/**
	 * Given an array of nodes, remove any member that is contained by another.
	 *
	 * @param nodes Nodes to filter.
	 * @returns Remaining nodes that aren't subtrees of each other.
	 */
	function removeSubsets$1(nodes) {
	    var idx = nodes.length;
	    /*
	     * Check if each node (or one of its ancestors) is already contained in the
	     * array.
	     */
	    while (--idx >= 0) {
	        var node = nodes[idx];
	        /*
	         * Remove the node if it is not unique.
	         * We are going through the array from the end, so we only
	         * have to check nodes that preceed the node under consideration in the array.
	         */
	        if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
	            nodes.splice(idx, 1);
	            continue;
	        }
	        for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
	            if (nodes.includes(ancestor)) {
	                nodes.splice(idx, 1);
	                break;
	            }
	        }
	    }
	    return nodes;
	}
	helpers.removeSubsets = removeSubsets$1;
	/**
	 * Compare the position of one node against another node in any other document.
	 * The return value is a bitmask with the following values:
	 *
	 * Document order:
	 * > There is an ordering, document order, defined on all the nodes in the
	 * > document corresponding to the order in which the first character of the
	 * > XML representation of each node occurs in the XML representation of the
	 * > document after expansion of general entities. Thus, the document element
	 * > node will be the first node. Element nodes occur before their children.
	 * > Thus, document order orders element nodes in order of the occurrence of
	 * > their start-tag in the XML (after expansion of entities). The attribute
	 * > nodes of an element occur after the element and before its children. The
	 * > relative order of attribute nodes is implementation-dependent./
	 *
	 * Source:
	 * http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
	 *
	 * @param nodeA The first node to use in the comparison
	 * @param nodeB The second node to use in the comparison
	 * @returns A bitmask describing the input nodes' relative position.
	 *
	 * See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
	 * a description of these values.
	 */
	function compareDocumentPosition(nodeA, nodeB) {
	    var aParents = [];
	    var bParents = [];
	    if (nodeA === nodeB) {
	        return 0;
	    }
	    var current = (0, domhandler_1.hasChildren)(nodeA) ? nodeA : nodeA.parent;
	    while (current) {
	        aParents.unshift(current);
	        current = current.parent;
	    }
	    current = (0, domhandler_1.hasChildren)(nodeB) ? nodeB : nodeB.parent;
	    while (current) {
	        bParents.unshift(current);
	        current = current.parent;
	    }
	    var maxIdx = Math.min(aParents.length, bParents.length);
	    var idx = 0;
	    while (idx < maxIdx && aParents[idx] === bParents[idx]) {
	        idx++;
	    }
	    if (idx === 0) {
	        return 1 /* DISCONNECTED */;
	    }
	    var sharedParent = aParents[idx - 1];
	    var siblings = sharedParent.children;
	    var aSibling = aParents[idx];
	    var bSibling = bParents[idx];
	    if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
	        if (sharedParent === nodeB) {
	            return 4 /* FOLLOWING */ | 16 /* CONTAINED_BY */;
	        }
	        return 4 /* FOLLOWING */;
	    }
	    if (sharedParent === nodeA) {
	        return 2 /* PRECEDING */ | 8 /* CONTAINS */;
	    }
	    return 2 /* PRECEDING */;
	}
	helpers.compareDocumentPosition = compareDocumentPosition;
	/**
	 * Sort an array of nodes based on their relative position in the document and
	 * remove any duplicate nodes. If the array contains nodes that do not belong
	 * to the same document, sort order is unspecified.
	 *
	 * @param nodes Array of DOM nodes.
	 * @returns Collection of unique nodes, sorted in document order.
	 */
	function uniqueSort(nodes) {
	    nodes = nodes.filter(function (node, i, arr) { return !arr.includes(node, i + 1); });
	    nodes.sort(function (a, b) {
	        var relative = compareDocumentPosition(a, b);
	        if (relative & 2 /* PRECEDING */) {
	            return -1;
	        }
	        else if (relative & 4 /* FOLLOWING */) {
	            return 1;
	        }
	        return 0;
	    });
	    return nodes;
	}
	helpers.uniqueSort = uniqueSort;

	var feeds = {};

	Object.defineProperty(feeds, "__esModule", { value: true });
	feeds.getFeed = void 0;
	var stringify_1 = stringify$2;
	var legacy_1 = legacy;
	/**
	 * Get the feed object from the root of a DOM tree.
	 *
	 * @param doc - The DOM to to extract the feed from.
	 * @returns The feed.
	 */
	function getFeed(doc) {
	    var feedRoot = getOneElement(isValidFeed, doc);
	    return !feedRoot
	        ? null
	        : feedRoot.name === "feed"
	            ? getAtomFeed(feedRoot)
	            : getRssFeed(feedRoot);
	}
	feeds.getFeed = getFeed;
	/**
	 * Parse an Atom feed.
	 *
	 * @param feedRoot The root of the feed.
	 * @returns The parsed feed.
	 */
	function getAtomFeed(feedRoot) {
	    var _a;
	    var childs = feedRoot.children;
	    var feed = {
	        type: "atom",
	        items: (0, legacy_1.getElementsByTagName)("entry", childs).map(function (item) {
	            var _a;
	            var children = item.children;
	            var entry = { media: getMediaElements(children) };
	            addConditionally(entry, "id", "id", children);
	            addConditionally(entry, "title", "title", children);
	            var href = (_a = getOneElement("link", children)) === null || _a === void 0 ? void 0 : _a.attribs.href;
	            if (href) {
	                entry.link = href;
	            }
	            var description = fetch("summary", children) || fetch("content", children);
	            if (description) {
	                entry.description = description;
	            }
	            var pubDate = fetch("updated", children);
	            if (pubDate) {
	                entry.pubDate = new Date(pubDate);
	            }
	            return entry;
	        }),
	    };
	    addConditionally(feed, "id", "id", childs);
	    addConditionally(feed, "title", "title", childs);
	    var href = (_a = getOneElement("link", childs)) === null || _a === void 0 ? void 0 : _a.attribs.href;
	    if (href) {
	        feed.link = href;
	    }
	    addConditionally(feed, "description", "subtitle", childs);
	    var updated = fetch("updated", childs);
	    if (updated) {
	        feed.updated = new Date(updated);
	    }
	    addConditionally(feed, "author", "email", childs, true);
	    return feed;
	}
	/**
	 * Parse a RSS feed.
	 *
	 * @param feedRoot The root of the feed.
	 * @returns The parsed feed.
	 */
	function getRssFeed(feedRoot) {
	    var _a, _b;
	    var childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
	    var feed = {
	        type: feedRoot.name.substr(0, 3),
	        id: "",
	        items: (0, legacy_1.getElementsByTagName)("item", feedRoot.children).map(function (item) {
	            var children = item.children;
	            var entry = { media: getMediaElements(children) };
	            addConditionally(entry, "id", "guid", children);
	            addConditionally(entry, "title", "title", children);
	            addConditionally(entry, "link", "link", children);
	            addConditionally(entry, "description", "description", children);
	            var pubDate = fetch("pubDate", children);
	            if (pubDate)
	                entry.pubDate = new Date(pubDate);
	            return entry;
	        }),
	    };
	    addConditionally(feed, "title", "title", childs);
	    addConditionally(feed, "link", "link", childs);
	    addConditionally(feed, "description", "description", childs);
	    var updated = fetch("lastBuildDate", childs);
	    if (updated) {
	        feed.updated = new Date(updated);
	    }
	    addConditionally(feed, "author", "managingEditor", childs, true);
	    return feed;
	}
	var MEDIA_KEYS_STRING = ["url", "type", "lang"];
	var MEDIA_KEYS_INT = [
	    "fileSize",
	    "bitrate",
	    "framerate",
	    "samplingrate",
	    "channels",
	    "duration",
	    "height",
	    "width",
	];
	/**
	 * Get all media elements of a feed item.
	 *
	 * @param where Nodes to search in.
	 * @returns Media elements.
	 */
	function getMediaElements(where) {
	    return (0, legacy_1.getElementsByTagName)("media:content", where).map(function (elem) {
	        var attribs = elem.attribs;
	        var media = {
	            medium: attribs.medium,
	            isDefault: !!attribs.isDefault,
	        };
	        for (var _i = 0, MEDIA_KEYS_STRING_1 = MEDIA_KEYS_STRING; _i < MEDIA_KEYS_STRING_1.length; _i++) {
	            var attrib = MEDIA_KEYS_STRING_1[_i];
	            if (attribs[attrib]) {
	                media[attrib] = attribs[attrib];
	            }
	        }
	        for (var _a = 0, MEDIA_KEYS_INT_1 = MEDIA_KEYS_INT; _a < MEDIA_KEYS_INT_1.length; _a++) {
	            var attrib = MEDIA_KEYS_INT_1[_a];
	            if (attribs[attrib]) {
	                media[attrib] = parseInt(attribs[attrib], 10);
	            }
	        }
	        if (attribs.expression) {
	            media.expression =
	                attribs.expression;
	        }
	        return media;
	    });
	}
	/**
	 * Get one element by tag name.
	 *
	 * @param tagName Tag name to look for
	 * @param node Node to search in
	 * @returns The element or null
	 */
	function getOneElement(tagName, node) {
	    return (0, legacy_1.getElementsByTagName)(tagName, node, true, 1)[0];
	}
	/**
	 * Get the text content of an element with a certain tag name.
	 *
	 * @param tagName Tag name to look for.
	 * @param where  Node to search in.
	 * @param recurse Whether to recurse into child nodes.
	 * @returns The text content of the element.
	 */
	function fetch(tagName, where, recurse) {
	    if (recurse === void 0) { recurse = false; }
	    return (0, stringify_1.textContent)((0, legacy_1.getElementsByTagName)(tagName, where, recurse, 1)).trim();
	}
	/**
	 * Adds a property to an object if it has a value.
	 *
	 * @param obj Object to be extended
	 * @param prop Property name
	 * @param tagName Tag name that contains the conditionally added property
	 * @param where Element to search for the property
	 * @param recurse Whether to recurse into child nodes.
	 */
	function addConditionally(obj, prop, tagName, where, recurse) {
	    if (recurse === void 0) { recurse = false; }
	    var val = fetch(tagName, where, recurse);
	    if (val)
	        obj[prop] = val;
	}
	/**
	 * Checks if an element is a feed root node.
	 *
	 * @param value The name of the element to check.
	 * @returns Whether an element is a feed root node.
	 */
	function isValidFeed(value) {
	    return value === "rss" || value === "feed" || value === "rdf:RDF";
	}

	(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.hasChildren = exports.isDocument = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = void 0;
	__exportStar(stringify$2, exports);
	__exportStar(traversal, exports);
	__exportStar(manipulation, exports);
	__exportStar(querying, exports);
	__exportStar(legacy, exports);
	__exportStar(helpers, exports);
	__exportStar(feeds, exports);
	/** @deprecated Use these methods from `domhandler` directly. */
	var domhandler_1 = lib$5;
	Object.defineProperty(exports, "isTag", { enumerable: true, get: function () { return domhandler_1.isTag; } });
	Object.defineProperty(exports, "isCDATA", { enumerable: true, get: function () { return domhandler_1.isCDATA; } });
	Object.defineProperty(exports, "isText", { enumerable: true, get: function () { return domhandler_1.isText; } });
	Object.defineProperty(exports, "isComment", { enumerable: true, get: function () { return domhandler_1.isComment; } });
	Object.defineProperty(exports, "isDocument", { enumerable: true, get: function () { return domhandler_1.isDocument; } });
	Object.defineProperty(exports, "hasChildren", { enumerable: true, get: function () { return domhandler_1.hasChildren; } });
	}(lib$6));

	var boolbase = {
		trueFunc: function trueFunc(){
			return true;
		},
		falseFunc: function falseFunc(){
			return false;
		}
	};

	var compile$3 = {};

	var lib$1 = {};

	var parse$5 = {};

	var __spreadArray$2 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(parse$5, "__esModule", { value: true });
	parse$5.isTraversal = void 0;
	var reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
	var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
	var actionTypes$1 = new Map([
	    ["~", "element"],
	    ["^", "start"],
	    ["$", "end"],
	    ["*", "any"],
	    ["!", "not"],
	    ["|", "hyphen"],
	]);
	var Traversals = {
	    ">": "child",
	    "<": "parent",
	    "~": "sibling",
	    "+": "adjacent",
	};
	var attribSelectors = {
	    "#": ["id", "equals"],
	    ".": ["class", "element"],
	};
	// Pseudos, whose data property is parsed as well.
	var unpackPseudos = new Set([
	    "has",
	    "not",
	    "matches",
	    "is",
	    "where",
	    "host",
	    "host-context",
	]);
	var traversalNames = new Set(__spreadArray$2([
	    "descendant"
	], Object.keys(Traversals).map(function (k) { return Traversals[k]; }), true));
	/**
	 * Attributes that are case-insensitive in HTML.
	 *
	 * @private
	 * @see https://html.spec.whatwg.org/multipage/semantics-other.html#case-sensitivity-of-selectors
	 */
	var caseInsensitiveAttributes = new Set([
	    "accept",
	    "accept-charset",
	    "align",
	    "alink",
	    "axis",
	    "bgcolor",
	    "charset",
	    "checked",
	    "clear",
	    "codetype",
	    "color",
	    "compact",
	    "declare",
	    "defer",
	    "dir",
	    "direction",
	    "disabled",
	    "enctype",
	    "face",
	    "frame",
	    "hreflang",
	    "http-equiv",
	    "lang",
	    "language",
	    "link",
	    "media",
	    "method",
	    "multiple",
	    "nohref",
	    "noresize",
	    "noshade",
	    "nowrap",
	    "readonly",
	    "rel",
	    "rev",
	    "rules",
	    "scope",
	    "scrolling",
	    "selected",
	    "shape",
	    "target",
	    "text",
	    "type",
	    "valign",
	    "valuetype",
	    "vlink",
	]);
	/**
	 * Checks whether a specific selector is a traversal.
	 * This is useful eg. in swapping the order of elements that
	 * are not traversals.
	 *
	 * @param selector Selector to check.
	 */
	function isTraversal(selector) {
	    return traversalNames.has(selector.type);
	}
	parse$5.isTraversal = isTraversal;
	var stripQuotesFromPseudos = new Set(["contains", "icontains"]);
	var quotes = new Set(['"', "'"]);
	// Unescape function taken from https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L152
	function funescape(_, escaped, escapedWhitespace) {
	    var high = parseInt(escaped, 16) - 0x10000;
	    // NaN means non-codepoint
	    return high !== high || escapedWhitespace
	        ? escaped
	        : high < 0
	            ? // BMP codepoint
	                String.fromCharCode(high + 0x10000)
	            : // Supplemental Plane codepoint (surrogate pair)
	                String.fromCharCode((high >> 10) | 0xd800, (high & 0x3ff) | 0xdc00);
	}
	function unescapeCSS(str) {
	    return str.replace(reEscape, funescape);
	}
	function isWhitespace(c) {
	    return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
	}
	/**
	 * Parses `selector`, optionally with the passed `options`.
	 *
	 * @param selector Selector to parse.
	 * @param options Options for parsing.
	 * @returns Returns a two-dimensional array.
	 * The first dimension represents selectors separated by commas (eg. `sub1, sub2`),
	 * the second contains the relevant tokens for that selector.
	 */
	function parse$4(selector, options) {
	    var subselects = [];
	    var endIndex = parseSelector(subselects, "" + selector, options, 0);
	    if (endIndex < selector.length) {
	        throw new Error("Unmatched selector: " + selector.slice(endIndex));
	    }
	    return subselects;
	}
	parse$5.default = parse$4;
	function parseSelector(subselects, selector, options, selectorIndex) {
	    var _a, _b;
	    if (options === void 0) { options = {}; }
	    var tokens = [];
	    var sawWS = false;
	    function getName(offset) {
	        var match = selector.slice(selectorIndex + offset).match(reName);
	        if (!match) {
	            throw new Error("Expected name, found " + selector.slice(selectorIndex));
	        }
	        var name = match[0];
	        selectorIndex += offset + name.length;
	        return unescapeCSS(name);
	    }
	    function stripWhitespace(offset) {
	        while (isWhitespace(selector.charAt(selectorIndex + offset)))
	            offset++;
	        selectorIndex += offset;
	    }
	    function isEscaped(pos) {
	        var slashCount = 0;
	        while (selector.charAt(--pos) === "\\")
	            slashCount++;
	        return (slashCount & 1) === 1;
	    }
	    function ensureNotTraversal() {
	        if (tokens.length > 0 && isTraversal(tokens[tokens.length - 1])) {
	            throw new Error("Did not expect successive traversals.");
	        }
	    }
	    stripWhitespace(0);
	    while (selector !== "") {
	        var firstChar = selector.charAt(selectorIndex);
	        if (isWhitespace(firstChar)) {
	            sawWS = true;
	            stripWhitespace(1);
	        }
	        else if (firstChar in Traversals) {
	            ensureNotTraversal();
	            tokens.push({ type: Traversals[firstChar] });
	            sawWS = false;
	            stripWhitespace(1);
	        }
	        else if (firstChar === ",") {
	            if (tokens.length === 0) {
	                throw new Error("Empty sub-selector");
	            }
	            subselects.push(tokens);
	            tokens = [];
	            sawWS = false;
	            stripWhitespace(1);
	        }
	        else if (selector.startsWith("/*", selectorIndex)) {
	            var endIndex = selector.indexOf("*/", selectorIndex + 2);
	            if (endIndex < 0) {
	                throw new Error("Comment was not terminated");
	            }
	            selectorIndex = endIndex + 2;
	        }
	        else {
	            if (sawWS) {
	                ensureNotTraversal();
	                tokens.push({ type: "descendant" });
	                sawWS = false;
	            }
	            if (firstChar in attribSelectors) {
	                var _c = attribSelectors[firstChar], name_1 = _c[0], action = _c[1];
	                tokens.push({
	                    type: "attribute",
	                    name: name_1,
	                    action: action,
	                    value: getName(1),
	                    namespace: null,
	                    // TODO: Add quirksMode option, which makes `ignoreCase` `true` for HTML.
	                    ignoreCase: options.xmlMode ? null : false,
	                });
	            }
	            else if (firstChar === "[") {
	                stripWhitespace(1);
	                // Determine attribute name and namespace
	                var namespace = null;
	                if (selector.charAt(selectorIndex) === "|") {
	                    namespace = "";
	                    selectorIndex += 1;
	                }
	                if (selector.startsWith("*|", selectorIndex)) {
	                    namespace = "*";
	                    selectorIndex += 2;
	                }
	                var name_2 = getName(0);
	                if (namespace === null &&
	                    selector.charAt(selectorIndex) === "|" &&
	                    selector.charAt(selectorIndex + 1) !== "=") {
	                    namespace = name_2;
	                    name_2 = getName(1);
	                }
	                if ((_a = options.lowerCaseAttributeNames) !== null && _a !== void 0 ? _a : !options.xmlMode) {
	                    name_2 = name_2.toLowerCase();
	                }
	                stripWhitespace(0);
	                // Determine comparison operation
	                var action = "exists";
	                var possibleAction = actionTypes$1.get(selector.charAt(selectorIndex));
	                if (possibleAction) {
	                    action = possibleAction;
	                    if (selector.charAt(selectorIndex + 1) !== "=") {
	                        throw new Error("Expected `=`");
	                    }
	                    stripWhitespace(2);
	                }
	                else if (selector.charAt(selectorIndex) === "=") {
	                    action = "equals";
	                    stripWhitespace(1);
	                }
	                // Determine value
	                var value = "";
	                var ignoreCase = null;
	                if (action !== "exists") {
	                    if (quotes.has(selector.charAt(selectorIndex))) {
	                        var quote = selector.charAt(selectorIndex);
	                        var sectionEnd = selectorIndex + 1;
	                        while (sectionEnd < selector.length &&
	                            (selector.charAt(sectionEnd) !== quote ||
	                                isEscaped(sectionEnd))) {
	                            sectionEnd += 1;
	                        }
	                        if (selector.charAt(sectionEnd) !== quote) {
	                            throw new Error("Attribute value didn't end");
	                        }
	                        value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
	                        selectorIndex = sectionEnd + 1;
	                    }
	                    else {
	                        var valueStart = selectorIndex;
	                        while (selectorIndex < selector.length &&
	                            ((!isWhitespace(selector.charAt(selectorIndex)) &&
	                                selector.charAt(selectorIndex) !== "]") ||
	                                isEscaped(selectorIndex))) {
	                            selectorIndex += 1;
	                        }
	                        value = unescapeCSS(selector.slice(valueStart, selectorIndex));
	                    }
	                    stripWhitespace(0);
	                    // See if we have a force ignore flag
	                    var forceIgnore = selector.charAt(selectorIndex);
	                    // If the forceIgnore flag is set (either `i` or `s`), use that value
	                    if (forceIgnore === "s" || forceIgnore === "S") {
	                        ignoreCase = false;
	                        stripWhitespace(1);
	                    }
	                    else if (forceIgnore === "i" || forceIgnore === "I") {
	                        ignoreCase = true;
	                        stripWhitespace(1);
	                    }
	                }
	                // If `xmlMode` is set, there are no rules; otherwise, use the `caseInsensitiveAttributes` list.
	                if (!options.xmlMode) {
	                    // TODO: Skip this for `exists`, as there is no value to compare to.
	                    ignoreCase !== null && ignoreCase !== void 0 ? ignoreCase : (ignoreCase = caseInsensitiveAttributes.has(name_2));
	                }
	                if (selector.charAt(selectorIndex) !== "]") {
	                    throw new Error("Attribute selector didn't terminate");
	                }
	                selectorIndex += 1;
	                var attributeSelector = {
	                    type: "attribute",
	                    name: name_2,
	                    action: action,
	                    value: value,
	                    namespace: namespace,
	                    ignoreCase: ignoreCase,
	                };
	                tokens.push(attributeSelector);
	            }
	            else if (firstChar === ":") {
	                if (selector.charAt(selectorIndex + 1) === ":") {
	                    tokens.push({
	                        type: "pseudo-element",
	                        name: getName(2).toLowerCase(),
	                    });
	                    continue;
	                }
	                var name_3 = getName(1).toLowerCase();
	                var data = null;
	                if (selector.charAt(selectorIndex) === "(") {
	                    if (unpackPseudos.has(name_3)) {
	                        if (quotes.has(selector.charAt(selectorIndex + 1))) {
	                            throw new Error("Pseudo-selector " + name_3 + " cannot be quoted");
	                        }
	                        data = [];
	                        selectorIndex = parseSelector(data, selector, options, selectorIndex + 1);
	                        if (selector.charAt(selectorIndex) !== ")") {
	                            throw new Error("Missing closing parenthesis in :" + name_3 + " (" + selector + ")");
	                        }
	                        selectorIndex += 1;
	                    }
	                    else {
	                        selectorIndex += 1;
	                        var start = selectorIndex;
	                        var counter = 1;
	                        for (; counter > 0 && selectorIndex < selector.length; selectorIndex++) {
	                            if (selector.charAt(selectorIndex) === "(" &&
	                                !isEscaped(selectorIndex)) {
	                                counter++;
	                            }
	                            else if (selector.charAt(selectorIndex) === ")" &&
	                                !isEscaped(selectorIndex)) {
	                                counter--;
	                            }
	                        }
	                        if (counter) {
	                            throw new Error("Parenthesis not matched");
	                        }
	                        data = selector.slice(start, selectorIndex - 1);
	                        if (stripQuotesFromPseudos.has(name_3)) {
	                            var quot = data.charAt(0);
	                            if (quot === data.slice(-1) && quotes.has(quot)) {
	                                data = data.slice(1, -1);
	                            }
	                            data = unescapeCSS(data);
	                        }
	                    }
	                }
	                tokens.push({ type: "pseudo", name: name_3, data: data });
	            }
	            else {
	                var namespace = null;
	                var name_4 = void 0;
	                if (firstChar === "*") {
	                    selectorIndex += 1;
	                    name_4 = "*";
	                }
	                else if (reName.test(selector.slice(selectorIndex))) {
	                    if (selector.charAt(selectorIndex) === "|") {
	                        namespace = "";
	                        selectorIndex += 1;
	                    }
	                    name_4 = getName(0);
	                }
	                else {
	                    /*
	                     * We have finished parsing the selector.
	                     * Remove descendant tokens at the end if they exist,
	                     * and return the last index, so that parsing can be
	                     * picked up from here.
	                     */
	                    if (tokens.length &&
	                        tokens[tokens.length - 1].type === "descendant") {
	                        tokens.pop();
	                    }
	                    addToken(subselects, tokens);
	                    return selectorIndex;
	                }
	                if (selector.charAt(selectorIndex) === "|") {
	                    namespace = name_4;
	                    if (selector.charAt(selectorIndex + 1) === "*") {
	                        name_4 = "*";
	                        selectorIndex += 2;
	                    }
	                    else {
	                        name_4 = getName(1);
	                    }
	                }
	                if (name_4 === "*") {
	                    tokens.push({ type: "universal", namespace: namespace });
	                }
	                else {
	                    if ((_b = options.lowerCaseTags) !== null && _b !== void 0 ? _b : !options.xmlMode) {
	                        name_4 = name_4.toLowerCase();
	                    }
	                    tokens.push({ type: "tag", name: name_4, namespace: namespace });
	                }
	            }
	        }
	    }
	    addToken(subselects, tokens);
	    return selectorIndex;
	}
	function addToken(subselects, tokens) {
	    if (subselects.length > 0 && tokens.length === 0) {
	        throw new Error("Empty sub-selector");
	    }
	    subselects.push(tokens);
	}

	var stringify$1 = {};

	var __spreadArray$1 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(stringify$1, "__esModule", { value: true });
	var actionTypes = {
	    equals: "",
	    element: "~",
	    start: "^",
	    end: "$",
	    any: "*",
	    not: "!",
	    hyphen: "|",
	};
	var charsToEscape = new Set(__spreadArray$1(__spreadArray$1([], Object.keys(actionTypes)
	    .map(function (typeKey) { return actionTypes[typeKey]; })
	    .filter(Boolean), true), [
	    ":",
	    "[",
	    "]",
	    " ",
	    "\\",
	    "(",
	    ")",
	    "'",
	], false));
	/**
	 * Turns `selector` back into a string.
	 *
	 * @param selector Selector to stringify.
	 */
	function stringify(selector) {
	    return selector.map(stringifySubselector).join(", ");
	}
	stringify$1.default = stringify;
	function stringifySubselector(token) {
	    return token.map(stringifyToken).join("");
	}
	function stringifyToken(token) {
	    switch (token.type) {
	        // Simple types
	        case "child":
	            return " > ";
	        case "parent":
	            return " < ";
	        case "sibling":
	            return " ~ ";
	        case "adjacent":
	            return " + ";
	        case "descendant":
	            return " ";
	        case "universal":
	            return getNamespace(token.namespace) + "*";
	        case "tag":
	            return getNamespacedName(token);
	        case "pseudo-element":
	            return "::" + escapeName(token.name);
	        case "pseudo":
	            if (token.data === null)
	                return ":" + escapeName(token.name);
	            if (typeof token.data === "string") {
	                return ":" + escapeName(token.name) + "(" + escapeName(token.data) + ")";
	            }
	            return ":" + escapeName(token.name) + "(" + stringify(token.data) + ")";
	        case "attribute": {
	            if (token.name === "id" &&
	                token.action === "equals" &&
	                !token.ignoreCase &&
	                !token.namespace) {
	                return "#" + escapeName(token.value);
	            }
	            if (token.name === "class" &&
	                token.action === "element" &&
	                !token.ignoreCase &&
	                !token.namespace) {
	                return "." + escapeName(token.value);
	            }
	            var name_1 = getNamespacedName(token);
	            if (token.action === "exists") {
	                return "[" + name_1 + "]";
	            }
	            return "[" + name_1 + actionTypes[token.action] + "='" + escapeName(token.value) + "'" + (token.ignoreCase ? "i" : token.ignoreCase === false ? "s" : "") + "]";
	        }
	    }
	}
	function getNamespacedName(token) {
	    return "" + getNamespace(token.namespace) + escapeName(token.name);
	}
	function getNamespace(namespace) {
	    return namespace !== null
	        ? (namespace === "*" ? "*" : escapeName(namespace)) + "|"
	        : "";
	}
	function escapeName(str) {
	    return str
	        .split("")
	        .map(function (c) { return (charsToEscape.has(c) ? "\\" + c : c); })
	        .join("");
	}

	(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.stringify = exports.parse = void 0;
	__exportStar(parse$5, exports);
	var parse_1 = parse$5;
	Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return __importDefault(parse_1).default; } });
	var stringify_1 = stringify$1;
	Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return __importDefault(stringify_1).default; } });
	}(lib$1));

	var sort = {};

	var procedure = {};

	(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isTraversal = exports.procedure = void 0;
	exports.procedure = {
	    universal: 50,
	    tag: 30,
	    attribute: 1,
	    pseudo: 0,
	    "pseudo-element": 0,
	    descendant: -1,
	    child: -1,
	    parent: -1,
	    sibling: -1,
	    adjacent: -1,
	    _flexibleDescendant: -1,
	};
	function isTraversal(t) {
	    return exports.procedure[t.type] < 0;
	}
	exports.isTraversal = isTraversal;
	}(procedure));

	Object.defineProperty(sort, "__esModule", { value: true });
	var procedure_1$1 = procedure;
	var attributes$1 = {
	    exists: 10,
	    equals: 8,
	    not: 7,
	    start: 6,
	    end: 6,
	    any: 5,
	    hyphen: 4,
	    element: 4,
	};
	/**
	 * Sort the parts of the passed selector,
	 * as there is potential for optimization
	 * (some types of selectors are faster than others)
	 *
	 * @param arr Selector to sort
	 */
	function sortByProcedure(arr) {
	    var procs = arr.map(getProcedure);
	    for (var i = 1; i < arr.length; i++) {
	        var procNew = procs[i];
	        if (procNew < 0)
	            continue;
	        for (var j = i - 1; j >= 0 && procNew < procs[j]; j--) {
	            var token = arr[j + 1];
	            arr[j + 1] = arr[j];
	            arr[j] = token;
	            procs[j + 1] = procs[j];
	            procs[j] = procNew;
	        }
	    }
	}
	sort.default = sortByProcedure;
	function getProcedure(token) {
	    var proc = procedure_1$1.procedure[token.type];
	    if (token.type === "attribute") {
	        proc = attributes$1[token.action];
	        if (proc === attributes$1.equals && token.name === "id") {
	            // Prefer ID selectors (eg. #ID)
	            proc = 9;
	        }
	        if (token.ignoreCase) {
	            /*
	             * IgnoreCase adds some overhead, prefer "normal" token
	             * this is a binary operation, to ensure it's still an int
	             */
	            proc >>= 1;
	        }
	    }
	    else if (token.type === "pseudo") {
	        if (!token.data) {
	            proc = 3;
	        }
	        else if (token.name === "has" || token.name === "contains") {
	            proc = 0; // Expensive in any case
	        }
	        else if (Array.isArray(token.data)) {
	            // "matches" and "not"
	            proc = 0;
	            for (var i = 0; i < token.data.length; i++) {
	                // TODO better handling of complex selectors
	                if (token.data[i].length !== 1)
	                    continue;
	                var cur = getProcedure(token.data[i][0]);
	                // Avoid executing :has or :contains
	                if (cur === 0) {
	                    proc = 0;
	                    break;
	                }
	                if (cur > proc)
	                    proc = cur;
	            }
	            if (token.data.length > 1 && proc > 0)
	                proc -= 1;
	        }
	        else {
	            proc = 1;
	        }
	    }
	    return proc;
	}

	var general = {};

	var attributes = {};

	Object.defineProperty(attributes, "__esModule", { value: true });
	attributes.attributeRules = void 0;
	var boolbase_1$2 = boolbase;
	/**
	 * All reserved characters in a regex, used for escaping.
	 *
	 * Taken from XRegExp, (c) 2007-2020 Steven Levithan under the MIT license
	 * https://github.com/slevithan/xregexp/blob/95eeebeb8fac8754d54eafe2b4743661ac1cf028/src/xregexp.js#L794
	 */
	var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
	function escapeRegex(value) {
	    return value.replace(reChars, "\\$&");
	}
	/**
	 * Attribute selectors
	 */
	attributes.attributeRules = {
	    equals: function (next, data, _a) {
	        var adapter = _a.adapter;
	        var name = data.name;
	        var value = data.value;
	        if (data.ignoreCase) {
	            value = value.toLowerCase();
	            return function (elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return (attr != null &&
	                    attr.length === value.length &&
	                    attr.toLowerCase() === value &&
	                    next(elem));
	            };
	        }
	        return function (elem) {
	            return adapter.getAttributeValue(elem, name) === value && next(elem);
	        };
	    },
	    hyphen: function (next, data, _a) {
	        var adapter = _a.adapter;
	        var name = data.name;
	        var value = data.value;
	        var len = value.length;
	        if (data.ignoreCase) {
	            value = value.toLowerCase();
	            return function hyphenIC(elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return (attr != null &&
	                    (attr.length === len || attr.charAt(len) === "-") &&
	                    attr.substr(0, len).toLowerCase() === value &&
	                    next(elem));
	            };
	        }
	        return function hyphen(elem) {
	            var attr = adapter.getAttributeValue(elem, name);
	            return (attr != null &&
	                (attr.length === len || attr.charAt(len) === "-") &&
	                attr.substr(0, len) === value &&
	                next(elem));
	        };
	    },
	    element: function (next, _a, _b) {
	        var name = _a.name, value = _a.value, ignoreCase = _a.ignoreCase;
	        var adapter = _b.adapter;
	        if (/\s/.test(value)) {
	            return boolbase_1$2.falseFunc;
	        }
	        var regex = new RegExp("(?:^|\\s)".concat(escapeRegex(value), "(?:$|\\s)"), ignoreCase ? "i" : "");
	        return function element(elem) {
	            var attr = adapter.getAttributeValue(elem, name);
	            return (attr != null &&
	                attr.length >= value.length &&
	                regex.test(attr) &&
	                next(elem));
	        };
	    },
	    exists: function (next, _a, _b) {
	        var name = _a.name;
	        var adapter = _b.adapter;
	        return function (elem) { return adapter.hasAttrib(elem, name) && next(elem); };
	    },
	    start: function (next, data, _a) {
	        var adapter = _a.adapter;
	        var name = data.name;
	        var value = data.value;
	        var len = value.length;
	        if (len === 0) {
	            return boolbase_1$2.falseFunc;
	        }
	        if (data.ignoreCase) {
	            value = value.toLowerCase();
	            return function (elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return (attr != null &&
	                    attr.length >= len &&
	                    attr.substr(0, len).toLowerCase() === value &&
	                    next(elem));
	            };
	        }
	        return function (elem) {
	            var _a;
	            return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.startsWith(value)) &&
	                next(elem);
	        };
	    },
	    end: function (next, data, _a) {
	        var adapter = _a.adapter;
	        var name = data.name;
	        var value = data.value;
	        var len = -value.length;
	        if (len === 0) {
	            return boolbase_1$2.falseFunc;
	        }
	        if (data.ignoreCase) {
	            value = value.toLowerCase();
	            return function (elem) {
	                var _a;
	                return ((_a = adapter
	                    .getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.substr(len).toLowerCase()) === value && next(elem);
	            };
	        }
	        return function (elem) {
	            var _a;
	            return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.endsWith(value)) &&
	                next(elem);
	        };
	    },
	    any: function (next, data, _a) {
	        var adapter = _a.adapter;
	        var name = data.name, value = data.value;
	        if (value === "") {
	            return boolbase_1$2.falseFunc;
	        }
	        if (data.ignoreCase) {
	            var regex_1 = new RegExp(escapeRegex(value), "i");
	            return function anyIC(elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return (attr != null &&
	                    attr.length >= value.length &&
	                    regex_1.test(attr) &&
	                    next(elem));
	            };
	        }
	        return function (elem) {
	            var _a;
	            return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.includes(value)) &&
	                next(elem);
	        };
	    },
	    not: function (next, data, _a) {
	        var adapter = _a.adapter;
	        var name = data.name;
	        var value = data.value;
	        if (value === "") {
	            return function (elem) {
	                return !!adapter.getAttributeValue(elem, name) && next(elem);
	            };
	        }
	        else if (data.ignoreCase) {
	            value = value.toLowerCase();
	            return function (elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return ((attr == null ||
	                    attr.length !== value.length ||
	                    attr.toLowerCase() !== value) &&
	                    next(elem));
	            };
	        }
	        return function (elem) {
	            return adapter.getAttributeValue(elem, name) !== value && next(elem);
	        };
	    },
	};

	var pseudoSelectors = {};

	var filters = {};

	var lib = {};

	var parse$3 = {};

	// Following http://www.w3.org/TR/css3-selectors/#nth-child-pseudo
	Object.defineProperty(parse$3, "__esModule", { value: true });
	parse$3.parse = void 0;
	// Whitespace as per https://www.w3.org/TR/selectors-3/#lex is " \t\r\n\f"
	var whitespace = new Set([9, 10, 12, 13, 32]);
	var ZERO = "0".charCodeAt(0);
	var NINE = "9".charCodeAt(0);
	/**
	 * Parses an expression.
	 *
	 * @throws An `Error` if parsing fails.
	 * @returns An array containing the integer step size and the integer offset of the nth rule.
	 * @example nthCheck.parse("2n+3"); // returns [2, 3]
	 */
	function parse$2(formula) {
	    formula = formula.trim().toLowerCase();
	    if (formula === "even") {
	        return [2, 0];
	    }
	    else if (formula === "odd") {
	        return [2, 1];
	    }
	    // Parse [ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]?
	    var idx = 0;
	    var a = 0;
	    var sign = readSign();
	    var number = readNumber();
	    if (idx < formula.length && formula.charAt(idx) === "n") {
	        idx++;
	        a = sign * (number !== null && number !== void 0 ? number : 1);
	        skipWhitespace();
	        if (idx < formula.length) {
	            sign = readSign();
	            skipWhitespace();
	            number = readNumber();
	        }
	        else {
	            sign = number = 0;
	        }
	    }
	    // Throw if there is anything else
	    if (number === null || idx < formula.length) {
	        throw new Error("n-th rule couldn't be parsed ('" + formula + "')");
	    }
	    return [a, sign * number];
	    function readSign() {
	        if (formula.charAt(idx) === "-") {
	            idx++;
	            return -1;
	        }
	        if (formula.charAt(idx) === "+") {
	            idx++;
	        }
	        return 1;
	    }
	    function readNumber() {
	        var start = idx;
	        var value = 0;
	        while (idx < formula.length &&
	            formula.charCodeAt(idx) >= ZERO &&
	            formula.charCodeAt(idx) <= NINE) {
	            value = value * 10 + (formula.charCodeAt(idx) - ZERO);
	            idx++;
	        }
	        // Return `null` if we didn't read anything.
	        return idx === start ? null : value;
	    }
	    function skipWhitespace() {
	        while (idx < formula.length &&
	            whitespace.has(formula.charCodeAt(idx))) {
	            idx++;
	        }
	    }
	}
	parse$3.parse = parse$2;

	var compile$2 = {};

	Object.defineProperty(compile$2, "__esModule", { value: true });
	compile$2.compile = void 0;
	var boolbase_1$1 = boolbase;
	/**
	 * Returns a function that checks if an elements index matches the given rule
	 * highly optimized to return the fastest solution.
	 *
	 * @param parsed A tuple [a, b], as returned by `parse`.
	 * @returns A highly optimized function that returns whether an index matches the nth-check.
	 * @example
	 * const check = nthCheck.compile([2, 3]);
	 *
	 * check(0); // `false`
	 * check(1); // `false`
	 * check(2); // `true`
	 * check(3); // `false`
	 * check(4); // `true`
	 * check(5); // `false`
	 * check(6); // `true`
	 */
	function compile$1(parsed) {
	    var a = parsed[0];
	    // Subtract 1 from `b`, to convert from one- to zero-indexed.
	    var b = parsed[1] - 1;
	    /*
	     * When `b <= 0`, `a * n` won't be lead to any matches for `a < 0`.
	     * Besides, the specification states that no elements are
	     * matched when `a` and `b` are 0.
	     *
	     * `b < 0` here as we subtracted 1 from `b` above.
	     */
	    if (b < 0 && a <= 0)
	        return boolbase_1$1.falseFunc;
	    // When `a` is in the range -1..1, it matches any element (so only `b` is checked).
	    if (a === -1)
	        return function (index) { return index <= b; };
	    if (a === 0)
	        return function (index) { return index === b; };
	    // When `b <= 0` and `a === 1`, they match any element.
	    if (a === 1)
	        return b < 0 ? boolbase_1$1.trueFunc : function (index) { return index >= b; };
	    /*
	     * Otherwise, modulo can be used to check if there is a match.
	     *
	     * Modulo doesn't care about the sign, so let's use `a`s absolute value.
	     */
	    var absA = Math.abs(a);
	    // Get `b mod a`, + a if this is negative.
	    var bMod = ((b % absA) + absA) % absA;
	    return a > 1
	        ? function (index) { return index >= b && index % absA === bMod; }
	        : function (index) { return index <= b && index % absA === bMod; };
	}
	compile$2.compile = compile$1;

	(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.compile = exports.parse = void 0;
	var parse_1 = parse$3;
	Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parse_1.parse; } });
	var compile_1 = compile$2;
	Object.defineProperty(exports, "compile", { enumerable: true, get: function () { return compile_1.compile; } });
	/**
	 * Parses and compiles a formula to a highly optimized function.
	 * Combination of `parse` and `compile`.
	 *
	 * If the formula doesn't match any elements,
	 * it returns [`boolbase`](https://github.com/fb55/boolbase)'s `falseFunc`.
	 * Otherwise, a function accepting an _index_ is returned, which returns
	 * whether or not the passed _index_ matches the formula.
	 *
	 * Note: The nth-rule starts counting at `1`, the returned function at `0`.
	 *
	 * @param formula The formula to compile.
	 * @example
	 * const check = nthCheck("2n+3");
	 *
	 * check(0); // `false`
	 * check(1); // `false`
	 * check(2); // `true`
	 * check(3); // `false`
	 * check(4); // `true`
	 * check(5); // `false`
	 * check(6); // `true`
	 */
	function nthCheck(formula) {
	    return (0, compile_1.compile)((0, parse_1.parse)(formula));
	}
	exports.default = nthCheck;
	}(lib));

	(function (exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.filters = void 0;
	var nth_check_1 = __importDefault(lib);
	var boolbase_1 = boolbase;
	function getChildFunc(next, adapter) {
	    return function (elem) {
	        var parent = adapter.getParent(elem);
	        return parent != null && adapter.isTag(parent) && next(elem);
	    };
	}
	exports.filters = {
	    contains: function (next, text, _a) {
	        var adapter = _a.adapter;
	        return function contains(elem) {
	            return next(elem) && adapter.getText(elem).includes(text);
	        };
	    },
	    icontains: function (next, text, _a) {
	        var adapter = _a.adapter;
	        var itext = text.toLowerCase();
	        return function icontains(elem) {
	            return (next(elem) &&
	                adapter.getText(elem).toLowerCase().includes(itext));
	        };
	    },
	    // Location specific methods
	    "nth-child": function (next, rule, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var func = (0, nth_check_1.default)(rule);
	        if (func === boolbase_1.falseFunc)
	            return boolbase_1.falseFunc;
	        if (func === boolbase_1.trueFunc)
	            return getChildFunc(next, adapter);
	        return function nthChild(elem) {
	            var siblings = adapter.getSiblings(elem);
	            var pos = 0;
	            for (var i = 0; i < siblings.length; i++) {
	                if (equals(elem, siblings[i]))
	                    break;
	                if (adapter.isTag(siblings[i])) {
	                    pos++;
	                }
	            }
	            return func(pos) && next(elem);
	        };
	    },
	    "nth-last-child": function (next, rule, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var func = (0, nth_check_1.default)(rule);
	        if (func === boolbase_1.falseFunc)
	            return boolbase_1.falseFunc;
	        if (func === boolbase_1.trueFunc)
	            return getChildFunc(next, adapter);
	        return function nthLastChild(elem) {
	            var siblings = adapter.getSiblings(elem);
	            var pos = 0;
	            for (var i = siblings.length - 1; i >= 0; i--) {
	                if (equals(elem, siblings[i]))
	                    break;
	                if (adapter.isTag(siblings[i])) {
	                    pos++;
	                }
	            }
	            return func(pos) && next(elem);
	        };
	    },
	    "nth-of-type": function (next, rule, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var func = (0, nth_check_1.default)(rule);
	        if (func === boolbase_1.falseFunc)
	            return boolbase_1.falseFunc;
	        if (func === boolbase_1.trueFunc)
	            return getChildFunc(next, adapter);
	        return function nthOfType(elem) {
	            var siblings = adapter.getSiblings(elem);
	            var pos = 0;
	            for (var i = 0; i < siblings.length; i++) {
	                var currentSibling = siblings[i];
	                if (equals(elem, currentSibling))
	                    break;
	                if (adapter.isTag(currentSibling) &&
	                    adapter.getName(currentSibling) === adapter.getName(elem)) {
	                    pos++;
	                }
	            }
	            return func(pos) && next(elem);
	        };
	    },
	    "nth-last-of-type": function (next, rule, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var func = (0, nth_check_1.default)(rule);
	        if (func === boolbase_1.falseFunc)
	            return boolbase_1.falseFunc;
	        if (func === boolbase_1.trueFunc)
	            return getChildFunc(next, adapter);
	        return function nthLastOfType(elem) {
	            var siblings = adapter.getSiblings(elem);
	            var pos = 0;
	            for (var i = siblings.length - 1; i >= 0; i--) {
	                var currentSibling = siblings[i];
	                if (equals(elem, currentSibling))
	                    break;
	                if (adapter.isTag(currentSibling) &&
	                    adapter.getName(currentSibling) === adapter.getName(elem)) {
	                    pos++;
	                }
	            }
	            return func(pos) && next(elem);
	        };
	    },
	    // TODO determine the actual root element
	    root: function (next, _rule, _a) {
	        var adapter = _a.adapter;
	        return function (elem) {
	            var parent = adapter.getParent(elem);
	            return (parent == null || !adapter.isTag(parent)) && next(elem);
	        };
	    },
	    scope: function (next, rule, options, context) {
	        var equals = options.equals;
	        if (!context || context.length === 0) {
	            // Equivalent to :root
	            return exports.filters.root(next, rule, options);
	        }
	        if (context.length === 1) {
	            // NOTE: can't be unpacked, as :has uses this for side-effects
	            return function (elem) { return equals(context[0], elem) && next(elem); };
	        }
	        return function (elem) { return context.includes(elem) && next(elem); };
	    },
	    hover: dynamicStatePseudo("isHovered"),
	    visited: dynamicStatePseudo("isVisited"),
	    active: dynamicStatePseudo("isActive"),
	};
	/**
	 * Dynamic state pseudos. These depend on optional Adapter methods.
	 *
	 * @param name The name of the adapter method to call.
	 * @returns Pseudo for the `filters` object.
	 */
	function dynamicStatePseudo(name) {
	    return function dynamicPseudo(next, _rule, _a) {
	        var adapter = _a.adapter;
	        var func = adapter[name];
	        if (typeof func !== "function") {
	            return boolbase_1.falseFunc;
	        }
	        return function active(elem) {
	            return func(elem) && next(elem);
	        };
	    };
	}
	}(filters));

	var pseudos = {};

	Object.defineProperty(pseudos, "__esModule", { value: true });
	pseudos.verifyPseudoArgs = pseudos.pseudos = void 0;
	// While filters are precompiled, pseudos get called when they are needed
	pseudos.pseudos = {
	    empty: function (elem, _a) {
	        var adapter = _a.adapter;
	        return !adapter.getChildren(elem).some(function (elem) {
	            // FIXME: `getText` call is potentially expensive.
	            return adapter.isTag(elem) || adapter.getText(elem) !== "";
	        });
	    },
	    "first-child": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var firstChild = adapter
	            .getSiblings(elem)
	            .find(function (elem) { return adapter.isTag(elem); });
	        return firstChild != null && equals(elem, firstChild);
	    },
	    "last-child": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var siblings = adapter.getSiblings(elem);
	        for (var i = siblings.length - 1; i >= 0; i--) {
	            if (equals(elem, siblings[i]))
	                return true;
	            if (adapter.isTag(siblings[i]))
	                break;
	        }
	        return false;
	    },
	    "first-of-type": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var siblings = adapter.getSiblings(elem);
	        var elemName = adapter.getName(elem);
	        for (var i = 0; i < siblings.length; i++) {
	            var currentSibling = siblings[i];
	            if (equals(elem, currentSibling))
	                return true;
	            if (adapter.isTag(currentSibling) &&
	                adapter.getName(currentSibling) === elemName) {
	                break;
	            }
	        }
	        return false;
	    },
	    "last-of-type": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var siblings = adapter.getSiblings(elem);
	        var elemName = adapter.getName(elem);
	        for (var i = siblings.length - 1; i >= 0; i--) {
	            var currentSibling = siblings[i];
	            if (equals(elem, currentSibling))
	                return true;
	            if (adapter.isTag(currentSibling) &&
	                adapter.getName(currentSibling) === elemName) {
	                break;
	            }
	        }
	        return false;
	    },
	    "only-of-type": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var elemName = adapter.getName(elem);
	        return adapter
	            .getSiblings(elem)
	            .every(function (sibling) {
	            return equals(elem, sibling) ||
	                !adapter.isTag(sibling) ||
	                adapter.getName(sibling) !== elemName;
	        });
	    },
	    "only-child": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        return adapter
	            .getSiblings(elem)
	            .every(function (sibling) { return equals(elem, sibling) || !adapter.isTag(sibling); });
	    },
	};
	function verifyPseudoArgs(func, name, subselect) {
	    if (subselect === null) {
	        if (func.length > 2) {
	            throw new Error("pseudo-selector :".concat(name, " requires an argument"));
	        }
	    }
	    else if (func.length === 2) {
	        throw new Error("pseudo-selector :".concat(name, " doesn't have any arguments"));
	    }
	}
	pseudos.verifyPseudoArgs = verifyPseudoArgs;

	var aliases = {};

	Object.defineProperty(aliases, "__esModule", { value: true });
	aliases.aliases = void 0;
	/**
	 * Aliases are pseudos that are expressed as selectors.
	 */
	aliases.aliases = {
	    // Links
	    "any-link": ":is(a, area, link)[href]",
	    link: ":any-link:not(:visited)",
	    // Forms
	    // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
	    disabled: ":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",
	    enabled: ":not(:disabled)",
	    checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
	    required: ":is(input, select, textarea)[required]",
	    optional: ":is(input, select, textarea):not([required])",
	    // JQuery extensions
	    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
	    selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
	    checkbox: "[type=checkbox]",
	    file: "[type=file]",
	    password: "[type=password]",
	    radio: "[type=radio]",
	    reset: "[type=reset]",
	    image: "[type=image]",
	    submit: "[type=submit]",
	    parent: ":not(:empty)",
	    header: ":is(h1, h2, h3, h4, h5, h6)",
	    button: ":is(button, input[type=button])",
	    input: ":is(input, textarea, select, button)",
	    text: "input:is(:not([type!='']), [type=text])",
	};

	var subselects = {};

	(function (exports) {
	var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.subselects = exports.getNextSiblings = exports.ensureIsTag = exports.PLACEHOLDER_ELEMENT = void 0;
	var boolbase_1 = boolbase;
	var procedure_1 = procedure;
	/** Used as a placeholder for :has. Will be replaced with the actual element. */
	exports.PLACEHOLDER_ELEMENT = {};
	function ensureIsTag(next, adapter) {
	    if (next === boolbase_1.falseFunc)
	        return boolbase_1.falseFunc;
	    return function (elem) { return adapter.isTag(elem) && next(elem); };
	}
	exports.ensureIsTag = ensureIsTag;
	function getNextSiblings(elem, adapter) {
	    var siblings = adapter.getSiblings(elem);
	    if (siblings.length <= 1)
	        return [];
	    var elemIndex = siblings.indexOf(elem);
	    if (elemIndex < 0 || elemIndex === siblings.length - 1)
	        return [];
	    return siblings.slice(elemIndex + 1).filter(adapter.isTag);
	}
	exports.getNextSiblings = getNextSiblings;
	var is = function (next, token, options, context, compileToken) {
	    var opts = {
	        xmlMode: !!options.xmlMode,
	        adapter: options.adapter,
	        equals: options.equals,
	    };
	    var func = compileToken(token, opts, context);
	    return function (elem) { return func(elem) && next(elem); };
	};
	/*
	 * :not, :has, :is, :matches and :where have to compile selectors
	 * doing this in src/pseudos.ts would lead to circular dependencies,
	 * so we add them here
	 */
	exports.subselects = {
	    is: is,
	    /**
	     * `:matches` and `:where` are aliases for `:is`.
	     */
	    matches: is,
	    where: is,
	    not: function (next, token, options, context, compileToken) {
	        var opts = {
	            xmlMode: !!options.xmlMode,
	            adapter: options.adapter,
	            equals: options.equals,
	        };
	        var func = compileToken(token, opts, context);
	        if (func === boolbase_1.falseFunc)
	            return next;
	        if (func === boolbase_1.trueFunc)
	            return boolbase_1.falseFunc;
	        return function not(elem) {
	            return !func(elem) && next(elem);
	        };
	    },
	    has: function (next, subselect, options, _context, compileToken) {
	        var adapter = options.adapter;
	        var opts = {
	            xmlMode: !!options.xmlMode,
	            adapter: adapter,
	            equals: options.equals,
	        };
	        // @ts-expect-error Uses an array as a pointer to the current element (side effects)
	        var context = subselect.some(function (s) {
	            return s.some(procedure_1.isTraversal);
	        })
	            ? [exports.PLACEHOLDER_ELEMENT]
	            : undefined;
	        var compiled = compileToken(subselect, opts, context);
	        if (compiled === boolbase_1.falseFunc)
	            return boolbase_1.falseFunc;
	        if (compiled === boolbase_1.trueFunc) {
	            return function (elem) {
	                return adapter.getChildren(elem).some(adapter.isTag) && next(elem);
	            };
	        }
	        var hasElement = ensureIsTag(compiled, adapter);
	        var _a = compiled.shouldTestNextSiblings, shouldTestNextSiblings = _a === void 0 ? false : _a;
	        /*
	         * `shouldTestNextSiblings` will only be true if the query starts with
	         * a traversal (sibling or adjacent). That means we will always have a context.
	         */
	        if (context) {
	            return function (elem) {
	                context[0] = elem;
	                var childs = adapter.getChildren(elem);
	                var nextElements = shouldTestNextSiblings
	                    ? __spreadArray(__spreadArray([], childs, true), getNextSiblings(elem, adapter), true) : childs;
	                return (next(elem) && adapter.existsOne(hasElement, nextElements));
	            };
	        }
	        return function (elem) {
	            return next(elem) &&
	                adapter.existsOne(hasElement, adapter.getChildren(elem));
	        };
	    },
	};
	}(subselects));

	(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.compilePseudoSelector = exports.aliases = exports.pseudos = exports.filters = void 0;
	/*
	 * Pseudo selectors
	 *
	 * Pseudo selectors are available in three forms:
	 *
	 * 1. Filters are called when the selector is compiled and return a function
	 *  that has to return either false, or the results of `next()`.
	 * 2. Pseudos are called on execution. They have to return a boolean.
	 * 3. Subselects work like filters, but have an embedded selector that will be run separately.
	 *
	 * Filters are great if you want to do some pre-processing, or change the call order
	 * of `next()` and your code.
	 * Pseudos should be used to implement simple checks.
	 */
	var boolbase_1 = boolbase;
	var css_what_1 = lib$1;
	var filters_1 = filters;
	Object.defineProperty(exports, "filters", { enumerable: true, get: function () { return filters_1.filters; } });
	var pseudos_1 = pseudos;
	Object.defineProperty(exports, "pseudos", { enumerable: true, get: function () { return pseudos_1.pseudos; } });
	var aliases_1 = aliases;
	Object.defineProperty(exports, "aliases", { enumerable: true, get: function () { return aliases_1.aliases; } });
	var subselects_1 = subselects;
	function compilePseudoSelector(next, selector, options, context, compileToken) {
	    var name = selector.name, data = selector.data;
	    if (Array.isArray(data)) {
	        return subselects_1.subselects[name](next, data, options, context, compileToken);
	    }
	    if (name in aliases_1.aliases) {
	        if (data != null) {
	            throw new Error("Pseudo ".concat(name, " doesn't have any arguments"));
	        }
	        // The alias has to be parsed here, to make sure options are respected.
	        var alias = (0, css_what_1.parse)(aliases_1.aliases[name], options);
	        return subselects_1.subselects.is(next, alias, options, context, compileToken);
	    }
	    if (name in filters_1.filters) {
	        return filters_1.filters[name](next, data, options, context);
	    }
	    if (name in pseudos_1.pseudos) {
	        var pseudo_1 = pseudos_1.pseudos[name];
	        (0, pseudos_1.verifyPseudoArgs)(pseudo_1, name, data);
	        return pseudo_1 === boolbase_1.falseFunc
	            ? boolbase_1.falseFunc
	            : next === boolbase_1.trueFunc
	                ? function (elem) { return pseudo_1(elem, options, data); }
	                : function (elem) { return pseudo_1(elem, options, data) && next(elem); };
	    }
	    throw new Error("unmatched pseudo-class :".concat(name));
	}
	exports.compilePseudoSelector = compilePseudoSelector;
	}(pseudoSelectors));

	Object.defineProperty(general, "__esModule", { value: true });
	general.compileGeneralSelector = void 0;
	var attributes_1 = attributes;
	var pseudo_selectors_1 = pseudoSelectors;
	/*
	 * All available rules
	 */
	function compileGeneralSelector(next, selector, options, context, compileToken) {
	    var adapter = options.adapter, equals = options.equals;
	    switch (selector.type) {
	        case "pseudo-element":
	            throw new Error("Pseudo-elements are not supported by css-select");
	        case "attribute":
	            return attributes_1.attributeRules[selector.action](next, selector, options);
	        case "pseudo":
	            return (0, pseudo_selectors_1.compilePseudoSelector)(next, selector, options, context, compileToken);
	        // Tags
	        case "tag":
	            return function tag(elem) {
	                return adapter.getName(elem) === selector.name && next(elem);
	            };
	        // Traversal
	        case "descendant":
	            if (options.cacheResults === false ||
	                typeof WeakSet === "undefined") {
	                return function descendant(elem) {
	                    var current = elem;
	                    while ((current = adapter.getParent(current))) {
	                        if (adapter.isTag(current) && next(current)) {
	                            return true;
	                        }
	                    }
	                    return false;
	                };
	            }
	            // @ts-expect-error `ElementNode` is not extending object
	            // eslint-disable-next-line no-case-declarations
	            var isFalseCache_1 = new WeakSet();
	            return function cachedDescendant(elem) {
	                var current = elem;
	                while ((current = adapter.getParent(current))) {
	                    if (!isFalseCache_1.has(current)) {
	                        if (adapter.isTag(current) && next(current)) {
	                            return true;
	                        }
	                        isFalseCache_1.add(current);
	                    }
	                }
	                return false;
	            };
	        case "_flexibleDescendant":
	            // Include element itself, only used while querying an array
	            return function flexibleDescendant(elem) {
	                var current = elem;
	                do {
	                    if (adapter.isTag(current) && next(current))
	                        return true;
	                } while ((current = adapter.getParent(current)));
	                return false;
	            };
	        case "parent":
	            return function parent(elem) {
	                return adapter
	                    .getChildren(elem)
	                    .some(function (elem) { return adapter.isTag(elem) && next(elem); });
	            };
	        case "child":
	            return function child(elem) {
	                var parent = adapter.getParent(elem);
	                return parent != null && adapter.isTag(parent) && next(parent);
	            };
	        case "sibling":
	            return function sibling(elem) {
	                var siblings = adapter.getSiblings(elem);
	                for (var i = 0; i < siblings.length; i++) {
	                    var currentSibling = siblings[i];
	                    if (equals(elem, currentSibling))
	                        break;
	                    if (adapter.isTag(currentSibling) && next(currentSibling)) {
	                        return true;
	                    }
	                }
	                return false;
	            };
	        case "adjacent":
	            return function adjacent(elem) {
	                var siblings = adapter.getSiblings(elem);
	                var lastElement;
	                for (var i = 0; i < siblings.length; i++) {
	                    var currentSibling = siblings[i];
	                    if (equals(elem, currentSibling))
	                        break;
	                    if (adapter.isTag(currentSibling)) {
	                        lastElement = currentSibling;
	                    }
	                }
	                return !!lastElement && next(lastElement);
	            };
	        case "universal":
	            return next;
	    }
	}
	general.compileGeneralSelector = compileGeneralSelector;

	var __importDefault$3 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(compile$3, "__esModule", { value: true });
	compile$3.compileToken = compile$3.compileUnsafe = compile$3.compile = void 0;
	var css_what_1 = lib$1;
	var boolbase_1 = boolbase;
	var sort_1 = __importDefault$3(sort);
	var procedure_1 = procedure;
	var general_1 = general;
	var subselects_1 = subselects;
	/**
	 * Compiles a selector to an executable function.
	 *
	 * @param selector Selector to compile.
	 * @param options Compilation options.
	 * @param context Optional context for the selector.
	 */
	function compile(selector, options, context) {
	    var next = compileUnsafe(selector, options, context);
	    return (0, subselects_1.ensureIsTag)(next, options.adapter);
	}
	compile$3.compile = compile;
	function compileUnsafe(selector, options, context) {
	    var token = typeof selector === "string" ? (0, css_what_1.parse)(selector, options) : selector;
	    return compileToken(token, options, context);
	}
	compile$3.compileUnsafe = compileUnsafe;
	function includesScopePseudo(t) {
	    return (t.type === "pseudo" &&
	        (t.name === "scope" ||
	            (Array.isArray(t.data) &&
	                t.data.some(function (data) { return data.some(includesScopePseudo); }))));
	}
	var DESCENDANT_TOKEN = { type: "descendant" };
	var FLEXIBLE_DESCENDANT_TOKEN = {
	    type: "_flexibleDescendant",
	};
	var SCOPE_TOKEN = { type: "pseudo", name: "scope", data: null };
	/*
	 * CSS 4 Spec (Draft): 3.3.1. Absolutizing a Scope-relative Selector
	 * http://www.w3.org/TR/selectors4/#absolutizing
	 */
	function absolutize(token, _a, context) {
	    var adapter = _a.adapter;
	    // TODO Use better check if the context is a document
	    var hasContext = !!(context === null || context === void 0 ? void 0 : context.every(function (e) {
	        var parent = adapter.isTag(e) && adapter.getParent(e);
	        return e === subselects_1.PLACEHOLDER_ELEMENT || (parent && adapter.isTag(parent));
	    }));
	    for (var _i = 0, token_1 = token; _i < token_1.length; _i++) {
	        var t = token_1[_i];
	        if (t.length > 0 && (0, procedure_1.isTraversal)(t[0]) && t[0].type !== "descendant") ;
	        else if (hasContext && !t.some(includesScopePseudo)) {
	            t.unshift(DESCENDANT_TOKEN);
	        }
	        else {
	            continue;
	        }
	        t.unshift(SCOPE_TOKEN);
	    }
	}
	function compileToken(token, options, context) {
	    var _a;
	    token = token.filter(function (t) { return t.length > 0; });
	    token.forEach(sort_1.default);
	    context = (_a = options.context) !== null && _a !== void 0 ? _a : context;
	    var isArrayContext = Array.isArray(context);
	    var finalContext = context && (Array.isArray(context) ? context : [context]);
	    absolutize(token, options, finalContext);
	    var shouldTestNextSiblings = false;
	    var query = token
	        .map(function (rules) {
	        if (rules.length >= 2) {
	            var first = rules[0], second = rules[1];
	            if (first.type !== "pseudo" || first.name !== "scope") ;
	            else if (isArrayContext && second.type === "descendant") {
	                rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
	            }
	            else if (second.type === "adjacent" ||
	                second.type === "sibling") {
	                shouldTestNextSiblings = true;
	            }
	        }
	        return compileRules(rules, options, finalContext);
	    })
	        .reduce(reduceRules, boolbase_1.falseFunc);
	    query.shouldTestNextSiblings = shouldTestNextSiblings;
	    return query;
	}
	compile$3.compileToken = compileToken;
	function compileRules(rules, options, context) {
	    var _a;
	    return rules.reduce(function (previous, rule) {
	        return previous === boolbase_1.falseFunc
	            ? boolbase_1.falseFunc
	            : (0, general_1.compileGeneralSelector)(previous, rule, options, context, compileToken);
	    }, (_a = options.rootFunc) !== null && _a !== void 0 ? _a : boolbase_1.trueFunc);
	}
	function reduceRules(a, b) {
	    if (b === boolbase_1.falseFunc || a === boolbase_1.trueFunc) {
	        return a;
	    }
	    if (a === boolbase_1.falseFunc || b === boolbase_1.trueFunc) {
	        return b;
	    }
	    return function combine(elem) {
	        return a(elem) || b(elem);
	    };
	}

	(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.aliases = exports.pseudos = exports.filters = exports.is = exports.selectOne = exports.selectAll = exports.prepareContext = exports._compileToken = exports._compileUnsafe = exports.compile = void 0;
	var DomUtils = __importStar(lib$6);
	var boolbase_1 = boolbase;
	var compile_1 = compile$3;
	var subselects_1 = subselects;
	var defaultEquals = function (a, b) { return a === b; };
	var defaultOptions = {
	    adapter: DomUtils,
	    equals: defaultEquals,
	};
	function convertOptionFormats(options) {
	    var _a, _b, _c, _d;
	    /*
	     * We force one format of options to the other one.
	     */
	    // @ts-expect-error Default options may have incompatible `Node` / `ElementNode`.
	    var opts = options !== null && options !== void 0 ? options : defaultOptions;
	    // @ts-expect-error Same as above.
	    (_a = opts.adapter) !== null && _a !== void 0 ? _a : (opts.adapter = DomUtils);
	    // @ts-expect-error `equals` does not exist on `Options`
	    (_b = opts.equals) !== null && _b !== void 0 ? _b : (opts.equals = (_d = (_c = opts.adapter) === null || _c === void 0 ? void 0 : _c.equals) !== null && _d !== void 0 ? _d : defaultEquals);
	    return opts;
	}
	function wrapCompile(func) {
	    return function addAdapter(selector, options, context) {
	        var opts = convertOptionFormats(options);
	        return func(selector, opts, context);
	    };
	}
	/**
	 * Compiles the query, returns a function.
	 */
	exports.compile = wrapCompile(compile_1.compile);
	exports._compileUnsafe = wrapCompile(compile_1.compileUnsafe);
	exports._compileToken = wrapCompile(compile_1.compileToken);
	function getSelectorFunc(searchFunc) {
	    return function select(query, elements, options) {
	        var opts = convertOptionFormats(options);
	        if (typeof query !== "function") {
	            query = (0, compile_1.compileUnsafe)(query, opts, elements);
	        }
	        var filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
	        return searchFunc(query, filteredElements, opts);
	    };
	}
	function prepareContext(elems, adapter, shouldTestNextSiblings) {
	    if (shouldTestNextSiblings === void 0) { shouldTestNextSiblings = false; }
	    /*
	     * Add siblings if the query requires them.
	     * See https://github.com/fb55/css-select/pull/43#issuecomment-225414692
	     */
	    if (shouldTestNextSiblings) {
	        elems = appendNextSiblings(elems, adapter);
	    }
	    return Array.isArray(elems)
	        ? adapter.removeSubsets(elems)
	        : adapter.getChildren(elems);
	}
	exports.prepareContext = prepareContext;
	function appendNextSiblings(elem, adapter) {
	    // Order matters because jQuery seems to check the children before the siblings
	    var elems = Array.isArray(elem) ? elem.slice(0) : [elem];
	    var elemsLength = elems.length;
	    for (var i = 0; i < elemsLength; i++) {
	        var nextSiblings = (0, subselects_1.getNextSiblings)(elems[i], adapter);
	        elems.push.apply(elems, nextSiblings);
	    }
	    return elems;
	}
	/**
	 * @template Node The generic Node type for the DOM adapter being used.
	 * @template ElementNode The Node type for elements for the DOM adapter being used.
	 * @param elems Elements to query. If it is an element, its children will be queried..
	 * @param query can be either a CSS selector string or a compiled query function.
	 * @param [options] options for querying the document.
	 * @see compile for supported selector queries.
	 * @returns All matching elements.
	 *
	 */
	exports.selectAll = getSelectorFunc(function (query, elems, options) {
	    return query === boolbase_1.falseFunc || !elems || elems.length === 0
	        ? []
	        : options.adapter.findAll(query, elems);
	});
	/**
	 * @template Node The generic Node type for the DOM adapter being used.
	 * @template ElementNode The Node type for elements for the DOM adapter being used.
	 * @param elems Elements to query. If it is an element, its children will be queried..
	 * @param query can be either a CSS selector string or a compiled query function.
	 * @param [options] options for querying the document.
	 * @see compile for supported selector queries.
	 * @returns the first match, or null if there was no match.
	 */
	exports.selectOne = getSelectorFunc(function (query, elems, options) {
	    return query === boolbase_1.falseFunc || !elems || elems.length === 0
	        ? null
	        : options.adapter.findOne(query, elems);
	});
	/**
	 * Tests whether or not an element is matched by query.
	 *
	 * @template Node The generic Node type for the DOM adapter being used.
	 * @template ElementNode The Node type for elements for the DOM adapter being used.
	 * @param elem The element to test if it matches the query.
	 * @param query can be either a CSS selector string or a compiled query function.
	 * @param [options] options for querying the document.
	 * @see compile for supported selector queries.
	 * @returns
	 */
	function is(elem, query, options) {
	    var opts = convertOptionFormats(options);
	    return (typeof query === "function" ? query : (0, compile_1.compile)(query, opts))(elem);
	}
	exports.is = is;
	/**
	 * Alias for selectAll(query, elems, options).
	 * @see [compile] for supported selector queries.
	 */
	exports.default = exports.selectAll;
	// Export filters, pseudos and aliases to allow users to supply their own.
	var pseudo_selectors_1 = pseudoSelectors;
	Object.defineProperty(exports, "filters", { enumerable: true, get: function () { return pseudo_selectors_1.filters; } });
	Object.defineProperty(exports, "pseudos", { enumerable: true, get: function () { return pseudo_selectors_1.pseudos; } });
	Object.defineProperty(exports, "aliases", { enumerable: true, get: function () { return pseudo_selectors_1.aliases; } });
	}(lib$7));

	var text = {};

	var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __importDefault$2 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(text, "__esModule", { value: true });
	var he_1$1 = he.exports;
	var node_1$1 = __importDefault$2(node$1);
	var type_1$2 = __importDefault$2(type);
	/**
	 * TextNode to contain a text element in DOM tree.
	 * @param {string} value [description]
	 */
	var TextNode = /** @class */ (function (_super) {
	    __extends$1(TextNode, _super);
	    function TextNode(rawText, parentNode, range) {
	        var _this = _super.call(this, parentNode, range) || this;
	        /**
	         * Node Type declaration.
	         * @type {Number}
	         */
	        _this.nodeType = type_1$2.default.TEXT_NODE;
	        _this._rawText = rawText;
	        return _this;
	    }
	    Object.defineProperty(TextNode.prototype, "rawText", {
	        get: function () {
	            return this._rawText;
	        },
	        /**
	         * Set rawText and invalidate trimmed caches
	         */
	        set: function (text) {
	            this._rawText = text;
	            this._trimmedRawText = void 0;
	            this._trimmedText = void 0;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(TextNode.prototype, "trimmedRawText", {
	        /**
	         * Returns raw text with all whitespace trimmed except single leading/trailing non-breaking space
	         */
	        get: function () {
	            if (this._trimmedRawText !== undefined)
	                return this._trimmedRawText;
	            this._trimmedRawText = trimText(this.rawText);
	            return this._trimmedRawText;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(TextNode.prototype, "trimmedText", {
	        /**
	         * Returns text with all whitespace trimmed except single leading/trailing non-breaking space
	         */
	        get: function () {
	            if (this._trimmedText !== undefined)
	                return this._trimmedText;
	            this._trimmedText = trimText(this.text);
	            return this._trimmedText;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(TextNode.prototype, "text", {
	        /**
	         * Get unescaped text value of current node and its children.
	         * @return {string} text content
	         */
	        get: function () {
	            return (0, he_1$1.decode)(this.rawText);
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(TextNode.prototype, "isWhitespace", {
	        /**
	         * Detect if the node contains only white space.
	         * @return {boolean}
	         */
	        get: function () {
	            return /^(\s|&nbsp;)*$/.test(this.rawText);
	        },
	        enumerable: false,
	        configurable: true
	    });
	    TextNode.prototype.toString = function () {
	        return this.rawText;
	    };
	    return TextNode;
	}(node_1$1.default));
	text.default = TextNode;
	/**
	 * Trim whitespace except single leading/trailing non-breaking space
	 */
	function trimText(text) {
	    var i = 0;
	    var startPos;
	    var endPos;
	    while (i >= 0 && i < text.length) {
	        if (/\S/.test(text[i])) {
	            if (startPos === undefined) {
	                startPos = i;
	                i = text.length;
	            }
	            else {
	                endPos = i;
	                i = void 0;
	            }
	        }
	        if (startPos === undefined)
	            i++;
	        else
	            i--;
	    }
	    if (startPos === undefined)
	        startPos = 0;
	    if (endPos === undefined)
	        endPos = text.length - 1;
	    var hasLeadingSpace = startPos > 0 && /[^\S\r\n]/.test(text[startPos - 1]);
	    var hasTrailingSpace = endPos < (text.length - 1) && /[^\S\r\n]/.test(text[endPos + 1]);
	    return (hasLeadingSpace ? ' ' : '') + text.slice(startPos, endPos + 1) + (hasTrailingSpace ? ' ' : '');
	}

	var matcher = {};

	var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(matcher, "__esModule", { value: true });
	var type_1$1 = __importDefault$1(type);
	function isTag(node) {
	    return node && node.nodeType === type_1$1.default.ELEMENT_NODE;
	}
	function getAttributeValue(elem, name) {
	    return isTag(elem) ? elem.getAttribute(name) : undefined;
	}
	function getName(elem) {
	    return ((elem && elem.rawTagName) || '').toLowerCase();
	}
	function getChildren(node) {
	    return node && node.childNodes;
	}
	function getParent(node) {
	    return node ? node.parentNode : null;
	}
	function getText(node) {
	    return node.text;
	}
	function removeSubsets(nodes) {
	    var idx = nodes.length;
	    var node;
	    var ancestor;
	    var replace;
	    // Check if each node (or one of its ancestors) is already contained in the
	    // array.
	    while (--idx > -1) {
	        node = ancestor = nodes[idx];
	        // Temporarily remove the node under consideration
	        nodes[idx] = null;
	        replace = true;
	        while (ancestor) {
	            if (nodes.indexOf(ancestor) > -1) {
	                replace = false;
	                nodes.splice(idx, 1);
	                break;
	            }
	            ancestor = getParent(ancestor);
	        }
	        // If the node has been found to be unique, re-insert it.
	        if (replace) {
	            nodes[idx] = node;
	        }
	    }
	    return nodes;
	}
	function existsOne(test, elems) {
	    return elems.some(function (elem) {
	        return isTag(elem) ? test(elem) || existsOne(test, getChildren(elem)) : false;
	    });
	}
	function getSiblings(node) {
	    var parent = getParent(node);
	    return parent && getChildren(parent);
	}
	function hasAttrib(elem, name) {
	    return getAttributeValue(elem, name) !== undefined;
	}
	function findOne(test, elems) {
	    var elem = null;
	    for (var i = 0, l = elems.length; i < l && !elem; i++) {
	        var el = elems[i];
	        if (test(el)) {
	            elem = el;
	        }
	        else {
	            var childs = getChildren(el);
	            if (childs && childs.length > 0) {
	                elem = findOne(test, childs);
	            }
	        }
	    }
	    return elem;
	}
	function findAll(test, nodes) {
	    var result = [];
	    for (var i = 0, j = nodes.length; i < j; i++) {
	        if (!isTag(nodes[i]))
	            continue;
	        if (test(nodes[i]))
	            result.push(nodes[i]);
	        var childs = getChildren(nodes[i]);
	        if (childs)
	            result = result.concat(findAll(test, childs));
	    }
	    return result;
	}
	matcher.default = {
	    isTag: isTag,
	    getAttributeValue: getAttributeValue,
	    getName: getName,
	    getChildren: getChildren,
	    getParent: getParent,
	    getText: getText,
	    removeSubsets: removeSubsets,
	    existsOne: existsOne,
	    getSiblings: getSiblings,
	    hasAttrib: hasAttrib,
	    findOne: findOne,
	    findAll: findAll
	};

	var back = {};

	Object.defineProperty(back, "__esModule", { value: true });
	function arr_back(arr) {
	    return arr[arr.length - 1];
	}
	back.default = arr_back;

	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(html, "__esModule", { value: true });
	html.parse = html.base_parse = void 0;
	var he_1 = __importDefault(he.exports);
	var css_select_1 = lib$7;
	var node_1 = __importDefault(node$1);
	var type_1 = __importDefault(type);
	var text_1 = __importDefault(text);
	var matcher_1 = __importDefault(matcher);
	var back_1 = __importDefault(back);
	var comment_1 = __importDefault(comment);
	var voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
	function decode(val) {
	    // clone string
	    return JSON.parse(JSON.stringify(he_1.default.decode(val)));
	}
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
	var Htags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup'];
	var Dtags = ['details', 'dialog', 'dd', 'div', 'dt'];
	var Ftags = ['fieldset', 'figcaption', 'figure', 'footer', 'form'];
	var tableTags = ['table', 'td', 'tr'];
	var htmlTags = ['address', 'article', 'aside', 'blockquote', 'br', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'ul'];
	var kBlockElements = new Set();
	function addToKBlockElement() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var addToSet = function (array) {
	        for (var index = 0; index < array.length; index++) {
	            var element = array[index];
	            kBlockElements.add(element);
	            kBlockElements.add(element.toUpperCase());
	        }
	    };
	    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
	        var arg = args_1[_a];
	        addToSet(arg);
	    }
	}
	addToKBlockElement(Htags, Dtags, Ftags, tableTags, htmlTags);
	var DOMTokenList = /** @class */ (function () {
	    function DOMTokenList(valuesInit, afterUpdate) {
	        if (valuesInit === void 0) { valuesInit = []; }
	        if (afterUpdate === void 0) { afterUpdate = function () { return null; }; }
	        this._set = new Set(valuesInit);
	        this._afterUpdate = afterUpdate;
	    }
	    DOMTokenList.prototype._validate = function (c) {
	        if (/\s/.test(c)) {
	            throw new Error("DOMException in DOMTokenList.add: The token '" + c + "' contains HTML space characters, which are not valid in tokens.");
	        }
	    };
	    DOMTokenList.prototype.add = function (c) {
	        this._validate(c);
	        this._set.add(c);
	        this._afterUpdate(this); // eslint-disable-line @typescript-eslint/no-unsafe-call
	    };
	    DOMTokenList.prototype.replace = function (c1, c2) {
	        this._validate(c2);
	        this._set.delete(c1);
	        this._set.add(c2);
	        this._afterUpdate(this); // eslint-disable-line @typescript-eslint/no-unsafe-call
	    };
	    DOMTokenList.prototype.remove = function (c) {
	        this._set.delete(c) && this._afterUpdate(this); // eslint-disable-line @typescript-eslint/no-unsafe-call
	    };
	    DOMTokenList.prototype.toggle = function (c) {
	        this._validate(c);
	        if (this._set.has(c))
	            this._set.delete(c);
	        else
	            this._set.add(c);
	        this._afterUpdate(this); // eslint-disable-line @typescript-eslint/no-unsafe-call
	    };
	    DOMTokenList.prototype.contains = function (c) {
	        return this._set.has(c);
	    };
	    Object.defineProperty(DOMTokenList.prototype, "length", {
	        get: function () {
	            return this._set.size;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    DOMTokenList.prototype.values = function () {
	        return this._set.values();
	    };
	    Object.defineProperty(DOMTokenList.prototype, "value", {
	        get: function () {
	            return Array.from(this._set.values());
	        },
	        enumerable: false,
	        configurable: true
	    });
	    DOMTokenList.prototype.toString = function () {
	        return Array.from(this._set.values()).join(' ');
	    };
	    return DOMTokenList;
	}());
	/**
	 * HTMLElement, which contains a set of children.
	 *
	 * Note: this is a minimalist implementation, no complete tree
	 *   structure provided (no parentNode, nextSibling,
	 *   previousSibling etc).
	 * @class HTMLElement
	 * @extends {Node}
	 */
	var HTMLElement = /** @class */ (function (_super) {
	    __extends(HTMLElement, _super);
	    /**
	     * Creates an instance of HTMLElement.
	     * @param keyAttrs	id and class attribute
	     * @param [rawAttrs]	attributes in string
	     *
	     * @memberof HTMLElement
	     */
	    function HTMLElement(tagName, keyAttrs, rawAttrs, parentNode, range) {
	        if (rawAttrs === void 0) { rawAttrs = ''; }
	        var _this = _super.call(this, parentNode, range) || this;
	        _this.rawAttrs = rawAttrs;
	        /**
	         * Node Type declaration.
	         */
	        _this.nodeType = type_1.default.ELEMENT_NODE;
	        _this.rawTagName = tagName;
	        _this.rawAttrs = rawAttrs || '';
	        _this.id = keyAttrs.id || '';
	        _this.childNodes = [];
	        _this.classList = new DOMTokenList(keyAttrs.class ? keyAttrs.class.split(/\s+/) : [], function (classList) { return _this.setAttribute('class', classList.toString()); } // eslint-disable-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	        );
	        if (keyAttrs.id) {
	            if (!rawAttrs) {
	                _this.rawAttrs = "id=\"" + keyAttrs.id + "\"";
	            }
	        }
	        if (keyAttrs.class) {
	            if (!rawAttrs) {
	                var cls = "class=\"" + _this.classList.toString() + "\"";
	                if (_this.rawAttrs) {
	                    _this.rawAttrs += " " + cls;
	                }
	                else {
	                    _this.rawAttrs = cls;
	                }
	            }
	        }
	        return _this;
	    }
	    /**
	     * Quote attribute values
	     * @param attr attribute value
	     * @returns {string} quoted value
	     */
	    HTMLElement.prototype.quoteAttribute = function (attr) {
	        if (attr == null) {
	            return 'null';
	        }
	        return JSON.stringify(attr.replace(/"/g, '&quot;'));
	    };
	    /**
	     * Remove current element
	     */
	    HTMLElement.prototype.remove = function () {
	        var _this = this;
	        if (this.parentNode) {
	            var children = this.parentNode.childNodes;
	            this.parentNode.childNodes = children.filter(function (child) {
	                return _this !== child;
	            });
	        }
	    };
	    /**
	     * Remove Child element from childNodes array
	     * @param {HTMLElement} node     node to remove
	     */
	    HTMLElement.prototype.removeChild = function (node) {
	        this.childNodes = this.childNodes.filter(function (child) {
	            return child !== node;
	        });
	    };
	    /**
	     * Exchanges given child with new child
	     * @param {HTMLElement} oldNode     node to exchange
	     * @param {HTMLElement} newNode     new node
	     */
	    HTMLElement.prototype.exchangeChild = function (oldNode, newNode) {
	        var children = this.childNodes;
	        this.childNodes = children.map(function (child) {
	            if (child === oldNode) {
	                return newNode;
	            }
	            return child;
	        });
	    };
	    Object.defineProperty(HTMLElement.prototype, "tagName", {
	        get: function () {
	            return this.rawTagName ? this.rawTagName.toUpperCase() : this.rawTagName;
	        },
	        set: function (newname) {
	            this.rawTagName = newname.toLowerCase();
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "localName", {
	        get: function () {
	            return this.rawTagName.toLowerCase();
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "isVoidElement", {
	        get: function () {
	            return voidTags.has(this.localName);
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "rawText", {
	        /**
	         * Get escpaed (as-it) text value of current node and its children.
	         * @return {string} text content
	         */
	        get: function () {
	            return this.childNodes.reduce(function (pre, cur) {
	                return (pre += cur.rawText);
	            }, '');
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "textContent", {
	        get: function () {
	            return decode(this.rawText);
	        },
	        set: function (val) {
	            var content = [new text_1.default(val, this)];
	            this.childNodes = content;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "text", {
	        /**
	         * Get unescaped text value of current node and its children.
	         * @return {string} text content
	         */
	        get: function () {
	            return decode(this.rawText);
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "structuredText", {
	        /**
	         * Get structured Text (with '\n' etc.)
	         * @return {string} structured text
	         */
	        get: function () {
	            var currentBlock = [];
	            var blocks = [currentBlock];
	            function dfs(node) {
	                if (node.nodeType === type_1.default.ELEMENT_NODE) {
	                    if (kBlockElements.has(node.rawTagName)) {
	                        if (currentBlock.length > 0) {
	                            blocks.push((currentBlock = []));
	                        }
	                        node.childNodes.forEach(dfs);
	                        if (currentBlock.length > 0) {
	                            blocks.push((currentBlock = []));
	                        }
	                    }
	                    else {
	                        node.childNodes.forEach(dfs);
	                    }
	                }
	                else if (node.nodeType === type_1.default.TEXT_NODE) {
	                    if (node.isWhitespace) {
	                        // Whitespace node, postponed output
	                        currentBlock.prependWhitespace = true;
	                    }
	                    else {
	                        var text = node.trimmedText;
	                        if (currentBlock.prependWhitespace) {
	                            text = " " + text;
	                            currentBlock.prependWhitespace = false;
	                        }
	                        currentBlock.push(text);
	                    }
	                }
	            }
	            dfs(this);
	            return blocks
	                .map(function (block) {
	                return block.join('').replace(/\s{2,}/g, ' '); // Normalize each line's whitespace
	            })
	                .join('\n')
	                .replace(/\s+$/, ''); // trimRight;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    HTMLElement.prototype.toString = function () {
	        var tag = this.rawTagName;
	        if (tag) {
	            var attrs = this.rawAttrs ? " " + this.rawAttrs : '';
	            return this.isVoidElement ? "<" + tag + attrs + ">" : "<" + tag + attrs + ">" + this.innerHTML + "</" + tag + ">";
	        }
	        return this.innerHTML;
	    };
	    Object.defineProperty(HTMLElement.prototype, "innerHTML", {
	        get: function () {
	            return this.childNodes
	                .map(function (child) {
	                return child.toString();
	            })
	                .join('');
	        },
	        set: function (content) {
	            //const r = parse(content, global.options); // TODO global.options ?
	            var r = parse$1(content);
	            this.childNodes = r.childNodes.length ? r.childNodes : [new text_1.default(content, this)];
	        },
	        enumerable: false,
	        configurable: true
	    });
	    HTMLElement.prototype.set_content = function (content, options) {
	        if (options === void 0) { options = {}; }
	        if (content instanceof node_1.default) {
	            content = [content];
	        }
	        else if (typeof content == 'string') {
	            var r = parse$1(content, options);
	            content = r.childNodes.length ? r.childNodes : [new text_1.default(content, this)];
	        }
	        this.childNodes = content;
	    };
	    HTMLElement.prototype.replaceWith = function () {
	        var _this = this;
	        var nodes = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            nodes[_i] = arguments[_i];
	        }
	        var content = nodes
	            .map(function (node) {
	            if (node instanceof node_1.default) {
	                return [node];
	            }
	            else if (typeof node == 'string') {
	                // const r = parse(content, global.options); // TODO global.options ?
	                var r = parse$1(node);
	                return r.childNodes.length ? r.childNodes : [new text_1.default(node, _this)];
	            }
	            return [];
	        })
	            .flat();
	        var idx = this.parentNode.childNodes.findIndex(function (child) {
	            return child === _this;
	        });
	        this.parentNode.childNodes = __spreadArray(__spreadArray(__spreadArray([], this.parentNode.childNodes.slice(0, idx), true), content, true), this.parentNode.childNodes.slice(idx + 1), true);
	    };
	    Object.defineProperty(HTMLElement.prototype, "outerHTML", {
	        get: function () {
	            return this.toString();
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Trim element from right (in block) after seeing pattern in a TextNode.
	     * @param  {RegExp} pattern pattern to find
	     * @return {HTMLElement}    reference to current node
	     */
	    HTMLElement.prototype.trimRight = function (pattern) {
	        for (var i = 0; i < this.childNodes.length; i++) {
	            var childNode = this.childNodes[i];
	            if (childNode.nodeType === type_1.default.ELEMENT_NODE) {
	                childNode.trimRight(pattern);
	            }
	            else {
	                var index = childNode.rawText.search(pattern);
	                if (index > -1) {
	                    childNode.rawText = childNode.rawText.substr(0, index);
	                    // trim all following nodes.
	                    this.childNodes.length = i + 1;
	                }
	            }
	        }
	        return this;
	    };
	    Object.defineProperty(HTMLElement.prototype, "structure", {
	        /**
	         * Get DOM structure
	         * @return {string} strucutre
	         */
	        get: function () {
	            var res = [];
	            var indention = 0;
	            function write(str) {
	                res.push('  '.repeat(indention) + str);
	            }
	            function dfs(node) {
	                var idStr = node.id ? "#" + node.id : '';
	                var classStr = node.classList.length ? "." + node.classList.value.join('.') : ''; // eslint-disable-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-call
	                write("" + node.rawTagName + idStr + classStr);
	                indention++;
	                node.childNodes.forEach(function (childNode) {
	                    if (childNode.nodeType === type_1.default.ELEMENT_NODE) {
	                        dfs(childNode);
	                    }
	                    else if (childNode.nodeType === type_1.default.TEXT_NODE) {
	                        if (!childNode.isWhitespace) {
	                            write('#text');
	                        }
	                    }
	                });
	                indention--;
	            }
	            dfs(this);
	            return res.join('\n');
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Remove whitespaces in this sub tree.
	     * @return {HTMLElement} pointer to this
	     */
	    HTMLElement.prototype.removeWhitespace = function () {
	        var _this = this;
	        var o = 0;
	        this.childNodes.forEach(function (node) {
	            if (node.nodeType === type_1.default.TEXT_NODE) {
	                if (node.isWhitespace) {
	                    return;
	                }
	                node.rawText = node.trimmedRawText;
	            }
	            else if (node.nodeType === type_1.default.ELEMENT_NODE) {
	                node.removeWhitespace();
	            }
	            _this.childNodes[o++] = node;
	        });
	        this.childNodes.length = o;
	        return this;
	    };
	    /**
	     * Query CSS selector to find matching nodes.
	     * @param  {string}         selector Simplified CSS selector
	     * @return {HTMLElement[]}  matching elements
	     */
	    HTMLElement.prototype.querySelectorAll = function (selector) {
	        return (0, css_select_1.selectAll)(selector, this, {
	            xmlMode: true,
	            adapter: matcher_1.default,
	        });
	    };
	    /**
	     * Query CSS Selector to find matching node.
	     * @param  {string}         selector Simplified CSS selector
	     * @return {(HTMLElement|null)}    matching node
	     */
	    HTMLElement.prototype.querySelector = function (selector) {
	        return (0, css_select_1.selectOne)(selector, this, {
	            xmlMode: true,
	            adapter: matcher_1.default,
	        });
	    };
	    /**
	     * find elements by their tagName
	     * @param {string} tagName the tagName of the elements to select
	     */
	    HTMLElement.prototype.getElementsByTagName = function (tagName) {
	        var upperCasedTagName = tagName.toUpperCase();
	        var re = [];
	        var stack = [];
	        var currentNodeReference = this;
	        var index = 0;
	        // index turns to undefined once the stack is empty and the first condition occurs
	        // which happens once all relevant children are searched through
	        while (index !== undefined) {
	            var child = void 0;
	            // make it work with sparse arrays
	            do {
	                child = currentNodeReference.childNodes[index++];
	            } while (index < currentNodeReference.childNodes.length && child === undefined);
	            // if the child does not exist we move on with the last provided index (which belongs to the parentNode)
	            if (child === undefined) {
	                currentNodeReference = currentNodeReference.parentNode;
	                index = stack.pop();
	                continue;
	            }
	            if (child.nodeType === type_1.default.ELEMENT_NODE) {
	                // https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName#syntax
	                if (tagName === '*' || child.tagName === upperCasedTagName)
	                    re.push(child);
	                // if children are existing push the current status to the stack and keep searching for elements in the level below
	                if (child.childNodes.length > 0) {
	                    stack.push(index);
	                    currentNodeReference = child;
	                    index = 0;
	                }
	            }
	        }
	        return re;
	    };
	    /**
	     * traverses the Element and its parents (heading toward the document root) until it finds a node that matches the provided selector string. Will return itself or the matching ancestor. If no such element exists, it returns null.
	     * @param selector a DOMString containing a selector list
	     */
	    HTMLElement.prototype.closest = function (selector) {
	        var mapChild = new Map();
	        var el = this;
	        var old = null;
	        function findOne(test, elems) {
	            var elem = null;
	            for (var i = 0, l = elems.length; i < l && !elem; i++) {
	                var el_1 = elems[i];
	                if (test(el_1)) {
	                    elem = el_1;
	                }
	                else {
	                    var child = mapChild.get(el_1);
	                    if (child) {
	                        elem = findOne(test, [child]);
	                    }
	                }
	            }
	            return elem;
	        }
	        while (el) {
	            mapChild.set(el, old);
	            old = el;
	            el = el.parentNode;
	        }
	        el = this;
	        while (el) {
	            var e = (0, css_select_1.selectOne)(selector, el, {
	                xmlMode: true,
	                adapter: __assign(__assign({}, matcher_1.default), { getChildren: function (node) {
	                        var child = mapChild.get(node);
	                        return child && [child];
	                    }, getSiblings: function (node) {
	                        return [node];
	                    }, findOne: findOne, findAll: function () {
	                        return [];
	                    } }),
	            });
	            if (e) {
	                return e;
	            }
	            el = el.parentNode;
	        }
	        return null;
	    };
	    /**
	     * Append a child node to childNodes
	     * @param  {Node} node node to append
	     * @return {Node}      node appended
	     */
	    HTMLElement.prototype.appendChild = function (node) {
	        // node.parentNode = this;
	        this.childNodes.push(node);
	        node.parentNode = this;
	        return node;
	    };
	    Object.defineProperty(HTMLElement.prototype, "firstChild", {
	        /**
	         * Get first child node
	         * @return {Node} first child node
	         */
	        get: function () {
	            return this.childNodes[0];
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "lastChild", {
	        /**
	         * Get last child node
	         * @return {Node} last child node
	         */
	        get: function () {
	            return (0, back_1.default)(this.childNodes);
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "attrs", {
	        /**
	         * Get attributes
	         * @access private
	         * @return {Object} parsed and unescaped attributes
	         */
	        get: function () {
	            if (this._attrs) {
	                return this._attrs;
	            }
	            this._attrs = {};
	            var attrs = this.rawAttributes;
	            for (var key in attrs) {
	                var val = attrs[key] || '';
	                this._attrs[key.toLowerCase()] = decode(val);
	            }
	            return this._attrs;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "attributes", {
	        get: function () {
	            var ret_attrs = {};
	            var attrs = this.rawAttributes;
	            for (var key in attrs) {
	                var val = attrs[key] || '';
	                ret_attrs[key] = decode(val);
	            }
	            return ret_attrs;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "rawAttributes", {
	        /**
	         * Get escaped (as-is) attributes
	         * @return {Object} parsed attributes
	         */
	        get: function () {
	            if (this._rawAttrs) {
	                return this._rawAttrs;
	            }
	            var attrs = {};
	            if (this.rawAttrs) {
	                var re = /([a-zA-Z()#][a-zA-Z0-9-_:()#]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/g;
	                var match = void 0;
	                while ((match = re.exec(this.rawAttrs))) {
	                    var key = match[1];
	                    var val = match[2] || null;
	                    if (val && (val[0] === "'" || val[0] === "\""))
	                        val = val.slice(1, val.length - 1);
	                    attrs[key] = val;
	                }
	            }
	            this._rawAttrs = attrs;
	            return attrs;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    HTMLElement.prototype.removeAttribute = function (key) {
	        var attrs = this.rawAttributes;
	        delete attrs[key];
	        // Update this.attribute
	        if (this._attrs) {
	            delete this._attrs[key];
	        }
	        // Update rawString
	        this.rawAttrs = Object.keys(attrs)
	            .map(function (name) {
	            var val = JSON.stringify(attrs[name]);
	            if (val === undefined || val === 'null') {
	                return name;
	            }
	            return name + "=" + val;
	        })
	            .join(' ');
	        // Update this.id
	        if (key === 'id') {
	            this.id = '';
	        }
	    };
	    HTMLElement.prototype.hasAttribute = function (key) {
	        return key.toLowerCase() in this.attrs;
	    };
	    /**
	     * Get an attribute
	     * @return {string} value of the attribute
	     */
	    HTMLElement.prototype.getAttribute = function (key) {
	        return this.attrs[key.toLowerCase()];
	    };
	    /**
	     * Set an attribute value to the HTMLElement
	     * @param {string} key The attribute name
	     * @param {string} value The value to set, or null / undefined to remove an attribute
	     */
	    HTMLElement.prototype.setAttribute = function (key, value) {
	        var _this = this;
	        if (arguments.length < 2) {
	            throw new Error("Failed to execute 'setAttribute' on 'Element'");
	        }
	        var k2 = key.toLowerCase();
	        var attrs = this.rawAttributes;
	        for (var k in attrs) {
	            if (k.toLowerCase() === k2) {
	                key = k;
	                break;
	            }
	        }
	        attrs[key] = String(value);
	        // update this.attrs
	        if (this._attrs) {
	            this._attrs[k2] = decode(attrs[key]);
	        }
	        // Update rawString
	        this.rawAttrs = Object.keys(attrs)
	            .map(function (name) {
	            var val = _this.quoteAttribute(attrs[name]);
	            if (val === 'null' || val === '""')
	                return name;
	            return name + "=" + val;
	        })
	            .join(' ');
	        // Update this.id
	        if (key === 'id') {
	            this.id = value;
	        }
	    };
	    /**
	     * Replace all the attributes of the HTMLElement by the provided attributes
	     * @param {Attributes} attributes the new attribute set
	     */
	    HTMLElement.prototype.setAttributes = function (attributes) {
	        var _this = this;
	        // Invalidate current this.attributes
	        if (this._attrs) {
	            delete this._attrs;
	        }
	        // Invalidate current this.rawAttributes
	        if (this._rawAttrs) {
	            delete this._rawAttrs;
	        }
	        // Update rawString
	        this.rawAttrs = Object.keys(attributes)
	            .map(function (name) {
	            var val = attributes[name];
	            if (val === 'null' || val === '""')
	                return name;
	            return name + "=" + _this.quoteAttribute(String(val));
	        })
	            .join(' ');
	    };
	    HTMLElement.prototype.insertAdjacentHTML = function (where, html) {
	        var _a, _b, _c;
	        var _this = this;
	        if (arguments.length < 2) {
	            throw new Error('2 arguments required');
	        }
	        var p = parse$1(html);
	        if (where === 'afterend') {
	            var idx = this.parentNode.childNodes.findIndex(function (child) {
	                return child === _this;
	            });
	            (_a = this.parentNode.childNodes).splice.apply(_a, __spreadArray([idx + 1, 0], p.childNodes, false));
	            p.childNodes.forEach(function (n) {
	                if (n instanceof HTMLElement) {
	                    n.parentNode = _this.parentNode;
	                }
	            });
	        }
	        else if (where === 'afterbegin') {
	            (_b = this.childNodes).unshift.apply(_b, p.childNodes);
	        }
	        else if (where === 'beforeend') {
	            p.childNodes.forEach(function (n) {
	                _this.appendChild(n);
	            });
	        }
	        else if (where === 'beforebegin') {
	            var idx = this.parentNode.childNodes.findIndex(function (child) {
	                return child === _this;
	            });
	            (_c = this.parentNode.childNodes).splice.apply(_c, __spreadArray([idx, 0], p.childNodes, false));
	            p.childNodes.forEach(function (n) {
	                if (n instanceof HTMLElement) {
	                    n.parentNode = _this.parentNode;
	                }
	            });
	        }
	        else {
	            throw new Error("The value provided ('" + where + "') is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'");
	        }
	        // if (!where || html === undefined || html === null) {
	        // 	return;
	        // }
	    };
	    Object.defineProperty(HTMLElement.prototype, "nextSibling", {
	        get: function () {
	            if (this.parentNode) {
	                var children = this.parentNode.childNodes;
	                var i = 0;
	                while (i < children.length) {
	                    var child = children[i++];
	                    if (this === child)
	                        return children[i] || null;
	                }
	                return null;
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "nextElementSibling", {
	        get: function () {
	            if (this.parentNode) {
	                var children = this.parentNode.childNodes;
	                var i = 0;
	                var find = false;
	                while (i < children.length) {
	                    var child = children[i++];
	                    if (find) {
	                        if (child instanceof HTMLElement) {
	                            return child || null;
	                        }
	                    }
	                    else if (this === child) {
	                        find = true;
	                    }
	                }
	                return null;
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(HTMLElement.prototype, "classNames", {
	        get: function () {
	            return this.classList.toString();
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return HTMLElement;
	}(node_1.default));
	html.default = HTMLElement;
	// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
	var kMarkupPattern = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][-.:0-9_a-zA-Z]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/g;
	var kAttributePattern = /(?:^|\s)(id|class)\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+)/gi;
	var kSelfClosingElements = {
	    area: true,
	    AREA: true,
	    base: true,
	    BASE: true,
	    br: true,
	    BR: true,
	    col: true,
	    COL: true,
	    hr: true,
	    HR: true,
	    img: true,
	    IMG: true,
	    input: true,
	    INPUT: true,
	    link: true,
	    LINK: true,
	    meta: true,
	    META: true,
	    source: true,
	    SOURCE: true,
	    embed: true,
	    EMBED: true,
	    param: true,
	    PARAM: true,
	    track: true,
	    TRACK: true,
	    wbr: true,
	    WBR: true,
	};
	var kElementsClosedByOpening = {
	    li: { li: true, LI: true },
	    LI: { li: true, LI: true },
	    p: { p: true, div: true, P: true, DIV: true },
	    P: { p: true, div: true, P: true, DIV: true },
	    b: { div: true, DIV: true },
	    B: { div: true, DIV: true },
	    td: { td: true, th: true, TD: true, TH: true },
	    TD: { td: true, th: true, TD: true, TH: true },
	    th: { td: true, th: true, TD: true, TH: true },
	    TH: { td: true, th: true, TD: true, TH: true },
	    h1: { h1: true, H1: true },
	    H1: { h1: true, H1: true },
	    h2: { h2: true, H2: true },
	    H2: { h2: true, H2: true },
	    h3: { h3: true, H3: true },
	    H3: { h3: true, H3: true },
	    h4: { h4: true, H4: true },
	    H4: { h4: true, H4: true },
	    h5: { h5: true, H5: true },
	    H5: { h5: true, H5: true },
	    h6: { h6: true, H6: true },
	    H6: { h6: true, H6: true },
	};
	var kElementsClosedByClosing = {
	    li: { ul: true, ol: true, UL: true, OL: true },
	    LI: { ul: true, ol: true, UL: true, OL: true },
	    a: { div: true, DIV: true },
	    A: { div: true, DIV: true },
	    b: { div: true, DIV: true },
	    B: { div: true, DIV: true },
	    i: { div: true, DIV: true },
	    I: { div: true, DIV: true },
	    p: { div: true, DIV: true },
	    P: { div: true, DIV: true },
	    td: { tr: true, table: true, TR: true, TABLE: true },
	    TD: { tr: true, table: true, TR: true, TABLE: true },
	    th: { tr: true, table: true, TR: true, TABLE: true },
	    TH: { tr: true, table: true, TR: true, TABLE: true },
	};
	var frameflag = 'documentfragmentcontainer';
	/**
	 * Parses HTML and returns a root element
	 * Parse a chuck of HTML source.
	 * @param  {string} data      html
	 * @return {HTMLElement}      root element
	 */
	function base_parse(data, options) {
	    if (options === void 0) { options = { lowerCaseTagName: false, comment: false }; }
	    var elements = options.blockTextElements || {
	        script: true,
	        noscript: true,
	        style: true,
	        pre: true,
	    };
	    var element_names = Object.keys(elements);
	    var kBlockTextElements = element_names.map(function (it) { return new RegExp("^" + it + "$", 'i'); });
	    var kIgnoreElements = element_names.filter(function (it) { return elements[it]; }).map(function (it) { return new RegExp("^" + it + "$", 'i'); });
	    function element_should_be_ignore(tag) {
	        return kIgnoreElements.some(function (it) { return it.test(tag); });
	    }
	    function is_block_text_element(tag) {
	        return kBlockTextElements.some(function (it) { return it.test(tag); });
	    }
	    var createRange = function (startPos, endPos) { return [startPos - frameFlagOffset, endPos - frameFlagOffset]; };
	    var root = new HTMLElement(null, {}, '', null, [0, data.length]);
	    var currentParent = root;
	    var stack = [root];
	    var lastTextPos = -1;
	    var noNestedTagIndex = undefined;
	    var match;
	    // https://github.com/taoqf/node-html-parser/issues/38
	    data = "<" + frameflag + ">" + data + "</" + frameflag + ">";
	    var lowerCaseTagName = options.lowerCaseTagName;
	    var dataEndPos = data.length - (frameflag.length + 2);
	    var frameFlagOffset = frameflag.length + 2;
	    while ((match = kMarkupPattern.exec(data))) {
	        // Note: Object destructuring here consistently tests as higher performance than array destructuring
	        // eslint-disable-next-line prefer-const
	        var matchText = match[0], leadingSlash = match[1], tagName = match[2], attributes = match[3], closingSlash = match[4];
	        var matchLength = matchText.length;
	        var tagStartPos = kMarkupPattern.lastIndex - matchLength;
	        var tagEndPos = kMarkupPattern.lastIndex;
	        // Add TextNode if content
	        if (lastTextPos > -1) {
	            if (lastTextPos + matchLength < tagEndPos) {
	                var text = data.substring(lastTextPos, tagStartPos);
	                currentParent.appendChild(new text_1.default(text, currentParent, createRange(lastTextPos, tagStartPos)));
	            }
	        }
	        lastTextPos = kMarkupPattern.lastIndex;
	        // https://github.com/taoqf/node-html-parser/issues/38
	        // Skip frameflag node
	        if (tagName === frameflag)
	            continue;
	        // Handle comments
	        if (matchText[1] === '!') {
	            if (options.comment) {
	                // Only keep what is in between <!-- and -->
	                var text = data.substring(tagStartPos + 4, tagEndPos - 3);
	                currentParent.appendChild(new comment_1.default(text, currentParent, createRange(tagStartPos, tagEndPos)));
	            }
	            continue;
	        }
	        /* -- Handle tag matching -- */
	        // Fix tag casing if necessary
	        if (lowerCaseTagName)
	            tagName = tagName.toLowerCase();
	        // Handle opening tags (ie. <this> not </that>)
	        if (!leadingSlash) {
	            /* Populate attributes */
	            var attrs = {};
	            for (var attMatch = void 0; (attMatch = kAttributePattern.exec(attributes));) {
	                var key = attMatch[1], val = attMatch[2];
	                var isQuoted = val[0] === "'" || val[0] === "\"";
	                attrs[key.toLowerCase()] = isQuoted ? val.slice(1, val.length - 1) : val;
	            }
	            var parentTagName = currentParent.rawTagName;
	            if (!closingSlash && kElementsClosedByOpening[parentTagName]) {
	                if (kElementsClosedByOpening[parentTagName][tagName]) {
	                    stack.pop();
	                    currentParent = (0, back_1.default)(stack);
	                }
	            }
	            // Prevent nested A tags by terminating the last A and starting a new one : see issue #144
	            if (tagName === 'a' || tagName === 'A') {
	                if (noNestedTagIndex !== undefined) {
	                    stack.splice(noNestedTagIndex);
	                    currentParent = (0, back_1.default)(stack);
	                }
	                noNestedTagIndex = stack.length;
	            }
	            var tagEndPos_1 = kMarkupPattern.lastIndex;
	            var tagStartPos_1 = tagEndPos_1 - matchLength;
	            currentParent = currentParent.appendChild(
	            // Initialize range (end position updated later for closed tags)
	            new HTMLElement(tagName, attrs, attributes.slice(1), null, createRange(tagStartPos_1, tagEndPos_1)));
	            stack.push(currentParent);
	            if (is_block_text_element(tagName)) {
	                // Find closing tag
	                var closeMarkup = "</" + tagName + ">";
	                var closeIndex = lowerCaseTagName
	                    ? data.toLocaleLowerCase().indexOf(closeMarkup, kMarkupPattern.lastIndex)
	                    : data.indexOf(closeMarkup, kMarkupPattern.lastIndex);
	                var textEndPos = closeIndex === -1 ? dataEndPos : closeIndex;
	                if (element_should_be_ignore(tagName)) {
	                    var text = data.substring(tagEndPos_1, textEndPos);
	                    if (text.length > 0 && /\S/.test(text)) {
	                        currentParent.appendChild(new text_1.default(text, currentParent, createRange(tagEndPos_1, textEndPos)));
	                    }
	                }
	                if (closeIndex === -1) {
	                    lastTextPos = kMarkupPattern.lastIndex = data.length + 1;
	                }
	                else {
	                    lastTextPos = kMarkupPattern.lastIndex = closeIndex + closeMarkup.length;
	                    // Cause to be treated as self-closing, because no close found
	                    leadingSlash = '/';
	                }
	            }
	        }
	        // Handle closing tags or self-closed elements (ie </tag> or <br>)
	        if (leadingSlash || closingSlash || kSelfClosingElements[tagName]) {
	            while (true) {
	                if (tagName === 'a' || tagName === 'A')
	                    noNestedTagIndex = undefined;
	                if (currentParent.rawTagName === tagName) {
	                    // Update range end for closed tag
	                    currentParent.range[1] = createRange(-1, Math.max(lastTextPos, tagEndPos))[1];
	                    stack.pop();
	                    currentParent = (0, back_1.default)(stack);
	                    break;
	                }
	                else {
	                    var parentTagName = currentParent.tagName;
	                    // Trying to close current tag, and move on
	                    if (kElementsClosedByClosing[parentTagName]) {
	                        if (kElementsClosedByClosing[parentTagName][tagName]) {
	                            stack.pop();
	                            currentParent = (0, back_1.default)(stack);
	                            continue;
	                        }
	                    }
	                    // Use aggressive strategy to handle unmatching markups.
	                    break;
	                }
	            }
	        }
	    }
	    return stack;
	}
	html.base_parse = base_parse;
	/**
	 * Parses HTML and returns a root element
	 * Parse a chuck of HTML source.
	 */
	function parse$1(data, options) {
	    if (options === void 0) { options = { lowerCaseTagName: false, comment: false }; }
	    var stack = base_parse(data, options);
	    var root = stack[0];
	    var _loop_1 = function () {
	        // Handle each error elements.
	        var last = stack.pop();
	        var oneBefore = (0, back_1.default)(stack);
	        if (last.parentNode && last.parentNode.parentNode) {
	            if (last.parentNode === oneBefore && last.tagName === oneBefore.tagName) {
	                // Pair error case <h3> <h3> handle : Fixes to <h3> </h3>
	                oneBefore.removeChild(last);
	                last.childNodes.forEach(function (child) {
	                    oneBefore.parentNode.appendChild(child);
	                });
	                stack.pop();
	            }
	            else {
	                // Single error  <div> <h3> </div> handle: Just removes <h3>
	                oneBefore.removeChild(last);
	                last.childNodes.forEach(function (child) {
	                    oneBefore.appendChild(child);
	                });
	            }
	        }
	    };
	    while (stack.length > 1) {
	        _loop_1();
	    }
	    // response.childNodes.forEach((node) => {
	    // 	if (node instanceof HTMLElement) {
	    // 		node.parentNode = null;
	    // 	}
	    // });
	    return root;
	}
	html.parse = parse$1;

	var parse = {};

	(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var html_1 = html;
	Object.defineProperty(exports, "default", { enumerable: true, get: function () { return html_1.parse; } });
	}(parse));

	var valid$1 = {};

	Object.defineProperty(valid$1, "__esModule", { value: true });
	var html_1 = html;
	/**
	 * Parses HTML and returns a root element
	 * Parse a chuck of HTML source.
	 */
	function valid(data, options) {
	    if (options === void 0) { options = { lowerCaseTagName: false, comment: false }; }
	    var stack = (0, html_1.base_parse)(data, options);
	    return Boolean(stack.length === 1);
	}
	valid$1.default = valid;

	(function (exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NodeType = exports.TextNode = exports.Node = exports.valid = exports.default = exports.parse = exports.HTMLElement = exports.CommentNode = void 0;
	var comment_1 = comment;
	Object.defineProperty(exports, "CommentNode", { enumerable: true, get: function () { return __importDefault(comment_1).default; } });
	var html_1 = html;
	Object.defineProperty(exports, "HTMLElement", { enumerable: true, get: function () { return __importDefault(html_1).default; } });
	var parse_1 = parse;
	Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return __importDefault(parse_1).default; } });
	Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(parse_1).default; } });
	var valid_1 = valid$1;
	Object.defineProperty(exports, "valid", { enumerable: true, get: function () { return __importDefault(valid_1).default; } });
	var node_1 = node$1;
	Object.defineProperty(exports, "Node", { enumerable: true, get: function () { return __importDefault(node_1).default; } });
	var text_1 = text;
	Object.defineProperty(exports, "TextNode", { enumerable: true, get: function () { return __importDefault(text_1).default; } });
	var type_1 = type;
	Object.defineProperty(exports, "NodeType", { enumerable: true, get: function () { return __importDefault(type_1).default; } });
	}(dist));

	var nhp = /*@__PURE__*/getDefaultExportFromCjs(dist);

	nhp.CommentNode;
	nhp.HTMLElement;
	nhp.parse;
	nhp.valid;
	nhp.Node;
	nhp.TextNode;
	nhp.NodeType;

	parsePageScripts();
	function isPromise(func) {
	    if (typeof func === 'function' && typeof func.then === 'function') {
	        return true;
	    }
	}
	async function parsePageScripts(urls) {
	    const html = await loadHtml('http://localhost:8001');
	    console.log(nhp(html).querySelectorAll('script'));
	}
	function loadHtml(url) {
	    return new Promise((resolve, reject) => {
	        const xhr = new XMLHttpRequest();
	        xhr.onload = (res) => {
	            resolve(res.target.response);
	        };
	        xhr.onerror = reject;
	        xhr.onabort = reject;
	        xhr.open('get', url);
	        xhr.send();
	    });
	}

	var AppStatus;
	(function (AppStatus) {
	    AppStatus["BEFORE_BOOTSTRAP"] = "BEFORE_BOOTSTRAP";
	    AppStatus["BOOTSTRAPPED"] = "BOOTSTRAPPED";
	    AppStatus["BEFORE_MOUNT"] = "BEFORE_MOUNT";
	    AppStatus["MOUNTED"] = "MOUNTED";
	    AppStatus["BEFORE_UNMOUNT"] = "BEFORE_UNMOUNT";
	    AppStatus["UNMOUNTED"] = "UNMOUNTED";
	    AppStatus["LOAD_ERROR"] = "LOAD_ERROR";
	    AppStatus["SKIP_BECAUSE_BROKEN"] = "SKIP_BECAUSE_BROKEN";
	})(AppStatus || (AppStatus = {}));

	async function bootstrapApp(app) {
	    const { bootstrap, mount, unmount } = await app.loadApp();
	    if (isPromise(bootstrap) && isPromise(mount) && isPromise(unmount)) {
	        throw Error('The lifecycle function must be a Promise');
	    }
	    app.bootstrap = bootstrap;
	    app.mount = mount;
	    app.unmount = unmount;
	    return app.bootstrap().then(() => {
	        app.status = AppStatus.BOOTSTRAPPED;
	    });
	}

	function mountApp(app) {
	    app.status = AppStatus.BEFORE_MOUNT;
	    return app.mount(app.customProps || {}).then(() => {
	        app.status = AppStatus.MOUNTED;
	    });
	}

	function unMountApp(app) {
	    app.status = AppStatus.BEFORE_UNMOUNT;
	    return app.unmount(app.customProps || {}).then(() => {
	        app.status = AppStatus.UNMOUNTED;
	    });
	}

	const apps = [];
	async function loadApps() {
	    const toLoadApp = getAppsWithStatus(AppStatus.BEFORE_BOOTSTRAP);
	    const toUnMountApp = getAppsWithStatus(AppStatus.MOUNTED);
	    const loadPromise = toLoadApp.map(bootstrapApp);
	    const unMountPromise = toUnMountApp.map(unMountApp);
	    await Promise.all([...loadPromise, ...unMountPromise]);
	    const toMountApp = [
	        ...getAppsWithStatus(AppStatus.BOOTSTRAPPED),
	        ...getAppsWithStatus(AppStatus.UNMOUNTED),
	    ];
	    await toMountApp.map(mountApp);
	}
	function getAppsWithStatus(status) {
	    const result = [];
	    apps.forEach(app => {
	        // tobootstrap or tomount
	        if (isActive(app) && app.status === status) {
	            switch (app.status) {
	                case AppStatus.BEFORE_BOOTSTRAP:
	                case AppStatus.BOOTSTRAPPED:
	                case AppStatus.UNMOUNTED:
	                    result.push(app);
	                    break;
	            }
	        }
	        else if (app.status === AppStatus.MOUNTED && status === AppStatus.MOUNTED) {
	            // tounmount
	            result.push(app);
	        }
	    });
	    return result;
	}
	function isActive(app) {
	    return typeof app.activeRule === 'function' && app.activeRule(window.location);
	}

	const originalPushState = window.history.pushState;
	const originalReplaceState = window.history.replaceState;
	function overwriteEventsAndHistory() {
	    window.history.pushState = function (state, title, url) {
	        const result = originalPushState.call(this, state, title, url);
	        loadApps();
	        return result;
	    };
	    window.history.replaceState = function (state, title, url) {
	        const result = originalReplaceState.call(this, state, title, url);
	        loadApps();
	        return result;
	    };
	    window.addEventListener('popstate', () => {
	        loadApps();
	    }, true);
	    window.addEventListener('hashchange', () => {
	        loadApps();
	    }, true);
	}

	function registerApplication(app) {
	    if (typeof app.activeRule === 'string') {
	        const path = app.activeRule;
	        app.activeRule = (location = window.location) => location.pathname === path;
	    }
	    app.status = AppStatus.BEFORE_BOOTSTRAP;
	    apps.push(app);
	}

	let isStarted = false;
	function start() {
	    if (!isStarted) {
	        isStarted = true;
	        loadApps();
	    }
	}

	// 是否运行在 single spa 下
	window.__IS_SINGLE_SPA__ = true;
	overwriteEventsAndHistory();

	exports.registerApplication = registerApplication;
	exports.start = start;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
//# sourceMappingURL=single-spa.iife.js.map
