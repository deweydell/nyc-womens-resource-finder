const Boroughs = ["bronx", "brooklyn", "manhattan", "queens", "staten_island"];
const BaseUrl = "https://data.cityofnewyork.us/resource/386y-9exk.json";

function buildUrl(query) {
  return `${BaseUrl}?${query}`;
}

const vm = new Vue({
  el: "#app",
  data: {
    results: [],
    boroughs: Boroughs,
    borough: ""
  },
  mounted() {
    this.displayOrgs(this.borough);
  },
  methods: {
    displayOrgs(query) {
      let url = buildUrl(query);
      fetch(url)
        .then(response => response.json())
        .then(records => {
          this.results = records;
        })
        .catch(error => console.log(error));
    }
  },
  computed: {
    processedOrgs() {
      let orgs = this.results;
      let i,
        j,
        chunkedArray = [],
        chunk = 3;
      for (i = 0, j = 0; i < orgs.length; i += chunk, j++) {
        chunkedArray[j] = orgs.slice(i, i + chunk);
      }
      return chunkedArray;
    }
  }
});
