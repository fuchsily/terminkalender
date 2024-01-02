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

            <!-- Tamplet für das Editieren, hier sollen Inhalte bearbeitet werden können -->
            <template v-else>
                <input type="text" class="form-control" :placeholder="event.title" @input="setNewEventTitle($event)">
                <hr>
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
        }
    },
    computed: {
        //damit statt den Werten -1, 0, 1 Worte für die Priortät der Aufgaben aufgegeben werden
        priorityDisplayName() {
            switch(this.event.priority) {
                case 1:
                    return "Wenig";
                case 2:
                    return "Mittel";
                case 3:
                    return "Hoch";
            }
            return "Unbekannte Priorität";
        },

        //die Events einfärben über bootstrap klassen
        alertColor() {
            return "alert-" + this.event.color;
        }
    },
    methods: {
        deleteEvent() {
            Store.mutations.deleteEvent(this.day.id, this.event.title);
        },
        editEvent() {
            Store.mutations.editEvent(this.day.id, this.event.title);
        },
        updateEvent() {
            Store.mutations.updateEvent(
                this.day.id,
                this.event.title,
                this.newEventTitle
            );
        },
        setNewEventTitle(event) {
            //aktueller Wert wird newEventTitle zugeordnet
            this.newEventTitle = event.target.value;
        }
    }
};

</script>

<style scoped>

</style>