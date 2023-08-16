
insertBowls();
updateCar();
updateMyOrders()

function createBowl(bowlData){
    const bowl = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('p');
    const price = document.createElement('p');
    const priceBold = document.createElement('b');
    const buy = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');

    bowl.classList.add('bowl');
    image.src = './assets/images/'+bowlData.image;
    name.innerText = bowlData.name;
    buy.classList.add('buy');
    input.setAttribute('type','number');
    input.setAttribute('min', 1);
    input.setAttribute('max', 50);
    input.value = 1;
    button.innerText = 'Añadir'
    button.classList.add('green');
    priceBold.innerText = '$'+ bowlData.price;
    button.addEventListener('click', (e)=>{
        const item = [bowlData, parseInt(input.value)];
        preOrder.order.push(item);
        updateAmount();
        car.classList.add('open');
        updateCar();
    })

    bowl.append(image);
    bowl.append(name);
    price.append(priceBold)
    bowl.append(price);
    buy.append(input);
    buy.append(button);
    bowl.append(buy);
    
    return bowl;
}


function createItem(itemData){ 
    const item = document.createElement('div');
    const divInfo = document.createElement('div');
    const divQuantity = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('p');
    const price = document.createElement('p');
    const buttonMinus = document.createElement('button');
    const number = document.createElement('p');
    const buttonPlus = document.createElement('button');

    item.classList.add('carItem');
    image.src = './assets/images/'+itemData[0].image;
    name.innerText = itemData[0].name;
    price.innerText = '$'+itemData[0].price;
    price.classList.add('price');
    (itemData[1] > 1)? buttonMinus.innerHTML= '<i class="ri-subtract-fill"></i>' : buttonMinus.innerHTML = '<i class="ri-delete-bin-line"></i>';
    number.innerText = itemData[1];
    buttonPlus.classList.add('buttonPlus');
    buttonPlus.innerHTML = '<i class="ri-add-line"></i>';
    divQuantity.classList.add('quantity');
    divInfo.classList.add('info');

    buttonMinus.addEventListener('click',(e)=>{
        itemData[1] = parseInt(itemData[1]) - 1;
        updateAmount();
        updateCar()
    })

    buttonPlus.addEventListener('click',(e)=>{
        itemData[1] = parseInt(itemData[1]) + 1;
        updateAmount();
        updateCar()
    })

    divInfo.append(name);
    divInfo.append(price);
    divQuantity.append(buttonMinus);
    divQuantity.append(number);
    divQuantity.append(buttonPlus);
    item.append(image);
    item.append(divInfo);
    item.append(divQuantity); 

    return item;
}


function createDelivery(order){
    const delivery = document.createElement('div');
    const title = document.createElement('h4');
    const description = document.createElement('p');
    const productValue = document.createElement('p');
    const amount = document.createElement('b');
    const progressBar = document.createElement('div');
    const progress = document.createElement('div');
    const small = document.createElement('small');
    const minutes = document.createElement('b');
    const countdown = document.createElement('span');
    const div = document.createElement('div');
    const cancel = document.createElement('button');
    const cancelAd = document.createElement('small');
 
    let currentDate = new Date();
    let time =  order.deliveryDate - currentDate.getTime();
    let restTime = (order.timeDeliveryMinutes * 60000) - time;
    let percentTime = (restTime * 100) / (order.timeDeliveryMinutes*60000);

    const interval = setInterval(function(){
        currentDate = new Date();
        time =  order.deliveryDate - currentDate.getTime();
        restTime = (order.timeDeliveryMinutes * 60000) - time;
        percentTime = (restTime * 100) / (order.timeDeliveryMinutes*60000);

        if(time > 0){
            progress.style.width = `${percentTime}%`;
            minutes.innerText = Math.floor(time/1000) + ' segundos';
        }else{
            clearInterval(interval);
            order.state = 'delivered';
            updateMyOrders();
            delivery.remove()
        }
    })
    

    delivery.classList.add('delivery');
    progressBar.classList.add('progressBar');
    progress.classList.add('progress');
    countdown.classList.add('countdown');
    progress.style.width = `${percentTime}%`;
    title.innerText = `Pedido #${order.code}`;
    div.classList.add('button');
    cancel.innerText = 'Cancelar';
    cancelAd.innerText = 'Puedes cancelar sólo en los primeros 5 minutos';
    let text = '';
    order.order.forEach(element => {
        text += `(${element[1]}) ${element[0].name} `
    });
    description.innerText = text;
    productValue.innerText = 'Valor de los productos ';
    amount.innerText = `$${order.amount}`;
    small.innerText = 'En reparto, se entregará en ';
    

    progressBar.append(progress);
    delivery.append(progressBar);
    delivery.append(title);
    delivery.append(description);
    productValue.append(amount);
    delivery.append(productValue);
    small.append(minutes);
    delivery.append(small);
    div.append(cancel)
    div.append(cancelAd);
    delivery.append(div);
    
    return delivery;
}

