const roads = [
    "Дом Алисы-Дом Боба",
    "Дом Алисы-Почта",
    "Дом Дарии-Дом Энри",
    "Дом Эрни-Дом Греты",
    "Дом Греты-Магазин",
    "Рынок-Почта",
    "Рынок-Ратуша",
    "Дом Алисы-Склад",
    "Дом Боба-Ратуша",
    "Дом Дарии-Ратуша",
    "Дом Греты-Ферма",
    "Рынок-Ферма",
    "Рынок-Магазин",
    "Магазин-Ратуша"
];

console.log(`roads`, roads);

function buildGraph(edges) {
    let graph = Object.create(null);
    
    function addEdge(from, to){
        if(graph[from] == null){
            graph[from] = [to];
        } else {
            graph[from].push(to)
        }
    }

    for (let [from, to] of edges.map(r => r.split("-"))){
        addEdge(from, to);
        addEdge(to, from);
    }

    return graph;
}

const roadGraph = buildGraph(roads);
console.log(`roadGraph`, roadGraph);

class VillageState {
    constructor(place, parcels){
        this.place = place;
        this.parcels = parcels;
    }

    move(destination){
        if(!roadGraph[this.place].includes(destination)){
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if(p.place != this.place) return p;

                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);

            return new VillageState(destination, parcels);
        }
    }

}

let first = new VillageState(`Почта`, [{place: "Почта", address: "Дом Алисы"}]);
let next = first.move("Дом Алисы");

function runRobot(state, robot, memory){
    for(let turn = 0; ; turn++){
        if (state.parcels.length == 0){
            console.log(`Выполнено за ${turn} ходов`);
            break;
        }

        let action = robot(state, memory);
        state = state.move(action.direction)
        memory = action.memory;
        console.log(`Переход в направление ${action.direction}`);
    }

}

