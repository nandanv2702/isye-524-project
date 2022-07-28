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
    'Channel Islands National Park',
    'Congaree National Park',
    'Crater Lake National Park',
    'Cuyahoga Valley National Park',
    'Death Valley National Park',
    'Dry Tortugas National Park',
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

parks.length = 5 // for testing

// shorter method 
const res = await Promise.all(parks.map(async (origin) => {
    return await Promise.all(parks.map((dest) => {
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
                    console.log(e);
                    return [[0, 0], [0, 0]]
                });
        } else {
            return [[0, 0], [0, 0]]
        }
    }))
}))

// longer method
// for (let i = 0; i < parks.length; i++) {
//     let origin = parks[i]
//     results[origin] = {}

//     for (let j = 0; j < parks.length; j++) {
//         if (i !== j) {
//             let dest = parks[j]

//             results[origin][dest] = await client
//                 .distancematrix({
//                     params: {
//                         origins: [origin],
//                         destinations: [dest],
//                         travelMode: 'driving',
//                         units: 'imperial',
//                         key: GOOGLE_API_KEY,
//                     },
//                 })
//                 .then((r) => {
//                     const dist = r.data.rows[0].elements[0].distance.text.split(' ')[0] // in miles
//                     const time = r.data.rows[0].elements[0].duration.value // in seconds
//                     return [dist, time]
//                 })
//                 .catch((e) => {
//                     console.log(e);
//                     return [undefined, undefined]
//                 });
//         }
//     }
// }

// write results to file
console.log(res)
// Promise.all(res).then(r => console.log(r)).catch(e => console.error(e))
// console.log(JSON.stringify)
// writeFile('results.json', results)