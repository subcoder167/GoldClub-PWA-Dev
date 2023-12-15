import { metalRates, newMetalRate } from "../constants/filter";

export const displayprice = (price) => {
    // Convert the price to a string
    const priceString = price?.toString();

    // Split the price into integer and decimal parts (if any)
    const [integerPart, decimalPart = ''] = priceString.split('.');

    // Add commas to the integer part
    let formattedIntegerPart = '';
    for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
        if (count !== 0 && count % 2 === 0) {
            formattedIntegerPart = ',' + formattedIntegerPart;
        }
        formattedIntegerPart = integerPart[i] + formattedIntegerPart;
    }

    // Combine the formatted parts and return the result
    return decimalPart
        ? `${formattedIntegerPart}.${decimalPart}`
        : formattedIntegerPart;
}

export const generateDynamicManifest = (name, short_name, description, icon) => {
    var myDynamicManifest = {
        "name": name,
        "short_name": short_name,
        "description": description,
        "start_url": window.location.origin,
        "display": "standalone",
        "orientation": "portrait",
        "background_color": "white",
        "id": "/",
        "launch_handler": {
            "client_mode": ["focus-existing", "auto"]
        },
        "scope": "/",
        "icons": [
            {
                src: icon,
                sizes: "36x36",
                type: "image/png",
            },
            {
                src: icon,
                sizes: "48x48",
                type: "image/png",
            },
            {
                src: icon,
                sizes: "72x72",
                type: "image/png",
            },
            {
                src: icon,
                sizes: "96x96",
                type: "image/png",
            },
            {
                src: icon,
                sizes: "144x144",
                type: "image/png",
            },
            {
                src: icon,
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: icon,
                sizes: "512x512",
                type: "image/png",
            },
        ]
    }
    const link = document.createElement("link");
    link.rel = "manifest";
    const stringManifest = JSON.stringify(myDynamicManifest);
    link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest))
    document.head.appendChild(link);
}



export const generateMCXRates = (rates = metalRates()) => {

    const newStructure = {};

    for (const [key, value] of Object.entries(rates)) {
        if (key.includes("Rate") && !key.includes("diamond") && rates.hasOwnProperty(key.replace("Rate", "Premium"))) {
            const premiumKey = key.replace("Rate", "Premium");
            const premiumPercentage = rates[premiumKey];
            newStructure[key] = value + (value * premiumPercentage / 100);
        } else {
            newStructure[key] = value;
        }
    }

    return newStructure;
}



export const gettotalMetalCharge = (type, purity) => {
    let tempData = generateMCXRates()
    let tempVal = `${type}${purity}kRate`
    let tempPrem = `${type}${purity}kPremium`

    return parseFloat(tempData[tempVal])
}

export const getDiamondRate = (param) => {

    if (metalRates()?.diamondRate)
        return JSON.parse(metalRates()?.diamondRate)[param] || 0
    return 0
}

export const logOut = () => {

    let storage = { ...localStorage }
    if (storage) {
        const keys = Object.keys(storage)?.filter(key => key?.includes(`vjw-${window.location.hostname}`))
        keys.forEach(k => localStorage.removeItem(k))
    }

}