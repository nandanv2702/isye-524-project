const key = 'YOUR_API_KEY'

let A = ["N1", "220 W Coleman St, Rice Lake, WI 54868"]
let B = ["N2", "625 Washington St, Rhinelander, WI 54501"]
let C = ["N3", "890 Hillcrest St, Baldwin, WI 54002"]
let D = ["N4", "911 Princeton St, Altoona, WI 54720"]
let E = ["N5", "7000 Stewart Ave, Wausau, WI 54401"]
let F = ["N6", "3332 Minnesota Ave, Stevens Point, WI 54481"]
let G = ["N7", "2412 Hutson Rd, Green Bay, WI 54303"]
let H = ["N8", "1065 Discovery Rd, Green Bay, WI 54311"]
let I = ["N9", "2550 Commerce St, La Crosse, WI 54603"]
let J = ["N10","3565 N Main St, Oshkosh, WI 54901"]
let K = ["N11", "S2628 County Hwy BD, Baraboo, WI 53913"]
let L = ["N12", "3409 Crocker Ave, Sheboygan, WI 53081"]
let M = ["N13", "313 Brown St, Dodgeville, WI 53533"]
let N = ["N14", "8350 Murphy Dr, Middleton, WI 53562"]
let O = ["N15","5002 Pflaum Rd, Madison, WI 53718"]
let P = ["N16", "1218 Boomer St, Watertown, WI 53094"]
let Q = ["N17","6800 S 6th St, Oak Creek, WI 53154"]
let R = ["N18", "10240 Durand Ave, Sturtevant, WI 53177"]
let S = ["N19","3141 S Tower Dr, Janesville, WI 53545"]
let T = ["N20", "12400 W Bluemound Rd, Elm Grove, WI 53122"]

let addresses = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T]

let trial = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T]
let i;

answer = []
dist = []

for (i = 0; i < trial.length ; i++){
    for (j = 0; j < trial.length ; j++){
        if(i !== j){
            let ans = [trial[i][0], trial[j][0]]
            console.log(ans)
            let dist_ans = fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${trial[i][1]}&destinations=${trial[j][1]}&key=${key}`)
            .then(res => res.json())
            .then(data => {
                dist =  data["rows"][0]["elements"][0]["distance"]["text"]
                return dist
            })
            answer.push(ans)
            dist.push(dist_ans)
        }

            }
}

console.log(answer)

// let final_res = []
let final_res = ""

Promise.all(dist).then(arr => {
    for(i = 0; i < answer.length; i++){
        // final_res.push([answer[i][0], answer[i][1], arr[i].split(" mi")[0]])
        final_res += `${answer[i][0]} ${answer[i][1]} ${arr[i].split(" mi")[0]}\n`
    }
    console.log(final_res)
    // localStorage.setItem("final_value", JSON.stringify(final_res))
})

// fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${A[0]}&destinations=${C[0]}&key=${key}`)
// .then(res => res.json())
// .then(data => {
//     document.getElementById("res").innerText = data
//     dist = data["rows"][0]["elements"][0]["distance"]["text"]
//     console.log(data)
//     // console.log(dist)
// })