function createHistoryOrder(order){
    const historyOrder = document.createElement('div');
    const title = document.createElement('h4');
    const description = document.createElement('p');
    const productValue = document.createElement('p');
    const amount = document.createElement('b');
    const state = document.createElement('div');

    historyOrder.classList.add('delivery');
    title.innerText = `Pedido #${order.code}`;
    let text = '';
    order.order.forEach(element => {
        text += `(${element[1]}) ${element[0].name} `
    });
    description.innerText = text;
    productValue.innerText = 'Valor de los productos ';
    amount.innerText = `$${order.amount}`;
    state.classList.add('state');
    state.innerText = `${order.state}`;

    historyOrder.append(title);
    historyOrder.append(description);
    productValue.append(amount);
    historyOrder.append(productValue);
    historyOrder.append(state);

    return historyOrder;
}



function insertBowls(){
    storeBowls.forEach(bowl => {
        if(bowl.type == 'desayuno'){
            desayunosBowlsContainer.append(createBowl(bowl));
        }else if(bowl.type == 'almuerzo'){
            almuerzosBowlsContainer.append(createBowl(bowl));
        }else if(bowl.type == 'vegetariano'){
            vegetarianosBowlsContainer.append(createBowl(bowl));
        }
    });
}

function updateMyOrders(){
    localStorage.setItem('historyOrders', JSON.stringify(historyOrders))
    const inDelivery = historyOrders.filter((order) => order.pay && order.state == 'payed');
    const inHistory = historyOrders.filter((order) => order.state != 'payed');

    if(inDelivery.length > 0){
        activeOrders.innerHTML ='';
        inDelivery.forEach(function(item, index){
            activeOrders.append(createDelivery(item));
        })
    }else{
       activeOrders.innerHTML = 'No hay pedidos en distribución'
    }

    if(inHistory.length > 0){
        oldOrders.innerHTML = '';
        inHistory.forEach(function(item, index){
            oldOrders.append(createHistoryOrder(item));
        })
    }else{
        oldOrders.innerHTML = 'No hay pedidos antigüos'
    }

}

function updateCar(){
    orderCarContainer.innerHTML = '';
    preOrder.order.forEach(function(item, index, object) {
        if(item[1] >= 1){
            orderCarContainer.append(createItem(item));
        }else{
            object.splice(index,1);
        }
    })

    if(locationUser){
        preOrder.location = {...locationUser.center};
        preOrder.delivery = calculateDelivery(calculateDistance(preOrder.location));  
    }

    if(preOrder.order.length > 0){
        preOrder.state = 'open';
        
        const subtotal = (preOrder.amount + preOrder.delivery);
        const total =  subtotal - (subtotal*preOrder.bono/100);

        amountProducts.innerText = '$'+ preOrder.amount;
        amountSubtotal.innerText = '$'+ subtotal;
        amountBono.innerText = '-$'+(subtotal*preOrder.bono/100);
        amountTotal.innerText = '$'+ total; 

        if(preOrder.delivery > 0){
            createOrderButton.disabled = false;
            orderError.innerText = '';
            deliveryPrice.innerText = `$ ${preOrder.delivery}` 
        }else{
            createOrderButton.disabled = true;
            orderError.innerText = 'Debes escoger una ubicación para realizar el pedido';
            deliveryPrice.innerText = 'Pendiente';
        }

        totalContainer.classList.add('active');
        summaryContainer.classList.add('active');
        
    }else{
        preOrder.state = '';
        orderCarContainer.innerHTML = '<p>No items to buy.</p>';
        totalContainer.classList.remove('active');
        summaryContainer.classList.remove('active');
    }

    localStorage.setItem('preOrder',JSON.stringify(preOrder));
}


function updateAmount(){
    let amount = 0;
    preOrder.order.forEach((order)=>{
        amount +=  order[0].price * order[1]
    })
    preOrder.amount = amount;
}

function updateLocalStorageLocation(){
    if(locationUser){
        localStorage.setItem('location', JSON.stringify(locationUser));
        console.log(localStorage.getItem('location'));
    }
    
}

function resetPreOrder(){
    preOrder = {
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
    
}