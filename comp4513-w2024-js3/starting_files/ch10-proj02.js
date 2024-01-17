import { Play, Act, Scene } from "./play-module.js";

document.addEventListener("DOMContentLoaded", function () {
  const url =
    "https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php";

  let data;
  let play;
  let arrayActs = [];
  let arrayScenes = [];

  /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
  async function myFetcher(playname) {
    const response = await fetch(url + `?name=${playname}`);
    data = await response.json();
    playMaker();
  }

  /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */

  // makes an event listener for the the
  let firstSelect = document.querySelector("#playList");
  firstSelect.addEventListener("change", (e) => {
    myFetcher(e.target.value);
  });

  //functon : no Parameter
  //populates the following variables:
  //object: play = title, short, acts, personas
  //Array of object: acts = name, scenes
  //Array of object: scenes = name, title, stageDirection, speeches
  function playMaker() {
    play = new Play(data.title, data.short, data.acts, data.persona);

    for (const a of play.acts) {
      arrayActs.push(new Act(a.name, a.scenes));
    }

    for (const a of arrayActs) {
      for (const s of a.scenes) {
        let scene = new Scene(s.name, s.title, s.stageDirection, s.speeches);
        arrayScenes.push(scene);
      }
    }
    console.log(play);
    console.log(arrayActs);
    console.log(arrayScenes);
  }
});
