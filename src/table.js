import $ from 'jquery';

export function myTable(container, data, options){
  var data_obj = data;
  
  var page_size = typeof options.pager.page_size !== "undefined" ? 10 options.pager.page_size;
  var pager_size = typeof options.pager.pager_size !== "undefined" ? 10 options.pager.pager_size;
  var pager_front = typeof options.pager.pager_front !== "undefined" ? 1 options.pager.pager_front;
  var pager_active = typeof options.pager.pager_active !== "undefined" ? 1 options.pager.pager_active;
  
  function refresh(){
    container.innerHTML = '
    <table class="table table-bordered table-hover col-md-10" id="filter_table">\
        <thead>\
        <th>#</th>\
        <th><a style=cursor:pointer>IP<span class="glyphicon glyphicon-menu-down"></span></a></th>\
        <th>icon</th>\
        <th><a style=cursor:pointer>ASN<span class="glyphicon glyphicon-menu-down"></span></a></th>\
        <th>neighbours</th>\
        <th>topology</th>\
        </thead>\
        <tbody>\
        <tr>\
            <td>0</td>\
            <td>202.118.236.229</td>\
            <td><span class="flag-icon flag-icon-cn"></span>&nbsp CN</td>\
            <td>4538</td>\
            <td><a style=cursor:pointer>details</a></td>\
            <td><a style=cursor:pointer>details</a></td>\
        </tr>\
        </tbody>\
    </table>\
    <nav class="col-md-10">\
        <ul class="pagination" id="pages">\
            <li id="prev">\
                <a aria-label="Previous">\
                    <span aria-hidden="true">&laquo;</span>\
                </a>\
            </li>\
            <li class="active"><a>1</a></li>\
            <li id="next">\
                <a aria-label="Next">\
                    <span aria-hidden="true">&raquo;</span>\
                </a>\
            </li>\
        </ul>\
    </nav>'

    //fill pager
    var pager = $(container).find('#pagination');
    pager.find("li").remove();
    pager.find("ul").append("<li id='front' class='page-item'><a class='page-link front' href='#' aria-label='Previous'><span aria-hidden='true'>&laquo;</span><span class='sr-only'>Previous</span></a></li>");
    if (pager_front>1){
      pager.find("ul").append("<li class='page-item'><a class='page-link fb' href='#'>...</a></li>");
    }
    var last = Math.ceil(data_obj.length/page_size);
    for (var i=pager_front; i<Math.min(pager_front+pager_size, last+1); i++){
      if (i == pager_active){
        pager.find("ul").append("<li class='page-item active'><a class='page-link' href='#'>"+(i).toString()+"</a></li>");
      }else{
        pager.find("ul").append("<li class='page-item'><a class='page-link' href='#'>"+(i).toString()+"</a></li>");
      }
    }
    if (last > pager_front+pager_size-1){
      pager.find("ul").append("<li class='page-item'><a class='page-link ff' href='#'>...</a></li>");
    }
    pager.find("ul").append("<li id='end' class='page-item'><a class='page-link end' href='#' aria-label='Next'><span aria-hidden='true'>&raquo;</span><span class='sr-only'>Next</span></a></li>");
    pager.find("li").find("a").click(on_pager_click); 
    
    //fill table
    $(container).('#tbl tbody').html('');
    
    data_obj.slice( (pager_active-1)*page_size, Math.min(pager_active*page_size, data_obj.length) ).forEach(function(i,ind){
      $(container).('#tbl tbody').append('<tr></tr>');
    
      ind += (pager_active-1)*page_size;
      var row = $(container).('#tbl tbody tr:last');
      row.attr('index',ind);
      row.append('<td class="text-center" rowspan='+i[1].length+'>'+ind+'</td>');
      row.append('<td rowspan='+i[1].length+'>'+i[0]+'</td>');
      row.append('<td>'+i[1][0][0]+'</td>');
      row.append('<td>'+i[1][0][1]+'</td>');
      row.append('<td>'+i[1][0][2]+'</td>');
    
      for (var j=1; j<i[1].length; j++){
        $(container).('#tbl tbody').append('<tr></tr>');
    
        var subrow = $(container).('#tbl tbody tr:last');
        subrow.attr('index',ind);
        subrow.append('<td>'+i[1][j][0]+'</td>');
        subrow.append('<td>'+i[1][j][1]+'</td>');
        subrow.append('<td>'+i[1][j][2]+'</td>');
      }
    });

    $(container).('#tbl tbody tr').click(function(){if (!MODE_EDIT){
      var index = $(this).attr('index');
      if ($(this).hasClass('hl')){
        $('#tbl tbody tr[index='+ index +']').removeClass('hl');
        $('#edit_btn').prop('disabled',true);
      }else{
        $('#tbl tbody tr').removeClass('hl');
        $('#tbl tbody tr[index='+ index +']').addClass('hl');
        $('#edit_btn').prop('disabled',false);
      }
    }});
    }
}
