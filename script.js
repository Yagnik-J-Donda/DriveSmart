// 🌙 Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('darkModeToggle');
const themeLabel = document.getElementById('themeLabel');

darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    themeLabel.textContent = darkModeToggle.checked ? 'Dark Mode' : 'Light Mode';
});

// 🚦 Main Calculation Logic
function calculateOptimalDriver() {
    // 👨‍🦱 Sibling A Inputs
    const passengersA = parseFloat(document.getElementById('passengersA').value);
    const distanceA = parseFloat(document.getElementById('distanceA').value);
    const chargeA = parseFloat(document.getElementById('chargeA').value);
    const reverseA = parseFloat(document.getElementById('reverseA').value);

    // 👩‍🦰 Sibling B Inputs
    const passengersB = parseFloat(document.getElementById('passengersB').value);
    const distanceB = parseFloat(document.getElementById('distanceB').value);
    const chargeB = parseFloat(document.getElementById('chargeB').value);
    const reverseB = parseFloat(document.getElementById('reverseB').value);

    // 🚘 Car Details
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
    const mileage = parseFloat(document.getElementById('mileage').value);
    const depreciationPerKm = 0.04; // 2024 Toyota Corolla depreciation per km

    // 🧮 Costs for Sibling A
    const fuelCostA = (distanceA * mileage / 100) * fuelPrice;
    const depreciationA = distanceA * depreciationPerKm;
    const totalCostA = fuelCostA + depreciationA;

    // 🧮 Costs for Sibling B
    const fuelCostB = (distanceB * mileage / 100) * fuelPrice;
    const depreciationB = distanceB * depreciationPerKm;
    const totalCostB = fuelCostB + depreciationB;

    // 💵 Earnings
    const earningsA = passengersA * chargeA;
    const earningsB = passengersB * chargeB;

    // 💰 Net Profits if driving
    const netProfitA = earningsA - totalCostA;
    const netProfitB = earningsB - totalCostB;

    // 📊 Combined Net for Each Scenario
    const combinedNetIfADrives = netProfitA - reverseB;
    const combinedNetIfBDrives = netProfitB - reverseA;
    const combinedNetIfCarStaysHome = -(reverseA + reverseB);

    // 🏆 Decision
    let recommendation = '';
    if (combinedNetIfADrives > combinedNetIfBDrives && combinedNetIfADrives > combinedNetIfCarStaysHome) {
        recommendation = "✅ Sibling A should take the car today.";
    } else if (combinedNetIfBDrives > combinedNetIfADrives && combinedNetIfBDrives > combinedNetIfCarStaysHome) {
        recommendation = "✅ Sibling B should take the car today.";
    } else {
        recommendation = "🚗 Keep the car at home. Both should go with someone else.";
    }

    // 📦 Display Results
    const resultHTML = `
        <h3>📊 Result</h3>
        <p>${recommendation}</p>

        <p>💸 <strong>Combined Net Profit (3 Scenarios):</strong><br>
        - If Sibling A drives: ${combinedNetIfADrives.toFixed(2)} CAD (${distanceA} km driven)<br>
        - If Sibling B drives: ${combinedNetIfBDrives.toFixed(2)} CAD (${distanceB} km driven)<br>
        - If car stays home: ${combinedNetIfCarStaysHome.toFixed(2)} CAD (0 km driven)</p>

        <p><strong>👨‍🦱 Sibling A Net Profit (if driving):</strong> ${netProfitA.toFixed(2)} CAD</p>
        <p>📝 Calculation Breakdown<br>
        - Trip Distance: ${distanceA} km<br>
        - Fuel Cost: ${fuelCostA.toFixed(2)} CAD<br>
        - Depreciation: ${depreciationA.toFixed(2)} CAD<br>
        - Total Cost: ${fuelCostA.toFixed(2)} + ${depreciationA.toFixed(2)} = ${totalCostA.toFixed(2)} CAD<br>
        - Earnings: ${earningsA.toFixed(2)} CAD<br>
        - Net Profit: ${earningsA.toFixed(2)} − ${totalCostA.toFixed(2)} = ${netProfitA.toFixed(2)} CAD<br>
        - Reverse Ride Cost (if car stays home): ${reverseA.toFixed(2)} CAD</p>

        <p><strong>👩‍🦰 Sibling B Net Profit (if driving):</strong> ${netProfitB.toFixed(2)} CAD</p>
        <p>📝 Calculation Breakdown<br>
        - Trip Distance: ${distanceB} km<br>
        - Fuel Cost: ${fuelCostB.toFixed(2)} CAD<br>
        - Depreciation: ${depreciationB.toFixed(2)} CAD<br>
        - Total Cost: ${fuelCostB.toFixed(2)} + ${depreciationB.toFixed(2)} = ${totalCostB.toFixed(2)} CAD<br>
        - Earnings: ${earningsB.toFixed(2)} CAD<br>
        - Net Profit: ${earningsB.toFixed(2)} − ${totalCostB.toFixed(2)} = ${netProfitB.toFixed(2)} CAD<br>
        - Reverse Ride Cost (if car stays home): ${reverseB.toFixed(2)} CAD</p>

        <p style="color: #888; font-size: 0.95em;">💡 Note: Driving more km may reduce resale value slightly. Consider this if the profit difference is small.</p>
    `;
    document.getElementById('result').innerHTML = resultHTML;
}





