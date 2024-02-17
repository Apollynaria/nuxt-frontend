async function getData(delay = 100) {
    return new Promise((resolve) =>
        setTimeout(() => resolve(generateData()), delay)
    );
}

function generateData() {
    const countries = [
        'Ireland',
        'Spain',
        'United Kingdom',
        'France',
        'Germany',
        'Russia',
        'Sweden',
    ];

    return countries.map((country, index) => ({
        country,
        gold: Math.floor(((index + 1 / 7) * 333) % 100),
        silver: Math.floor(((index + 1 / 3) * 555) % 100),
        bronze: Math.floor(((index + 1 / 7.3) * 777) % 100),
    }));
}

export default getData