<template>
    <div class="card border-start" :class="cardClasses">
        <div class="card-header text-center" :class="cardHeaderClasses" role="button">
        <strong>{{ day.fullName }}</strong>
        </div>
        <div class="card-body">
        <!-- verwenden titel als key, was nicht so optimal ist. Key sollte besser id sein sollte-->
        <CalendarEvent v-for="event in day.events" :key="event.title" :event="event" :day="day">
            <!-- Slots dynamisch füllen (in CalendarEvent) mit computed function aud CalendarEvent -->
            <template v-slot:eventPriority="slotProps">
                {{ slotProps.priorityDisplayName }}
            </template>
            <template v-slot="{event}">
                <i>{{ event.title }}</i>
            </template>
        </CalendarEvent>
        </div>
    </div>
</template>

<script>
import CalendarEvent from '@/components/CalendarEvent.vue';
import Store from "../store";


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
    },

    computed: {

        //schaut, ob id mit der id aus dem getters in store.js übereinstimmt
        cardClasses() {
            return this.day.id === Store.getters.activeDay().id
            ? ["border-primary"]
            : null;
        },
        cardHeaderClasses() {
            return this.day.id === Store.getters.activeDay().id
            ? ["bg-primary", "text-white"]
            : null;
        }
    }

};

</script>

<style scoped>

</style>