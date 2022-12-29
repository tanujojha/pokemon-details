let obj = {
    name: "tom",
    imgurl: "data.sprites.front_default",
    weight: 69,
    abil: [1,2],
    moves: [3,4,5]
}

function func(...args){
    console.log(args[0].name);
}


func(obj)