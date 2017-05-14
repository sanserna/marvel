<template>
    <main>
        <!-- HEADER -->
        <div class="row">
            <header class="main-header">
                <div class="main-header__controlls">
                    <input v-model.trim="search" @keyup.enter="searchCharacter" type="text" placeholder="Search character...">
                </div>
            </header>
        </div>

        <!-- MAIN LAYOUT -->
        <div class="row small-collapse">
            <router-view></router-view>

            <!-- FAVOURITES -->
            <div class="column small-4 medium-3">
                <div class="favorites-wrapper">
                    <h3 class="favorites-wrapper__title">My favourites</h3>
                    <favourite v-for="favourite in favourites"
                                :id="favourite.id"
                                :title="favourite.title"
                                :thumbnail="favourite.thumbnail"
                                :key="favourite.id">
                    </favourite>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {mapState} from 'vuex';
import Favourite from './Favourite.vue';

export default {

    data () {

        return {
            search: ''
        }

    },

    components: {Favourite},

    computed: mapState(['favourites']),

    methods: {

        searchCharacter () {

            this.$router.push('/');
            this.$store.commit('setFilteredCharactersByName', this.search);

        }

    }

}
</script>

<style lang="scss">
.favorites-wrapper {
    background: darken(#ECF0F1, 5%);
    min-height: 100%;
    padding: 10px 30px;
    width: 100%;

    .favorites-wrapper__title {
        background: url('data:image/png;base64,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') no-repeat 10% center;
        background-size: 30px auto;
        margin: 0;
        padding: 20px 0 20px 35px;
        text-align: center;
    }
}
</style>
