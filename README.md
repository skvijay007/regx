# Regx

<h2>This Regular Expression engine to ease developers (experienced and non-experienced) to implement Regular Expression in the projects. Using this library Regular Expression can be made dynamic even during the run time.</h2>

Check Wiki -> Documentation page for detailed implementation of Regx library


-------------- Usage -----------

regx.text({check:val,include:['+','*'],exclude:'%',case:'ignore',whitespace:false}); regx.text(val);
regx.number({check:val,startingdecimal:true,integer:{length:3},decimals:{length:2,optional:true},sign:{show:true,optional:true},currency:{sign:'$',optional:true},brackets:{show:true,optional:true}}); regx.number(val);
regx.mac({check:val,delimiter:[]}); regx.mac(value)
regx.email({check:val,identifier:{has:[],include:{elements:[],optional:true},exclude:{elements:[],optional:true}},domain:{name:'gmail'},tld:{type:['com','co']}}); regx.email(value)

# Regx Library to ease regular expression implementation
Regular Expression custom methods can be used to pass multiple values in array object or a literal if it is only one value
# Simple to implement:

Just <script src="regx.js"></script> is enough.<br/>
Start using regx methods and properties just by regx. <Method name> and it would return Boolean value based on the Regular Expression test method.

<h1>Regx methods and properties:</h1>

<h2>Regx.Text</h2>
<h3>- function in regx<h3>
<p>You can supply optional <b>args</b> that are prebound to the function.</p>
<b>regx.text({check:val,include:['+','*'],exclude:'%',case:'ignore',whitespace:false}); regx.text(val);</b>
<hr>
<h2>Usage</h2>
<p>Regx.Text (object | literal value)</p>
<h2>Arguments</h2>
<table>
	<thead>
	<tr>
		<th>Param</th>
		<th>Type</th>
		<th>Details</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>
			literal value
		</td>
		<td>
			string
		</td>
		<td>
			A value to check whether it is text
		</td>
	</tr>
	<tr>
		<td>
			object
		</td>
		<td>
			object
		</td>
		<td>
			Properties to provide customized regular expression validation
		</td>
	</tr>	
	<tr>
		<td colspan="3">
			<b>Properties in Object</b>
		</td>
	</tr>
	<tr>
		<td>
			check
		</td>
		<td>
			string
		</td>
		<td>
			Value to validate
		</td>		
	</tr>
	<tr>
		<td>
			include
		</td>
		<td>
			optional string or Array e.g : ['+','*'] or '+-*'
		</td>
		<td>
			set of characters,symbols,digits need to be considered while validating
		</td>		
	</tr>
	<tr>
		<td>
			exclude
		</td>
		<td>
			optional string or Array e.g : ['+','*'] or '+-*'
		</td>
		<td>
			set of characters,symbols,digits should not be considered while validating
		</td>		
	</tr>	
	<tr>
		<td>
			case
		</td>
		<td>
			lower or upper or ignore
		</td>
		<td>
			case type to be considered while validating
		</td>		
	</tr>	
	<tr>
		<td>
			whitespace
		</td>
		<td>
			true or false
		</td>
		<td>
			include or exclude whitespace while validating
		</td>		
	</tr>		
	</tbody>
</table>
<hr>
<h2>Regx.Number</h2>
<h3>- function in regx<h3>
<p>You can supply optional <b>args</b> that are prebound to the function.</p>
<b>regx.number({check:val,comma:true,startingdecimal:true, integer:{length:3},decimals:{length:2,optional:true},sign:{show:true,optional:true},currency:{sign:'$',optional:true},brackets:{show:true,optional:true}}); regx.number(val);</b>
<hr>
<h2>Usage</h2>
<p>Regx.Number (object | value)</p>
<h2>Arguments</h2>
<table>
	<thead>
	<tr>
		<th>Param</th>
		<th>Type</th>
		<th>Details</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>
			value
		</td>
		<td>
			number
		</td>
		<td>
			A value to check whether it is number
		</td>
	</tr>
	<tr>
		<td>
			object
		</td>
		<td>
			object
		</td>
		<td>
			Properties to provide customized regular expression validation
		</td>
	</tr>	
	<tr>
		<td colspan="3">
			<b>Properties in Object</b>
		</td>
	</tr>
	<tr>
		<td>
			check
		</td>
		<td>
			string
		</td>
		<td>
			Value to validate
		</td>		
	</tr>
	<tr>
		<td>
			startingdecimal
		</td>
		<td>
			true or false
		</td>
		<td>
			to consider or not number starting with decimal
		</td>		
	</tr>
	<tr>
		<td>
			integer
		</td>
		<td>
			object having "length" as property
		</td>
		<td>
			contains "length" property to consider length of the integer
		</td>		
	</tr>	
	<tr>
		<td>
			decimals
		</td>
		<td>
			object having "length" and "optional" as property
		</td>
		<td>
			<b>length :</b> length of the decimals to be considered<br/>
			<b>optional :</b> true or false
		</td>		
	</tr>	
	<tr>
		<td>
			sign
		</td>
		<td>
			object having "show" and "optional" as property
		</td>
		<td>
			consider currency symbol in the value or not<br/>
			<b>show :</b> true or false<br/>
			<b>optional :</b> true or false
		</td>		
	</tr>		
	<tr>
		<td>
			currency
		</td>
		<td>
			object having "sign" and "optional" as property
		</td>
		<td>
			consider currency type symbol in the value or not<br/>
			<b>show :</b> true or false<br/>
			<b>optional :</b> true or false
		</td>		
	</tr>	
	<tr>
		<td>
			brackets
		</td>
		<td>
			object having "show" and "optional" as property
		</td>
		<td>
			consider brackets in the value or not<br/>
			<b>show :</b> true or false<br/>
			<b>optional :</b> true or false
		</td>		
	</tr>	
	<tr>
		<td>
			comma
		</td>
		<td>
			true or false
		</td>
		<td>
			consider comma "," in the value or not
		</td>		
	</tr>		
	</tbody>
