//regx.text({check:val,include:['+','*'],exclude:'%',case:'ignore',whitespace:false}); regx.text(val);
//regx.number({check:val,startingdecimal:true, integer:{length:3},decimals:{length:2,optional:true},sign:{show:true,optional:true},currency:{sign:'$',optional:true},brackets:{show:true,optional:true}}); regx.number(val);
//regx.mac({check:val,delimiter:[]}); regx.mac(value)
//regx.email({check:val,identifier:{has:[],include:{elements:[],optional:true},exclude:{elements:[],optional:true}},domain:{name:'gmail'},tld:{type:['com','co']}}); regx.email(value)
//regx.replace({check:'',having:{custom:''}});



(function(window, document, undefined) {
    'use strict';

    var regx = window.regx || (window.regx = {});

    var Config = {
        START_END_REGEX: "/",
        GROUP_START_REGEX: "(",
        GROUP_END_REGEX: ")",
        SET_BEGIN: "[",
        SET_END: "]",
		QUANT_BEGIN: "{",
		QUANT_END: "}",
		OPTIONAL: "?",
		ALTER: "|",
		COMMA:",",
        NEGATE: "^",
        BACKSLASH: "\\",
        STRING_END: "$",
        MULTI_CHAR: "*",
        UP_CHAR_RANGE: "A-Z",
        LOW_CHAR_RANGE: "a-z",
        IGNORE_CASE_CHAR_RANGE: "A-Za-z",
        DIGIT_RANGE: "0-9",
		ALPHA_DIGIT_SET : "[0-9a-zA-Z]",
		ALPHA_DIGIT_GROUP : "(0-9a-zA-Z)",
        DIGIT: "\\d",
		NOT_DIGIT: "\\D",
        WHITE_SPACE: "\\s",
		NOT_WHITE_SPACE: "\\S",
		NON_CAPTURE_GROUP:"?:",
		POSITIVE_LOOK_AHEAD:"?=",
		NEGATIVE_LOOK_AHEAD:"?!",
		POSITIVE_LOOK_BEHIND:"?<=",
		NEGATIVE_LOOK_BEHIND:"?<!",
		DOT:".",
		SYMBOL_AT:"@",
		MATCH_ANY:"[\\s\\S]",
		WORD:"\\w",
		NOT_WORD:"\\W",
		WORD_BOUNDARY: "\\b",
		NOT_WORD_BOUNDARY: "\\B",
		ONE_PLUS_PREC: "+",
		ZERO_PLUS_PREC: "*",
		DIGIT_SIGN:"+-",
		SET_ENCLOSURE:"[]",
		GROUP_ENCLOSURE:"()",
		QUANT_ENCLOSURE:"{}",
        TEXT_REGEX: /^([A-Za-z])*$/,
		NUM_REGEX : /^[+-]?[\$]?(?=.)*\d*(?:\.\d+)?$/,
		MAC_REGEX : /^([0-9a-fA-F][0-9a-fA-F][:-]){5}([0-9a-fA-F][0-9a-fA-F])$/,
		EMAIL_REGEX: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
    };
	
	
	//To replace the specific items in given string
	//@@ - SPECIAL CHARACTERS
	//## - NUMBERS
	//AA - UPPER CASE CHARACTERS
	//aa - LOWER CASE CHARACTERS
	//^a - UPPER and LOWER CHARACTERS
	//A9 - UPPER CASE CHARACTERS & NUMBERS
	//a9 - LOWER CASE CHARACTERS & NUMBERS
	//aA9 || Aa9 || 9Aa || 9aA || a9A || A9a - CHARACTERS & NUMBERS
	function replace(value){
		var regpat = "";
		var having = value.having;
		var check = value.check;
	
		if(value=='undefined' || !value){
			console.log('Error : Empty values to replace');
			return;
		}
	
		if(!having || having == null || having == ""){
			console.log('Error :  missing replace literals HAVING');
			return;
		}
		
		if(!check || check == null || check == ""){
			console.log('Error : missing replacing literals CHECK');
			return;
		}
		
		if(Array.isArray(having)){
			having.forEach(function(item,index,having){
				buildReg(item);
			});		
		} else if(typeof having==='object'){
			if(having.hasOwnProperty('custom')){
				if(typeof having.custom ==='string'){
					var havCustom = having.custom;
					var customArr = havCustom.match(/\W/gi);
					customArr.forEach(function(custItem,custIndex,customArr){
						if(!custItem.match(/\s/g)){
							havCustom = havCustom.replace(custItem,Config.BACKSLASH + custItem);
						}
					});	
					regpat += havCustom;	
				}else{
					console.log('Error: Invalid CUSTOM string');
					return
				}
			}else{
				console.log('Error : Unrecognized object (HAVING) property');
				return;
			}
		}else{
			regpat += having;
		}
		
		console.log(regpat);
		
		function buildReg(item){
			switch(item) {
				case '@@':
					regpat += Config.NOT_WORD + Config.BACKSLASH + '_';
					break;
				case '##':
					regpat += Config.DIGIT;
					break;
				case 'AA':
					regpat += Config.UP_CHAR_RANGE;
					break;
				case 'aa':
					regpat += Config.LOW_CHAR_RANGE;
					break;
				case '^a':
					regpat += Config.IGNORE_CASE_CHAR_RANGE;
					break;
				case 'A9':
				case '9A':				
					regpat += Config.UP_CHAR_RANGE + Config.DIGIT_RANGE;
					break;		
				case 'a9':
				case '9a':				
					regpat += Config.LOW_CHAR_RANGE + Config.DIGIT_RANGE;
					break;		
				case 'aA9':
				case 'Aa9':				
				case '9Aa':								
				case '9aA':												
				case 'a9A':																
				case 'A9a':																				
					regpat += Config.IGNORE_CASE_CHAR_RANGE + Config.DIGIT_RANGE;
					break;						
			}	
		}
		
		
	}

	//To Check Number Input
	//Returns true if matches
	function number(value){
		var regpat = "";
		var checkVal;
		if(typeof value=='object'){
			var integerObj = checkproperty(value,'integer');
			var decimalObj = checkproperty(value,'decimals');
			var signObj = checkproperty(value,'sign');
			var currencyObj = checkproperty(value,'currency');
			var bracketsObj = checkproperty(value,'brackets');
			
            if (value.hasOwnProperty('check')) {
                checkVal = value.check;
            } else {
                console.log('missing string for validation..');
                return;
            }

            if (checkVal == "" || checkVal == null) {
                console.log('missing string for validation..');
                return;
            }			
	
		} else {

            return Config.NUM_REGEX.test(checkVal);

        }
		
		if(signObj.hasOwnProperty('show')){
			if(signObj['show']==true){
				regpat = literalStarting(Config.DIGIT_SIGN,'set');
			}
			if(signObj['optional']==true){
				regpat = addOptional(regpat);
			}
		}
		
		if(currencyObj.hasOwnProperty('sign')){
			if(currencyObj['sign']!=="" || currencyObj['sign']!==null){
				regpat += createset(Config.BACKSLASH.concat(currencyObj['sign']));
			}
			if(currencyObj['optional']==true){
				regpat = addOptional(regpat);
			}
		}
		
		if(value.hasOwnProperty('startingdecimal')){
			if(value['startingdecimal']==true){
				regpat += creategroup(Config.POSITIVE_LOOK_AHEAD.concat(Config.DOT))
			}
		}
		
		if(value.hasOwnProperty('comma')){
			if(value['comma']==true){
				regpat += creategroup(Config.COMMA.concat(Config.ZERO_PLUS_PREC,Config.DIGIT));
			}
		}		
		
		if(integerObj.hasOwnProperty('length')){
			if(integerObj['length']!==''){
				regpat += Config.DIGIT + createquantifier(integerObj['length']);
			}
			else
			{
				regpat += Config.MULTI_CHAR.concat(Config.DIGIT,Config.MULTI_CHAR);
			}		
		}else{
			regpat += Config.MULTI_CHAR.concat(Config.DIGIT,Config.MULTI_CHAR);
		}
		
		if(decimalObj)
		{	
			var decQuant = decimalObj['length']?createquantifier(decimalObj['length']):Config.ONE_PLUS_PREC;
			regpat += creategroup(Config.NON_CAPTURE_GROUP.concat(Config.BACKSLASH,Config.DOT,Config.DIGIT,decQuant));
			if(decimalObj['optional']==true){
				regpat = addOptional(regpat);
			}
		}
		
		regpat += Config.STRING_END;
		
		regpat = new RegExp(regpat);
		
		console.log(regpat);
		
		return regpat.test(checkVal);
		
		
	}
	
	//To Check Text/String Input
	//Returns true if matches
    function text(value) {
        var checkVal;
        var customRegEx = "";
        var regpat = "";
        var charset = "";
        if (typeof value == 'object') {

            if (value.hasOwnProperty('check')) {
                checkVal = value.check;
            } else {
                console.log('missing string for validation..');
                return;
            }

            if (checkVal == "" || checkVal == null) {
                console.log('missing string for validation..');
                return;
            }

            if (value.hasOwnProperty('case')) {
                charset = getCharSet(value.case);
            } else {
                charset = Config.IGNORE_CASE_CHAR_SET;
            }

            if (value.hasOwnProperty('include')) {
                var incCharArr = returnArrayType(value.include);
                incCharArr.push(checkWhitespace(value, 'include'));
                var buildIncReg = charset + buildRegPattern(incCharArr, "include");
                regpat += createset(buildIncReg);
            }

            if (value.hasOwnProperty('exclude')) {
                var excCharArr = returnArrayType(value.exclude);
                excCharArr.push(checkWhitespace(value, 'exclude'));
                var buildExcReg = buildRegPattern(excCharArr, "exclude");
                regpat += createset(buildExcReg,"neg");
            }

            customRegEx = new RegExp(stringExpression(regpat));

            console.log(customRegEx);

            return customRegEx.test(checkVal);

        } else {

            return Config.TEXT_REGEX.test(checkVal);

        }

    }	
	
	//To Check MAC Address	
	function mac(value){
		var regpat = "";
		var customRegEx;
		if(typeof value == 'object'){
			var checkVal = value.check;
			if (checkVal == "" || checkVal == null) {
				console.log('missing string for validation..');
				return;
			}
			var delimiter = value.delimiter;
			var delimiterArr = returnArrayType(value.delimiter);
			var buildIncReg = buildRegPattern(delimiterArr, "include");				
			regpat = Config.ALPHA_DIGIT_SET + Config.ALPHA_DIGIT_SET + createset(buildIncReg);
			regpat = literalStarting(regpat,'group')+Config.QUANT_ENCLOSURE.split('').join(5);
			regpat += creategroup(Config.ALPHA_DIGIT_SET + Config.ALPHA_DIGIT_SET) + Config.STRING_END;
            customRegEx = new RegExp(regpat);
            return customRegEx.test(checkVal);			
				
		}else{
			if (value == "" || value == null) {
				console.log('missing string for validation..');
				return;
			}else{
				return Config.MAC_REGEX.test(value);			
			}		
		}
	}
	
	//To check Email Input
	//Return true if matches
	function email(value){
		var regpat = "";
		var customRegEx = "";
		if(typeof value == 'object'){
			var checkVal = checkproperty(value,'check');
			var identifier = checkproperty(value,'identifier');
			var domain = checkproperty(value,'domain');
			var tld = checkproperty(value,'tld');
			
			if (checkVal == "" || checkVal == null) {
				console.log('missing string for validation..');
				return;
			}
			
			if(identifier.has.length > 0 ){
				//regpat = Config.GROUP_START_REGEX;
				for (var i=0 ; i < identifier.has.length ; i++){
					regpat += Config.GROUP_START_REGEX + identifier.has[i] + Config.GROUP_END_REGEX + Config.ALTER;
				}
				//regpat += Config.GROUP_END_REGEX;
			}else{
				regpat = literalStarting(Config.IGNORE_CASE_CHAR_RANGE.concat(Config.DIGIT_RANGE,"._%+-"),"set").concat(Config.ONE_PLUS_PREC);
			}
			
			regpat += constructCustom(identifier.include,'include');
			regpat += constructCustom(identifier.exclude,'exclude');
			regpat = literalStarting(regpat,"group") + Config.SYMBOL_AT;
			
			
			if(domain && domain!==''){
				if (Array.isArray(domain.name)){
					if(domain.name.length > 0 ){
						regpat += Config.GROUP_START_REGEX;
						for (var i=0 ; i < domain.name.length ; i++){
							regpat += Config.GROUP_START_REGEX + domain.name[i] + Config.GROUP_END_REGEX + Config.ALTER;
						}
						regpat += Config.GROUP_END_REGEX;						
						if(domain.digits.optional == true){
							regpat += addOptional(createset(Config.DIGIT_RANGE));
						}						
					}else{
						regpat += createset(Config.IGNORE_CASE_CHAR_RANGE.concat(Config.DIGIT_RANGE)) + '.-' + Config.ONE_PLUS_PREC;
					}					
				}else{
					regpat += createset(Config.IGNORE_CASE_CHAR_RANGE.concat(Config.DIGIT_RANGE)) + '.-' + Config.ONE_PLUS_PREC;
				}
			}else{
				regpat += createset(Config.IGNORE_CASE_CHAR_RANGE.concat(Config.DIGIT_RANGE,'.-')) + Config.ONE_PLUS_PREC;
			}
			
			regpat += Config.BACKSLASH + Config.DOT;
			console.log(regpat);
			
			if(tld && tld !== ''){
				console.log(tld);
				if (Array.isArray(tld.type)){
					if(tld.type.length > 0 ){
						regpat += Config.GROUP_START_REGEX;
						for (var j=0 ; j < tld.type.length ; j++){
							regpat += Config.GROUP_START_REGEX + tld.type[j] + Config.GROUP_END_REGEX + Config.ALTER;
						}						
						regpat += Config.GROUP_END_REGEX;
					}else{
						regpat += createset(Config.IGNORE_CASE_CHAR_RANGE) + createquantifier({min:2,max:3});
					}
				}
			
			}
			
			regpat += Config.STRING_END;
			
			console.log(regpat);

            customRegEx = new RegExp(regpat);

            console.log(customRegEx);

            return customRegEx.test(checkVal);			
				
		}else{
			if (value == "" || value == null) {
				console.log('missing string for validation..');
				return;
			}else{
				return Config.EMAIL_REGEX.test(value);			
			}		
		}		
	}
	
	
	//Construct Include and Exclude objects
	function constructCustom(value,type){
		if(type=='include'){
            if (value.hasOwnProperty('elements')) {
                var incCharArr = returnArrayType(value.elements);
                var buildIncReg = buildRegPattern(incCharArr, "include");
				if(value.hasOwnProperty('optional')){
					if(value.optional==true){
						return addOptional(createset(buildIncReg));
					}else{
						return createset(buildIncReg);
					}
				}				
            }
		}
		if(type=='exclude'){
            if (value.hasOwnProperty('elements')) {
                var excCharArr = returnArrayType(value.elements);
                var buildExcReg = buildRegPattern(excCharArr, "exclude");
				if(value.hasOwnProperty('optional')){
					if(value.optional==true){
						return addOptional(createset(buildExcReg,"neg"));
					}else{
						return createset(buildExcReg,"neg");
					}
				}
            }		
		}
	}

	//Consider Group or Set for initial check notation (^)
	function literalStarting(pattern,type){
		
		if(type=='set'){
			return Config.NEGATE + createset(pattern);
		}
		if(type=='group'){
			return Config.NEGATE + creategroup(pattern);
		}
		
	}
	
	//Adding optional notation (?)
	function addOptional(pattern){
		return pattern + Config.OPTIONAL;
	}

	//To Create Group
	//Pattern - Pattern to insert in group
	//type - Negated (neg)
	function creategroup(pattern,type){
		if(type=="neg")
		{
			return Config.GROUP_START_REGEX.concat(Config.NEGATE, pattern, Config.GROUP_END_REGEX); 
		}else{
			return Config.GROUP_START_REGEX.concat(pattern, Config.GROUP_END_REGEX); 
		}
		
	}


	//To Create Set
	//Pattern - Pattern to insert in group
	//type - Negated (neg)	
	function createset(pattern,type){
	
		if(type=="neg")
		{
			return Config.SET_BEGIN.concat(Config.NEGATE, pattern, Config.SET_END); 
		}else{
			return Config.SET_BEGIN.concat(pattern, Config.SET_END); 
		}
		
	}	

	//To Create Quantifier
	//Pattern - Pattern to insert in Quantifier	
	function createquantifier(pattern){
	
		return Config.QUANT_BEGIN.concat(pattern.min, ",", pattern.max, Config.QUANT_END); 
		
	}	
	

	//To fetch and return property values
	function checkproperty(value,prop){
		if(value.hasOwnProperty(prop)){
			return value[prop];
		}else{
			return;
		}
	}
	

	//To Check Whitespace property and include/exclude in Input
    function checkWhitespace(item, scope) {
        if (item.hasOwnProperty('whitespace')) {
            if (item.whitespace == true && scope == 'include') {
                return Config.WHITE_SPACE;
            }
            if (item.whitespace == false) {
                return Config.WHITE_SPACE;
            } else {
                return "";
            }
        }
    }

	//Getting the Charset
    function getCharSet(type) {
        if (type.toLowerCase() == "lower") {
            return Config.LOW_CHAR_RANGE;
        }
        if (type.toLowerCase() == "upper") {
            return Config.UP_CHAR_RANGE;
        }
        if (type.toLowerCase() == "ignore") {
            return Config.IGNORE_CASE_CHAR_RANGE;
        }
    }

	//Return Array Type
    function returnArrayType(value) {
        if (Array.isArray(value)) {
            return value;
        } else {
            return value.split("");
        }
    }

	//Construction Regular Expression pattern include/exclude
    function buildRegPattern(value, type) {
        var customPattern = "";
        for (var i = 0; i < value.length; i++) {
            if (type == "include" || type == "exclude") {
                customPattern += value[i];
            }
        }
        return customPattern;
    }

	//Construct an Regular Expression for String
    function stringExpression(pattern) {
        var regexStr = "";
        regexStr = Config.NEGATE + Config.GROUP_START_REGEX + pattern + Config.GROUP_END_REGEX + Config.MULTI_CHAR + Config.STRING_END;
        return regexStr;
    }

    function regxInit(document) {
        regx = {
            text : text,
			number : number,
			mac : mac,
			email : email,
			replace : replace
        }
        return window.regx = regx;
    }

    regxInit(document);

})(window, document);
