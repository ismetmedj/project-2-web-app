import myAPI from "./service.js";

document.querySelector("#create").addEventListener("click", (event) => {
      const clone = document.querySelector("#createTT").content.cloneNode(true);
      document.querySelector("#main").innerHTML = "";
      document.querySelector("#main").append(clone);
    });
    document.querySelectorAll('#deleteTT').forEach((btn)=> {
        btn.addEventListener('click', async (event) => {
            try {
                const res= await myAPI.delete('/profil', )
            } catch (error) {
                console.error(error);
            }
        })
    })
    
    //   document
    //     .querySelector("#createTimeTable")
    //     .addEventListener("submit", async (event) => {
    //       console.log('hey');
    //       event.preventDefault();
    //       const title = document.querySelector("#title").value;
    //       const newTT = { title };
    //       try {
    //         const res = await myAPI.post("/profil", newTT);
    //         console.log(res);
    //   } catch (error) {
    //       console.error(error);
    //     }
    //     });