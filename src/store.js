import { calendarWeekData} from "./seed";

// reactive: Daten in das reactivity system reinnehmen
import { reactive, readonly } from "vue";

// drei JS-Objekte: state, getters und mutations

const state = reactive({
    calendarWeekData,
});

const getters = {

};

const mutations = {

};

export default {
    state: readonly (state), // readonly sorgt dafür, dass Daten nur gelesen aber nicht geändert werden können
    getters,
    mutations,
}