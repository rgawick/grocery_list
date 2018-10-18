let itemTextBox = document.getElementById("itemTextBox")
let storeSelect = document.getElementById("storeSelect")
let orderBtn = document.getElementById("orderBtn")
let container = document.getElementById("container")
let displayAllBtn = document.getElementById("displayAllBtn")
let ordersList = document.getElementById("ordersList")

const database = firebase.database()
const ordersRef = database.ref("orders")

let orders = []

function placeOrder(order) {

   let orderRef = ordersRef.push()
   orderRef.set(order)
   orders.push(order)
}


function displayOrders() {

  ordersRef.on('value',function(snapshot){
      ordersList.innerHTML = ''
      orders = []
      snapshot.forEach(function(childSnapshot){
        let key = childSnapshot.val().store
        let value = childSnapshot.val().item
        orders.push(childSnapshot.val())
      })
      orders.forEach(order => ordersList.innerHTML += `<li>${order.store} - ${order.item}</li>`)
    })
}


function configureObservers() {
  ordersRef.on('value',function(snapshot){
  orders = []
      snapshot.forEach(function(childSnapshot){
          orders.push(childSnapshot.val())
      })
      displayOrders()
    })
}


orderBtn.addEventListener('click',function(){

    let store = storeSelect.value
    let item = itemTextBox.value

    let order = { store : store , item : item  }

    placeOrder(order)
})

displayAllBtn.addEventListener('click',function(){

    displayOrders()
})

 // configureObservers()
