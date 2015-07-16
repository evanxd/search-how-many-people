(function(){
  var httpServer = new HTTPServer(8080);
  var peopleNumberData = 0;

  httpServer.addEventListener('request', function(evt) {
    var request  = evt.request;
    var response = evt.response;
    switch(request.params.data) {
      case 'peopleNumber':
        // TODO: Get the people number from the BLE people counter.
        break;
    }
    var jsonp = `${request.params.callback}({ "${request.params.data}": ${peopleNumberData} });`;
    response.headers['Content-Type'] = 'text/javascript';
    response.send(jsonp);
  });

  window.addEventListener('load', function() {
    var peopleNumber = document.querySelector('#peopleNumber');
    var status = document.querySelector('#status');
    var ip = document.querySelector('#ip');
    var port = document.querySelector('#port');
    var add = document.querySelector('#add');
    var start = document.querySelector('#start');
    var stop = document.querySelector('#stop');

    IPUtils.getAddresses(function(ipAddress) {
      ip.textContent = ip.textContent || ipAddress;
    });

    port.textContent = httpServer.port;

    add.addEventListener('click', function() {
      peopleNumberData++;
      peopleNumber.innerHTML = peopleNumberData;
    });

    start.addEventListener('click', function() {
      httpServer.start();
      status.textContent = 'Running';
    });

    stop.addEventListener('click', function() {
      httpServer.stop();
      status.textContent = 'Stopped';
    });
  });

  window.addEventListener('beforeunload', function() {
    httpServer.stop();
  });
}());
