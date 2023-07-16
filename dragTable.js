export {main, allowDrop, drag, drop}
let draggingElementNumber = null


function main(table) {
  var thElements = table.getElementsByTagName('th');
  Array.from(thElements).forEach(function(th) {
    th.setAttribute('draggable', 'true');
    th.setAttribute('ondragstart', 'drag(event)');
    th.setAttribute('ondrop', 'drop(event)');
    th.setAttribute('ondragover', 'allowDrop(event)');
  });
}




// window.addEventListener('load', function() {
 
//   var thElements = document.getElementsByTagName('th');
//   Array.from(thElements).forEach(function(th) {
//     th.setAttribute('draggable', 'true');
//     th.setAttribute('ondragstart', 'drag(event)');
//     th.setAttribute('ondrop', 'drop(event)');
//     th.setAttribute('ondragover', 'allowDrop(event)');
//   });
// });




function allowDrop(ev) {
  ev.preventDefault(); 
}



function drag(ev) {
  //index of the column that you want to move to other location
  draggingElementNumber = indexFinder(ev)  
}


function drop(ev) {
  ev.preventDefault();
  //index of the column where you want to place the dragged column
  let from = indexFinder(ev)

  if(draggingElementNumber != from) {
    //move the column to the new location
    reorderColumn(draggingElementNumber, from)
  }

}


function indexFinder(ev) {
  let returnIndex = null
  let event = ev
  let tr = ev.currentTarget.parentElement
  let allTh = tr.getElementsByTagName('th')

  Array.from(allTh).forEach(function(th, index) {
   if(th == event.currentTarget){    
    returnIndex =  index   
   }
  }); 
  return returnIndex
}


function reorderColumn(from, to){
  let table = document.getElementById('table')
    var rows = $('tr', $(table))
    var cols
    
    rows.each(function () {
      cols = $(this).children('th, td')
      if (from > to ) {
        cols.eq(from).detach().insertBefore(cols.eq(to))
      } else {
        cols.eq(from).detach().insertAfter(cols.eq(to))
      }
    });
}