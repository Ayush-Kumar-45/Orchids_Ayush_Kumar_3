// DOM Elements
const reactorType = document.getElementById('reactorType');
const currentDensity = document.getElementById('currentDensity');
const currentDensityValue = document.getElementById('currentDensityValue');
const electrodeArea = document.getElementById('electrodeArea');
const electrodeAreaValue = document.getElementById('electrodeAreaValue');
const temperature = document.getElementById('temperature');
const temperatureValue = document.getElementById('temperatureValue');
const concentration = document.getElementById('concentration');
const concentrationValue = document.getElementById('concentrationValue');
const simulateBtn = document.getElementById('simulateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultVoltage = document.getElementById('resultVoltage');
const resultEfficiency = document.getElementById('resultEfficiency');
const resultCurrent = document.getElementById('resultCurrent');
const resultPower = document.getElementById('resultPower');
const equationsText = document.getElementById('equationsText');
const reactor3d = document.getElementById('reactor3d');
const curvePoints = document.getElementById('curvePoints');
const curvePointsValue = document.getElementById('curvePointsValue');
const spinner = document.getElementById('spinner');
const systemStatusBox = document.getElementById('systemStatus');
const statusMessage = document.getElementById('statusMessage');

// Get the parent result-item elements for animation
const itemVoltage = document.getElementById('itemVoltage');
const itemEfficiency = document.getElementById('itemEfficiency');
const itemCurrent = document.getElementById('itemCurrent');
const itemPower = document.getElementById('itemPower');

// Tab functionality
const tabs = document.querySelectorAll('.tabs .tab'); // Selects main and sub-tabs
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if (tab.hasAttribute('data-subtab')) {
            // Handle subtabs
            const subtabs = tab.closest('.tabs').querySelectorAll('.tab[data-subtab]');
            const subtabContents = tab.closest('.tab-content').querySelectorAll('.subtab-content');
            
            subtabs.forEach(t => t.classList.remove('active'));
            subtabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const subtabId = tab.getAttribute('data-subtab');
            document.getElementById(subtabId).classList.add('active');
            
            // Ensure chart updates when subtab is clicked
            if (subtabId === 'polarization') {
                updatePolarizationChart();
            } else if (subtabId === 'efficiency') {
                updateEfficiencyChart();
            } else if (subtabId === 'power') {
                updatePowerChart();
            }
        } else {
            // Handle main tabs
            document.querySelectorAll('.tabs .tab[data-tab]').forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            if (tabId === 'graph') {
                // Ensure the default subtab is active when switching to graph tab
                const defaultSubTab = document.querySelector('.tab[data-subtab="polarization"]');
                if (defaultSubTab) {
                    defaultSubTab.click(); // Programmatically click to activate and draw chart
                }
            }
        }
    });
});

// Constants
const F = 96485;  // Faraday's constant (C/mol)
const R = 8.314;  // Gas constant (J/mol-K)

// Update range values in real-time
currentDensity.addEventListener('input', () => {
    currentDensityValue.textContent = currentDensity.value;
});

electrodeArea.addEventListener('input', () => {
    electrodeAreaValue.textContent = electrodeArea.value;
});

temperature.addEventListener('input', () => {
    temperatureValue.textContent = temperature.value;
});

concentration.addEventListener('input', () => {
    concentrationValue.textContent = concentration.value;
});

curvePoints.addEventListener('input', () => {
    curvePointsValue.textContent = curvePoints.value;
    // Only update chart if the 'graph' tab is active
    if (document.querySelector('.tab[data-tab="graph"]').classList.contains('active')) {
        const activeSubTab = document.querySelector('.tab[data-subtab].active');
        if (activeSubTab) {
            if (activeSubTab.getAttribute('data-subtab') === 'polarization') {
                updatePolarizationChart();
            } else if (activeSubTab.getAttribute('data-subtab') === 'efficiency') {
                updateEfficiencyChart();
            } else if (activeSubTab.getAttribute('data-subtab') === 'power') {
                updatePowerChart();
            }
        }
    }
});

