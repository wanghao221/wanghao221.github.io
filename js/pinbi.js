/** 全局事件监听*/
    document.body.onkeydown  = function(e){
			       var keyCode = e.keyCode || e.which || e.charCode;
			        var ctrlKey = e.ctrlKey || e.metaKey;
			        if(ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 73)) {
			            e.preventDefault();
			            return false;
					}
					else if(ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 67)) {
					    e.preventDefault();
					    return false;					
			        }else if(keyCode && keyCode == 123){
			            return false;
			        }
			   }
/**禁止右击事件菜单弹出*/
    document.οncοntextmenu=ContextMenu;
    function ContextMenu()  
    {  
      return false;  
    } 
