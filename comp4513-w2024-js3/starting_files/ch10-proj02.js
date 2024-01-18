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

  /*
    Fetches the play and calls the func "playMaker"
  */
  async function myFetcher(playname) {
    const response = await fetch(url + `?name=${playname}`);
    data = await response.json();

    if (document.querySelector('#playList').children.length > 2) {
      document.querySelector('#playList').firstElementChild.remove();
    }
    playMaker();
  }
  //<--------------------------------------- EVENT LISTNERS-------------------------------------------------->
    listOfActs.addEventListener("change", (e) => {
      populateSceneSelection(e.target.value);
    });
  
    listOfScenes.addEventListener("change", (e) =>{
  
    });
  /*
    makes an event listener for the the
   */
  let firstSelect = document.querySelector("#playList");
  firstSelect.addEventListener("change", (e) => {
    myFetcher(e.target.value);
  });

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
    document.querySelector('#playHere h2').innerHTML = play.title;
    populatePlayers();
    populateActSelection();
    populateSceneSelection(arrayActs[0].name);
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
      option.value = index;
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
  function populateSceneSelection(actName) {
    //reset
    listOfScenes.replaceChildren();

    //populate scenes selection
    arrayScenes.forEach((scene) => {
      if (scene.act == actName) {
        let option = document.createElement("option");
        option.value = scene.name;
        option.text = scene.name;
        sceneList.appendChild(option);
      }
    });
  }


});
