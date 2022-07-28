import 'dotenv/config'
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
const results = {}

parks.map(async (origin) => {
    results[origin] = {}

    parks.map(async (dest) => {
        if (origin !== dest) {
            results[origin][dest] = await client
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
                    const dist = r.data.rows[0].elements[0].distance.text.split(' ')[0] // in miles
                    const time = r.data.rows[0].elements[0].duration.value // in seconds
                    return [dist, time]
                })
                .catch((e) => {
                    console.log(e);
                    return [[undefined, undefined], [undefined, undefined]]
                });
        } else {
            results[origin][dest] = [[0, 0], [0, 0]]
        }
    })
})