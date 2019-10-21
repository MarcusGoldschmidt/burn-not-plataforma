<template>
    <div class="map">
        <google-map v-bind:data="data"></google-map>
    </div>
</template>

<script>
    import googleMap from "../googleMap";

    export default {
        name: "Form",
        components: {googleMap},
        data() {
            return {}
        },
        props: {
            data: Array
        },
        methods: {
            DispathForm() {
            },
        }
    }
</script>

<style scoped>
    .map {
        height: 90%;
    }
</style>