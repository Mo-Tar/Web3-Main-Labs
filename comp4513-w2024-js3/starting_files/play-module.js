
class Play {
  constructor(title, short, acts, personas) {
    this.title = title;
    this.short = short;
    this.acts = acts;
    this.personas = personas;
  }
}

class Act {
  constructor(name, scenes) {
    this.name = name;
    this.scenes = scenes;
  }
}

class Scene {
  constructor(name, title, stageDirection, speeches, act) {
    this.name = name;
    this.title = title;
    this.stageDirection = stageDirection;
    this.speeches = speeches;
    this.act = act;
  }
}


export {Play, Act, Scene };