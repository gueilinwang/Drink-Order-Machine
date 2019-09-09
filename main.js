;(function() {
  const orderLists = document.querySelector('[data-order-lists]')
  const addDrinkButton = document.querySelector('[data-pos="add-drink"]')
  //建立一個飲料的建構子
  function Drink(name, sugar, ice) {
    this.name = name
    this.sugar = sugar
    this.ice = ice
  }
  //新增price方法到Drink的prototype中
  Drink.prototype.price = function() {
    switch (this.name) {
      case 'Black Tea':
      case 'Oolong Tea':
      case 'Baozong Tea':
      case 'Green Tea':
        return 30
      case 'Bubble Milk Tea':
      case 'Lemon Green':
        return 50
      case 'Black Tea Latte':
      case 'Matcha Latte':
        return 55
      default:
        alert('No This Drink')
    }
  }
  //新增一個方法來找出所有選中的選項值
  function getCheckedValue(inputName) {
    let selectedOption = ''
    document.querySelectorAll(`[name = ${inputName}]`).forEach(item => {
      if (item.checked) {
        selectedOption = item.value
      }
    })
    return selectedOption
  }

  function addDrink(drink) {
    let orderListCard = `
    <div class="card  mb-3">
      <div class="card-body pt-3 pr-3">
        <div class="text-right">
          <span data-pos="delete-drink">x</span>
        </div>
        <h6 class="card-title mb-1">${drink.name}</h6>
        <div class="card-text">${drink.ice}</div>
        <div class="card-text">${drink.sugar}</div>
      </div>
      <div class="card-footer text-muted py-2">
        <div class="card-text text-right">$
          <span data-drink-price>${drink.price()}</span>
        </div>
      </div>
    </div>
    `

    orderLists.insertAdjacentHTML('afterbegin', orderListCard)
  }
  function getTotalPrice() {
    let totalPrice = 0
    let priceList = orderLists.querySelectorAll('[data-drink-price]')
    let count = priceList.length
    priceList.forEach(item => {
      totalPrice += Number(item.textContent)
    })
    let totalContent = [totalPrice, count]

    return totalContent
  }
  function clearOrder() {
    orderLists.querySelectorAll('.card').forEach(item => item.remove())
  }
  //設置新增清單的監聽器
  addDrinkButton.addEventListener('click', function() {
    // 1. 取出選擇的飲料品項、甜度、冰塊選項內容
    const drinkName = getCheckedValue('drink')
    const ice = getCheckedValue('ice')
    const sugar = getCheckedValue('sugar')
    // 2. 如果沒有選擇飲料品項，跳出提示
    if (!drinkName) {
      alert('Please choose at least one item.')
    }
    // 3. 建立飲料實例，並取得飲料價格
    const drink = new Drink(drinkName, ice, sugar)

    // 4. 將飲料實例產生成左側訂單區的畫面
    addDrink(drink)
  })
  //設置移除清單按鈕、結帳按鈕的監聽器
  orderLists.addEventListener('click', function(e) {
    let isDeleteButton = e.target.matches('[data-pos="delete-drink"]')
    let isCheckoutButton = e.target.matches('[data-pos="checkout"]')
    if (!isDeleteButton) {
      if (!isCheckoutButton) {
        return
      } else {
        let amount = getTotalPrice()[0]
        let total = getTotalPrice()[1]
        if (amount === 0) {
          alert("You don't choose any drink !")
        } else {
          confirm(
            `You Have chosen ${total} ${total > 1 ? 'Drinks' : 'Drink'}.
Total amount of  ${total > 1 ? 'Drinks' : 'Drink'}：$${amount}.`
          )
        }

        clearOrder()
      }
    } else {
      e.target.parentElement.parentElement.parentElement.remove()
    }
  })
})()
