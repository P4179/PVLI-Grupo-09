function hideMenu(x) {
    x.classList.toggle("change");
    var y = document.getElementById("myTopnav");
    if(y.hidden)
        y.hidden = false;
    else y.hidden = true;
    // if (y.className === "topnav") {
    //   y.className += " responsive";
    // } else {
    //   y.className = "topnav";
    // }
}