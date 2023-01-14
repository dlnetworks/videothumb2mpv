// ==UserScript==
// @name        Click on video thumbnail to play in MPV
// @namespace   dlnetworks.scripts.videothumb2mpv
// @match       https://*.youtube.com/*
// @match       https://vimeo.com/*
// @grant       none
// @version     0.1
// @author      nSinister (forked by dlnetworks)
// @license     MIT
// @updateURL https://raw.githubusercontent.com/dlnetworks/videothumb2mpv/master/userscript.js
// @downloadURL https://raw.githubusercontent.com/dlnetworks/videothumb2mpv/master/userscript.js
// @description Open videos in external player (mpv) by simply clicking on a thumbnail.
// @copyright 2021, nsinister (forked by dlnetworks)
// 
// ==/UserScript==

(function () {
    "use strict";
    
    let observer;
    let listeners = [];
    
    let sites = {
      "youtube.com": { sel: "a.ytd-thumbnail", url: "https://www.youtube.com", needsFullUrl: true },
      "vimeo.com": { sel: "a.iris_video-vital__overlay", url: "https://vimeo.com", needsFullUrl: false },
    };
    
    // Watches for new elements based on selector to appear on page and assigns a function to them
    function ready(selector, func) {
        listeners.push({ selector: selector, func: func });  
        if (!observer) {
            observer = new MutationObserver(checkDOM);
            observer.observe(document.documentElement, { childList: true, subtree: true });
        }  
        checkDOM();
    }
    
    function checkDOM() {
        for (let i = 0, len = listeners.length, listener, elements; i < len; i++) {
            listener = listeners[i];
            elements = document.querySelectorAll(listener.selector);
            for (let j = 0, jlen = elements.length, element; j < jlen; j++) {
                element = elements[j];
                if (!element.ready) {
                    element.ready = true;
                    listener.func.call(element, element);
                }
            }
        }
    }
    
    // Replaces https:// hyperlinks with mpv:// and overrides click event
    function replaceLink(node, site) {
      if(node) {
        let hrefval = node.getAttribute('href');
        if (hrefval == null || hrefval.startsWith("mpv"))
          return;
        let newval = "mpv://" + (site.needsFullUrl ? site.url : "") + hrefval;
        node.setAttribute('href', newval);
        node.addEventListener('click', function(event){
          event.preventDefault();
          event.stopPropagation();
          location.href = newval;
        });
      }
    }
    
    // Wait for the search form to be loaded
    var searchForm = document.getElementById("search-form");
    if (searchForm) {
        // Add an event listener to the search form
        searchForm.addEventListener("submit", function() {
        // Reload the page when the search form is submitted
        location.reload();
      });
    }

    // Reload the page whenever the URL in the address bar changes
    window.addEventListener("popstate", function() {
        location.reload();
    });
    
    // Detects and returns current site from the list of known websites
    function detectSite(sites) {
      let site;
      for (let s in sites) {
        site = sites[s];
        if (location.href.includes(s)) {
          return site;
        }
      }
      return null;
    }
    
    let site = detectSite(sites)
    if (site) {
      ready(site.sel, function(element) {
          replaceLink(element, site);
      });
    }

}())
