import $ from 'jquery';

export function myTable(container, data, options){
  var data_obj = data;
  
  if (typeof options.pager === "undefined") options.pager = {};
  var page_size = typeof options.pager.page_size !== "undefined" ? options.pager.page_size : 10;
  var pager_size = typeof options.pager.pager_size !== "undefined" ? options.pager.pager_size : 10;
  var pager_front = typeof options.pager.pager_front !== "undefined" ? options.pager.pager_front : 1;
  var pager_active = typeof options.pager.pager_active !== "undefined" ? options.pager.pager_active : 1;

  container.innerHTML = '\
      <table class="table table-bordered table-hover col-md-10" id="ip_table">\
          <thead></thead>\
          <tbody></tbody>\
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
  refresh();

  function on_pager_click(e){
    var c=$(this).attr("class");
    var last = Math.ceil(data_obj.length/page_size);
    if (c == 'page-link ff'){
      pager_active=Math.min( pager_front+pager_size, last );
      pager_front=pager_active;
    }else if (c == 'page-link fb'){
      pager_active=Math.max( pager_front-1, 1 );
      pager_front=Math.max( pager_active-pager_size+1, 1 );
    }else if (c == 'page-link front'){
      pager_active=1;
      pager_front=1;
    }else if (c == 'page-link end'){
      pager_active=last;
      pager_front=Math.max( pager_active-pager_size+1, 1 );
    }else{
      pager_active=parseInt($(this).html());
    }
    refresh();
  }

  function refresh(){
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
    
    //fill table.
    var tbl = $(container).find('#ip_table');
    ///header.
    tbl.find('thead tr').remove();
    tbl.find('thead').append('<tr></tr>');
    for (var i in data.head){
      var h = data.head[i];
      tbl.find('thead tr').append('<th>'+h+'</th>');
    }
    ///body.
    tbl.find('tbody tr').remove();
    for (var i in data.body){
      var r = data.body[i];
      tbl.find('tbody').append('<tr></tr>');
      var row = tbl.find('tbody tr:last');
      row.append('<td>'+i.toString()+'</td>');
      for (var j in r){
        row.append('<td>'+r[j]+'</td>');
      }
    }
  }
}
