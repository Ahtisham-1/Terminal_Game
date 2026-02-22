const player = {
  name: "PLAYER",
  hp: 100,
  maxHp: 150,
  energy: 100,
};
const target = {
  name: "TARGET",
  hp: 200,
  maxHp: 200,
  isEncrypted: true,
};

target.hp = 400;

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
  if (player.energy < 20) {
    window.alert("ERROR Insufficient energy!");
    writeToTerminal("ERROR Insufficient energy!");
    return;
  }
  writeToTerminal("EXPLOIT_SUCCESSFUL: 20 DAMAGE DEALT");

  target.hp -= 20;
  player.energy -= 20;
  console.log("Hack Triggered!");

  writeToTerminal(`TARGET HP REMAINING ${target.hp}`);
  writeToTerminal(`PLAYER REMAINING ENERGY ${player.energy}`);

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

function heal() {
  if (player.energy == 20) {
    player.hp = player.hp + 10(Math.min(maxHp));
    player.energy = player.energy - 20;
  }
}

initTerminal();
updateStatus();
