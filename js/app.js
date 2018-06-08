if ('serviceWorker' in navigator) {

    navigator.serviceWorker
        .register('./service-Worker.js', {
            scope: './'
        })
        .then(function(registration) {
            console.log("service Worker Registered", registration);
        })
        .catch(function(err) {
            console.log("service Worker failed to Register", err);
        })

}