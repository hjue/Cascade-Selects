
(function( $ ) {
jQuery.fn.cascadeselects = function( target, url, settings ) 
{
  return this.each( function()
  {
	$(this).change( function( ) 
	{
	  var sel =this;
		settings = jQuery.extend(
		{
			after : null,
			before : null,
			defaultValue : null,
			parameters : {'_id' : $(this).attr('id'), '_name' : $(this).attr('name')}
        } , settings);

		settings.parameters._value =  $(this).val();

		if (settings.before != null) 
		{
			settings.before( target );
		}

		ajaxCallback = function(data, textStatus) 
		{
			$(target).html("");
			
			data = eval("("+data+")");
			for(var sid in data)
			{
			  $(target).get(0).add(new Option(data[sid],sid), document.all ? sid : null);
			}
			

			if (settings.defaultValue != null)
			{
				$(target).val(settings.defaultValue);
			} else
			{
				$( target,"option:first").attr( "selected", "selected" );
			}
      
			if($(target).find("option").length>0){
				$(target).css("display","inline");
			}
      
			if (settings.after != null) 
			{			  
				settings.after(target);
			}
      if(parseInt($(target).val())>0)
      {
		    $(target).change();
	    }
		  
		};
    
    $.get( url, settings.parameters, ajaxCallback );
	
	});
  });
};
})( jQuery );