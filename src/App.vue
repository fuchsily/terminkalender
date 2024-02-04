<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <!-- Anfang: Template für die Calendar-Week-Component -->
        <!--
        <CalendarWeekAsList></CalendarWeekAsList>
        <CalendarWeek></CalendarWeek>
        -->

        <!-- keep alive: den state der componenten erhalten (z.B. eingaben, die noch nicht gespeichert wurden, werden bei view wechsel nicht verworfen) -->
        <keep-alive>
          <transition name="fade" mode="out-in" appear>
            <component :is="activeView"></component>
          </transition>
        </keep-alive>
        <!-- Ende: Template für die Calendar-Week-Component -->
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4 offset-4">
        <!-- Anfang: Template für die Calendar-Entry-Component -->
        <CalendarEntry></CalendarEntry>
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
      <div class="col-2 offset-2">
        <div class="float-end">
          <!-- Mit dem Button blenden wir die Calendar-Settings-Component ein bzw. aus. -->
          <button class="btn btn-lg mb-2" :class="buttonSettingsClasses" @click="toggleDisplaySettings">
            <i class="fas fa-cogs"></i>
          </button>
        </div>
        <!-- Anfang: Template für die Calendar-Settings-Component -->
        <!-- Unterschied v-if & v-show: v-if fügt Componente hinzu oder entfernt und v-show fügt diplay:none hinzu. Bei v-show wird componente immer geladen -->
        
        <!-- Transition Effekt auf Settings-->
        <transition name="fade">
          <CalendarSettings v-if="displaySettings"></CalendarSettings>
        </transition>
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
    </div>
  </div>
</template>

<script>
// ermöglicht asynchrones laden der Komponenten
//import { defineAsyncComponent } from "vue";

import Store from './store'
// importiert Childcomponente, damit man es als tag im template verwenden kann
import CalendarWeek from "./components/CalendarWeek.vue";
import CalendarWeekAsList from './components/CalendarWeekAsList';
import CalendarEntry from "./components/CalendarEntry";
import CalendarSettings from "./components/CalendarSettings.vue";


export default {
  name: "App",
  components: {
    // Langschreibweise
    //'CalendarWeek': CalendarWeek

    // Kurzschreibweise
    CalendarWeek,
    CalendarWeekAsList,
    CalendarEntry,
    CalendarSettings,

    //asynchones Laden
    /*
    CalendarSettings: defineAsyncComponent(() => {
      import("./components/CalendarSettings.vue");
    }),
    */
  },
  data() {
    return {
      displaySettings: false,
    }
  },
  computed: {
    // Fügt Stylings zu Einstellungen Buttons hinzu
    buttonSettingsClasses() {
      return this.displaySettings ? ["btn-success"] : ["btn-outline-success"]
    },
    activeView() {
      return Store.getters.activeView();
    }
  },
  methods: {
    //für Ein- und Ausblenden der Settings
    toggleDisplaySettings() {
      this.displaySettings = !this.displaySettings;
    }
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

.square {
  width: 40px;
  height: 40px;
}

/* Trasition fade, Namenskonvetion ist von vue so festgelegt */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease-out;
}
</style>
