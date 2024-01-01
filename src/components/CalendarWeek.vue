<template>
    <div id="calender-week">
        <div class="card-group">
        <div class="card" v-for="i in 7" :key="i">
            <div class="card-header text-center" role="button">
            <strong>Montag</strong>
            </div>
            <div class="card-body">
            <!-- Anfang: Template für die Calendar-Day-Component -->
            <CalendarDay></CalendarDay>
            <!-- Ende: Template für die Calendar-Day-Component -->
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import CalendarDay from './CalendarDay.vue';
export default {
    name: "CalendarWeek",
    components: {
        CalendarDay,
    }
}
</script>


// alle styles, die in einer Componente erstellt werden, stehen in der gesamten Anwendung global zur Verfügung. Mit scoped kann man das verhindern
// scoped funktioniert, indem den Elementen ein data-v- Attribut hinzugefügt wird
<style scoped>

</style>