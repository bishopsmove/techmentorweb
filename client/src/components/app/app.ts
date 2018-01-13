import Vue from "vue";
import Component from "vue-class-component";
import NavBar from "../../controls/navbar/navbar.vue";
import Bottom from "../../controls/bottom/bottom.vue";

@Component({
  components: {
    NavBar,
    Bottom
  }
})

export default class App extends Vue {
}