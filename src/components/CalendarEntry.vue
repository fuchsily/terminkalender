<template>
  <div id="calender-entry">
    <div class="card">
      <div class="card-header text-center">
        <h5>
          Neuer Termin für: <strong>{{ activeDayName }}</strong>
        </h5>
      </div>
      <div class="card-body">
        <!-- event ausgeben mit {{ event }}, sieht man, wie es sich änder bei Eingabe -->
        <div class="alert alert-danger" v-if="error">
          Der Titel darf nicht leer sein.
        </div>
        <!-- keyup.enter ist ein Modifier, der dafür sorgt, dass eine FUnktion ausgeführt wird, wenn die Enter Taste losgelassen wird
        exact sorgt dafür, dass wirklich nur die enter taste gedrückt werden darf und nicht noch eine weitere Taste -->
        <input
          type="text"
          class="form-control"
          placeholder="Neuer Eintrag"
          ref="eventTitleInput"
          v-model="event.title"
          @keyup.enter.exact="submitEvent()"
          @keyup.ctrl.enter.exact="resetEventTitle()"
        />
        <!-- mit v-model daten an objekt binden, Auswahl der Priorität für neues Event -->
        <select class="form-select mt-2" v-model="event.priority">
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Gering</option>
        </select>
        <div class="text-center mt-3">
          <span
            v-for="color in eventColors"
            :key="color"
            class="d-inline-block alert alert m-0 me-2 square"
            :class="eventColorClasses(color)"
            role="button"
            @click="setEventColor(color)"
          >
          </span>
        </div>
        <hr />
        <div class="d-grid gap-2">
          <button class="btn btn-primary" @click="submitEvent()">
            Eintragen
          </button>
          <button class="btn btn-danger" @click="resetEventTitle()">Inhalt löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store";

export default {
  name: "CalendarEntry",
  data() {
    return {
      eventColors: ["primary", "success", "info", "warning", "danger"],
      event: {
        title: "",
        color: "primary",
        priority: 0,
      },
      error: false,
    };
  },
  computed: {
    //Name des aktiven Tages, dem eine neue Aufgabe hinzugefügt werden soll
    activeDayName() {
      return Store.getters.activeDay().fullName;
    },
  },

  mounted: function() {
    // setzt Inputfeld für Title in focus
    this.$refs.eventTitleInput.focus();
  },

  methods: {
    eventColorClasses(eventColor) {
      return [
        "alert-" + eventColor,
        this.event.color == eventColor
          ? "border border-" + this.event.color
          : "",
      ];
    },
    setEventColor(eventColor) {
      this.event.color = eventColor;
    },
    //Objekt an Store übergeben
    submitEvent() {
      //überprüfen, ob ein Titel eingegeben wurde
      if (this.event.title === "") return (this.error = true);

      Store.mutations.storeEvent(this.event);
      //nach Speichern wird das Eingabefeld wieder auf Default zurückgesetzt
      this.event = {
        title: "",
        color: "primary",
        priority: 0,
      };
      this.error = false;
    },
    resetEventTitle() {
      this.event.title = "";
    }
  },
};
</script>

<style scoped></style>
