let locationUser;
//localStorage.removeItem('historyOrders');
verifyLSLocation();

let historyOrders = [];

let preOrder = {
    code: 0,
    pay: false,
    state: '',
    order: [],
    delivery: 0,
    timeDeliveryMinutes: 1,
    deliveryDate: '',
    amount: 0,
    bono: 100,
    location: {}
};

verifyLSPreOrder();
verifyLSHistoryOrders()

function verifyLSPreOrder(){
    const preOrderLS = JSON.parse(localStorage.getItem('preOrder'));
    if(preOrderLS){
        preOrder = {...preOrderLS};
    }
}

function verifyLSHistoryOrders(){
    const historyOrdersLS = JSON.parse(localStorage.getItem('historyOrders'));
    if(historyOrdersLS){
        historyOrders = [...historyOrdersLS]
    }
}


