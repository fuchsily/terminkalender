<template>
  <div id="calendar-event">
    <div class="alert text-center" :class="alertColor">
      <!-- Beginn Template für den Fall, dass das Event nicht bearbeitet wird -->
      <!-- mit v-if überprüfen, ob Template gerade bearbeitet wird -->
      <template v-if="!event.edit">
        <div>
          <!-- Prioritäten als Worte mit computed function -->
          <!-- <strong>{{ priorityDisplayName }}</strong> -->

          <!-- slot mit Name -->
          <!-- priorityDisplayName in CalenderDay (oder woanders) verfügbar machen -->
          <slot name="eventPriority" :priorityDisplayName="priorityDisplayName">
            <!-- Fallback Inhalt, falls nichts angegeben ist -->
            <strong>{{ priorityDisplayName }}</strong>
          </slot>
        </div>

        <!-- <div>{{ event.title }}</div> -->
        <!--Slot wird von außen gefüllt, ohne name heißt slot einfach default-->
        <slot :event="event">
          <!-- Fallbackinhalt, falls nichts angegeben ist-->
          <div>{{ event.title }}</div>
        </slot>

        <div>
          <i class="fas fa-edit me-2" role="button" @click="editEvent()"></i>
          <i class="far fa-trash-alt" role="button" @click="deleteEvent()"></i>
        </div>
      </template>

      <!-- Template für das Editieren, hier sollen Inhalte bearbeitet werden können -->
      <template v-else>
        <input
          type="text"
          class="form-control"
          ref="newEventTitleInput"
          :placeholder="event.title"
          @input="setNewEventTitle($event)"
        />
        <select class="form-select mt-2" v-model="newEventPriority">
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Gering</option>
        </select>
        <hr />
        <i class="fas fa-check" role="button" @click="updateEvent"></i>
      </template>
    </div>
  </div>
</template>

<script>
import Store from "../store";

export default {
  name: "CalendarEvent",
  props: {
    event: Object,
    day: Object,
  },
  data() {
    return {
      newEventTitle: "",
      newEventPriority: this.event.priority,
    };
  },
  computed: {
    //damit statt den Werten -1, 0, 1 Worte für die Priortät der Aufgaben aufgegeben werden
    priorityDisplayName() {
      switch (this.event.priority) {
        case 1:
          return "Gering";
        case 0:
          return "Mittel";
        case -1:
          return "Hoch";
        default:
          return "Unbekannte Priorität";
      }
    },

    //die Events einfärben über bootstrap klassen
    alertColor() {
      return "alert-" + this.event.color;
    },
  },
  methods: {
    deleteEvent() {
      Store.mutations.deleteEvent(this.day.id, this.event.title);
    },
    editEvent() {
      Store.mutations.editEvent(this.day.id, this.event.title);
      // auf die template refs zugreifen, mit nextTick warten bis das Template neu gerendert ist, damit es das input feld findet
      this.$nextTick(() => {
        this.$refs.newEventTitleInput.focus();
      });
    },
    updateEvent() {
      Store.mutations.updateEvent(this.day.id, this.event.title, {
        title: this.newEventTitle,
        priority: this.newEventPriority,
      });
    },
    //Titel aktualisieren
    setNewEventTitle(event) {
      //aktueller Wert wird newEventTitle zugeordnet
      this.newEventTitle = event.target.value;
    },
  },
};
</script>

<style scoped></style>
