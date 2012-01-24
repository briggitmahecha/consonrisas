var $jq = jQuery.noConflict();
$jq.widget("ui.eventAdmin", {
    _init: function() {
    	var self= this;
    	var $el= this.element;

    	$el.find('.admin_photos').click(function(e) {
            e.preventDefault();
            $el.find(".photo_upload").show();
        });
        
    	$el.find('.cancel_admin_photos').click(function(e) {
            e.preventDefault();
            $el.find(".photo_upload").hide();
        });
        
    	$el.find('.admin_videos').click(function(e) {
            e.preventDefault();
            $el.find(".video_upload").show();
        });
        
    	$el.find('.cancel_admin_videos').click(function(e) {
            e.preventDefault();
            $el.find(".video_upload").hide();
        });        
            	
    	$el.find('.ask_admin').click(function(e) {
            e.preventDefault();
            var event_id = $jq(this).closest("div").attr("event_id");
            var mem_id = $el.find("#member_id option:selected").val();
            var mail = $el.find("#ask_admin_mail").val();
            
            self._askAdmin(event_id, mem_id, mail);
        });
        
        $el.find('.remove_facilitator').click(function(e){
            e.preventDefault();
            var event_id = $jq(this).attr("event_id");
            var fac_id = $jq(this).attr("facilitator_id");
            self._removeFacilitator(event_id, fac_id);
        });
        
        $el.find('.add_facilitator').click(function(e){
            e.preventDefault();
            var event_id = $jq(this).attr("event_id");
            var fac_id = $jq(this).attr("facilitator_id");
            self._addFacilitator(event_id, fac_id);
        });
        
        $el.find('.remove_fundation').click(function(e){
            e.preventDefault();
            var event_id = $jq(this).attr("event_id");
            var fund_id = $jq(this).attr("fundation_id");
            self._removeFundation(event_id, fund_id);
        });        
        
        $el.find('.remove_provider').click(function(e){
            e.preventDefault();
            var event_id = $jq(this).attr("event_id");
            var prov_id = $jq(this).attr("provider_id");
            self._removeProvider(event_id, prov_id);
        });               
        
        $el.find(".edit-me").click(function(e){
          e.preventDefault();
          $jq("#event-edit").dialog({modal:true, title:"Editar Evento", width: 500, closeText:"X", show:"fadeIn"});
        });         
          
      	$el.find(".my-profile-menu a").click(function(e) {
    	    e.preventDefault();
    	    var to_show = $jq(this).attr("show"); 	    
          self._show(to_show);
        });

      	$el.find('.delete_comment').click(function(e) {
              e.preventDefault();
	            var answer = confirm("¿Seguro que desea eliminar este comentario?\n Esto no se puede deshacer")
              if (answer){
                var comment_id = $jq(this).attr("comment_id");
                var event_id = $jq("#event-id").val();                
                var elId = $jq(this).attr("id").split("-")[2];
                $jq("#comment-img-"+elId).css('display', 'inline');
                $jq(this).hide();
                self._deleteComment(comment_id,event_id, elId);
	            }
          });  
          
          
         $el.find('.delete_need').click(function(e) {
              e.preventDefault();
	            var answer = confirm("¿Seguro que desea eliminar está necesidad?\n Esto no se puede deshacer")
              if (answer){
                var need_id = $jq(this).attr("need_id");
                var event_id = $jq("#event-id").val();                
                var elId = $jq(this).attr("id").split("-")[2];
                $jq("#need-img-"+elId).css('display', 'inline');
                $jq(this).hide();
                self._deleteNeed(need_id,event_id, elId);
	            }
          });  
          
          $el.find('.complete_need').change(function(){
            var complete = $jq(this).attr('checked');
            var need_id = $jq(this).attr("need_id");
            self._completeNeed(need_id, complete);  
          });
        
    }, _show: function(show){
      var newMargin = '15px';
      if(show == 'comments'){    
        newMargin = '180px';
      }
      else if(show == 'needs'){
        newMargin = '80px';
      }  
      else if(show == 'pics'){
        newMargin = '270px';
      }      
      else if (show == 'assistants'){
        newMargin = '360px';
      }  
      $jq(".arrow-up-profile").animate({marginLeft: newMargin});    
      if (show == "all" ){
        $jq(".mine").show();
      }
      else {
        $jq(".mine").hide();
        $jq(".my-"+ show).show(); 
      }
    },
    _askAdmin: function(event_id, mem_id, mail){
        var postData = {event_id:event_id, member_id:mem_id, mail:mail};
        $jq.post("/events/ask_admin", postData , function(data){
            if(data.error){
                alert("Ocurrió un error, intentar más tarde");
            }
            else{
                $jq("#ask_admin_message").show('blind',{},1000,function(){
                    setTimeout(function(){
                        $jq("#ask_admin_message").hide('blind',{}, 500);
                    }, 2000);
                });
                if($jq("#member_id option:selected").val() != "-1"){
                    $jq("#member_id option:selected").remove();
                }                
            }
        });
    },
    _addFacilitator: function(event_id, fac_id){
        var postData = {event_id:event_id, facilitator_id:fac_id};
        $jq.post("/events/add_facilitator", postData , function(data){
            if(data.error){
                alert("Ocurrió un error, intentar más tarde");
            }
            else{
                //alert("Vas a ir como facilitador a este evento");
                window.location.reload();
            }
        });
    },
    _removeFacilitator: function(event_id, fac_id){
        var postData = {event_id:event_id, facilitator_id:fac_id};
        $jq.post("/events/remove_facilitator", postData , function(data){
            if(data.error){
                alert("Ocurrió un error, intentar más tarde");
            }
            else{
                //alert("Ya no vas a ir como facilitador a este evento");
                window.location.reload();
            }
        });
    },
    _removeFundation: function(event_id, fund_id){
        var postData = {event_id:event_id, fundation_id:fund_id};
        $jq.post("/events/remove_fundation", postData , function(data){
            if(data.error){
                alert("Ocurrió un error, intentar más tarde");
            }
            else{
                alert("Esta fundación ya no va a ir a este evento");
                $jq("#fundation-going-"+fund_id).remove();
            }
        });
    },
    _removeProvider: function(event_id, prov_id){
        var postData = {event_id:event_id, provider_id:prov_id};
        $jq.post("/events/remove_provider", postData , function(data){
            if(data.error){
                alert("Ocurrió un error, intentar más tarde");
            }
            else{
                alert("Ya no vas a ir como proveedor a este evento");
                $jq("#provider-going-"+prov_id).remove();
            }
        });
    },
    _deleteComment: function(comment_id, event_id, elId){
        $jq.post( "/events/"+event_id+"/comments/"+ comment_id+".json", { "_method": "delete" },
            function(data, textStatus, XMLHttpRequest){
              var obj = $jq.parseJSON(data);
              if(obj.resp == "ok"){ 
                $jq("#comment-"+elId).fadeOut("slow", function(){
                  $jq("#comment-"+elId).remove();
                });

              }
              else{
                alert(data);
              }
        }, "text" );
    },
    _deleteNeed: function(need_id, event_id, elId){
        $jq.post( "/events/"+event_id+"/needs/"+ need_id+".json", { "_method": "delete" },
            function(data, textStatus, XMLHttpRequest){
              var obj = $jq.parseJSON(data);
              if(obj.resp == "ok"){ 
                $jq("#need-"+elId).fadeOut("slow", function(){
                  $jq("#need-"+elId).remove();
                });

              }
              else{
                alert(data);
              }
        }, "text" );
    },
    _completeNeed: function(need_id, complete){
        $jq.post( "/needs/complete/"+ need_id+".json",{"completed" : complete},
            function(data, textStatus, XMLHttpRequest){
              var obj = $jq.parseJSON(data);
              if(obj.resp == "ok"){ 
                alert('Muy bien una necesidad satisfecha!');
              }
              else{
                alert(data);
              }
        }, "text" );
    }
});



