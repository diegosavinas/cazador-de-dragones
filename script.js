let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["palo"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  { name: 'palo', power: 5 },
  { name: ' daga', power: 30 },
  { name: ' hacha', power: 50 },
  { name: ' espada', power: 100 }
];
const monsters = [
  {
    name: "Minotauro",
    level: 4,
    health: 40
  },
  {
    name: "Lagarto",
    level: 8,
    health: 60
  },
  {
    name: "Dragón",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Ir a la tienda 🏚️", "Ir a la cueva 🏔️", "Ataca al dragon 🐲"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Estas en la plaza 🏛️. Ves un letrero que dice: \"Tienda\".",
    imageUrl: "/img/square.jpg"
  },
  {
    name: "store",
    "button text": ["Compra 10 salud (10 oro)", "Compra arma (30 oro)", "Ir a la plaza 🏛️"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Entraste a la tienda 🏚️. Compra salud o armas.",
    imageUrl: "/img/store.jpg"
  },
  {
    name: "cave",
    "button text": ["Ataca al Minotauro 💥", "Ataca al Lagarto 💥", "Ir a la plaza 🏛️"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Entraste a la cueva 🏔️. Encontraste varios monstruos 😱🗿🐮.",
    imageUrl: "/img/cueva.jpg"
  },
  {
    name: "fight",
    "button text": ["Ataca 💥", "Esquiva 🕺", "Corre 🏃"],
    "button functions": [attack, dodge, goTown],
    text: "Estas peleando con el Minotauro 🐮 Ten mucho cuidado.",
    imageUrl: "/img/minotauro.jpg"
  },
  {
    name: "kill monster",
    "button text": ["Ir a la plaza 🏛️", "Ir a la plaza 🏛️", "Ir a la plaza 🏛️"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'El mounstro grita "Aaaaaarg!" y muere☠️. Ganaste puntos de experiencia y encontraste oro 🟡.',
    imageUrl: "/img/victorious.jpg"
  },
  {
    name: "lose",
    "button text": ["REPETIR?", "REPETIR?", "REPETIR?"],
    "button functions": [restart, restart, restart],
    text: "Estás muerto. ☠️",
    imageUrl: "/img/muerto.jpg"
  },
  { 
    name: "win", 
    "button text": ["REPETIR?", "REPETIR?", "REPETIR?"], 
    "button functions": [restart, restart, restart], 
    text: "Mataste al dragón! 🐲☠️ GANASTE EL JUEGO! 🥳🎉🍺🏆💯👑",
    imageUrl: "/img/ganaste.jpg" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Ir a la plaza? 🏛️"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Encontraste un juego secreto 🔐🔑. Elige un número arriba. Serán escogidos al azar 10 numeros entre 0 y 10. Si el número que elegiste coincide con alguno de los numeros al azar, tu ganas! De lo contrario pierdes 10 de salud",
    imageUrl: "/img/azar.jpg"
  },
  {
    name: "fight dragon",
    "button text": ["Ataca 💥", "Esquiva 🕺", "Corre 🏃"],
    "button functions": [attack, dodge, goTown],
    text: "Estas peleando con el dragón 🐲 Ten mucho cuidado!",
    imageUrl: "/img/dragon.jpg"
  },
  {
    name: "fight Lagarto",
    "button text": ["Ataca 💥", "Esquiva 🕺", "Corre 🏃"],
    "button functions": [attack, dodge, goTown],
    text: "Estas peleando con el Lagarto  Ten mucho cuidado!",
    imageUrl: "/img/monstruos.jpg"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;

  
  const image = document.createElement("img");
  image.src = location.imageUrl;

  document.getElementById("imageContainer").innerHTML = "";
  document.getElementById("imageContainer").appendChild(image);

  
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "No tienes suficiente oro para comprar salud ❌.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Ahora tienes una " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " En tu equipamento tienes: " + inventory + ".";
    } else {
      text.innerText = "No tienes suficiente oro para comprar armas ❌.";
    }
  } else {
    text.innerText = "Tu ya tienes el arma mas poderosa! ⚔️";
    button2.innerText = "Vende tu arma por 15 de oro";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Vendiste un(a) " + currentWeapon + ".";
    text.innerText += " En tu equipamento tienes: " + inventory;
  } else {
    text.innerText = "No vendas tu única arma!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFightBeast();
}

function fightDragon() {
  fighting = 2;
  goFightDragon();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function goFightDragon() {
  update(locations[8]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function goFightBeast() {
  update(locations[9]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "El " + monsters[fighting].name + " ataca!.";
  text.innerText += " Tu lo atacas con tu " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Te golpea fuerte!.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tu " + inventory.pop() + " se rompió.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Esquivaste el ataque del " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["palo"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}


let picked = 0;

function pick(guess) {
  if (picked < 3) {
    const numbers = [];
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    
    text.innerText = "Tu elegiste " + guess + ". Aquí están los números del azar:\n";
    
    for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n";
    }
    
    if (numbers.indexOf(guess) !== -1) {
      text.innerText += "¡Excelente! Ganaste 20 de oro. 🟡";
      gold += 20;
      goldText.innerText = gold;
    } else {
      text.innerText += "Fallaste. Perdiste 10 de salud. 🤕";
      health -= 10;
      healthText.innerText = health;
      if (health <= 0) {
        lose();
      }
    }

    picked++;

    if (picked < 3) {
      text.innerText += `Tienes ${3 - picked} oportunidades restantes.`;
    } else {
      text.innerText += "Has agotado tus oportunidades. ¡Mejor suerte la próxima vez!";
    }
  } else {
    text.innerText = "Has agotado tus oportunidades. ¡Mejor suerte la próxima vez!";
  } 
} 
