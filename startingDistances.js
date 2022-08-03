import 'dotenv/config'
import { writeFile } from 'fs/promises'
import { Client } from '@googlemaps/google-maps-services-js';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

const client = new Client({});

const origin = "UW-Madison, Madison, WI" // can change the starting location, if required
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

// parks.length = 3 // uncomment if testing to see sample response

const res = await Promise.all(parks.map((park) => {
    return client
        .distancematrix({
            params: {
                origins: [origin],
                destinations: [park],
                travelMode: 'driving',
                units: 'imperial',
                key: GOOGLE_API_KEY,
            },
        })
        .then((res) => {
            const dist = parseInt(res.data.rows[0].elements[0].distance.text.split(' ')[0].replace(',', ''), 10) // in miles
            const time = res.data.rows[0].elements[0].duration.value // in seconds
            return [dist, time]
        })
        .catch((e) => console.error(e))
}))

// write results to file as csv
let distanceInfo = ""
let timeInfo = ""

const distanceHeaders = ['', origin.split(',')[0]].join(',')
distanceInfo += distanceHeaders + '\r\n'

const timeHeaders = ['', origin.split(',')[0]].join(',')
timeInfo += timeHeaders + '\r\n'

res.forEach((rowArray, idx) => {
    let distRow = [parks[idx], rowArray[0]].join(',');
    distanceInfo += distRow + '\r\n';

    let timeRow = [parks[idx], rowArray[1]].join(',');
    timeInfo += timeRow + '\r\n';
})

writeFile('distOriginToPark.csv', distanceInfo)
writeFile('timeOriginToPark.csv', timeInfo)