<template lang="html">
    <div class="comic-modal">
        <div class="comic-modal__container">
            <button class="comic-modal__close" @click="close">X</button>
            <div class="comic-modal__content">
                <img :src="thumbnailSrc">
                <div class="comic-modal__txt">
                    <h2>{{ title }}</h2>
                    <p v-html="description" v-if="description"></p>
                    <p v-else>No description...</p>
                </div>
            </div>
            <div class="comic-modal__nav">
                <button class="add-favourite" :class="{'add-favourite--disabled': favouriteExists(id)}" @click="addFavourite">{{ favouriteExists(id) ? 'added to favourites' : 'add to favorites' }}</button>
                <button class="buy">Buy for $ {{ price }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex';

export default {

    props: {
        id: {
            type: Number,
            required: true
        },
        title: String,
        description: String,
        thumbnail: Object,
        price: Number
    },

    computed: {

        ...mapGetters(['favouriteExists']),

        thumbnailSrc () {

            return `${this.thumbnail.path}.${this.thumbnail.extension}`;

        },

    },

    methods: {

        close () {

            this.$emit('close-modal');

        },

        addFavourite () {

            if (!this.favouriteExists(this.id)) {

                this.$store.commit('addFavourite', {
                    id: this.id,
                    title: this.title,
                    thumbnail: this.thumbnailSrc
                });

            }

        }

    }

}
</script>

<style lang="scss">
.comic-modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.7);

    .comic-modal__container {
        display: flex;
        flex-wrap: wrap;
        background-color: #fefefe;
        margin: 10% auto;
        height: 370px;
        width: 50%;
        position: relative;

        .comic-modal__close {
            color: #FFF;
            position: absolute;
            top: 10px;
            right: 10px;
            border: none;
            background-color: #2E3333;
            width: 35px;
            height: 35px;
            border-radius: 50%;
        }

        .comic-modal__content {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            padding: 20px;

            img {
                width: 30%;
            }

            .comic-modal__txt {
                padding-left: 20px;
                width: 70%;

                h2 {
                    color: #2E3333;
                    text-transform: uppercase;
                }

                p {
                    color: #7F8C8D;
                    width: 100%;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 10;
                    -webkit-box-orient: vertical;
                }
            }
        }

        .comic-modal__nav {
            display: flex;
            align-self: flex-end;
            height: 45px;
            width: 100%;

            button {
                width: 50%;
                border: none;
                text-transform: uppercase;
                font-weight: bold;

                &.add-favourite,
                &.buy {
                    background-repeat: no-repeat;
                    background-position: 10% center;
                    background-size: 30px 30px;
                }

                &.add-favourite {
                    color: #2E3333;
                    background-color: lighten(#BDC3C7, 10%);
                    background-image: url('data:image/png;base64,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');

                    &--disabled {
                        background-image: url('data:image/png;base64,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');
                        background-color: #2E3333;
                        color: #F2282E;
                    }
                }

                &.buy {
                    color: #F2282E;
                    background-color: #BDC3C7;
                    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA1VBMVEUAAADxKC3yKC7/HDnzJy/0KzDyKS7yKC7yKC/yKC7xKTD1Ki/yKC7yKC7yKS7yKi7yKC7yKC7yKC7xKS3yKC72JC7xKS7zKS/yKC7rJyf/AFXyKC/zKC/yKC3yKC3/KyvyKC7yKC/yKC70JyzyKC7yJy7xJi3yKC7yKC3xJy3zKC3yKC7yKS7/MzPzJy3zKS7yKC7yKC7yKC3yJy7yKC/1KTPyKC7yKC7xJy7zJSzxKC3xKS7yKC3yKC7yJy7zJy7yKC7yKC7zJy/yKC7yJy3yKC4AAAAb6VJNAAAARXRSTlMAgesJaDCw8NC+SzHft7Y9/cSgSvYchFfoDQPbZ2XVBuRyvS6xdUmzmII/2dwFVViG+TkncxnuwM8pWjiH/rVCeatB8k+Xko08AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAN+wAADfsBC3c1mwAAAAd0SU1FB+EFDQc3Ow8Far8AAADbSURBVDjLlZLVFsIwEESDBEJxKC7F3d2K7///Em2REpptD/M2mXuSzSQEdLkILgNwexwA8OIApdQH4GdiBSSdCQKukLFLGAciBhBF81jwOUgcAxKvSZNILqfed2FiIP25bEaYZ3MfIF8QAcWvvkqCvJz/ApSKFZC4yquWvMa/SR3r6K3GL9Dk85a21O6Y6vb4XOkDDIY2/2qkbTC2yckEYDqjv5qbwEJYNTOB5coBIHQtW4EN+Ufb3d7WH1SAo4L7k3HmGfV6D5oCqH/1cEH9swf1inq9hxu7i/wDODV+V0G5wxQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDUtMTNUMDc6NTU6NTkrMDI6MDASOHHmAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA1LTEzVDA3OjU1OjU5KzAyOjAwY2XJWgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=');
                }
            }
        }
    }
}
</style>
