function updateShift() {
    const shift = document.querySelector('input[name="shift"]:checked').value;
    const driverSelection = document.getElementById('driverSelection');
    const driverOptions = document.getElementById('driverOptions');

    driverSelection.style.display = 'block';
    driverOptions.innerHTML = '';

    if (shift === "Yagnik") {
        driverOptions.innerHTML = `
            <label class="radio-container">
                <input type="radio" name="driver" value="Yagnik" onchange="updateForm()">
                <span class="checkmark"></span> 👨‍🦱 Yagnik is Driving
            </label>
            <label class="radio-container">
                <input type="radio" name="driver" value="None" onchange="updateForm()">
                <span class="checkmark"></span> 🚗 Yagnik is going with someone else
            </label>`;
    } else if (shift === "Mayuri") {
        driverOptions.innerHTML = `
            <label class="radio-container">
                <input type="radio" name="driver" value="Mayuri" onchange="updateForm()">
                <span class="checkmark"></span> 👩‍🦰 Mayuri is Driving
            </label>
            <label class="radio-container">
                <input type="radio" name="driver" value="None" onchange="updateForm()">
                <span class="checkmark"></span> 🚗 Mayuri is going with someone else
            </label>`;
    } else if (shift === "Both") {
        driverOptions.innerHTML = `
            <label class="radio-container">
                <input type="radio" name="driver" value="Yagnik" onchange="updateForm()">
                <span class="checkmark"></span> 👨‍🦱 Yagnik
            </label>
            <label class="radio-container">
                <input type="radio" name="driver" value="Mayuri" onchange="updateForm()">
                <span class="checkmark"></span> 👩‍🦰 Mayuri
            </label>
            <label class="radio-container">
                <input type="radio" name="driver" value="SharedRoute" onchange="updateForm()">
                <span class="checkmark"></span> 🚘 Both (Shared Route)
            </label>
            <label class="radio-container">
                <input type="radio" name="driver" value="None" onchange="updateForm()">
                <span class="checkmark"></span> 🚗 None
            </label>`;
    }
}

function updateForm() {
    document.getElementById('inputsYagnik').style.display = 'none';
    document.getElementById('inputsMayuri').style.display = 'none';
    document.getElementById('sharedRouteInputs').style.display = 'none';
    document.getElementById('commonInputs').style.display = 'block';

    const driver = document.querySelector('input[name="driver"]:checked').value;

    if (driver === "Yagnik") {
        document.getElementById('inputsYagnik').style.display = 'block';
    } else if (driver === "Mayuri") {
        document.getElementById('inputsMayuri').style.display = 'block';
    } else if (driver === "SharedRoute") {
        document.getElementById('sharedRouteInputs').style.display = 'block';
    }
}

