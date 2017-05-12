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
            <character v-for="character in pageCharacters"
                        :id="character.id"
                        :name="character.name"
                        :thumbnail="character.thumbnail"
                        :description="character.description"
                        :comics="character.comics.items"
                        :key="character.id"
                        @view-more="viewCharacterDetail(character)">
            </character>
        </section>

        <pagination :current-page="pageOne.currentPage"
                    :total-pages="pageOne.totalPages"
                    @page-changed="pageOneChanged">
        </pagination>
    </div>
</template>

<script>
import axios from 'axios';
import {apikey} from '../config.js';
import Character from './Character.vue';
import Pagination from './Pagination.vue';

export default {

    name: 'home',

    components: { Character, Pagination },

    props: ['search'],

    data () {

        return {
            characters: [],
            pageCharacters: [],
            pageOne: {
                currentPage: 1,
                totalPages: 1
            }
        }

    },

    mounted () {

        this.getCharacters();

    },

    methods: {

        getCharacters () {

            axios({
                url: 'https://gateway.marvel.com:443/v1/public/characters',
                method: 'GET',
                responseType: 'json',
                params: {
                    apikey,
                    limit: 80
                }
            }).then(response => {

                if (response.status === 200) {

                    let responseData = response.data.data;

                    this.characters = responseData.results;
                    this.pageCharacters = responseData.results.slice(0, 10);
                    this.pageOne.totalPages = Math.ceil(responseData.count / 10);

                }

            });

        },

        pageOneChanged (pageNum) {

            this.pageOne.currentPage = pageNum;
            this.pageCharacters = this.characters.slice((pageNum - 1) * 10, ((pageNum - 1) * 10) + 10);
            console.log(pageNum * 10, (pageNum * 10) + 10);

        },

        viewCharacterDetail (character) {

            // this.$router.push(`character_detail/${character.id}`, character);

        }
    }
}
</script>

<style lang="scss">

</style>