jQuery(document).ready(function($) {
    $jq("#ask_admin_message").hide();
    $jq("#eventAdmin").eventAdmin();
    $jq("a[rel^='prettyPhoto']").prettyPhoto({
        animation_speed:'normal',
        theme:'light_rounded',
        slideshow:3000, 
        autoplay_slideshow: false,
        opacity: 0.5,
        show_title: false,
        allow_resize: true,
        keyboard_shortcuts: true
    }); 
    
  jQuery('.upload').fileUploadUI({
        uploadTable: jQuery('.upload_files'),
        downloadTable: jQuery('.download_files'),
        buildUploadRow: function (files, index) {
            var file = files[index];
            return jQuery('<tr><td>' + file.name + '<\/td>' +
                    '<td class="file_upload_progress"><div><\/div><\/td>' +
                    '<td class="file_upload_cancel">' +
                    '<button class="ui-state-default ui-corner-all" title="Cancel">' +
                    '<span class="ui-icon ui-icon-cancel">Cancel<\/span>' +
                    '<\/button><\/td><\/tr>');
        },
        buildDownloadRow: function (file) {
            return jQuery('<tr><td><img alt="Photo" width="40" height="40" src="' + file.pic_path + '">' + file.name + '<\/td><\/tr>');
        },
        onCompleteAll: onCompleteAllCallback
    });       
});

function onCompleteAllCallback (event, files, index, xhr, handler) {
  jQuery('.download_files').fadeOut();
  var t = setTimeout(showGallery, 8000);

}

function showGallery(){
  var eventId = jQuery('#theEventId').val();
  jQuery('#the_photo_gallery').load('/events/' + eventId + '/show_gallery', function(){
        jQuery('#the_photo_gallery').effect("highlight", {}, 3000);
        jQuery("a[rel^='prettyPhoto']").prettyPhoto({
          animation_speed:'normal',
          theme:'light_rounded',
          slideshow:3000, 
          autoplay_slideshow: false,
          opacity: 0.5,
          show_title: false,
          allow_resize: true,
          keyboard_shortcuts: true
      });

  });
}
