<template lang="html">
    <div class="column small-8 medium-9">
        <template v-if="comicModal">
            <modal :id="comicModal.id"
                        :title="comicModal.title"
                        :description="comicModal.description"
                        :thumbnail="comicModal.thumbnail"
                        :price="comicModal.price"
                        @close-modal="comicModal = null">
            </modal>
        </template>
        <button class="back-btn" @click="backHome">back</button>
        <section class="character-detail">
            <img :src="thumbnailSrc" class="character-detail__logo">
            <h1 class="character-detail__name">{{ characterDetail.name }}</h1>
            <p class="character-detail__desc" v-if="characterDetail.description">{{ characterDetail.description }}</p>
            <p class="character-detail__desc" v-else>No description...</p>
            <div class="character-detail__comics">
                <h2>Related comics:</h2>
                <div class="rndm-btn" v-if="characterDetail.comics.items.length > 0" @click="addRandomComics">Add ramdom comics.</div>
                <template v-if="comics.length > 0">
                    <div v-for="comic in comics" @click="showComicInfo(comic.resourceURI)"><span>{{ comic.name }}</span></div>
                </template>
                <p v-else>No comics related...</p>
            </div>
        </section>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {comicsApi} from '../api/marvelApi';
import Modal from './Modal.vue';
import axios from 'axios';

export default {

    props: ['id'],

    components: {Modal},

    data () {

        return {
            comicModal: null
        }

    },

    computed: {

        ...mapState(['characterDetail']),

        ...mapGetters(['favouriteExists']),

        comics () {

            return this.characterDetail.comics.items;

        },

        thumbnailSrc () {

            return `${this.characterDetail.thumbnail.path}.${this.characterDetail.thumbnail.extension}`;

        },

    },

    methods: {

        showComicInfo (uri) {

            comicsApi.defaults.url = uri;

            comicsApi.request()
                .then(response => {

                    let comicResponse = response.data.data.results[0];

                    this.comicModal = {
                        id: comicResponse.id,
                        title: comicResponse.title,
                        description: comicResponse.description,
                        thumbnail: comicResponse.thumbnail,
                        price: comicResponse.prices[0].price
                    }

                })
                .catch(error => {

                    console.error(error);

                });

        },

        backHome () {

            this.$router.push('/');

        },

        addRandomComics () {

            let qtyRandomItems = this.comics.length < 3 ? this.comics.length : 3;
            // let qtyRandomItems = 3;

            console.log(this.comics.length);

            do {

                let randomComic = this.comics[Math.floor(Math.random() * this.comics.length)];
                let comicURI = randomComic.resourceURI;
                let comicId = comicURI.slice(-5);

                if (!this.favouriteExists(comicId)) {

                    comicsApi.defaults.url = comicURI;

                    comicsApi.request()
                        .then(response => {

                            let comicResponse = response.data.data.results[0];

                            this.$store.commit('addFavourite', {
                                id: comicResponse.id,
                                title: comicResponse.title,
                                thumbnail: `${comicResponse.thumbnail.path}.${comicResponse.thumbnail.extension}`
                            });

                        })
                        .catch(error => {

                            console.error(error);

                        });

                    qtyRandomItems--;

                }

            } while (qtyRandomItems > 0);

        }

    }

}
</script>

