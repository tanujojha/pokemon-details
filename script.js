// const url = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
let ofset = 0;

// Main heading 
let mainhead = document.createElement("h1")
mainhead.classList.add("mainhead")
mainhead.innerText = "Pokemon Details"
document.body.appendChild(mainhead)


// div to hold card components
let maindiv = document.createElement("div")
maindiv.classList.add("main");
document.body.appendChild(maindiv);


// function to create a card component
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
    weight.innerText= `Weight: ${obj.weight}`;

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
const getall = async(ofset)=>{
    let newurl = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${ofset}`;
    const response = await fetch(newurl)

    return response.json();
}


//get a pokemon
const getpoke = async (url)=>{
    const response = await fetch(url)

    return response.json();
}


// data and effect driver function
let useEffect = (ofset)=>{
    getall(ofset).then((data)=>{
        let pokelist = data.results;    //list of pokemons
        pokelist.forEach((item) => {
            getpoke(item.url).then((data)=>{  //get data of a single pokemon
                let obj = {
                    name: data.name,
                    imgurl: data.sprites.front_default,
                    weight: data.weight,
                    abil: [],
                    moves: []
                }
                
                let abilities = data.abilities;
                let moves = data.moves;
                
                for(item of abilities){
                    obj.abil.push(item.ability.name)
                }
    
                for(let i = 0; i<5; i++){
                    obj.moves.push(moves[i].move.name)
                }
                                              
                cardfunc(obj);      // calling the card func to create dom elem 
            })
        });
    })
}

useEffect(ofset);       //calling the function to list card items on load



// Footer / Pagination
let footer = document.createElement("footer");

let next = document.createElement("button");
next.classList.add("nextbtn")
next.innerText="<<Load More>>"

footer.append(next)
document.body.appendChild(footer)


// eventlistner on next button
next.addEventListener("click", ()=>{
    ofset += 20
    useEffect(ofset)
     
})


