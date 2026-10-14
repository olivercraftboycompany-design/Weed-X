(function(){
  "use strict";
  var EMAIL="olivercraftboycompany@gmail.com";
  function mailto(product,size){
    var body="Hi Oliver, I'm interested in Weed-X "+product+". Size: "+size+". ";
    return "mailto:"+EMAIL+"?subject="+encodeURIComponent("Weed-X order question")+"&body="+encodeURIComponent(body);
  }
  var chosen={cc:"Medium bottle",og:"Medium bottle"};
  function names(pid){return pid==="cc"?"Citrus & Clove":"Original";}
  function refresh(pid){
    document.querySelectorAll('.order-link[data-product="'+pid+'"]').forEach(function(a){a.href=mailto(names(pid),chosen[pid]);});
  }
  document.querySelectorAll(".sizes").forEach(function(group){
    var pid=group.getAttribute("data-product");
    group.addEventListener("click",function(e){
      var b=e.target.closest(".size"); if(!b) return;
      group.querySelectorAll(".size").forEach(function(x){x.classList.remove("on");x.setAttribute("aria-pressed","false");});
      b.classList.add("on"); b.setAttribute("aria-pressed","true");
      chosen[pid]=b.getAttribute("data-size"); refresh(pid);
    });
  });
  function openDlg(id){
    var d=document.getElementById(id); if(!d) return;
    if(typeof d.showModal==="function"){d.showModal();}else{d.setAttribute("open","");}
    document.body.classList.add("modal-open");
    var c=d.querySelector("[data-close]"); if(c) c.focus();
  }
  function closeDlg(d){
    if(typeof d.close==="function"){d.close();}else{d.removeAttribute("open");}
  }
  document.querySelectorAll("[data-open]").forEach(function(btn){
    btn.addEventListener("click",function(){openDlg(btn.getAttribute("data-open"));});
  });
  document.querySelectorAll("dialog.detail").forEach(function(d){
    d.addEventListener("close",function(){document.body.classList.remove("modal-open");});
    d.addEventListener("click",function(e){
      if(e.target===d||e.target.closest("[data-close]")) closeDlg(d);
    });
  });
})();
