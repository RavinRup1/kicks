//var addItems = document.querySelector("#add-items");
var navBar = document.querySelector("#header-id");
var gallery = document.querySelector(".gallery");

navBar.addEventListener("click",check,false);

gallery.addEventListener("click",check,false);


window.onload = function() {
  // find the element that you want to drag.
  var box = document.getElementById('order-list');
   /* listen to the touchmove event,
  every time it fires, grab the location
  of touch and assign it to box */
   box.addEventListener('touchmove', function(e) {
    // grab the location of touch
    var touchLocation = e.targetTouches[0];
    // assign box new coordinates based on the touch.
    box.style.left = touchLocation.pageX + 'px';
    box.style.top = touchLocation.pageY + 'px';
  })
  /* record the position of the touch
  when released using touchend event.
  This will be the drop position. */
  box.addEventListener('touchend', function(e) {
    // current box position.
    var x = parseInt(box.style.left);
    var y = parseInt(box.style.top);
  })
}






function check(e){
  if (e.target !== e.currentTarget) {
    var clickedTarget = e.target.className ;
     if (clickedTarget === "bars-icon" ) {  
          if (document.getElementById("menu").style.visibility == "hidden"){
            document.getElementById("menu").style.visibility = "visible"
          }
     }


    if (clickedTarget === "refresh-image" ) {  
       // document.getElementById("menu").style.visibility = "hidden";
       createOrderList(e) ;
    }



    if (clickedTarget === "add-to-cart" ) {  
        document.getElementById("menu").style.visibility = "hidden";
        add(e) ;
    }

    if (clickedTarget === "review-cart")  {
        document.getElementById("menu").style.visibility = "hidden";  
        createOrderList(e) ;
    
    }

    if (clickedTarget === "check-out" ) {  
        document.getElementById("menu").style.visibility = "hidden";
         document.getElementById("order-list").style.visibility = "hidden";
  //      sendOrderLis(e) ;
    }


    if (clickedTarget === "image" ) {  
   //    alert ("Gallery item selected") ; 
       e.target.previousElementSibling.checked = true ;

    }
  }  
}


function sendOrderList (){

}




function createOrderList(e) {

  let checkElements1 = document.querySelectorAll(".check-box");
  let imageElements1 = document.querySelectorAll(".image");
  let orderList = [] ;
  let k = 0 ;
  // If the checkbox is checked, display the output text
 for (let j = 0; j < checkElements1.length; j++ ){
   //    alert (" in loop") ; 
   if (checkElements1[j].checked == true){
     orderList[k] =   imageElements1[j];
 //    console.log(orderList);
     k++ ;
   } 
 }
  console.log(orderList) ;


  
   document.getElementById("order-list").style.visibility = "visible" ;
 //  document.getElementById("order-list").style.height = "100px" ;

   let refresh = document.createElement("img");
   refresh.src = "images/refresh.png";
 //   image.style.visibility = "visible" ;    
   refresh.style.width  = "10px" ;  
   refresh.style.height  = "10px" ;              
   refresh.className = "refresh-image" ;
   
  
  
   document.getElementById("order-list").innerText = "  "+k+" items  ";
   document.getElementById("order-list").appendChild(refresh); 
   console.log(document.getElementById('order-list'));

  for ( let j = 0; j < k; j++ ){
    let image = document.createElement("img");
    image.src = orderList[j].src ;
 //   image.style.visibility = "visible" ;       
    image.style.width  = "40px" ;             
    document.getElementById("order-list").appendChild(image); 
  }
  
    document.getElementById("order-list").style.visibility = "visible" ;
}

function add(e){
    let clickedItem = e.target.id ;
    let currentTarget = e.currentTarget ;


    
 //   alert ("Select items - add to cart") ;
//   document.querySelector("#menu").style.visibility = "hidden";    
 //   document.querySelector(".cart").style.visibility = "visible";
 //   document.getElementById("order-header").innerText = "VIEW ORDER";
  //  different ways to select the Dom
    // example 1 returns an object HTMLCollection of class class-box
    let checkElements = document.getElementsByClassName("check-box");

   
    
    //*******************************nodelist******************************
   //  example 2 returns a Nodlist of elements with class name  check-box
    let checkElements1 = document.querySelectorAll(".check-box");
    let imageElements1 = document.querySelectorAll(".image");
   // iterating through the nodlist and setting the style porperty
    for (let i = 0; i < checkElements1.length; i++) {
    // makes the check box visible    
      checkElements1[i].style.visibility = "visible";

    // removes the hover class from the class list - so user can use the checkbox  
      imageElements1[i].classList.remove("hover"); 


//       checkElements1[i].style[position] = "absolute";
//      checkElements1[i].style[z-index] = "1";
      
    }
      


   //**********************************************************************

  //********************Other examples************************************* 
   // returns the first element of class check-box and assigns to checkElement
    let checkElement = document.querySelector(".check-box");
   // another exampl
    let extraElements = document.getElementById("header-id");
 
      

   
 /*   
    checkElements1.forEach(showCheckBox);
    
        function showCheckBox (value, index, array){
           checkBox.style.visibility = 'visible';
        }


   (s.style.display == "none") ? s.style.display = "" : s.style.display = "none";
*/
    e.stopPropagation();


}



// dragable element -order list
dragElement(document.getElementById("order-list"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}  