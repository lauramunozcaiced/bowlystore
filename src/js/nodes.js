/*Desayunos Container */
const desayunosBowlsContainer = document.querySelector('#desayunosBowls');

/*Almuerzos Container*/
const almuerzosBowlsContainer = document.querySelector('#almuerzosBowls');

/*Vegetarianos Container*/
const vegetarianosBowlsContainer = document.querySelector('#vegetarianosBowls');

/*Car */
const car = document.querySelector('#car');

/* My Orders*/
const myorders = document.querySelector('#myorders');

/*Car => Order */
const orderCarContainer = document.querySelector('#car #order');

/*Car => Summary */
const summaryContainer = document.querySelector('#summary');
const amountProducts = document.querySelector('#car #summary #amountProducts');
const changeLocationButton = document.querySelector('#car #summary button');
const deliveryPrice = document.querySelector('#car #summary #deliveryPrice');
const orderError = document.querySelector('#car #summary #error');
const amountSubtotal = document.querySelector('#car #summary #subtotal');
const amountBono = document.querySelector('#car #summary #bono');

/*Car => Total */
const totalContainer = document.querySelector('#car #totalContainer');
const amountTotal = document.querySelector('#car #totalContainer #total');
const createOrderButton = document.querySelector('#car #totalContainer button');

/* Change Location */
const changeLocation = document.querySelector('#changeLocation');
const changeLocationError = document.querySelector('#changeLocation #error');
const saveLocationMapButton = document.querySelector('#changeLocation #saveLocationMap');

/* Orders */
const activeOrders = document.querySelector('#myorders .activeOrders');
const oldOrders = document.querySelector('#myorders .historyOrders');

/* Others */
const closeButtons = document.querySelectorAll('.closer');
const openCarButton = document.querySelector('#openCar');
const openMyOrderButton = document.querySelector('#openMyOrder');

/* Nav */
const navContainer = document.querySelector('.navContainer');
const nav = document.querySelector('nav');
const navMobileButton = document.querySelector('#navMobile');