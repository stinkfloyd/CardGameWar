document.addEventListener("DOMContentLoaded", () => {

  axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then((response) => {
      let { data } = response
      console.log(data);

      
  })
})
