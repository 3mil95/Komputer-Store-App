


function Work() {
    this.payBalance = 0;

    this.getPayBalance = () => {
        return this.payBalance;
    }

    this.transferPayBalance = (to) => {
        to(this.payBalance);
        this.payBalance = 0;
    }

    this.addToPayBalance = (value) => {
        this.payBalance += value;
    }

}