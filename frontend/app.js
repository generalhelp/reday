const STORAGE_KEY = "reday-prototype-state-v1";

const memoryCatalog = {
  aliyaAudition: "Алия сегодня вечером идёт на важное музыкальное прослушивание.",
  timurSister: "Тимур спешит в больницу к младшей сестре и скрывает это от коллег.",
  brokenSignal: "Светофор у старого перекрёстка иногда показывает зелёный одновременно двум потокам.",
  cyclistRoute: "Курьер на велосипеде проезжает старый перекрёсток примерно в 18:20."
};

const scenes = [
  {
    id: "wake",
    time: "07:00",
    kicker: "УТРО",
    title: "Будильник звонит в 07:00. Снова.",
    text: ({ loop }) => loop === 1
      ? "За окном серое утро. В телефоне два непрочитанных сообщения. Пока это выглядит как самый обычный день."
      : "Ты узнаёшь звук будильника ещё до первого сигнала. Мир ничего не помнит. Ты — помнишь.",
    choices: () => [
      { label: "Прочитать сообщения", next: "coffee", note: "Небольшая деталь может оказаться важной." },
      { label: "Сразу выйти из дома", next: "coffee" }
    ]
  },
  {
    id: "coffee",
    time: "08:25",
    kicker: "КОФЕЙНЯ",
    title: "Алия трижды смотрит на экран телефона.",
    text: ({ memory }) => memory.has("aliyaAudition")
      ? "Бариста снова выглядит напряжённо. Но теперь ты знаешь: вечером у неё прослушивание, которого она ждала несколько лет."
      : "Она путает твой заказ и тут же извиняется. На стойке лежит смятый музыкальный флаер.",
    choices: ({ memory }) => {
      const options = [
        { label: "Ничего не говорить и забрать кофе", next: "office" },
        {
          label: "Спросить про музыкальный флаер",
          next: "office",
          learn: "aliyaAudition",
          note: "Открывает новый факт о персонаже."
        }
      ];
      if (memory.has("aliyaAudition")) {
        options.unshift({
          label: "Сказать: «Удачи сегодня на прослушивании»",
          next: "office",
          unlocked: true,
          note: "Доступно благодаря памяти из прошлой петли."
        });
      }
      return options;
    }
  },
  {
    id: "office",
    time: "10:40",
    kicker: "РАБОТА",
    title: "Тимур просит тебя прикрыть его после обеда.",
    text: ({ memory }) => memory.has("timurSister")
      ? "Он повторяет ту же неубедительную историю про «личные дела». Ты уже знаешь настоящую причину."
      : "Он говорит, что ему срочно нужно уйти, но избегает объяснений. Остальные коллеги явно раздражены.",
    choices: ({ memory }) => {
      const options = [
        { label: "Отказать", next: "lunch" },
        {
          label: "Спросить напрямую, что случилось",
          next: "lunch",
          learn: "timurSister",
          note: "Иногда понимание появляется только после вопроса."
        }
      ];
      if (memory.has("timurSister")) {
        options.unshift({
          label: "Прикрыть его без лишних вопросов",
          next: "lunch",
          unlocked: true,
          note: "Ты знаешь то, что он пока не успел тебе рассказать."
        });
      }
      return options;
    }
  },
  {
    id: "lunch",
    time: "13:10",
    kicker: "ГОРОД",
    title: "На перекрёстке рабочие обсуждают неисправный светофор.",
    text: ({ memory }) => memory.has("brokenSignal")
      ? "Ты уже слышал этот разговор. В 18:20 здесь произойдёт событие, которое в первой петле казалось случайностью."
      : "Один из рабочих говорит, что автоматика иногда даёт зелёный сигнал сразу двум направлениям. Ремонт обещают закончить завтра.",
    choices: ({ memory }) => {
      const choices = [
        {
          label: "Запомнить разговор и идти дальше",
          next: "evening",
          learn: "brokenSignal",
          note: "Информация сохранится после перезапуска дня."
        }
      ];
      if (memory.has("brokenSignal")) {
        choices.unshift({
          label: "Проверить, кто обычно проезжает здесь вечером",
          next: "evening",
          learn: "cyclistRoute",
          unlocked: true,
          note: "Новая ветка появилась из знания предыдущей петли."
        });
      }
      return choices;
    }
  },
  {
    id: "evening",
    time: "18:20",
    kicker: "ТОЧКА ПЕРЕЛОМА",
    title: "Велосипедист выезжает на перекрёсток.",
    text: ({ memory }) => {
      if (memory.has("brokenSignal") && memory.has("cyclistRoute")) {
        return "Ты знаешь и причину, и точное время. До перекрёстка несколько метров. Впервые этот момент перестаёт быть неизбежным.";
      }
      if (memory.has("brokenSignal")) {
        return "Светофор переключается неправильно — ровно так, как предупреждали рабочие. Ты понимаешь причину слишком поздно.";
      }
      return "Раздаётся сигнал машины. Всё происходит за секунды. Позже все назовут это случайностью.";
    },
    choices: ({ memory }) => {
      if (memory.has("brokenSignal") && memory.has("cyclistRoute")) {
        return [{
          label: "Заранее остановить велосипедиста",
          next: "end",
          unlocked: true,
          ending: "changed"
        }];
      }
      return [{
        label: "Попытаться помочь после столкновения",
        next: "end",
        ending: "unchanged"
      }];
    }
  }
];

