/**
 * Function accepts:
 * @param {String} csvTest - text in CSV format.
 * @returns the function, which will take on the input of any text,
 * and replace in it the names of cities with a string:
 * "city name (X place in the top 10 of the largest cities of Ukraine,
 * the population of the YYY people)".
 */
function populationTop(csvTest) {
    const topCities = csvTest
        .split('\n')
        .filter(str => str.match(/^([^,#]+,){4}#*.*/))
        .map((str) => {
            let val = str.split(',');
            return {
                name: val[2],
                population: parseInt(val[3])
            };
        })
        .sort((o1, o2) => o2.population - o1.population)
        .slice(0, 10)
        .reduce((obj, current, index) => {
            obj[current.name] = {
                population: current.population,
                rating: ++index
            };
            return obj;
        }, {});

    return (str) => {
        const regex = new RegExp(Object.keys(topCities).join('|'), 'gi');
        return str.replace(regex, (match) => `${match} (${topCities[match].rating}` +
        ` place in the top 10 largest cities of Ukraine, ${topCities[match].population}` +
        ` population of people)`);
    }
}