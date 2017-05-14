<template lang="html">
    <figure class="favorite">
        <button @click="removeFavorite(id)"></button>
        <img :src="thumbnail">
        <figcaption>{{ title }}</figcaption>
    </figure>
</template>

<script>
import {mapMutations} from 'vuex';

export default {

    props: {
        id: {
            type: Number,
            required: true
        },
        title: String,
        thumbnail: String
    },

    methods: mapMutations(['removeFavorite'])

}
</script>

<style lang="scss">
.favorite {
    margin: 0;
    padding: 0 0 20px 0;
    position: relative;

    button {
        background: #2E3333 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAABJdJREFUWAnNV19sU1UY/87ppVtxG67MkUUcD47QtdK1nQtpyJIFfQH5k+1lFUwwJMSnPRmz6ItE8cUHH9BkvMiDD2hizMKMRiKDJoStCSstl9XrGAIjbp2YQZfMra7tPZ7vbrfcdme9vdomnqU753zf7/u+X8+f73wlYLEFXK5OFegRlbEuQqCFAbRwF04CsMDHSd4ngUHEtsU2cmtyUrbintuaN5/P97yaTr9HGJzkAV80t1hDEEJmANiFRpvts3AisWRmV5JMT09PbSr5x4BK4H1grNHM2WZ6HuQxEHpWes5xPhqNZkrgxKp9Xu/OldXMJU4iIEZYl3JSN1iNvU+W5ccia+HK+F2uYA7IMCeyQ2T0n2SEPKI2eiyeSMSL/WwgoxFhcI0Da4rBFZsTsiRJtv3FB5waA+DWaCtSTSIYkLG6XDY34vf7XzDGz5PBw7p+Riq/NcaI62PG2K7ccvo7HlfS1XkyeGusHNb+48chErsFt39V8p+xiQk4fPSo7ruMnnWn5udP6UDtzKzlkb/vczJlX98fr1yB8OgohK/h8VprBw+/AW6PB/p7+3SRac8T59zWxsa28fHxFY2M1+X6hGfND0pZYqBTp0+D3W7XYC+1tsLTJ09gaelZLqtvaICG+nqYnZ3VMOl0GoY+/wLCV6+Wcg2UksG4onyqkenY4/rdLLPemLgJP/90GX6ZnCzp2KgMdL0KHT4fHHztdaNYMCaKPKW4JXxrssw8xdfV1cH93+7BwwcPBM7EIuf27bC/u1usLJCy9oDH0ybhowegFqhEk/lkEt4dHBSpSsqmp+6W1OvKnKoeId497T/wi39IF27WOxwO7fa81R8CSZIgFo1Cw7Zt0NzcDPemp8HldsOjmYew/Ncy+Ds7YSvHnzs/BJ2v7N3MZaGckK8plgGFUpMZY/Dhxx9poL1eLxzr69XGb544AS+37dbGqGf8z0ojwFooN7FGxkoEC1jkgUnPacGmalBeKzkpv9sLVYtgwTFfmQXcpqQFm6pB+dlN4sr8L8jwbzlHsXiu2te15jhCsYq3ZlMdNM8x31Osttaq+OoEKdOrHFOUmfV6hl0o06gqMApEi6+Rwd81/CALK3ZR9LNnzmjiO7IMl4aHtfE3Fy9qzwJOdL2mMPmHu7JbokMI00oIHHS43AOMqedwLGr62xQZG4NUKiWCFMiamprAFwiYv02UnJQV5Ss0tukedu5qjbHVzAE+b9Vlxj6bzYJkkyCXy0ImkzH9LC4uwiivBvFB3azx3HK5LxQaDIfDPN0ZVgYnXq+3GVYzN3n5KSSEmEo1vj13SW3Nvng8nl/m/DbpQXwej0/Nqdfx54Quq3hPyFM72xKcmJKnjL7Xb9MzEf7Swx9Y1bruuCIiIshgAxkUYu6hjtouvovXcV6phmcEt6Z4RXT/QjKojMVifzpbdhzgj9c73MmcbvBvem2V+a3pDYUOGc9Isa8NZ6YYgPNgMOhYSaUGVBXe5iVquwgjlBG4Qxn5EvPIt4nEqhBjEJZFxoAHrOKxeObVZxeWilihYWGE9QiWAViSEKARStgIpnijrdn4H8D2qYO14QdHAAAAAElFTkSuQmCC') no-repeat center center;
        background-size: 30px 30px;
        border: none;
        border-radius: 50%;
        height: 40px;
        position: absolute;
        top: -10px;
        right: -10px;
        width: 40px;
    }

    img {
        width: 100%;
    }

    figcaption {
        color: #2E3333;
        text-align: center;
        padding-top: 5px;
    }
}
</style>
