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

/* Download-the-Android-app pill: only in Android browsers, never inside the app itself. Dismiss is remembered. */
;(function () {
  var KEY = 'weedx_apk_pill_dismissed', HREF = 'https://oliver-apps.sites.tab.bot/apks/Weed-X.apk';
  try {
    var ua = navigator.userAgent || '';
    if (!/Android/i.test(ua) || /OliverApp\//.test(ua) || window.AndroidApp || window.__isAndroidApp) return;
    if (location.hostname === 'appassets.androidplatform.net') return;
    if (localStorage.getItem(KEY) === '1') return;
  } catch (e) { return; }
  function show() {
    if (!document.body || document.getElementById('apk-pill')) return;
    var w = document.createElement('div');
    w.id = 'apk-pill';
    w.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:2147483000;' +
      'display:flex;align-items:center;max-width:calc(100vw - 24px);box-sizing:border-box;background:#143d1f;color:#ffffff;border:1px solid rgba(255,255,255,.18);' +
      'border-radius:999px;box-shadow:0 6px 22px rgba(0,0,0,.35);font:600 12px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:0 2px 0 0;';
    var a = document.createElement('a');
    a.href = HREF;
    a.rel = 'noopener';
    a.style.cssText = 'display:flex;align-items:center;gap:7px;padding:8px 4px 8px 12px;color:inherit;text-decoration:none;white-space:nowrap;overflow:hidden;min-width:0;';
    a.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style="flex:none"><path fill="#7ee08a" d="M17.6 9.48l1.84-3.18a.63.63 0 0 0-1.09-.63l-1.88 3.24a11.43 11.43 0 0 0-8.94 0L5.65 5.67a.63.63 0 0 0-1.09.63L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"/></svg>' +
      '<span style="overflow:hidden;text-overflow:ellipsis">Download the full release app for Android</span>';
    var x = document.createElement('button');
    x.type = 'button';
    x.setAttribute('aria-label', 'Dismiss');
    x.style.cssText = 'flex:none;width:30px;height:30px;margin:0;padding:0;border:0;border-radius:50%;background:transparent;color:inherit;opacity:.65;cursor:pointer;display:flex;align-items:center;justify-content:center;';
    x.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.29-6.3z"/></svg>';
    x.onclick = function (e) { e.preventDefault(); try { localStorage.setItem(KEY, '1'); } catch (er) {} if (w.parentNode) w.parentNode.removeChild(w); };
    w.appendChild(a);
    w.appendChild(x);
    document.body.appendChild(w);
    place();
    setTimeout(place, 1500);
    window.addEventListener('resize', place);
  }
  /* Sit above anything already pinned to the bottom of the screen (tab bars, players, round + buttons). */
  function place() {
    var w = document.getElementById('apk-pill');
    if (!w) return;
    var h = window.innerHeight, top = h, els = document.body.getElementsByTagName('*');
    for (var i = 0; i < els.length && i < 6000; i++) {
      var el = els[i];
      if (el === w || w.contains(el)) continue;
      var cs = window.getComputedStyle(el);
      if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
      var r = el.getBoundingClientRect();
      if (r.width < 24 || r.height < 24 || r.height > h * 0.4) continue;
      if (r.bottom >= h - 40 && r.bottom <= h + 2 && r.top > h * 0.5 && r.top < top) top = r.top;
    }
    w.style.bottom = top < h ? 'calc(' + Math.round(h - top + 10) + 'px + env(safe-area-inset-bottom,0px))' : 'calc(16px + env(safe-area-inset-bottom,0px))';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
})();
