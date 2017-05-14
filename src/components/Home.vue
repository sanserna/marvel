<template lang="html">
    <div class="column small-8 medium-9">
        <div class="row">
            <div class="sorter">
                <h2 class="sorter__title">Characters</h2>
                <select class="sorter__select" :value="sortBy" @change="sortyByChanged">
                    <option value="asc">Ascendant</option>
                    <option value="desc">Descendant</option>
                </select>
            </div>
        </div>

        <section class="row characters-wrapper">
            <character v-for="character in charactersInPage"
                        :id="character.id"
                        :name="character.name"
                        :thumbnail="character.thumbnail"
                        :description="character.description"
                        :comics="character.comics.items"
                        :key="character.id"
                        @view-more="viewCharacterDetail(character)">
            </character>
        </section>

        <pagination @page-changed="pageOneChanged"></pagination>
    </div>
</template>

<script>
import Character from './Character.vue';
import Pagination from './Pagination.vue';
import {mapState, mapGetters, mapMutations} from 'vuex';
import {charactersApi} from '../api/marvelApi';

export default {

    name: 'home',

    components: { Character, Pagination },

    mounted () {

        this.fetchCharacters();
        this.fecthFavourites();

    },

    computed: {

        ...mapState(['characters', 'sortBy']),

        ...mapGetters(['charactersInPage', 'currentPage'])

    },

    methods: {

        fetchCharacters () {

            let characters = localStorage.getItem('characters');

            if (characters !== null) {

                this.$store.commit('setCharacters', JSON3.parse(characters));

            } else {

                charactersApi.request()
                    .then(response => {

                        this.$store.commit('setCharacters', response.data.data.results);

                        if (typeof Storage !== 'undefined') {

                            localStorage.setItem('characters', JSON3.stringify(response.data.data.results));

                        }

                    })
                    .catch(error => {

                        console.error(error.response.status)

                    })

            }

        },

        fecthFavourites () {

            let favourites = localStorage.getItem('favourites');

            if (favourites !== null) {

                this.$store.commit('setFavourites', JSON3.parse(favourites));

            }

        },

        pageOneChanged (pageNum) {

            this.$store.commit('currentPage', pageNum);

        },

        sortyByChanged (_e) {

            this.$store.commit('setSortBy', _e.target.value);

        }

    }
}
</script>

<style lang="scss">
.sorter {
    align-items: center;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABF1JREFUWAmtmE1sG0UUx+et1w6tFTc2UKS0SdNiCRc3FVJAVbmAhNQK8SUhJA4IgTihINRDBRekqhISV04cOIG4IOiFAwfUA2qBC6AIAbUwjgklqQqljdOkblqvvfP4T5xZ1sku7Ox4lOS9eTPz3i8782Z2h4RlWS+X99726DwLcTdcXSIhPi8tzr9p6TYY7gRaSsXznByz+FEwj+L3IDO/0br34KGU7rYNswYcW2wsOJn8KwOee/7kQN2iYg2oYpPfvhNTi1nuF0fKntZt5VAAx5aavzHRXxswRGuSnHVbMD3e1YqtJBZ/M4kMMXfga7a1r3wYco9gcoujubepVmuniYGZSVdaByrT1PVnBIkC5vY4vDyGWb6FhBnb6pFIfFpabD6/1Z6kngoQT2eWpXgvSQDVB0Gkm3d3F+r15aRjdD/jNcinTzvM9JZ2kEgS+T0vnypxjAFbH358DPvdeCIwdMLT89H/RGlhbjXpmHA/4yQhKWeD/WQDgHosONIPEf2OJHmptNT4OhzURI90/F8OAPfIQDvhCQlqIHsraHMA5aFdre1vizl+gprzawP9DSvGUwyQLzdiEP0Cjks42kZAM4J9cB6yiUxex5T+KtzCk9RsWsGpOOo/NSo3Jsv3e447kZHZ76TovMos3wk7gEN2s26lsFBvhO1pdWPAcKDlqcpx4fe+CNvg8EJpqTkdttnoxlM8EIzFjYG6qpCwntawTyvAjOA7ws76Os2sTD2w7TTZ3i+ZxQpQsp/fGkYljZQ3391qT1u3AmSR2REZmPnllYn7no5sMzRaAWLXiz0dpJBmx2EMuBXgjpy8EOMXucIPrVarpbj2pHY7wPHxK9hWZFQwnCrEbTkV1WZiswKkc+d6OEGuxAVEEu2Ma0tqtwJUQTCV9bhgcB6xDcX1jrZbA7Kgn6Jd48xzeCKuLandGhBvL2fDwbAmf9Z19sUxraeV1oDF/eNnSdA1DcAOfaQhkShPXZ+cLuq2NNIaUCUKFuK/65BFlTLi9T4M55luv5YGTI+xBtx0VNMOIY8ULzbP4yl+pmw4+k7a7IdDASTi9wNA3M+09x+6h8jZBBRjfrtzMmg3VIYCWPyj+QPiBi+ont8tY/u5rFnwifqc1k3lUABVUGTz9zo4XiKu02huDjZ1y6DK3r4w/zs0QKy2zXOZbpaOVOu7arUWslhP/U6uVnPmePgKSzMoagw5js7kGp05gy89PFW3cArXHitKb3c6u5Q0LUMDxBO8qIIje29piP7HOn2i6l7XLWu7iRwaYJZG/twITHyYZ2ayAYQjvlI6Pp9fDGwGytAAPcdXd9TY90Rx9eraowED9z+iYH+Bjx6NfgMPOm9XhgKoNmLudj/Q7iXzM1rHTVMfirmwcvnqs9qeVFoBLu+rPNyaLH/jr3kNXAA/GAQlelzrksRurbOkE1pPKo3vZsKOsw4vS5k5pTIjXLC94KdfcPN6F15q9aa9R61Pmpvr6vb/k/8ANnZX07zCGi0AAAAASUVORK5CYII=') no-repeat 25px center;
    display: flex;
    justify-content: space-between;
    padding: 15px 30px 15px 65px;
    width: 100%;

    > .sorter__title {
        margin: 0;
    }

    > .sorter__select {
        -webkit-appearance: none;
        appearance: none;
        background: #FFF url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADfsAAA37AQt3NZsAAAAHdElNRQfhBQoGJRRANXW7AAAAhklEQVRIx+3MOw6DMBBF0RuxgxTZDAURJAGJ5dBmHRShzRbz6UwxQnYUy/JMi19lj3QulJXJTizUatXw4CjPEceLVsUHvjjO8ql44njTKfnMYTvoEn9cl4jyMHGx8bxEkvvEh6uNpxNZPEzcbDyeUPEw0dv4b8LEw4SR+4SZS+LOZOdl+9kKhrBPE14xot8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDUtMTBUMDY6Mzc6MjArMDI6MDCVe0olAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA1LTEwVDA2OjM3OjIwKzAyOjAw5CbymQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=') no-repeat 95% center;
        background-size: auto 25px;
        height: 40px;
        padding: 0 10px;
        width: 200px;
    }
}
</style>
