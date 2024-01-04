//store: Verwaltung von Daten für eine Kalenderwoche
import { calendarWeekData } from "./seed";

// reactive: Daten in das reactivity system reinnehmen
import { reactive, readonly } from "vue";

// drei JS-Objekte: state, getters und mutations

// Hier werden die Zustandsvariablen der Anwendung definiert
const state = reactive({
  calendarWeekData,
});

// Hier werden Getter definiert, um abgeleitete Zustandsinformationen zu erhalten
// Getter werden für berechnete Eigenschaften des Zustands verwendet
const getters = {
  //aktiven Tag herausfinden
  activeDay: () => state.calendarWeekData.find((day) => day.active),
};

// Hier werden Mutationen definiert, um den Zustand (von Objekten) zu verändern
// Mutationen sind synchron und verändern den Zustand direkt
const mutations = {
  setActiveDay(dayId) {
    state.calendarWeekData.map((dayObj) => {
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false);
    });
  },
  // Termin zu Tag hinzufügen mit push
  storeEvent(eventDO) {
    const activeDay = getters.activeDay();
    activeDay.events.push({
      title: eventDO.title,
      edit: false,
      color: eventDO.color,
      priority: Number(eventDO.priority),
    });
  },
  editEvent(dayId, eventTitle) {
    // alle edit-Attribute auf false setzen, damit immer nur ein Event bearbeitet werden kann
    state.calendarWeekData.map((dayObj) => {
      dayObj.events.map((event) => (event.edit = false));
    });

    //setze das entsprechende edit attribut auf true
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find((event) => event.title === eventTitle);
    eventObj.edit = true;
  },
  updateEvent(dayId, oldEventTitle, newEvent) {
    newEvent.title = newEvent.title !== "" ? newEvent.title : oldEventTitle; // überprüft, ob ein neuer Titel eingetragen wurde
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find(
      (event) => event.title === oldEventTitle
    );
    eventObj.title = newEvent.title;
    eventObj.priority = Number(newEvent.priority);
    eventObj.edit = false;
  },
  deleteEvent(dayId, eventTitle) {
    // überprüfen, ob day Ids übereinstimmen
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    // im Objekt index mit dem Title suchen & dann löschen mit splice
    const eventIndex = dayObj.events.findIndex(
      (event) => event.title === eventTitle
    );
    dayObj.events.splice(eventIndex, 1);
  },
};

export default {
  state: readonly(state), // readonly sorgt dafür, dass Daten nur gelesen aber nicht geändert werden können
  getters,
  mutations,
};