// Reactor type change
reactorType.addEventListener('change', () => {
    updateReactor3D();
    updateEquations();
    runSimulation(); // Re-run simulation on type change
});

// System Status Update Function
function updateSystemStatus(message, type) {
    statusMessage.textContent = message;
    systemStatusBox.className = 'system-status-box'; // Reset classes
    systemStatusBox.classList.add(`status-${type}`);
}

// 3D Reactor Visualizations (No changes here, remains the same)
function updateReactor3D() {
    const type = reactorType.value;
    let svgContent = '';
    
    switch(type) {
        case 'Electrolysis':
            svgContent = `
                <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <rect x="100" y="150" width="200" height="100" fill="#4fc3f7" opacity="0.6" stroke="#166088" stroke-width="2"/>
                    
                    <rect x="120" y="100" width="20" height="150" fill="#b0bec5" stroke="#37474f" stroke-width="2">
                        <animate attributeName="y" values="100;110;100" dur="3s" repeatCount="indefinite"/>
                    </rect>
                    
                    <rect x="260" y="100" width="20" height="150" fill="#b0bec5" stroke="#37474f" stroke-width="2">
                        <animate attributeName="y" values="100;110;100" dur="3s" repeatCount="indefinite" begin="1s"/>
                    </rect>
                    
                    <circle cx="130" cy="120" r="5" fill="#ff9800">
                        <animate attributeName="cy" values="120;80" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="140" cy="140" r="4" fill="#ff9800">
                        <animate attributeName="cy" values="140;100" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
                        <animate attributeName="opacity" values="1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
                    </circle>
                    
                    <circle cx="270" cy="130" r="6" fill="#4caf50">
                        <animate attributeName="cy" values="130;90" dur="1.8s" repeatCount="indefinite" begin="0.3s"/>
                        <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite" begin="0.3s"/>
                    </circle>
                    <circle cx="280" cy="150" r="5" fill="#4caf50">
                        <animate attributeName="cy" values="150;110" dur="2.2s" repeatCount="indefinite" begin="0.7s"/>
                        <animate attributeName="opacity" values="1;0" dur="2.2s" repeatCount="indefinite" begin="0.7s"/>
                    </circle>
                    
                    <text x="130" y="90" font-size="12" fill="#333">Anode (O₂)</text>
                    <text x="270" y="90" font-size="12" fill="#333">Cathode (H₂)</text>
                    <text x="200" y="280" font-size="14" fill="#333" text-anchor="middle">Electrolysis Reactor</text>
                </svg>
            `;
            break;
        case 'Fuel Cell':
            svgContent = `
                <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <rect x="150" y="100" width="100" height="100" fill="#e1f5fe" stroke="#4fc3f7" stroke-width="2"/>
                    
                    <rect x="100" y="100" width="50" height="100" fill="#ffccbc" stroke="#ff5722" stroke-width="2"/>
                    
                    <rect x="250" y="100" width="50" height="100" fill="#c8e6c9" stroke="#4caf50" stroke-width="2"/>
                    
                    <path d="M70 120 H 100" stroke="#ff5722" stroke-width="3" fill="none"/>
                    <text x="60" y="115" font-size="12" fill="#333">H₂</text>
                    <circle cx="100" cy="120" r="3" fill="#ff5722">
                        <animateMotion path="M0 0 H 40" dur="2s" repeatCount="indefinite" rotate="auto"/>
                    </circle>

                    <path d="M330 180 H 300" stroke="#4caf50" stroke-width="3" fill="none"/>
                    <text x="335" y="175" font-size="12" fill="#333">O₂</text>
                     <circle cx="300" cy="180" r="3" fill="#4caf50">
                        <animateMotion path="M0 0 H -40" dur="2s" repeatCount="indefinite" rotate="auto"/>
                    </circle>

                    <circle cx="250" cy="220" r="4" fill="#4fc3f7" opacity="0">
                        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s"/>
                        <animateMotion path="M0 0 L 20 20" dur="3s" repeatCount="indefinite" begin="1s"/>
                    </circle>
                    <text x="260" y="240" font-size="12" fill="#333">H₂O</text>

                    <path d="M125 70 V 50 H 275 V 70" stroke="#ffeb3b" stroke-width="4" fill="none" stroke-linecap="round">
                        <animate attributeName="stroke-dasharray" from="0 100" to="100 0" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <circle cx="125" cy="70" r="4" fill="#ffeb3b"/>
                    <circle cx="275" cy="70" r="4" fill="#ffeb3b"/>
                    <text x="200" y="40" font-size="12" fill="#333" text-anchor="middle">e⁻ flow</text>

                    <text x="125" y="90" font-size="12" fill="#333" text-anchor="middle">Anode</text>
                    <text x="275" y="90" font-size="12" fill="#333" text-anchor="middle">Cathode</text>
                    <text x="200" y="145" font-size="12" fill="#333" text-anchor="middle">PEM</text>
                    <text x="200" y="280" font-size="14" fill="#333" text-anchor="middle">Fuel Cell Reactor</text>
                </svg>
            `;
            break;
        case 'Battery':
            svgContent = `
                <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <rect x="100" y="50" width="200" height="200" rx="10" ry="10" fill="#b0bec5" stroke="#37474f" stroke-width="3"/>

                    <rect x="110" y="60" width="70" height="180" fill="#ff9800" stroke="#e65100" stroke-width="2"/>
                    <text x="145" y="265" font-size="14" fill="#333" text-anchor="middle">Anode (-)</text>

                    <rect x="220" y="60" width="70" height="180" fill="#42a5f5" stroke="#1976d2" stroke-width="2"/>
                    <text x="255" y="265" font-size="14" fill="#333" text-anchor="middle">Cathode (+)</text>

                    <rect x="180" y="60" width="40" height="180" fill="#ffffff" stroke="#90caf9" stroke-width="1"/>
                    <text x="200" y="100" font-size="12" fill="#333" text-anchor="middle">Electrolyte</text>

                    <path d="M145 40 H 255" stroke="#ffeb3b" stroke-width="4" fill="none" stroke-linecap="round">
                        <animate attributeName="stroke-dasharray" from="0 100" to="100 0" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <circle cx="145" cy="40" r="4" fill="#ffeb3b"/>
                    <circle cx="255" cy="40" r="4" fill="#ffeb3b"/>
                    <text x="200" y="30" font-size="12" fill="#333" text-anchor="middle">e⁻ flow</text>

                    <circle cx="190" cy="150" r="3" fill="#ff5722" opacity="0.8">
                        <animateMotion path="M0 0 H 20" dur="1.5s" repeatCount="indefinite" rotate="auto"/>
                        <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="210" cy="180" r="3" fill="#ff5722" opacity="0.8">
                        <animateMotion path="M0 0 H -20" dur="1.8s" repeatCount="indefinite" rotate="auto"/>
                        <animate attributeName="r" values="3;4;3" dur="1.8s" repeatCount="indefinite"/>
                    </circle>
                    <text x="200" y="210" font-size="12" fill="#333" text-anchor="middle">Ion Flow</text>

                    <text x="200" y="280" font-size="14" fill="#333" text-anchor="middle">Battery Cell</text>
                </svg>
            `;
            break;
        default:
            svgContent = `<p style="text-align: center; margin-top: 50px;">Select a reactor type to see its visualization.</p>`;
    }
    reactor3d.innerHTML = svgContent;
}

