const tipCalculator = () => {
    //variables staying private
    let bill = 0;
    let tipPercent = 0;
    // at least one person has to pay the bill
    let nOfPeople = 1;
    let lastActiveBtn = '';

    //bill input listener
    document.querySelector('.bill').oninput = (e) => {
        bill = e.srcElement.value;
        updateTotal();
    }

    //tip input listener
    document.querySelector('.box-button').addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.dataset.tipSetter) {
            tipPercent = e.target.value;
            //toggle the active class to show button is pressed
            let btnToggled = e.target.classList.toggle('btn-active');
            //if first time pressing button dont toggle last active button
            if (lastActiveBtn) lastActiveBtn.classList.toggle('btn-active');
            //remember last active button
            lastActiveBtn = e.target;
            updateTotal();
        }
    })

    //tip custom listener
    document.querySelector('.tip-calc-custom').oninput = (e) => {
        tipPercent = (e.srcElement.value < 0) ? 0 : e.srcElement.value;
        updateTotal();
    }

    //number of people listener
    document.querySelector('.people').oninput = (e) => {
        nOfPeople = (e.srcElement.value > 0) ? e.srcElement.value : 1;
        updateTotal();
        
    }

    //reset 
    const resetBtn = document.querySelector('.reset')
    resetBtn.addEventListener('click', tipCalculatorReset);

    //function to calculate the total for tip and bill
    function updateTotal() {
        // enable reset button only when inputs have been activated
        if (resetBtn.disabled) {
            resetBtn.removeAttribute('disabled');
        }

        //select dom elements for displaying results
        const tipElement = document.querySelector('.tip_amount');
        const billElement = document.querySelector('.bill_amount');

        //calculate tip and bill / pers
        let tip = ((bill / 100) * tipPercent) / nOfPeople;
        let total = bill / nOfPeople + tip;
        tip = tip.toFixed(2);
        total = total.toFixed(2);

        //update the elements with the results
        tipElement.textContent = (tip === 0) ? "$0.00" : "$" + tip;
        billElement.textContent = (total === 0) ? "$0.00" : "$" + total;
    }

    //function to reset the values
    function tipCalculatorReset(e) {
        //clear all values
        bill = 0;
        tipPercent = 0;
        nOfPeople = 1;
        document.querySelector('.bill').value = '';
        document.querySelector('.tip-calc-custom').value = '';
        document.querySelector('.people').value = '';
        document.querySelector('.tip_amount').textContent = "$0.00";
        document.querySelector('.bill_amount').textContent = "$0.00";

        //remove btn-active class from pressed button and clear the varialble
        lastActiveBtn.classList.toggle('btn-active');
        lastActiveBtn = false;

        //disable reset button
        resetBtn.setAttribute('disabled', true);
    } 
}

tipCalculator();