function defaultState() {
  return { loop: 1, sceneId: "wake", memory: [], decisions: [], ending: null };
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored && stored.loop ? stored : defaultState();
  } catch {
    return defaultState();
  }
}

let state = loadState();

const els = {
  loop: document.querySelector("#loopValue"),
  time: document.querySelector("#timeValue"),
  memoryCount: document.querySelector("#memoryCount"),
  kicker: document.querySelector("#sceneKicker"),
  title: document.querySelector("#sceneTitle"),
  text: document.querySelector("#sceneText"),
  choices: document.querySelector("#choices"),
  nextLoop: document.querySelector("#nextLoopButton"),
  reset: document.querySelector("#resetButton"),
  memoryButton: document.querySelector("#memoryButton"),
  memoryDialog: document.querySelector("#memoryDialog"),
  closeMemoryButton: document.querySelector("#closeMemoryButton"),
  memoryList: document.querySelector("#memoryList")
};

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function context() {
  return { ...state, memory: new Set(state.memory) };
}

function render() {
  const memory = new Set(state.memory);
  els.loop.textContent = state.loop;
  els.memoryCount.textContent = memory.size;
  els.choices.innerHTML = "";
  els.nextLoop.classList.add("hidden");

  if (state.sceneId === "end") {
    renderEnding(memory);
    saveState();
    return;
  }

  const scene = scenes.find(item => item.id === state.sceneId) || scenes[0];
  els.time.textContent = scene.time;
  els.kicker.textContent = scene.kicker;
  els.title.textContent = scene.title;
  els.text.textContent = typeof scene.text === "function" ? scene.text(context()) : scene.text;

  const choices = scene.choices(context());
  choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${choice.unlocked ? " unlocked" : ""}`;
    button.innerHTML = `<strong>${choice.label}</strong>${choice.note ? `<small>${choice.note}</small>` : ""}`;
    button.addEventListener("click", () => choose(scene.id, choice));
    els.choices.appendChild(button);
  });

  renderMemoryList(memory);
  saveState();
}

function choose(sceneId, choice) {
  if (choice.learn && !state.memory.includes(choice.learn)) {
    state.memory.push(choice.learn);
  }
  state.decisions.push({ loop: state.loop, sceneId, choice: choice.label });
  if (choice.ending) state.ending = choice.ending;
  state.sceneId = choice.next;
  render();
}

function renderEnding(memory) {
  els.time.textContent = "23:59";
  els.kicker.textContent = `КОНЕЦ ПЕТЛИ ${state.loop}`;

  if (state.ending === "changed") {
    els.title.textContent = "Сегодня произошло иначе.";
    els.text.textContent = "Ты не получил суперсилу и не изменил законы мира. Ты просто знал больше, чем вчера.\n\nОткрыто фактов: " + memory.size + ". Мир снова готов забыть этот день.";
  } else {
    els.title.textContent = "День закончился. Но история — нет.";
    els.text.textContent = "Некоторые события всё ещё кажутся случайными. Возможно, следующая петля даст тебе информацию, которой сейчас не хватает.\n\nОткрыто фактов: " + memory.size + ".";
  }

  els.nextLoop.classList.remove("hidden");
  renderMemoryList(memory);
}

function startNextLoop() {
  state.loop += 1;
  state.sceneId = "wake";
  state.ending = null;
  render();
}

function renderMemoryList(memory) {
  els.memoryList.innerHTML = "";
  if (memory.size === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "Пока здесь пусто. Первый день только начинается.";
    els.memoryList.appendChild(li);
    return;
  }

  [...memory].forEach(key => {
    const li = document.createElement("li");
    li.textContent = memoryCatalog[key] || key;
    els.memoryList.appendChild(li);
  });
}

els.nextLoop.addEventListener("click", startNextLoop);
els.reset.addEventListener("click", () => {
  if (confirm("Сбросить все петли и память игрока?")) {
    state = defaultState();
    saveState();
    render();
  }
});
els.memoryButton.addEventListener("click", () => els.memoryDialog.showModal());
els.closeMemoryButton.addEventListener("click", () => els.memoryDialog.close());
els.memoryDialog.addEventListener("click", event => {
  if (event.target === els.memoryDialog) els.memoryDialog.close();
});

render();