// Update Equations based on Reactor Type
function updateEquations() {
    const type = reactorType.value;
    switch(type) {
        case 'Electrolysis':
            equationsText.innerHTML = `
                V<sub>cell</sub> = V<sub>theoretical</sub> + η<sub>ohmic</sub> + η<sub>act</sub> + η<sub>conc</sub><br>
                Current (I) = Current Density (j) × Electrode Area (A)<br>
                Power (P) = V<sub>cell</sub> × I<br>
                Voltage Efficiency = (V<sub>theoretical</sub> / V<sub>cell</sub>) × 100%<br>
                Energy Efficiency = (Electrical Energy Out / Electrical Energy In) × 100%<br>
                Faradaic Efficiency = (Actual Product / Theoretical Product) × 100%<br>
                Heat Generation = Power (P) - (V<sub>theoretical</sub> × I)
            `;
            break;
        case 'Fuel Cell':
            equationsText.innerHTML = `
                V<sub>cell</sub> = V<sub>theoretical</sub> - η<sub>ohmic</sub> - η<sub>act</sub> - η<sub>conc</sub><br>
                Current (I) = Current Density (j) × Electrode Area (A)<br>
                Power (P) = V<sub>cell</sub> × I<br>
                Voltage Efficiency = (V<sub>cell</sub> / V<sub>theoretical</sub>) × 100%<br>
                Energy Efficiency = (Electrical Energy Out / Chemical Energy In) × 100%<br>
                Heat Generation = (V<sub>theoretical</sub> - V<sub>cell</sub>) * I
            `;
            break;
        case 'Battery':
            equationsText.innerHTML = `
                V<sub>cell</sub> = V<sub>open circuit</sub> - I × R<sub>internal</sub> - η<sub>act</sub> - η<sub>conc</sub><br>
                Current (I) = Current Density (j) × Electrode Area (A)<br>
                Power (P) = V<sub>cell</sub> × I<br>
                Energy Efficiency = (Discharge Energy / Charge Energy) × 100%<br>
                Heat Generation = I² × R<sub>internal</sub>
            `;
            break;
    }
}

