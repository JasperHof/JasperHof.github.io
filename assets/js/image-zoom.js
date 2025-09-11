(function(){
    var imgs = document.querySelectorAll('img.zoomable');
    if(!imgs.length) return;
  
    var overlay = document.createElement('div');
    overlay.id = 'imgOverlay';
    overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.9);align-items:center;justify-content:center;z-index:9999;';
    overlay.addEventListener('click', function(e){ if(e.target === overlay) closeOverlay(); });
  
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label','Close image');
    closeBtn.style.cssText = 'position:absolute;top:20px;right:24px;background:none;border:none;color:#fff;font-size:40px;cursor:pointer;';
    closeBtn.addEventListener('click', closeOverlay);
  
    var overlayImg = document.createElement('img');
    overlayImg.style.cssText = 'max-width:95%;max-height:95%;box-shadow:0 8px 30px rgba(0,0,0,0.8);';
  
    overlay.appendChild(closeBtn);
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);
  
    function openOverlay(src, alt){
      overlayImg.src = src;
      overlayImg.alt = alt || '';
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function closeOverlay(){
      overlay.style.display = 'none';
      overlayImg.src = '';
      document.body.style.overflow = '';
    }
  
    imgs.forEach(function(img){
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(){ openOverlay(this.src, this.alt); });
    });
  
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeOverlay(); });
  })();
  