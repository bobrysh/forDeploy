export function loadCss(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    const links = document.head.getElementsByTagName('link');
    document.head.insertBefore(link, links[0]);
  }
  
export function loadJs(src) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.head.appendChild(script);
  }