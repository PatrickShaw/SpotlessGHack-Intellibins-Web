const BASE_URL = "https://intellibin.herokuapp.com";
//const BASE_URL = "http://127.0.0.1:8081";

function _request(url, options, callback) {
    const data = options.data || null;
    const method = options.method || null;
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.addEventListener('load', () => callback(null, xmlRequest.response));
    xmlRequest.open(method, url);
    xmlRequest.send(data);
}

function getBins(callback) {
    const options = {
        method: 'GET'
    };
    _request(BASE_URL + '/client/bins', options, (err, data) => {
        callback(err, data);
    });
}

function assignBin(binId, callback) {
    const options = {
        method: 'POST',
        data: {
            bin_id: binId
        }
    };
    _request(BASE_URL + '/api/bin/assign', options, (err, data) => {
        callback(err, data);
    });
}

function unassignBin(binId, callback) {
    const options = {
        method: 'POST',
        data: {
            bin_id: binId
        }
    };
    _request(BASE_URL + '/api/bin/unassign', options, (err, data) => {
        callback(err, data);
    });
}

export {getBins, assignBin, unassignBin};