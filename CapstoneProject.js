// JavaScript code for the restaurant ordering system

// Function to take orders
function takeOrder() {
    let mainIngredient = prompt('Enter the main ingredient for your order:');
    mainIngredient = mainIngredient.toLowerCase().replace(' ', '_');
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.meals === null) {
          // Handle null response
          alert('No meals found for the provided main ingredient. Please try again.');
          takeOrder();
        } else {
          const randomIndex = Math.floor(Math.random() * data.meals.length);
          const randomMeal = data.meals[randomIndex];
          const order = {
            description: randomMeal.strMeal,
            orderNumber: generateOrderNumber(),
            completionStatus: 'incomplete'
          };
          storeOrder(order);
          alert(`Order placed! Your order number is ${order.orderNumber}.`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing your order. Please try again later.');
      });
  }
  
  // Function to generate a unique order number
  function generateOrderNumber() {
    const orders = JSON.parse(sessionStorage.getItem('orders'));
    const lastOrderNumber = sessionStorage.getItem('lastOrderNumber');
    return (lastOrderNumber ? lastOrderNumber : 0) + 1;
  }
  
  // Function to store the order details in session storage
  function storeOrder(order) {
    let orders = JSON.parse(sessionStorage.getItem('orders'));
    if (!orders) {
      orders = [];
    }
    orders.push(order);
    sessionStorage.setItem('orders', JSON.stringify(orders));
    sessionStorage.setItem('lastOrderNumber', order.orderNumber);
  }
  
  // Function to display and complete orders
  function displayOrders() {
    const orders = JSON.parse(sessionStorage.getItem('orders'));
    const incompleteOrders = orders.filter(order => order.completionStatus === 'incomplete');
  
    if (incompleteOrders.length === 0) {
      alert('No incomplete orders found.');
      return;
    }
  
    let orderNumbers = '';
    incompleteOrders.forEach(order => {
      orderNumbers += `${order.orderNumber}: ${order.description}\n`;
    });
  
    const orderNumberToComplete = parseInt(prompt(`Incomplete Orders:\n${orderNumbers}\nEnter the order number to mark as complete (or enter 0 to cancel):`));
  
    if (orderNumberToComplete === 0) {
      return;
    }
  
    const orderToComplete = incompleteOrders.find(order => order.orderNumber === orderNumberToComplete);
  
    if (orderToComplete) {
      orderToComplete.completionStatus = 'completed';
      sessionStorage.setItem('orders', JSON.stringify(orders));
      alert(`Order ${orderToComplete.orderNumber} marked as complete.`);
    } else {
      alert(`Order ${orderNumberToComplete} does not exist.`);
    }
  }
  
  // Function to integrate the project into the portfolio
  function integrateProject() {
    const portfolioSection = document.getElementById('portfolio');
    const projectLink = document.createElement('a');
    projectLink.href = 'javascript:void(0)';
    projectLink.textContent = 'Download Restaurant Ordering System';
    projectLink.addEventListener('click', takeOrder);
    portfolioSection.appendChild(projectLink);
  }