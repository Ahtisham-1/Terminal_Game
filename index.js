const player = {
  name: "FROGMAN",
  hp: 200,
  energy: 200,
  level: 1,
  credits: 0,
};
const target = {
  name: "PENTAGON_SERVER",
  hp: 200,
  maxHp: 200,
  firewall: 50,
  isEncrypted: false,
};

function writeToTerminal(message) {
  let line = document.createElement("p");
  line.textContent = message;
  let terminal = document.getElementById("terminal");
  terminal.appendChild(line);
}

function initTerminal() {
  writeToTerminal("> Initializing...");
  writeToTerminal(`USER:${player.name} ---- USER:${player.energy}Energy`);
  writeToTerminal(`TARGET:${target.name} ---- TARGET:${target.hp} HP`);
  writeToTerminal("Type 'attack' to launch your attack");
  writeToTerminal("Type 'clear' to clear the terminal");
  writeToTerminal("Type 'start' to start a game");
}

function runHack() {
  if (player.energy <= 20) {
    writeToTerminal("ERROR!");
    return;
  }
  target.hp -= 10;
  if (target.hp <= 0) {
    writeToTerminal("You won!");
    return;
  }
  writeToTerminal(`EXPLOIT_SUCCESSFUL: 10 DAMAGE DEALT`);
  writeToTerminal(`TARGET HP REMAINING ${target.hp}`);
  targetCounterattack();
  if (player.hp <= 0) {
    writeToTerminal("You Loose!");
    return;
  }
  updateStatus();
}

function targetCounterattack() {
  let targetAttack = Math.floor(Math.random() * 70);
  player.hp -= targetAttack;
  writeToTerminal(`EXPLOIT_SUCCESSFUL: ${targetAttack} DAMAGE RECIEVED`);
  writeToTerminal(`PLAYER HP REMAINING ${player.hp}`);
  updateStatus();
}

function updateStatus() {
  const statusElement = (document.getElementById("statusBar").textContent =
    `[PLAYER:${player.name}/${player.hp}-HP/${player.energy}-Energy] Level:${player.level} credits${player.credits} --- [TARGET:${target.name}/${target.hp}-HP]`);
}

document
  .getElementById("command-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let command = this.value;
      this.value = "";

      let foundexploit = exploits.find(
        (exploits) => exploits.name.toLowerCase() === command.toLowerCase(),
      );

      if (foundexploit) {
        writeToTerminal("> Executing:" + command);
        runExploit(foundexploit.name);
      } else if (command.toLowerCase() == "attack") {
        writeToTerminal(">Executing:" + command);
        runHack();
      } else if (command == "clear") {
        document.getElementById("terminal").textContent = null;
      } else if (command == "start") {
        initTerminal();
      } else {
        writeToTerminal("Unknown command: " + command);
      }
    }
  });

const exploits = [
  {
    name: "Scar",
    type: "attack",
    damage: 10,
    energyCost: 10,
    unlocked: true,
  },
  {
    name: "bankai",
    type: "sword",
    damage: 100,
    energyCost: 10,
    unlocked: false,
  },
  {
    name: "M416",
    type: "bullet",
    damage: 20,
    energyCost: 30,
    unlocked: true,
  },
  {
    name: "F22",
    type: "missile",
    damage: 50,
    energyCost: 50,
    unlocked: false,
  },
  {
    name: "Atom-Bomb",
    type: "nuke",
    damage: 200,
    energyCost: 180,
    unlocked: false,
  },
];

// FIND ARRAY METHOD
function getExploitsByType(type) {
  return exploits.filter(function (exploits) {
    return exploits.type === type;
  });
}

// MAP ARRAY METHOD
const exploitsNames = exploits.map(exploitsNameFunction);
function exploitsNameFunction(exploits) {
  return exploits.name;
}

//FILTER ARRAY METHOD
const expolitsUnlocked = exploits.filter(getAvailableExploits);
function getAvailableExploits(exploits) {
  return exploits.unlocked === true;
}

// REDUCE ARRAY METHOD
const initialValue = 0;
const totalExploitsDamage = exploits.reduce(
  (accumulator, exploits) => accumulator + exploits.damage,
  initialValue,
);

function runExploit(name) {
  let findexpolit = exploits.find(function (exploit) {
    return exploit.name === name;
  });

  if (player.energy > findexpolit.energyCost) {
    player.energy -= findexpolit.energyCost;
    target.hp -= findexpolit.damage;
    player.credits += 5;
    writeToTerminal(
      `[You used ${findexpolit.name} attack] [${findexpolit.damage} damage was dealt] [The target has ${target.hp}hp left] `,
    );
  } else {
    writeToTerminal(
      `This attack needs ${findexpolit.energyCost} energy and You have ${player.energy} energy so you cannot use this attack`,
    );
  }

  if (target.hp <= 0) {
    writeToTerminal("YOU WIN  --- ACCESS GRANTED");
    updateStatus();
    document.getElementById("exploitButtons").textContent = null;

    return;
  }
  targetCounterattack();
  if (player.hp <= 0) {
    writeToTerminal("YOU LOOSE  --- CONNECTION TERMINATED");
    document.getElementById("exploitButtons").textContent = null;
  }

  checkLevelUp();
  updateStatus();

  return;
}

let newUnlockedNames = expolitsUnlocked.map((exploits) => {
  return exploits.name;
});
newUnlockedNames.forEach(renderExploitButtons);
function renderExploitButtons(name) {
  let button = document.createElement("button");
  button.textContent = name;
  button.addEventListener("click", function () {
    runExploit(name);
  });
  document.getElementById("exploitButtons").appendChild(button);
}

function checkLevelUp() {
  if (player.credits >= 20) {
    player.level++;
    if (player.level === 2) {
      let findExploit = exploits.find(function (exploit) {
        return exploit.unlocked === false;
      });
      findExploit.unlocked = true;
    }
  }
  document.getElementById("exploitButtons").textContent = null;
  let NewUnlockedExploits = exploits.filter(getAvailableExploits);
  let newNames = NewUnlockedExploits.map((exploits) => {
    return exploits.name;
  });
  newNames.forEach(renderExploitButtons);
}

renderExploitButtons();
initTerminal();
updateStatus();
