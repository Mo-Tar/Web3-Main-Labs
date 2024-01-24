import { Play, Act, Scene } from "./play-module.js";

document.addEventListener("DOMContentLoaded", function () {
  const url =
    "https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php";

  let data;
  let play;
  let arrayActs = [];
  let arrayScenes = [];
  let listOfActs = document.querySelector("#actList");
  let listOfScenes = document.querySelector("#sceneList");
  let listOfPlayers = document.querySelector("#playerList");
  let allPlayers = listOfPlayers.firstElementChild;
  let actName;
  let sceneName;

  /*
    Fetches the play and calls the func "playMaker"
  */
  async function myFetcher(playname) {
    const response = await fetch(url + `?name=${playname}`);
    data = await response.json();

    if (document.querySelector("#playList").children.length > 2) {
      document.querySelector("#playList").firstElementChild.remove();
    }
    playMaker();
  }
  //<--------------------------------------- EVENT LISTNERS-------------------------------------------------->
  //act event handler
  listOfActs.addEventListener("change", (e) => {
    actName = e.target.value;
    sceneName = arrayScenes[0].name;
    populateSceneSelection(actName);
    setActName(actName);
    setScene(sceneName, actName);
  });

  //scene event handler
  listOfScenes.addEventListener("change", (e) => {
    sceneName = e.target.value;
    setScene(sceneName, actName);
  });

  /*
    makes an event listener for the the
   */
  let firstSelect = document.querySelector("#playList");
  firstSelect.addEventListener("change", (e) => {
    myFetcher(e.target.value);
  });

  function intializeFilter() {
    /*
    event listner for filter
  */
    let hLight = document.querySelector("#btnHighlight");
    hLight.addEventListener("click", () => {
      const player = document.querySelector("#playerList").value;
      if (player != 0) {
        setSceneForPlayer(sceneName, actName, player);
      } else {
        setScene(sceneName, actName);
      }
      let input = document.querySelector("#txtHighlight").value;
      if (input.length > 0) {
        matchText(input);
      }
    });
  }
  //<------------------------------------------Everything starts and happens here-------------------------------------------->
  /*
    functon : no Parameter
    populates the following variables:
    object: play = title, short, acts, personas
    Array of object: acts = name, scenes
    Array of object: scenes = name, title, stageDirection, speeches
  */
  function playMaker() {
    //reset everything
    play;
    arrayActs = [];
    arrayScenes = [];

    play = new Play(data.title, data.short, data.acts, data.persona);

    for (const a of play.acts) {
      arrayActs.push(new Act(a.name, a.scenes));
    }

    for (const a of arrayActs) {
      for (const s of a.scenes) {
        let scene = new Scene(
          s.name,
          s.title,
          s.stageDirection,
          s.speeches,
          a.name
        );
        arrayScenes.push(scene);
      }
    }
    console.log(play);
    document.querySelector("#playHere h2").textContent = play.title;
    populatePlayers();
    populateActSelection();
    actName = arrayActs[0].name;
    sceneName = arrayScenes[0].name;
    populateSceneSelection(actName);
    setActName(actName);
    setScene(sceneName, actName);
    intializeFilter();
  }

  //populates the player field
  function populatePlayers() {
    //reset
    listOfPlayers.replaceChildren();

    //bring back all players
    listOfPlayers.appendChild(allPlayers);
    let index = 0;

    for (const persona of play.personas) {
      index = index + 1;
      let option = document.createElement("option");
      option.value = persona.player;
      option.text = persona.player;
      listOfPlayers.appendChild(option);
    }
  }

  /*
    creates child nodes for actList
  */
  function populateActSelection() {
    //reset
    listOfActs.replaceChildren();

    //populate acts selection
    arrayActs.forEach((act) => {
      let option = document.createElement("option");
      option.value = act.name;
      option.text = act.name;
      listOfActs.appendChild(option);
    });
  }

  /*
    creates child nodes for scenes selection
  */
  function populateSceneSelection(aName) {
    //reset
    listOfScenes.replaceChildren();

    //populate scenes selection
    arrayScenes.forEach((scene) => {
      if (scene.act == aName) {
        let option = document.createElement("option");
        option.value = scene.name;
        option.text = scene.name;
        sceneList.appendChild(option);
      }
    });
  }
  // -------------------------------UGLY FUNCTIONS--------------------------------
  //changes the name of the act
  function setActName(aName) {
    let actHTML = document.querySelector("#actHere h3");
    actHTML.textContent = aName;
  }

  function setScene(sName, aName) {
    let scenehere = document.querySelector("#sceneHere");
    scenehere.replaceChildren();
    let sceneName = document.createElement("h4");
    sceneName.textContent = sName;
    scenehere.appendChild(sceneName);

    //check for correct scene
    for (const scene of arrayScenes) {
      if (scene.name == sName && scene.act == aName) {
        let title = document.createElement("p");
        title.className = "title";
        title.textContent = scene.title;
        scenehere.appendChild(title);
        //document.querySelector(".title").textContent = scene.title;
        let sDirection = document.createElement("p");
        sDirection.className = "direction";
        sDirection.textContent = scene.stageDirection;
        scenehere.appendChild(sDirection);
        for (const speech of scene.speeches) {
          let div = document.createElement("div");
          div.className = "speech";
          let span = document.createElement("span");
          span.textContent = speech.speaker;
          div.appendChild(span);
          for (const line of speech.lines) {
            let p = document.createElement("p");
            p.textContent = line;
            div.appendChild(p);
          }
          if (speech.stagedir) {
            let stgdir = document.createElement("em");
            stgdir.textContent = speech.stagedir;
            div.appendChild(stgdir);
          }
          scenehere.appendChild(div);
        }
      }
    }
  }
  //----------------------------------------------------------------

  //filters the speeches and I know this is bad code...
  function setSceneForPlayer(sName, aName, pName) {
    let scenehere = document.querySelector("#sceneHere");
    scenehere.replaceChildren();
    let sceneName = document.createElement("h4");
    sceneName.textContent = sName;
    scenehere.appendChild(sceneName);

    //for each scene
    for (const scene of arrayScenes) {
      //check for correct scene name and act name
      if (scene.name == sName && scene.act == aName) {
        //creating the title
        let title = document.createElement("p");
        title.className = "title";
        title.textContent = scene.title;
        scenehere.appendChild(title);
        //setting stage direction
        let sDirection = document.createElement("p");
        sDirection.className = "direction";
        sDirection.textContent = scene.stageDirection;
        scenehere.appendChild(sDirection);
        //for each speech
        for (const speech of scene.speeches) {
          //checking for speaker name
          if (speech.speaker == pName) {
            //creates dive and assign proper speaker to it
            let div = document.createElement("div");
            div.className = "speech";
            let span = document.createElement("span");
            span.textContent = speech.speaker;
            div.appendChild(span);
            //actors may have multiple thus the for-loop
            for (const line of speech.lines) {
              let p = document.createElement("p");
              p.textContent = line;
              div.appendChild(p);
            }
            //for stage directions Like exit ghost
            if (speech.stagedir) {
              let stgdir = document.createElement("em");
              stgdir.textContent = speech.stagedir;
              div.appendChild(stgdir);
            }
            scenehere.appendChild(div);
          }
        }
        if (document.querySelector(".speech") == null) {
          alert(`There are no lines for ${pName} in ${aName}, ${sName}.`);

          setScene(sName, aName);
        }
      }
    }
  }
  //----------------------------------------------------------------

  //matches the given input to the divs

  function matchText(input) {
    const text = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let lines = document.querySelectorAll(".speech p");
    lines.forEach((p) => {
      let line = p.textContent;
      let matches = [...line.toLowerCase().matchAll(text)];
      if (matches) {
        for (const match of matches) {
          let ptag = document.createElement("p")
          let btag = document.createElement("b");
          let target = line.substring(match['index'], ((match['index'] + input.length)))
          btag.textContent = target;
          let before = document.createTextNode(line.substring(0, match['index']));
          let after = document.createTextNode(line.substring((match['index'] + input.length), line.length));
          ptag.appendChild(before);
          ptag.appendChild(btag);
          ptag.appendChild(after);
          p.replaceWith(ptag);
        }
      }
    });
  }
});
