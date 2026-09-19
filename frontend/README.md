# Frontend prototype

The `frontend/` directory now contains a playable zero-dependency prototype of RE:DAY.

Implemented mechanics:

- branching narrative scenes;
- time-loop counter;
- knowledge that persists between loops;
- choices unlocked by previously discovered facts;
- local save state through `localStorage`;
- a memory panel and two different end states.

Run the prototype from the repository root:

```bash
python backend/server.py
```

Then open `http://127.0.0.1:8000`.