// Simulation Logic
function runSimulation() {
    spinner.style.display = 'block';
    simulateBtn.disabled = true;
    simulateBtn.classList.remove('pulse');
    updateSystemStatus("Simulating...", "simulating");

    // Remove flash-update class before simulation to re-trigger
    itemVoltage.classList.remove('flash-update');
    itemEfficiency.classList.remove('flash-update');
    itemCurrent.classList.remove('flash-update');
    itemPower.classList.remove('flash-update');

    setTimeout(() => { // Simulate calculation time
        const type = reactorType.value;
        const j = parseFloat(currentDensity.value); // Current Density A/cm^2
        const A = parseFloat(electrodeArea.value); // Electrode Area cm^2
        const T_celsius = parseFloat(temperature.value); // Temperature in Celsius
        const C = parseFloat(concentration.value); // Concentration in mol/L

        const T_kelvin = T_celsius + 273.15; // Convert to Kelvin

        let V_theoretical;
        let V_cell;
        let ohmicLoss;
        let activationLoss;
        let concentrationLoss;
        let current;
        let power;
        let voltageEfficiency;
        let energyEfficiency;
        let faradaicEfficiency = 92.4; // Default/example value
        let heatGeneration;

        current = j * A; // Total current

        // Simplified models for overpotentials (these are illustrative and not rigorously physical)
        // Ohmic loss: proportional to current density and inversely proportional to concentration (higher concentration, lower resistance)
        ohmicLoss = 0.1 * j / C; // Example: 0.1 V at 1 A/cm^2, 1M

        // Activation loss: Tafel-like behavior, depends on current density and temperature
        // Using a simplified log relationship for demonstration
        activationLoss = 0.05 * Math.log10(j * 10 + 0.1) / (T_kelvin / 298.15); // Added +0.1 to avoid log(0)
        if (activationLoss < 0) activationLoss = 0; // Ensure loss is not negative

        // Concentration loss: more significant at high current densities and low concentrations
        concentrationLoss = 0.02 * j / C; // Example, 0.02 V at 1 A/cm^2, 1M


        if (type === 'Electrolysis') {
            V_theoretical = 1.23; // Theoretical voltage for water electrolysis
            // Sum of theoretical voltage and losses
            V_cell = V_theoretical + ohmicLoss + activationLoss + concentrationLoss;
            voltageEfficiency = (V_theoretical / V_cell) * 100;
            heatGeneration = (V_cell - V_theoretical) * current; // Heat generated from overpotentials
            // Assuming energy efficiency is voltage efficiency * faradaic efficiency for simplicity
            energyEfficiency = (voltageEfficiency / 100) * faradaicEfficiency;

        } else if (type === 'Fuel Cell') {
            V_theoretical = 1.23; // Theoretical voltage for hydrogen fuel cell
            // Subtract losses from theoretical voltage
            V_cell = V_theoretical - ohmicLoss - activationLoss - concentrationLoss;
            if (V_cell < 0) V_cell = 0; // Voltage cannot be negative

            voltageEfficiency = (V_cell / V_theoretical) * 100;
            heatGeneration = (V_theoretical - V_cell) * current; // Heat generated from overpotentials
            // Assuming energy efficiency is voltage efficiency * faradaic efficiency for simplicity
            energyEfficiency = (voltageEfficiency / 100) * faradaicEfficiency;

        } else if (type === 'Battery') {
            const V_openCircuit = 3.7; // Example open circuit voltage for a Li-ion battery
            const R_internal = 0.01 + (0.05 / C) + (0.02 / (T_kelvin / 298.15)); // Adjusted for more realistic temperature dependency
            
            ohmicLoss = current * R_internal;
            activationLoss = 0.02 * Math.log10(j * 5 + 0.1); // Added +0.1
            if (activationLoss < 0) activationLoss = 0;
            concentrationLoss = 0.01 * j;

            V_cell = V_openCircuit - ohmicLoss - activationLoss - concentrationLoss;
            if (V_cell < 0) V_cell = 0;

            voltageEfficiency = (V_cell / V_openCircuit) * 100;
            energyEfficiency = voltageEfficiency; // For batteries, usually efficiency is voltage efficiency
            faradaicEfficiency = 99.0;
            heatGeneration = ohmicLoss * current + activationLoss * current + concentrationLoss * current;

            V_theoretical = V_openCircuit;
        }

        power = V_cell * current;

        // Update results display - ONLY FOR THE 4 SELECTED IMPORTANT ONES
        resultVoltage.textContent = V_cell.toFixed(2);
        resultEfficiency.textContent = voltageEfficiency.toFixed(2);
        resultCurrent.textContent = current.toFixed(2);
        resultPower.textContent = power.toFixed(2);

        // Trigger flash-update animation
        itemVoltage.classList.add('flash-update');
        itemEfficiency.classList.add('flash-update');
        itemCurrent.classList.add('flash-update');
        itemPower.classList.add('flash-update');

        // Remove the class after animation completes to allow re-triggering
        setTimeout(() => {
            itemVoltage.classList.remove('flash-update');
            itemEfficiency.classList.remove('flash-update');
            itemCurrent.classList.remove('flash-update');
            itemPower.classList.remove('flash-update');
        }, 600); // Match animation duration


        spinner.style.display = 'none';
        simulateBtn.disabled = false;
        simulateBtn.classList.add('pulse');
        updateSystemStatus("Simulation complete!", "complete");


        // Update charts if graph tab is active
        // Get the active main tab
        const activeMainTabElement = document.querySelector('.tab.active');
        if (activeMainTabElement && activeMainTabElement.getAttribute('data-tab') === 'graph') {
            const activeSubTabElement = document.querySelector('.tab[data-subtab].active');
            if (activeSubTabElement) {
                const activeSubTabId = activeSubTabElement.getAttribute('data-subtab');
                if (activeSubTabId === 'polarization') {
                    updatePolarizationChart();
                } else if (activeSubTabId === 'efficiency') {
                    updateEfficiencyChart();
                } else if (activeSubTabId === 'power') {
                    updatePowerChart();
                }
            }
        }
        console.log("Simulation run, charts updated if tab active.");

    }, 500); // Simulate network latency/computation delay
}