<style lang="scss">
.character-detail {
    background: #FFF;
    box-shadow: 2px 2px 5px rgba(0,0,0,.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
    padding: 30px 0;
    width: 90%;

    h1, h2 {
        color: #2E3333;
    }

    .character-detail__logo {
        width: 90%;
    }

    .character-detail__name {
        text-transform: uppercase;
        margin: 20px 0 0 10px;
    }

    .character-detail__desc {
        color: #7F8C8D;
        padding: 0 50px;
        text-align: center;
    }

    .character-detail__comics {
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        justify-content: space-between;
        padding: 0 20px;
        width: 100%;

        h2 {
            width: 100%;
        }

        div {
            color: #FFF;
            cursor: pointer;
            display: flex;
            align-items: center;
            background: #F2282E url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADfsAAA37AQt3NZsAAAAHdElNRQfhBQwICgBnBut9AAABSUlEQVRIx+2VvU7CUBSAv4soNsbFRV0MFBMq8Aw6kOhAwuYT8AK+g6/gpL6AA4ubTg46MDm1lMGfuBBGY4wmGo9DL/WWlnAZ3DhdenPO953be5MehUWIww41/axyqG7+cvmJ0LKGqtQokTNSB0wSSAEv7uQmoHdCfHz2aaBMRgukSZsaZRYSUI8AH5+AZyUA4tKgKRv8cKGuzB2cUEx0CvBHUCrq1IE9yqbAAY64nAiZcUdIm5VoYX5nVz1Z4HDLucUtgOQp4VHBo0KRU3WcVZUSiMuuhrZZNBJudpsxgawTUIiXXzwQ0iekT9dKwCvXrMXQo/qediBjAvVJy+IYjcjNVj4XzAVzwb8J8val4uDpf7e9QBw8qnpCjUbNxxRBJhTFGz3uOWMrW9CUVgYEQz1oAl4AWGIz3XUgs8YgeQsdbEaK0ZFO9PILwT+JRd3+CncAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDUtMTJUMDg6MTA6MDArMDI6MDAQqMYzAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA1LTEyVDA4OjEwOjAwKzAyOjAwYfV+jwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=') no-repeat 5px center;
            border-top: 2px solid darken(#F2282E, 20%);
            border-left: 2px solid darken(#F2282E, 20%);
            box-shadow: 2px 2px 1px rgba(0,0,0,.3);
            width: 48%;
            padding: 5px 5px 5px 45px;
            height: 45px;
            margin-bottom: 5px;
            transition: 0.3s;

            span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
            }

            &.rndm-btn {
                color: #FFF;
                background: #2E3333 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8FBMVEUAAADyKC//KyvyKC71KTPyKC3yKCzyKC7yKC7yJy32LCzzKi/zKS7zKC7xJy7yKC7zKC/yKC7xKC/qKyvyKCjyKS3yKC7yKC//QEDyKC3yKC7yKC7yKC7wJyz/HDnyKS7yKC7zIy7zKC/yKC7yKC7yKC7/AFXxKyvyKS3/ICDyKC7yJi/yJjPyJy7yKC7xKC/wJy7zJy//JCTxKC7wJi3xJy3xKS7yKS3yJy7uKyvyKC7yKC/zJy3yKC7/AAD1Ki/yKC7yKC7wKS7wKSzxKC/yKS7zJDH0KyvyKC3yJy7/AADyKC72JC7zKS7yKC4AAACRKoO9AAAATnRSTlMAmQbGGeY64KBhHStqpuL5Z/uUDBOjmtAEOems/DQJ3L0WpIz+hgMkdgj4PBTvTUchQQfOIoJencIe359VXwEx9LMyRW3DFRjxdQKxHCwBH0FeAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAN+wAADfsBC3c1mwAAAAd0SU1FB+EFDgMTCrqPjBEAAADhSURBVDjLY2AYzICRiYACP2YWAgr8WNkgNASwc3BygSW4eXj5oGL8AkgKgEBQSJhBRNQPGYgxISvwE5eQlPJDBdLICmRk5eTR5BUUkRUoMSijSquoqiEcra7Bz6mpBdalrQNxva4eqr/0DQzB8kZQbxqbYHjdFKTADMox18QMGwuQAkvcYSfMD5S3whc9IAOsYTxMK2zAXrO1g8UFmiPthRxA8vKaho5OwsjeRAs6ZzVjtIBCledlcMET1H5+rm7uHngiS8vTi4HLG1d0AxOMD9i1vmgJhmCSIz/REkz29AMASa1lFOtIsnEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDUtMTRUMDM6MTk6MTArMDI6MDCUTzsgAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA1LTE0VDAzOjE5OjEwKzAyOjAw5RKDnAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=') no-repeat 10px center;
                border-top: 2px solid #000;
                border-left: 2px solid #000;
                padding-left: 50px;
                width: 100%;
                margin-bottom: 10px;

                &:hover {
                    background-color: #000;
                }

            }

            &:hover {
                background-color: darken(#F2282E, 10%);
            }

            &:active {
                transform: scale(0.97);
            }
        }
    }
}
</style>
