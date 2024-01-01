<template>
    <div id="calender-week">
        <div class="card-group">
        <!-- Anfang: Template für die Calendar-Day-Component -->
        <CalendarDay v-for="i in 7" :key="i"></CalendarDay>
        <!-- Ende: Template für die Calendar-Day-Component -->
        </div>
    </div>
</template>

<script>
import CalendarDay from '@/components/CalendarDay.vue';
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