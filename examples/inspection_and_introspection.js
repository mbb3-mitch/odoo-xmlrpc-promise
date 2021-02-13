const Odoo = require('../lib/index');

const odoo = new Odoo({
    url: '<insert server URL>',
    port: '<insert server port default 80>',
    db: '<insert database name>',
    username: '<insert username>',
    password: '<insert password>'
});

odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push({'name': 'Custom Model',
        'model': 'x_custom_model',
        'state': 'manual'
    });
    var params = [];
    params.push(inParams);
    odoo.execute_kw('ir.model', 'create', params, function (err, value) {
        if (err) { return console.log(err); }
        var inParams = [];
        inParams.push([]);
        inParams.push([]);
        inParams.push([]);
        inParams.push(['string', 'help', 'type']);  //attributes
        var params = [];
        params.push(inParams);
        odoo.execute_kw('x_custom_model', 'fields_get', params, function (err2, value2) {
            if (err2) { return console.log(err2); }
            console.log('Result: ', value2);
        });
        console.log('Result: ', value);
    });
});

async function inspection_and_introspection() {
    try {
        const uid = await odoo.promise_connect()
        console.log(`Connected to odoo with UID ${uid}`)
        let result = await odoo.promise_execute_kw('ir.model', 'create', [{'name': 'Custom Model',
            'model': 'x_custom_model',
            'state': 'manual'
        }])
        console.log(`created model: ${result}`)

        result = await odoo.promise_execute_kw('x_custom_model', 'fields_get', [], {attributes: ['string', 'help', 'type']})
        console.log(result)
    } catch(e){
        console.error(e)
    }
}
