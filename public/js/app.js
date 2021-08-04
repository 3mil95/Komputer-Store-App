const workButtonElement = document.getElementById("workButton");
const bankButtonElement = document.getElementById("bankButton");
const loanButtonElement = document.getElementById("loanButton");
const buyButtonElement = document.getElementById("buyButton");
const repayLoanButtonElement = document.getElementById("repayLoanButton");

const payBalanceElement = document.getElementById("payBalance");
const bankBalanceElement = document.getElementById("bankBalance");
const loanAmountElement = document.getElementById("loanAmount");

const laptopsSelectorElement = document.getElementById("laptopsSelector");

const loanBalanceDivElement = document.getElementById("loanBalanceDiv");

const featuresListElement = document.getElementById("featuresList");

const laptopImageElement = document.getElementById("laptopImage");
const laptopNameElement = document.getElementById("laptopName");
const laptopDescriptionElement = document.getElementById("laptopDescription");
const laptopPrice = document.getElementById("laptopPrice");



const work = new Work();
const bank = new Bank();
let laptops = [];
let selectedLaptop;

const baseURL = "https://noroff-komputer-store-api.herokuapp.com/";


// Getting the laptop data. 
fetch(`${baseURL}computers`)
    .then(response => response.json())
    .then(data =>  {
        laptops = data;
        updateLaptopSelector();
        updateLaptop(0);
    });



// UI update functions.

// Adds the laptops to the selector element as options. 
const updateLaptopSelector = () => {
    laptops.forEach((laptop) => addLaptopToSelector(laptop));  
}

// Adds a laptop to the selector element as options.
const addLaptopToSelector = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsSelectorElement.appendChild(laptopElement);
}

// Updates the features list for the selected laptop.
const updateLaptopFeaturesList = () => {
    while (featuresListElement.firstChild) {
        featuresListElement.removeChild(featuresListElement.firstChild);
    }
    selectedLaptop.specs.forEach((spec) => {
        const specElement = document.createElement("li");
        specElement.textContent = spec;
        featuresListElement.appendChild(specElement);
    })
}

// Updates the laptop section with the current laptop.
const updateLaptop = (index) => {
    const laptop = laptops[index];
    selectedLaptop = laptop;
    const imageURL = baseURL + laptop.image;
    laptopImageElement.src = imageURL;
    laptopNameElement.textContent = laptop.title;
    laptopDescriptionElement.textContent = laptop.description;
    laptopPrice.textContent = `${laptop.price} NOK`;
    updateLaptopFeaturesList();
}

// Updates the work section with the current state.
const updateWork = () => {
    payBalanceElement.textContent = `${work.getPayBalance()} kr.`;

    if (bank.getLoanValue() <= 0) {
        repayLoanButtonElement.classList.add("hidden");
        return;
    }

    repayLoanButtonElement.classList.remove("hidden");
}

// Updates the work section with the current state.
const updateBank = () => {
    bankBalanceElement.textContent = `${bank.getBalance()} kr.`;

    if (bank.getLoanValue() <= 0) {
        loanBalanceDivElement.classList.add("hidden");
        return;
    }

    loanBalanceDivElement.classList.remove("hidden");
    loanAmountElement.textContent = `${bank.getLoanValue()} kr.`;
}


// event handle functions.

// handles if img element errors and tests ".png" image.
const handleImageError = () => {
    const altImageUR = baseURL + selectedLaptop.image.split(".")[0] + ".png";
    if (laptopImageElement.src !== altImageUR) {
        laptopImageElement.src = altImageUR;
    }
}


// button click handlers.

const handleRepayLoanButtonClick = () => {
    work.transferPayBalance(bank.payBackLoan);
    updateWork();
    updateBank();
}

const handleBuyButtonClick = () => {
    message = bank.buyLaptop(selectedLaptop);
    alert(message);
    updateBank();
}

const handleWorkButtonClick = () => {
    work.addToPayBalance(100);
    updateWork();
}

const handleBankButtonClick = () => {
    work.transferPayBalance(bank.addToBalance);
    updateWork();
    updateBank();
}

const handleLoanButtonClick = () => {
    const loanAmount = parseFloat(prompt("How much do you want to borrow?"));
    if (!loanAmount) {
        return;
    }
    const res = bank.takeLoan(loanAmount);
    if (!res.loanAccepted) {
        alert(res.message);
        return;
    }
    updateWork();
    updateBank();
} 

// selector click handlers.

const handleLaptopChange = (e) => {
    updateLaptop(e.target.selectedIndex);
}


// Add event listeners, 

laptopsSelectorElement.addEventListener("change", handleLaptopChange);
repayLoanButtonElement.addEventListener("click", handleRepayLoanButtonClick);
buyButtonElement.addEventListener("click", handleBuyButtonClick);
loanButtonElement.addEventListener("click", handleLoanButtonClick);
bankButtonElement.addEventListener("click", handleBankButtonClick);
workButtonElement.addEventListener("click", handleWorkButtonClick);
laptopImageElement.addEventListener("error", handleImageError)

// Update to starting state. 

updateBank();
updateWork();