function calculateOptimalDriver() {
    const driver = document.querySelector('input[name="driver"]:checked').value;
    const shift = document.querySelector('input[name="shift"]:checked').value;
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
    const mileage = parseFloat(document.getElementById('mileage').value);
    const depreciationRate = parseFloat(document.getElementById('depreciationRate').value);

    let resultHTML = '';

    function calculateCosts(distance, passengers, charge) {
        const roundTripDistance = distance * 2; // Convert to round trip
        const fuelCost = (roundTripDistance * mileage / 100) * fuelPrice;
        const depreciation = roundTripDistance * depreciationRate;
        const totalCost = fuelCost + depreciation;
        const earnings = passengers * charge;
        const netProfit = earnings - totalCost;
        return { roundTripDistance, fuelCost, depreciation, totalCost, earnings, netProfit };
    }

    if (driver === "Yagnik") {
        const dist = parseFloat(document.getElementById('distanceYagnik').value);
        const passengers = parseFloat(document.getElementById('passengersYagnik').value) || 0;
        const charge = parseFloat(document.getElementById('chargeYagnik').value);

        const res = calculateCosts(dist, passengers, charge);

        // Only add reverse ride cost if BOTH have shift
        let reverseCost = 0;
        if (shift === "Both") {
            reverseCost = parseFloat(document.getElementById('reverseMayuri').value) || 0;
        }

        resultHTML = `
            <h3>📊 Result: Yagnik Driving</h3>
            <p>💸 Net Profit: ${res.netProfit.toFixed(2)} CAD</p>
            <ul>
                <li>Round Trip Distance: ${res.roundTripDistance} km</li>
                <li>Fuel Cost: ${res.fuelCost.toFixed(2)} CAD</li>
                <li>Depreciation: ${res.depreciation.toFixed(2)} CAD</li>
                <li>Total Cost: ${res.totalCost.toFixed(2)} CAD</li>
                <li>Earnings: ${res.earnings.toFixed(2)} CAD</li>
                ${shift === "Both" ? `<li>Reverse Ride Cost for Mayuri: ${reverseCost.toFixed(2)} CAD</li>` : ""}
                <li>Combined Profit: ${(res.netProfit - reverseCost).toFixed(2)} CAD</li>
            </ul>`;
    } else if (driver === "Mayuri") {
        const dist = parseFloat(document.getElementById('distanceMayuri').value);
        const passengers = parseFloat(document.getElementById('passengersMayuri').value) || 0;
        const charge = parseFloat(document.getElementById('chargeMayuri').value);

        const res = calculateCosts(dist, passengers, charge);

        // Only add reverse ride cost if BOTH have shift
        let reverseCost = 0;
        if (shift === "Both") {
            reverseCost = parseFloat(document.getElementById('reverseYagnik').value) || 0;
        }

        resultHTML = `
            <h3>📊 Result: Mayuri Driving</h3>
            <p>💸 Net Profit: ${res.netProfit.toFixed(2)} CAD</p>
            <ul>
                <li>Round Trip Distance: ${res.roundTripDistance} km</li>
                <li>Fuel Cost: ${res.fuelCost.toFixed(2)} CAD</li>
                <li>Depreciation: ${res.depreciation.toFixed(2)} CAD</li>
                <li>Total Cost: ${res.totalCost.toFixed(2)} CAD</li>
                <li>Earnings: ${res.earnings.toFixed(2)} CAD</li>
                ${shift === "Both" ? `<li>Reverse Ride Cost for Yagnik: ${reverseCost.toFixed(2)} CAD</li>` : ""}
                <li>Combined Profit: ${(res.netProfit - reverseCost).toFixed(2)} CAD</li>
            </ul>`;
    } else if (driver === "SharedRoute") {
        const pMayuri = parseFloat(document.getElementById('passengersMayuriShared').value) || 0;
        const pYagnik = parseFloat(document.getElementById('passengersYagnikShared').value) || 0;
        const distMayuri = parseFloat(document.getElementById('distanceMayuriShared').value);
        const extraDistYagnik = parseFloat(document.getElementById('extraDistanceYagnik').value);
        const chargeMayuri = parseFloat(document.getElementById('chargeMayuriShared').value);
        const chargeYagnik = parseFloat(document.getElementById('chargeYagnikShared').value);

        const roundTripMayuri = distMayuri * 2;
        const roundTripExtraYagnik = extraDistYagnik * 2;
        const totalRoundTrip = roundTripMayuri + roundTripExtraYagnik;

        const earningsMayuri = pMayuri * chargeMayuri;
        const earningsYagnik = pYagnik * chargeYagnik;

        const fuelCost = (totalRoundTrip * mileage / 100) * fuelPrice;
        const depreciation = totalRoundTrip * depreciationRate;
        const totalCost = fuelCost + depreciation;
        const totalEarnings = earningsMayuri + earningsYagnik;
        const netProfit = totalEarnings - totalCost;

        resultHTML = `
            <h3>📊 Shared Route Result</h3>
            <p>✅ Both share one car</p>
            <p>💸 Combined Net Profit: ${netProfit.toFixed(2)} CAD</p>
            <ul>
                <li>Round Trip Distance: ${totalRoundTrip} km</li>
                <li>Total Earnings: ${totalEarnings.toFixed(2)} CAD</li>
                <li>Fuel Cost: ${fuelCost.toFixed(2)} CAD</li>
                <li>Depreciation: ${depreciation.toFixed(2)} CAD</li>
                <li>Total Cost: ${totalCost.toFixed(2)} CAD</li>
            </ul>`;
    } else if (driver === "None") {
        // Only count reverse rides for siblings who have shifts
        let reverseYagnik = 0, reverseMayuri = 0;
        if (shift === "Yagnik" || shift === "Both") {
            reverseYagnik = parseFloat(document.getElementById('reverseYagnik').value) || 0;
        }
        if (shift === "Mayuri" || shift === "Both") {
            reverseMayuri = parseFloat(document.getElementById('reverseMayuri').value) || 0;
        }
        const totalReverseCost = reverseYagnik + reverseMayuri;

        resultHTML = `
            <h3>📊 Result: Car Kept Home</h3>
            <p>💸 Total Reverse Ride Cost: ${totalReverseCost.toFixed(2)} CAD</p>`;
    }

    document.getElementById('result').innerHTML = resultHTML;
}

