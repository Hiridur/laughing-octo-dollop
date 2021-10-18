// Hardcoded stations for now
const stations = [
    [0,  0,  10],
    [20, 20, 5],
    [10, 0,  12]
];

const linkstations = (pointX, pointY) => {

    // Input check
    if (isNaN(pointX) || isNaN(pointY)) {
        console.log('Input error');
        return;
    }

    // Initializing the results
    let bestStation = undefined;
    let bestMargin = 0;
    let bestPower = 0; // Not really needed as a separate variable, but makes it nicer

    // Calculate distance to each station
    for (var i = 0; i < stations.length;i++) {

        // Euclidean distance
        distance = Math.sqrt(
            Math.pow((pointX - stations[i][0]), 2) +
            Math.pow((pointY - stations[i][1]), 2)
        );

        // Check if the point is within reach of the linkstation
        // and save if best found so far
        reachMargin = stations[i][2] - distance;

        if ((reachMargin > 0) && (reachMargin > bestMargin)) {
            bestMargin = reachMargin;
            bestStation = stations[i].slice(0,2);
        }
    }

    // Linkstation power is the reach margin squared
    bestPower = Math.pow(bestMargin, 2);

    // Prettify (max 2 desimals if not integer)
    bestPower = bestPower.toFixed(2).replace(/\.00$/,"");

    // Check if linkstation was found
    if (bestStation != undefined) {

        // Linkstation found
        console.log(
            `Best link station for point ${pointX},${pointY} is ${bestStation}` +
            ` with power ${bestPower}`
        );

    } else {

        // Linkstation not found
        console.log(`No link stations within reach for point ${pointX},${pointY}`);
    }
}

linkstations(process.argv[2],process.argv[3]);