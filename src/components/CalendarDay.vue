<template>
    <div class="card">
        <div class="card-header text-center" role="button">
        <strong>{{ day.fullName }}</strong>
        </div>
        <div class="card-body">
        <CalendarEvent v-for="event in day.events" :key="event.title" :event="event"></CalendarEvent>
        </div>
    </div>
</template>

<script>
import CalendarEvent from '@/components/CalendarEvent.vue';
export default {
    name: "CalendarDay",
    components: {
        CalendarEvent,
    },

    // Arrayschreibweise: nicht zu empfehlen
    // props: ["day"],

    //Objektschreibweise
    props: {
        //mögliche Typen: String, Number, Boolean, Array, Object, Function
        // mehrere Typen mit Arrayschreibweise [String, Number] möglich
        day: {
            type: Object,
            required: true,

            // default: bei primitiven Datentypen z.b. default:100, bei nicht-primitiven Typen braucht man function
            // dafault und validator sorgen für Warnmeldungen, wenn etwas nicht passt
            default: function () {
                return {
                    id: -1,
                    fullName: "Fehlender Wochentag",
                    events: [],
                };
            },
            validator: function(value) {
                if (Object.keys(value).includes("id")) {
                    return true;
                }

            },
        },
    }
}
</script>

<style scoped>

</style>