// Chart.js instances
let polarizationChart, efficiencyChart, powerChart;

// Define colors for charts
const varColors = {
    primaryColor: '#4a6fa5',
    secondaryColor: '#166088',
    accentColor: '#4fc3f7',
    successColor: '#4caf50',
    warningColor: '#ff9800',
    errorColor: '#f44336',
    textColor: '#333333' // Added text color
};

function createPolarizationChart(labels, data) {
    const ctx = document.getElementById('polarizationChart').getContext('2d');
    if (polarizationChart) {
        polarizationChart.destroy();
        console.log("Polarization chart destroyed.");
    }
    polarizationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cell Voltage (V)',
                data: data,
                borderColor: varColors.primaryColor,
                backgroundColor: 'rgba(74, 111, 165, 0.2)',
                tension: 0.2,
                fill: false,
                pointRadius: 3,
                pointBackgroundColor: varColors.primaryColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Current Density (A/cm²)',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Voltage (V)',
                        font: { size: 14, weight: 'bold' }
                    },
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Polarization Curve',
                    font: { size: 16, weight: 'bold' },
                    color: varColors.secondaryColor
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: varColors.textColor // Use defined text color
                    }
                }
            }
        }
    });
    console.log("Polarization chart created with data:", data);
}

function createEfficiencyChart(labels, data) {
    const ctx = document.getElementById('efficiencyChart').getContext('2d');
    if (efficiencyChart) {
        efficiencyChart.destroy();
        console.log("Efficiency chart destroyed.");
    }
    efficiencyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Efficiency (%)',
                data: data,
                borderColor: varColors.successColor,
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                tension: 0.2,
                fill: false,
                pointRadius: 3,
                pointBackgroundColor: varColors.successColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Current Density (A/cm²)',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Efficiency (%)',
                        font: { size: 14, weight: 'bold' }
                    },
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Efficiency Curve',
                    font: { size: 16, weight: 'bold' },
                    color: varColors.secondaryColor
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: varColors.textColor
                    }
                }
            }
        }
    });
    console.log("Efficiency chart created with data:", data);
}

