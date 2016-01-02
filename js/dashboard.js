//var oldvalue= 0;
oldjson=""; //

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

			//json = json;
            //console.log(json)			
		
			//$("#temperature").html(json.temperature.value);
			//$("#outside").html(json.outside.value);
			//delete json.otgw			
//******************************************************************************************
				for (var key in json)
				{									
					
					var val = json[key].value;
					//var oldvalue = json[key].value;
					var oldvalue = oldjson[key];

					//$('#'+key).html(json[key]);  
					//highlightValue(key,val,oldvalue); 
					highlightValue(key,val,oldvalue); 
						
					//console.log(key);
				}
				//oldjson = json;	
                oldjson = JSON.parse(JSON.stringify(json));

				console.log("oldjson: "+oldjson);
				
            }             
        });              
    }
    updateDash();
    setInterval(updateDash, 5000);
});