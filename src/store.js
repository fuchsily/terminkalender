import { calendarWeekData} from "./seed";

// reactive: Daten in das reactivity system reinnehmen
import { reactive, readonly } from "vue";

// drei JS-Objekte: state, getters und mutations

const state = reactive({
    calendarWeekData,
});

//aktiven Tag herausfinden
const getters = {
    activeDay: () => state.calendarWeekData.find((day) => day.active),
};

const mutations = {
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
    updateEvent(dayId, oldEventTitle, newEventTitle) {
        newEventTitle = newEventTitle !== "" ? newEventTitle : oldEventTitle;  // überprüft, ob ein neuer Titel eingetragen wurde
        const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
        const eventObj = dayObj.events.find(
            (event) => event.title === oldEventTitle
        );
        eventObj.title = newEventTitle;
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
    state: readonly (state), // readonly sorgt dafür, dass Daten nur gelesen aber nicht geändert werden können
    getters,
    mutations,
}