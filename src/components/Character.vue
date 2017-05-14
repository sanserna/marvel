<template lang="html">
    <div class="column small-12 medium-6">
        <article class="character">
            <img class="character__logo" :src="thumbnailSrc">
            <h3 class="character__name">{{ name }}</h3>
            <p class="character__desc">{{ description || 'No description...' }}</p>
            <button class="character__btn" @click="viewMore">view more</button>
            <div class="character__comics">
                <h4>Related comics</h4>
                <template v-if="comics.length > 0">
                    <p v-for="comic in this.getFirstFourComics()">{{ comic.name }}</p>
                </template>
                <p v-else>No comics related...</p>
            </div>
        </article>
    </div>
</template>

<script>
export default {

    props: {
        id: Number,
        thumbnail: Object,
        name: String,
        description: String,
        comics: Array
    },

    computed: {

        thumbnailSrc () {

            return `${this.thumbnail.path}.${this.thumbnail.extension}`

        }

    },
    methods: {

        getFirstFourComics () {

            return this.comics.slice(0, 4);

        },

        viewMore () {

            this.$store.commit('setCharacterDetail', this.id);
            this.$router.push(`character_detail/${this.id}`);

        }

    }
}
</script>

<style lang="scss">

$textColor: #7F8C8D;

.character {
    background: #FFF;
    height: 320px;
    margin-bottom: 30px;
    padding: 0 10px 10px 180px;
    position: relative;

    .character__logo {
        border-radius: 50%;
        box-shadow: 2px 2px 5px rgba(0,0,0,.2);
        object-fit: cover;
        height: 180px;
        left: -15px;
        position: absolute;
        top: -15px;
        width: 180px;
    }

    .character__name,
    .character__desc {
        margin: 0;
    }

    .character__name,
    .character__btn {
        text-transform: uppercase;
    }

    .character__name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 230px;
        position: absolute;
        top: -10px;
    }

    .character__desc {
        color: $textColor;
        padding-top: 20px;
        display: -webkit-box;
        min-height: 145px;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .character__btn {
        background: #ff0000;
        border: none;
        color: #FFF;
        margin-top: 10px;
        padding: 7px;
    }

    .character__comics {
        margin-left: -170px;
        padding-top: 10px;
        display: flex;
        flex-wrap: wrap;

        h4, p {
            margin: 0;
            padding: 5px;
        }

        h4 {
            width: 100%;
        }

        p {
            width: 50%;
            color: $textColor;
            display: -webkit-box;
            height: 40px;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
</style>
