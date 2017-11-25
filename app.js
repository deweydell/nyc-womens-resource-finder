const Boroughs = ["bronx", "brooklyn", "manhattan", "queens", "staten_island"];
const Categories = [
  "aging",
  "anti_discrimination_human_rights",
  "business",
  "child_care_parent_information",
  "community_service_volunteerism",
  "counseling_support_groups",
  " disabilities",
  "domestic_violence",
  "education",
  "employment_job_training",
  "health",
  "homelessness",
  "housing",
  "immigration",
  "legal_services",
  "lesbian_gay_bisexual_and_or_transgender",
  "personal_finance_financial_education",
  "professional_association",
  "veterans_military_families",
  "victim_services",
  "women_s_groups",
  "youth_services"
]
const BaseUrl = "https://data.cityofnewyork.us/resource/386y-9exk.json";

function buildUrl(queryList = "") {
  let url = `${BaseUrl}?`;
  if (queryList) {
    queryList.forEach(query => {
      url = `${url}${query}='Y'&`
    })
  }
  return url;
}

let orgCard = Vue.component('org-card', {
  props: ['org'],
  template: '<div class="card" v-if="org.url"><a v-bind:href="org.url" target="_blank">{{ org.organizationname }}</a><p>{{ org.description }}</p><div class="labels"><span class="label" v-for="category in categories">{{category}}</span></div></div>',
  computed: {
    categories() {
      return Categories.filter(category => this.org[category] == "Y")
    }
  }
})

const vm = new Vue({
  el: "#app",
  data: {
    results: [],
    boroughs: Boroughs,
    categories: Categories,
    title: ""
  },
  mounted() {
    this.displayOrgs();
  },
  methods: {
    displayOrgs(queryList) {
      let url = buildUrl(queryList);
      fetch(url)
        .then(response => response.json())
        .then(records => {
          this.results = records;
          this.title = `${this.results.length} organizations found`
        })
        .catch(error => console.log(error));
    },
    components: {
      'org-card': orgCard
    }
  }
});
