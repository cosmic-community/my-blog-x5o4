(function() {
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(function(arg) {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, function(key, value) {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = { timestamp, level, message, url: window.location.href };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) logs.shift();
    
    try {
      window.parent.postMessage({ type: 'console-log', log: logEntry }, '*');
    } catch (e) {}
  }
  
  ['log', 'warn', 'error', 'info', 'debug'].forEach(function(level) {
    console[level] = function() {
      originalConsole[level].apply(console, arguments);
      captureLog(level, Array.from(arguments));
    };
  });
  
  window.addEventListener('error', function(e) {
    captureLog('error', [e.message + ' at ' + e.filename + ':' + e.lineno]);
  });
  
  window.addEventListener('unhandledrejection', function(e) {
    captureLog('error', ['Unhandled Promise Rejection: ' + String(e.reason)]);
  });
  
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', function() {
      sendReady();
      sendRouteChange();
    });
  }
  
  const origPushState = history.pushState;
  const origReplaceState = history.replaceState;
  history.pushState = function() {
    origPushState.apply(this, arguments);
    sendRouteChange();
  };
  history.replaceState = function() {
    origReplaceState.apply(this, arguments);
    sendRouteChange();
  };
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
})();