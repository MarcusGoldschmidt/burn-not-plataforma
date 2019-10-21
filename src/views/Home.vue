<template>
    <div class="home container">
        <div class="home columns">
            <div class="column col-3 overflow">
                <div class="bg-card">
                    <h2 class="label label-rounded label-primary">
                        Focos de calor
                    </h2>
                    <div class="">
                        <div v-for="item in data" v-bind:key="item.FocoCalorId">
                            <card-foco v-bind:foco="item" v-bind:procurarNoMapa="procurarNoMapa" v-bind:center="center"></card-foco>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column col-9 map">
                <div class="container">
                    <div class="columns text-left pl-2">
                        <div class="column col-6">
                            <h2>Raio</h2>
                        </div>
                        <div class="column col-6 home">
                            <h2>Procure uma localização</h2>
                        </div>
                    </div>
                </div>
                <label class="form-group">
                    <div class="container">
                        <div class="columns">
                            <div class="column col-4">
                                <input type="text" class="form-input" placeholder="Raio" v-model="Raio">
                            </div>
                            <div class="column col-2">
                                <button class="btn btn-primary input-group-btn" v-on:click="fetchData">Pequisar
                                    Focos
                                </button>
                            </div>
                            <div class="column col-4">
                                <gmap-autocomplete class="form-input"
                                                   @place_changed="setPlace">
                                </gmap-autocomplete>
                            </div>
                            <div class="column col-2">
                                <button class="btn btn-primary input-group-btn" @click="addMarker">Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                </label>
                <div style="height: 80%">
                    <br>
                    <gmap-map
                            :center="center"
                            :zoom="12"
                            style="width:100%;  height: 100%;"
                    >
                        <gmap-marker
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"
                                @click="center=m.position"
                        ></gmap-marker>
                    </gmap-map>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cardFoco from "../components/manager/CardFoco";

    export default {
        name: 'home',
        components: {cardFoco},
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
            }
        },
        methods: {
            async fetchData() {
                // eslint-disable-next-line no-unused-vars
                let result = await fetch(`http://127.0.0.1:8000/api/foco/${this.Raio}/${this.center.lat}/${this.center.lng}`);
                // eslint-disable-next-line no-console
                this.data = await result.json();
            },
            procurarNoMapa(lat, lng){
                const marker = {
                    lat: lat,
                    lng: lng
                };

                this.markers[0] = {position: marker};
                this.places.push(this.currentPlace);
                this.center = marker;
                this.currentPlace = null;
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
        },
        mounted() {
            this.geolocate();
            this.fetchData();
        }
    }
</script>

<style scoped lang="scss">
    .home {
        height: 100%;
    }

    .map {
        height: 100%;
    }

    .overflow {
        max-height: 100%;
        overflow-x: hidden;
        background-color: #5755d9;
        max-width: 100%;
    }

    .column {
        padding: 0;
    }

    .bg-card {
        width: 100%;
        height: 100%;
    }
</style>
