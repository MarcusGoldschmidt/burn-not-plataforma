<template>

</template>

<style scoped lang="scss">
    .map {
        height: 100%;
    }
</style>

<script>
    export default {
        name: "google-map",
        data() {
            return {
                data: [],
                Raio: 500,
                // default to Montreal to keep it simple
                // change this to whatever makes sense
                center: {lat: -15.35, lng: -56.06},
                markers: [],
                places: [],
                currentPlace: null
            };
        },
        props: {

        },
        mounted() {
            this.geolocate();
            this.fetchData();
        },

        methods: {
            // Ge data
            async fetchData() {
                // eslint-disable-next-line no-unused-vars
                let result = await fetch(`http://127.0.0.1:8000/api/foco/${this.Raio}/${this.center.lat}/${this.center.lng}`);
                // eslint-disable-next-line no-console
                this.data = await result.json();
            },

            // receives a place object via the autocomplete component
            setPlace(place) {
                this.currentPlace = place;
            },
            addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng()
                    };
                    this.markers.push({position: marker});
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                }
            },
            geolocate: function () {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            }
        }
    };
</script>