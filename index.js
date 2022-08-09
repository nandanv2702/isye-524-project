import 'dotenv/config'
import { writeFile } from 'fs/promises'
import { Client } from '@googlemaps/google-maps-services-js';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

const client = new Client({});

const parks = [
    'Acadia National Park',
    'Arches National Park',
    'Badlands National Park',
    'Big Bend National Park',
    'Biscayne National Park',
    'Black Canyon of the Gunnison National Park',
    'Bryce Canyon National Park',
    'Canyonlands National Park',
    'Capitol Reef National Park',
    'Carlsbad Caverns National Park',
    'Congaree National Park',
    'Crater Lake National Park',
    'Cuyahoga Valley National Park',
    'Death Valley National Park',
    'Everglades National Park',
    'Gateway Arch National Park',
    'Glacier National Park',
    'Grand Canyon National Park',
    'Grand Teton National Park',
    'Great Basin National Park',
    'Great Sand Dunes National Park',
    'Great Smoky Mountains National Park',
    'Guadalupe Mountains National Park',
    'Hot Springs National Park',
    'Indiana Dunes National Park',
    'Joshua Tree National Park',
    'Kings Canyon National Park',
    'Lassen Volcanic National Park',
    'Mammoth Cave National Park',
    'Mesa Verde National Park',
    'Mount Rainier National Park',
    'New River Gorge National Park',
    'North Cascades National Park',
    'Olympic National Park',
    'Petrified Forest National Park',
    'Pinnacles National Park',
    'Redwood National Park',
    'Rocky Mountain National Park',
    'Saguaro National Park',
    'Sequoia National Park',
    'Shenandoah National Park',
    'Theodore Roosevelt National Park',
    'Voyageurs National Park',
    'White Sands National Park',
    'Wind Cave National Park',
    'Yellowstone National Park',
    'Yosemite National Park',
    'Zion National Park',
]

parks.length = 3 // uncomment if testing to see sample response

// get data for all location combinations
// NOTE: Google Maps is able to find park locations just by the name,
// provided the park name is unique
const res = await Promise.all(parks.map((origin) => {
    return Promise.all(parks.map((dest) => {
        if (origin != dest) {
            return client
                .distancematrix({
                    params: {
                        origins: [origin],
                        destinations: [dest],
                        travelMode: 'driving',
                        units: 'imperial',
                        key: GOOGLE_API_KEY,
                    },
                })
                .then((r) => {
                    const dist = parseInt(r.data.rows[0].elements[0].distance.text.split(' ')[0].replace(',', ''), 10) // in miles
                    const time = r.data.rows[0].elements[0].duration.value // in seconds
                    return [dist, time]
                })
                .catch((e) => {
                    console.log(e.message);
                    console.log(`Origin is ${origin} and Destination is ${dest}`)
                    console.log(r)
                    return [undefined, undefined]
                });
        } else {
            return [0, 0]
        }
    }))
}))

// write results to file as csv
let distanceInfo = ""
let timeInfo = ""

const distanceHeaders = ['', ...parks].join(',')
distanceInfo += distanceHeaders + '\r\n'

const timeHeaders = ['', ...parks].join(',')
timeInfo += timeHeaders + '\r\n'

res.forEach((rowArray, idx) => {
    let distRow = [parks[idx], rowArray.map(row => row[0])].join(',');
    distanceInfo += distRow + '\r\n';

    let timeRow = [parks[idx], rowArray.map(row => row[1])].join(',');
    timeInfo += timeRow + '\r\n';
})

console.log(distanceInfo);

writeFile('distanceResults.csv', distanceInfo)
writeFile('timeResults.csv', timeInfo)