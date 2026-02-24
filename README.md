# Terminal Game

A command-driven game that runs in the browser. Type exploits into a 
terminal, attack a target, drain their HP, manage your energy.

## Stack

Vanilla JavaScript, HTML, CSS. No frameworks, no libraries, no tutorials.

## Commands

- `attack` — launch an exploit against the target
- `start` — start a new game
- `clear` — clear the terminal

## Status

Day 1 and 2 development. Player arsenal attack coming next .

## What's Built So Far

- Player and target objects storing all game state
- Real-time terminal output on every action
- Energy system — attacks cost energy
- Live status updates showing HP and energy after each action
- Command-based input handling
- Made an array of objects
- Learned how to use Map(),Filter(),Reduce(),Find()

## Status

Day 3 development. Enemy counterattack coming next.

- Player and target objects storing all game state
- Real-time terminal output on every action
- Energy system — attacks cost energy
- Live status updates showing HP and energy after each action
- Command-based input handling
- Exploits arsenal — array of objects with name, damage, energyCost, type, unlocked
- map, filter, reduce functions on the arsenal
- runExploit function — finds exploit by name, checks energy, deals damage to target