</table>
<hr>
<h2>Regx.Mac</h2>
<h3>- function in regx<h3>
<p>You can supply optional <b>args</b> that are prebound to the function.</p>
<b>regx.mac({check:val,delimiter:[]}); regx.mac(value)</b>
<hr>
<h2>Usage</h2>
<p>Regx.Mac (object | value)</p>
<h2>Arguments</h2>
<table>
	<thead>
	<tr>
		<th>Param</th>
		<th>Type</th>
		<th>Details</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>
			value
		</td>
		<td>
			number
		</td>
		<td>
			A value to check whether it is valid MAC address
		</td>
	</tr>
	<tr>
		<td>
			object
		</td>
		<td>
			object
		</td>
		<td>
			Properties to provide customized regular expression validation
		</td>
	</tr>	
	<tr>
		<td colspan="3">
			<b>Properties in Object</b>
		</td>
	</tr>
	<tr>
		<td>
			check
		</td>
		<td>
			string
		</td>
		<td>
			MAC address to validate
		</td>		
	</tr>
	<tr>
		<td>
			delimiter
		</td>
		<td>
			delimiter type,octect separator symbol type
		</td>
		<td>
			to consider the delimiter type
		</td>		
	</tr>	
	</tbody>
</table>
<hr>
<h2>Regx.Email</h2>
<h3>- function in regx<h3>
<p>You can supply optional <b>args</b> that are prebound to the function.</p>
<b>regx.email({check:val,identifier:{has:[],include:{elements:[],optional:true},exclude:{elements:[],optional:true}},domain:{name:'gmail'},tld:{type:['com','co']}}); regx.email(value)</b>
<hr>
<h2>Usage</h2>
<p>Regx.Email (object | value)</p>
<h2>Arguments</h2>
<table>
	<thead>
	<tr>
		<th>Param</th>
		<th>Type</th>
		<th>Details</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>
			value
		</td>
		<td>
			number
		</td>
		<td>
			A value to check whether it is valid Email Address
		</td>
	</tr>
	<tr>
		<td>
			object
		</td>
		<td>
			object
		</td>
		<td>
			Properties to provide customized regular expression validation
		</td>
	</tr>	
	<tr>
		<td colspan="3">
			<b>Properties in Object</b>
		</td>
	</tr>
	<tr>
		<td>
			check
		</td>
		<td>
			string
		</td>
		<td>
			Email address to validate
		</td>		
	</tr>
	<tr>
		<td>
			identifier
		</td>
		<td>
			Optional Object having properties "has", "include", "exclude", "domain" and "tld"
		</td>
		<td>
			<b>has :</b> Array of values which can be considered for email address e.g has:["vijay","kumar","something"]<br/>
			<b>include :</b> Object having "elements" and "optional" properties<br/>
			<b>include.elements :</b> Array of characters/symbols need to considered in email e.g. elements:['$','&']<br/>
			<b>include.optional :</b> true of false<br/>
			<b>exclude :</b> Object having "elements" and "optional" properties<br/>
			<b>exclude.elements :</b> Array of characters/symbols should not be considered in email e.g. elements:['$','&']<br/>
			<b>exclude.optional :</b> true of false<br/>	
			<b>domain :</b> Object having "name" property<br/>
			<b>domain.name :</b> Domain name should be considered in email e.g. domain:{name:'gmail'}<br/>
			<b>tld :</b> Top level domain need to be considered<br/>
			<b>tld.type :</b> Array of tld e.g. tld:{type:['com','co']}
		</td>		
	</tr>	
	</tbody>
</table>


