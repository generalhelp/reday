# Architecture Draft

## Overview

RE:DAY is planned as a lightweight web application with a data-driven narrative engine.

The story content should be separated from rendering logic so that writers and developers can modify scenes without rewriting the application.

## Proposed components

### 1. Frontend

Responsibilities:

- render scenes;
- show time and loop number;
- display choices;
- manage transitions and audio;
- expose the player's discovered memories;
- persist progress locally;
- call backend endpoints for optional AI features.

Suggested stack:

- Next.js
- React
- TypeScript
- Tailwind CSS

### 2. Story engine

The story engine reads scene data and determines which scene or choice is available based on state.

State example:

```ts
interface GameState {
  loop: number;
  currentSceneId: string;
  memories: string[];
  flags: Record<string, boolean>;
  relationships: Record<string, number>;
  visitedScenes: string[];
}
```

### 3. Story data

Scenes are stored as JSON or TypeScript data objects.

Each scene can contain:

- id;
- time;
- location;
- character;
- text;
- conditions;
- choices;
- state changes;
- memory unlocks;
- next scene.

A minimal example is available in `game-data/example-scene.json`.

### 4. Persistence

For the hackathon MVP, progress can be stored with `localStorage`.

This avoids account creation and backend complexity while preserving the loop state between page refreshes.

### 5. Optional AI layer

AI should enhance specific scenes rather than generate the entire story dynamically.

Possible use:

- classify a free-text response;
- generate a character response within strict scene boundaries;
- summarize the player's route at the end of a run.

The authored scene graph remains the source of truth so that the narrative stays coherent and demo-safe.

## Deployment

Planned deployment options:

- Vercel for the web application;
- serverless API route for optional AI calls;
- public GitHub repository for source code and documentation.