function createPowerChart(labels, data) {
    const ctx = document.getElementById('powerChart').getContext('2d');
    if (powerChart) {
        powerChart.destroy();
        console.log("Power chart destroyed.");
    }
    powerChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Power (W)',
                data: data,
                borderColor: varColors.warningColor,
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                tension: 0.2,
                fill: false,
                pointRadius: 3,
                pointBackgroundColor: varColors.warningColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Current Density (A/cm²)',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Power (W)',
                        font: { size: 14, weight: 'bold' }
                    },
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Power Curve',
                    font: { size: 16, weight: 'bold' },
                    color: varColors.secondaryColor
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: varColors.textColor
                    }
                }
            }
        }
    });
    console.log("Power chart created with data:", data);
}

function calculateCurveData(numPoints) {
    const type = reactorType.value;
    const A = parseFloat(electrodeArea.value);
    const T_celsius = parseFloat(temperature.value);
    const C = parseFloat(concentration.value);
    const T_kelvin = T_celsius + 273.15;

    const j_min = 0.1;
    const j_max = 2.0;
    const j_step = (j_max - j_min) / (numPoints - 1);

    const labels = [];
    const voltageData = [];
    const efficiencyData = [];
    const powerData = [];

    for (let i = 0; i < numPoints; i++) {
        let j = j_min + i * j_step;
        j = parseFloat(j.toFixed(2)); // Use toFixed for label, but keep original for calculation
        labels.push(j);

        let V_theoretical_curve;
        let V_cell_curve;
        let ohmicLoss_curve;
        let activationLoss_curve;
        let concentrationLoss_curve;
        let current_curve = j * A;
        let power_curve;
        let voltageEfficiency_curve;

        // Recalculate losses for each current density point
        ohmicLoss_curve = 0.1 * j / C;
        activationLoss_curve = 0.05 * Math.log10(j * 10 + 0.1) / (T_kelvin / 298.15); // Added +0.1 to avoid log(0)
        if (activationLoss_curve < 0) activationLoss_curve = 0;
        concentrationLoss_curve = 0.02 * j / C;

        if (type === 'Electrolysis') {
            V_theoretical_curve = 1.23;
            V_cell_curve = V_theoretical_curve + ohmicLoss_curve + activationLoss_curve + concentrationLoss_curve;
            voltageEfficiency_curve = (V_theoretical_curve / V_cell_curve) * 100;
        } else if (type === 'Fuel Cell') {
            V_theoretical_curve = 1.23;
            V_cell_curve = V_theoretical_curve - ohmicLoss_curve - activationLoss_curve - concentrationLoss_curve;
            if (V_cell_curve < 0) V_cell_curve = 0;
            voltageEfficiency_curve = (V_cell_curve / V_theoretical_curve) * 100;
        } else if (type === 'Battery') {
            const V_openCircuit_curve = 3.7;
            const R_internal_curve = 0.01 + (0.05 / C) + (0.02 / (T_kelvin / 298.15));

            ohmicLoss_curve = current_curve * R_internal_curve;
            activationLoss_curve = 0.02 * Math.log10(j * 5 + 0.1);
            if (activationLoss_curve < 0) activationLoss_curve = 0;
            concentrationLoss_curve = 0.01 * j;

            V_cell_curve = V_openCircuit_curve - ohmicLoss_curve - activationLoss_curve - concentrationLoss_curve;
            if (V_cell_curve < 0) V_cell_curve = 0;
            voltageEfficiency_curve = (V_cell_curve / V_openCircuit_curve) * 100;
        }
        
        power_curve = V_cell_curve * current_curve;

        // Store numerical values, toFixed() is for display only
        voltageData.push(V_cell_curve);
        efficiencyData.push(voltageEfficiency_curve);
        powerData.push(power_curve);
    }
    console.log("Calculated Curve Data:", { labels, voltageData, efficiencyData, powerData });
    return { labels, voltageData, efficiencyData, powerData };
}

