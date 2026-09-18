# RE:DAY

**One day. Infinite choices.**

RE:DAY is an interactive narrative web experience built around a time-loop mechanic. The player relives the same day again and again. The world resets, but the player keeps the knowledge gained in previous loops.

The project is designed for the **Creative Industries** track and explores how storytelling, game design, visual design, sound, and software can come together in a single digital experience.

## The idea

At the start of each loop, the player wakes up at the same time and encounters the same people and events. Their choices reveal new facts, relationships, and hidden causes behind what happens during the day.

Knowledge becomes the main resource of the game.

Examples:

- you learn why a character behaves aggressively;
- you discover a code, place, time, or hidden event;
- a new dialogue option appears because you remember something from a previous loop;
- you can eventually change an event that seemed unavoidable in earlier loops.

The goal is not to find one objectively “correct” ending. The player gradually understands the people around them and decides what kind of day they want to create.

## Why Creative Industries?

RE:DAY introduces users to creative disciplines through experience rather than explanation. The product combines:

- interactive storytelling;
- screenwriting;
- game design;
- illustration and visual direction;
- sound design and music;
- web development;
- optional AI-assisted dialogue.

A user does not need to identify as a creator before starting the experience. They simply play — and discover how many creative disciplines work together behind the scenes.

## Core mechanics

### Time loop

The day runs from morning to night and then resets.

`07:00 → choices → events → 23:59 → reset → 07:00`

### Memory

The player keeps discovered knowledge between loops. This knowledge can unlock new choices in later scenes.

### Relationships

Characters do not remember previous loops. Only the player does. Their relationship state changes based on choices made inside the current loop.

### Limited time

Some events happen at the same time. The player cannot see everything in one loop and must decide where to go and whom to help.

### Hidden branches

New story branches become available only after the player learns certain facts.

## Planned hackathon MVP

The first playable version is planned to include:

- one complete day;
- 4–5 recurring characters;
- 25–35 short scenes;
- 5–7 meaningful loops;
- a persistent knowledge/memory system;
- branching dialogue;
- several ending states;
- local save state;
- atmospheric audio and visual transitions;
- optional AI-assisted free-text dialogue in selected scenes.

## Planned stack

- **Frontend:** Next.js / React / TypeScript
- **Styling:** Tailwind CSS
- **Story data:** JSON-based scene graph
- **State:** client-side state + local persistence
- **Backend:** lightweight API for AI features if needed
- **Deployment:** Vercel or another web platform

The exact stack may change during implementation.

## Repository status

> **Hackathon status:** This repository currently contains the project concept, documentation, architecture proposal, and initial scaffolding. The functional MVP is intended to be developed during the hackathon.

Current contents:

- concept documentation;
- technical architecture draft;
- game flow draft;
- sample scene schema;
- frontend/backend placeholders.

## Repository structure

```text
reday/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── .gitignore
├── docs/
│   ├── concept.md
│   ├── architecture.md
│   └── game-flow.md
├── frontend/
│   └── README.md
├── backend/
│   └── README.md
├── game-data/
│   └── example-scene.json
└── assets/
    └── README.md
```

## Project principles

1. No mandatory registration for the first experience.
2. The player should understand the core mechanic within seconds.
3. Knowledge, not grinding, is the main progression system.
4. The same scene should feel different after the player learns new information.
5. The story should avoid a single “morally correct” route.
6. The MVP should be playable in a browser and easy to demonstrate live.

## License

MIT License. See [LICENSE](LICENSE).
