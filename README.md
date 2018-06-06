# Regx

<h2>This Regular Expression engine to ease developers (experienced and non-experienced) to implement Regular Expression in the projects. Using this library Regular Expression can be made dynamic even during the run time.</h2>

Check Wiki -> Documentation page for detailed implementation of Regx library


-------------- Usage -----------
regx.text({check:val,include:['+','*'],exclude:'%',case:'ignore',whitespace:false}); regx.text(val);
regx.number({check:val,startingdecimal:true,integer:{length:3},decimals:{length:2,optional:true},sign:{show:true,optional:true},currency:{sign:'$',optional:true},brackets:{show:true,optional:true}}); regx.number(val);
regx.mac({check:val,delimiter:[]}); regx.mac(value)
regx.email({check:val,identifier:{has:[],include:{elements:[],optional:true},exclude:{elements:[],optional:true}},domain:{name:'gmail'},tld:{type:['com','co']}}); regx.email(value)
