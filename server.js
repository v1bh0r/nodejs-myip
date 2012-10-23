var start = Date.now();

var MyIP = require("./myIP");

var foundIPs = [];

var hosts = [
    {ip:'checkip.amazonaws.com', path:'/', truncate:''},
    {ip:'checkip.dyndns.org', path:'/', truncate:'Current IP Address: '},
    {ip:'ifconfig.me', path:'/ip', truncate:''},
    {ip:'corz.org', path:'/ip', truncate:''}
]

for (var hostId in hosts) {
    var host = hosts[hostId]
    var options = {
        host:host['ip'],
        port:80,
        path:host['path'],
        truncate: host['truncate']
    };

    MyIP.fetch(options, function(data){
        for(index in foundIPs){
            if(foundIPs[index] == data)
            {
                console.log(data);

                console.log('Time taken: ', Date.now() - start);

                process.exit();
            }
        }
        foundIPs.push(data);
    });
}