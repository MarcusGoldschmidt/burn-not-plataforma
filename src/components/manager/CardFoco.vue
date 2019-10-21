<template>
    <div class="card card-votos bg-gray">
        <div class="card-header">
            <div class="container">
                <div class="columns">
                    <div class="column col-8 text-left ajuste-margin">
                        <p class="label">Distância: {{new Intl.NumberFormat().format(foco.GeoPoint.distance)}} Km</p>
                        <p class="label label-error">Nivel de Calor: {{foco.Brilho}}</p>
                        <!--
                        <p class="label label-error">
                            Umidade Solo: {{new Intl.NumberFormat().format(Math.random() * 100)}}
                        </p>
                        -->
                        <p>Ultima atualização: {{(new Date(foco.DataColeta)).toLocaleString()}}</p>
                        <p>Solicitações do App: {{ foco.UpVotes}}</p>
                    </div>
                    <div class="column col-4">
                        <p class="label label-primary p-2 mt-2 intenside">Intensidade</p>
                        <br>
                        <br>
                        <button class="btn btn-primary" type="submit"
                                v-on:click="procurarNoMapa(foco.GeoPoint.Latitude, foco.GeoPoint.Longitude)">Ver no Mapa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardFoco",
        props: {
            center: null,
            procurarNoMapa: null,
            foco: {
                Brilho: Number,
                DataColeta: Number,
                FocoCalorId: Number,
                GeoPoint: {
                    GeoPoint: Number,
                    Latitude: Number,
                    Longitude: Number,
                    Distance: Number,
                },
                Probabilidade: Number,
                StatusFoco: Number,
                UpVotes: Number
            }
        }
    }
</script>

<style scoped>
    .card-votos {
        margin: 2% !important;
        margin-top: 8%;
        margin-bottom: 8%;
    }

    .ajuste-margin {
        margin: 0;
    }

    .intenside {
        padding-right: 20% !important;
    }

    .ajuste-margin > p {
        text-align: left;
        margin: 0 0 0.6rem;
    }
</style>