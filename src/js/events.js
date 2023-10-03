changeLocationButton.addEventListener('click', () => changeLocation.classList.add('open'));
openCarButton.addEventListener('click', () => car.classList.add('open'));
openMyOrderButton.addEventListener('click', () => myorders.classList.add('open'));

closeButtons.forEach(element => {
    element.addEventListener('click', () =>{document.querySelector(element.dataset.target).classList.remove('open')})
});

createOrderButton.addEventListener('click', () => {
    if(preOrder.delivery > 0){
        preOrder.state = 'payed';
        preOrder.pay = true;
        let currentDate = new Date();
        let deliveryDate = new Date(currentDate.getTime() + preOrder.timeDeliveryMinutes * 60000);
        preOrder.code = currentDate.getTime();
        preOrder.deliveryDate = deliveryDate.getTime();
        historyOrders.push(preOrder);
        console.log(historyOrders)
        resetPreOrder();
        updateCar();
        updateMyOrders();
        car.classList.remove('open');
        myorders.classList.add('open');
    }
})