function updatePolarizationChart() {
    const numPoints = parseInt(curvePoints.value);
    const { labels, voltageData } = calculateCurveData(numPoints);
    createPolarizationChart(labels, voltageData);
}

function updateEfficiencyChart() {
    const numPoints = parseInt(curvePoints.value);
    const { labels, efficiencyData } = calculateCurveData(numPoints);
    createEfficiencyChart(labels, efficiencyData);
}

function updatePowerChart() {
    const numPoints = parseInt(curvePoints.value);
    const { labels, powerData } = calculateCurveData(numPoints);
    createPowerChart(labels, powerData);
}

// Reset function
function resetSimulation() {
    reactorType.value = 'Electrolysis';
    currentDensity.value = '0.5';
    currentDensityValue.textContent = '0.5';
    electrodeArea.value = '50';
    electrodeAreaValue.textContent = '50';
    temperature.value = '60';
    temperatureValue.textContent = '60';
    concentration.value = '1.0';
    concentrationValue.textContent = '1.0';
    curvePoints.value = '20';
    curvePointsValue.textContent = '20';

    // Reset tabs to default (Results, Polarization subtab)
    document.querySelector('.tab[data-tab="results"]').click();
    
    // Ensure the graph tab's polarization subtab is active visually
    const graphTab = document.querySelector('.tab[data-tab="graph"]');
    if (graphTab) {
        // Trigger the click of the graph tab first to ensure its tab content is displayed
        graphTab.click(); 
        const defaultSubTab = document.querySelector('.tab[data-subtab="polarization"]');
        if (defaultSubTab) {
            defaultSubTab.click(); // Programmatically click to activate and draw chart
        }
    }

    updateReactor3D(); // Reset reactor visualization
    updateEquations(); // Reset equations display
    runSimulation(); // Rerun simulation with default values
    updateSystemStatus("Ready for simulation. Adjust parameters and click 'Run Simulation'.", "ready");
}

// Event Listeners for simulation and reset
simulateBtn.addEventListener('click', runSimulation);
resetBtn.addEventListener('click', resetSimulation);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    updateReactor3D();
    updateEquations();
    runSimulation(); // Initial simulation run to populate results and charts
    updateSystemStatus("Ready for simulation. Adjust parameters and click 'Run Simulation'.", "ready");

    // Set default active main tab to results and ensure its display
    document.querySelector('.tab[data-tab="results"]').classList.add('active');
    document.getElementById('results').classList.add('active');
    
    // Ensure the default subtab for graph is initialized if graph tab is ever made default.
    // In this setup, charts are only drawn when the 'graph' tab or its subtabs are clicked.
});