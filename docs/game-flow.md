# Game Flow Draft

## High-level flow

```text
Landing
  ↓
Start
  ↓
07:00 — Wake up
  ↓
Morning scenes
  ↓
Midday choice
  ↓
Afternoon scenes
  ↓
Evening turning point
  ↓
23:59 — End of day
  ↓
Loop summary
  ↓
Reset to 07:00
```

## Example loop progression

### Loop 1 — Observation

The player meets the recurring characters and sees several events without understanding their causes.

### Loop 2 — Recognition

Repeated dialogue starts to feel familiar. The player notices details they previously ignored.

### Loop 3 — Connection

New choices appear because the player knows facts from earlier loops.

### Loop 4 — Intervention

The player can intentionally change events that previously seemed fixed.

### Loop 5+ — Personal route

The player decides which relationships and events matter most to them.

## Example knowledge unlock

Loop 1:

```text
Character: "I really can't be late today."
```

Later that day the player discovers why.

A memory is added:

```text
knows_reason_for_deadline = true
```

Next loop, an earlier scene can reveal a new choice:

```text
[Help them avoid the delay]
```

This is the core RE:DAY progression pattern.
