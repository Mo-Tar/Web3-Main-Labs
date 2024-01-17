import { Play, Act, Scene } from ".play-module.js";

document.addEventListener("DOMContentLoaded", function () {
  const url =
    "https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php";

   let data;
   let play;
   let acts;
   let scenes;
  /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
  async function myfetcher(playname) {
    const response = await fetch(url + `?name=${playname}`);
    data = await response.json();
    populatePage();
  }

  /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */

  let firstSelect = document.querySelector("#playList");

  firstSelect.addEventListener("change", (e) => {
    myfetcher(e.target.value);
  });

  function populatePage() {}
});
