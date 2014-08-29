myKey = 0;
myVal = 0;

$(document).ready(function() {
  createBrowseTable();
  initPrioClick();
  table = $('#browsetbl').dataTable();
  table.on('draw', function(){
    initPrioClick();
    initPrioDraw();
  });
} );

function initPrioClick() {
  $("td.priobucket").click( function() {
    table = $('#browsetbl').dataTable();
    elementData = table.fnGetData( this );
    yourKey = elementData[0];// $(this).find("input.hideUploadid").val();
    if(myKey>0 && myKey!==yourKey){
      window.location.href = window.location.href+'&move='+myKey+'&beyond='+yourKey;
      return;
    }
    if (yourKey===myKey){
      myKey = elementData[0];
    }
    else
    {
      myKey = elementData[0];
      myVal = elementData[1];
    }
    initPrioDraw();
  });
}
function initPrioDraw() {
  $("td.priobucket").each(function(){
    $(this).html( function(){        return prioColumn(table.fnGetData( this ),'display');   } );
  });
//    table.fnDraw();
}

function prioColumn ( source, type, val ) {
  if (type === 'set') {
    source[1] = val;
    // Store the computed dislay and filter values for efficiency
    return;
  }
  if (type === 'display') {
    if (myVal===0)
      return '<img alt="move" src="images/dataTable/sort_both.png"/>';
    if (myVal<source[1])
      return '<img alt="move" src="images/dataTable/sort_asc.png"/>';
    if (myVal>source[1])
      return '<img alt="move" src="images/dataTable/sort_desc.png"/>';
    return 'click icon to insert';
  }
  if (type==='sort') {
    return -source[1];
  }
  // 'filter', 'sort', 'type' and undefined all just use the integer
  return source[1];
}