//var oldvalue= 0;
var oldjson = 0;

$(document).ready(function() {

	function highlightValue(key,value,oldvalue) {
		//console.log("NEW: "+value);
		//console.log("OLD: "+oldvalue);
		if(oldvalue < value){
			updown = "countUp";
			$('#'+key).html("<span class='"+updown+"'>"+(value)+"</span>"); 
			//$('#'+key).html(value); 
			$('#'+key).effect( "highlight",{color:"#FF0000"}, 1000 );
		}
		else if(oldvalue == value){
			updown = "";
			$('#'+key).html("<span class='"+updown+"'>"+(value)+"</span>"); 
			//$('#'+key).html(value); 
		}
		else
		{
			updown = "countDown";
			$('#'+key).html("<span class='"+updown+"'>"+(value)+"</span>");  
			//$('#'+key).html(value); 
			$('#'+key).effect( "highlight",{color:"#008000"}, 1000 ); //2C3539
		}		
		
	}

    function updateDash(){
        $.ajax({
            url: "/json",
            dataType: "json",
            cache: false,
            success: function(json) {
            console.log(json)

//******************************************************************************************
				for (var key in json)
				{									
					var value = json[key];
					var oldvalue = oldjson[key];

					//$('#'+key).html(json[key]);  
					highlightValue(key,value,oldvalue); 
						
					//console.log($('#'+key).html(json[key]));
				}
				
				oldjson = json;	
				//console.log("oldjson: "+oldjson);
            }             
        });              
    }
    updateDash();
    setInterval(updateDash, 5000);
});