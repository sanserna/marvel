<template lang="html">
    <div class="column small-8 medium-9">
        <div class="row">
            <div class="sorter">
                <h2 class="sorter__title">Characters</h2>
                <select class="sorter__select">
                    <option value="">Sort by</option>
                </select>
            </div>
        </div>

        <section class="row characters-wrapper">
            <character v-for="character in characters"
                        :id="character.id"
                        :name="character.name"
                        :thumbnail="character.thumbnail"
                        :description="character.description"
                        :comics="character.comics.items"
                        :key="character.id">
            </character>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import character from './Character.vue';

    export default {
        name: 'home',
        components: { character },
        data () {

            return {
                characters: []
            }

        },
        mounted() {

            this.getCharacters();

        },
        methods: {

            getCharacters() {

                axios({
                    url: 'https://gateway.marvel.com:443/v1/public/characters',
                    method: 'GET',
                    responseType: 'json',
                    params: {
                        apikey: '9003ae1c5a219cb6209df29a3cf01ee4',
                        limit: 100
                    }
                }).then(response => {

                    if (response.status === 200) {

                        let responseData = response.data.data;

                        this.characters = responseData.results;

                    }

                });

            }
        }
    }
</script>

<style lang="scss">

</style>
