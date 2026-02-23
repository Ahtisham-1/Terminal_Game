const player = {
  name: "PLAYER",
  hp: 300,
  maxHp: 150,
  energy: 100,
};
const target = {
  name: "TARGET",
  hp: 100,
  maxHp: 200,
  isEncrypted: true,
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
  target.hp -= 20;
  if (target.hp <= 0) {
    writeToTerminal("You won!");
    return;
  }

  writeToTerminal("EXPLOIT_SUCCESSFUL: 20 DAMAGE DEALT");
  writeToTerminal(`TARGET HP REMAINING ${target.hp}`);
  targetCounterattack();
  if (player.hp <= 0) {
    writeToTerminal("You Loose!");
    return;
  }
  updateStatus();
}

function targetCounterattack() {
  player.hp -= 20;
  writeToTerminal("EXPLOIT_SUCCESSFUL: 20 DAMAGE RECIEVED");
  writeToTerminal(`PLAYER HP REMAINING ${player.hp}`);
  updateStatus();
}

function updateStatus() {
  const statusElement = (document.getElementById("statusBar").textContent =
    `[PLAYER:${player.name}/${player.hp}-HP/${player.energy}-Energy] --- [TARGET:${target.name}/${target.hp}-HP]`);
}

document
  .getElementById("command-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let command = this.value;
      this.value = "";
      if (command.toLowerCase() == "attack") {
        console.log(command);
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
    name: "Scar L",
    type: "attack",
    damage: 10,
    energyCost: 10,
    unlocked: true,
  },
  {
    name: "M4-AR",
    type: "bullet",
    damage: 20,
    energyCost: 30,
    unlocked: false,
  },
  {
    name: "F22 Raptor",
    type: "missile",
    damage: 50,
    energyCost: 50,
    unlocked: false,
  },
  {
    name: "Tank",
    type: "nuke",
    damage: 70,
    energyCost: 50,
    unlocked: false,
  },
];

function getExploitsByType(type) {
  return exploits.filter(function (exploits) {
    return exploits.type === type;
  });
}
console.log(getExploitsByType("attack"));
console.log(typeof getExploitsByType("attack"));

const exploitsNames = exploits.map(exploitsNameFunction);
function exploitsNameFunction(exploits) {
  return exploits.name;
}

const expolitsUnlocked = exploits.filter(getAvailableExploits);
function getAvailableExploits(exploits) {
  return exploits.unlocked === true;
}

const initialValue = 0;
const totalExploitsDamage = exploits.reduce(
  (accumulator, exploits) => accumulator + exploits.damage,
  initialValue,
);

initTerminal();
updateStatus();
