const url = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
let ofset = 0;


let maindiv = document.createElement("div")
maindiv.classList.add("main");
document.body.appendChild(maindiv);


let cardfunc = (obj)=>{
   
    let carddiv = document.createElement("div")
    carddiv.classList.add("cardiv")
    
    let imgdiv = document.createElement("div")
    imgdiv.classList.add("imgdiv")
    let imgelem = document.createElement("img");
    imgelem.setAttribute("src", obj.imgurl);
    imgdiv.appendChild(imgelem)

    let contdiv = document.createElement("div");
    contdiv.classList.add("contdiv")
    
    let name = document.createElement("h2");
    name.innerText= obj.name;

    let weight = document.createElement("h4");
    weight.classList.add("weight")
    weight.innerText= `weight: ${obj.weight}`;

    let abildiv = document.createElement("div");
    abildiv.classList.add("abildiv")
    let abilhead = document.createElement("h4")
    abilhead.classList.add("abilhead")
    abilhead.innerText = "Abilities"
    let abilul = document.createElement("ul");
    for(item of obj.abil){
        let li = document.createElement("li");
        li.innerHTML=item
        abilul.appendChild(li)
    }
    abildiv.append(abilhead, abilul)


    let movesdiv = document.createElement("div");
    movesdiv.classList.add("movesdiv")
    let moveshead = document.createElement("h4")
    moveshead.classList.add("moveshead")
    moveshead.innerText = "Moves"
    let movesul = document.createElement("ul");
    for(item of obj.moves){
        let li = document.createElement("li");
        li.innerHTML=item
        movesul.appendChild(li)
    }
    movesdiv.append(moveshead, movesul)
    

    contdiv.append(name, weight, abildiv, movesdiv)
    carddiv.append(imgelem, contdiv)
    maindiv.appendChild(carddiv)
}

// get all pokemon
const getall = async(url, ofset)=>{
    let newurl = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${ofset}`;
    console.log(newurl);
    const response = await fetch(newurl)

    return response.json();
}


//get a pokemon
const getpoke = async (url)=>{
    const response = await fetch(url)

    return response.json();
}

getall(url, ofset).then((data)=>{
    let pokelist = data.results;
    pokelist.forEach((item) => {
        getpoke(item.url).then((data)=>{
            let obj = {
                name: data.name,
                imgurl: data.sprites.front_default,
                weight: data.weight,
                abil: [],
                moves: []
            }
            // console.log(data.abilities);
            let abilities = data.abilities;
            let moves = data.moves;
            
            for(item of abilities){
                obj.abil.push(item.ability.name)
            }

            for(let i = 0; i<5; i++){
                obj.moves.push(moves[i].move.name)
            }

            // console.log(obj);
            
            cardfunc(obj)
        })
    });
})



// Footer / Pagination

let footer = document.createElement("footer");
let link1 = document.createElement("a");
link1.classList.add("link1")
link1.innerText=1
// let btn1 = document.createElement("button");

let link2 = document.createElement("a");
link2.classList.add("link2")
link2.innerText=2
// let btn2 = document.createElement("button");

let link3 = document.createElement("a");
link3.classList.add("link3")
link3.innerText=3
// let btn3 = document.createElement("button");

// link1.appendChild(btn1)
footer.append(link1, link2, link3)
document.body.appendChild(footer)

link2.addEventListener("click", ()=>{
    maindiv.remove();
    document.body.appendChild(maindiv)
    let of = 20; 
    getall(url, of).then((data)=>{
        let pokelist = data.results;
        pokelist.forEach((item) => {
            getpoke(item.url).then((data)=>{
                let obj = {
                    name: data.name,
                    imgurl: data.sprites.front_default,
                    weight: data.weight,
                    abil: [],
                    moves: []
                }
                // console.log(data.abilities);
                let abilities = data.abilities;
                let moves = data.moves;
                
                for(item of abilities){
                    obj.abil.push(item.ability.name)
                }
    
                for(let i = 0; i<5; i++){
                    obj.moves.push(moves[i].move.name)
                }
    
                // console.log(obj);
                cardfunc(obj)
            })
        });
    })
    // console.log("hello");
})


