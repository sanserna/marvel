<template lang="html">
    <div class="column small-8 medium-9">
        <section class="character-detail">
            <!-- <img src="assets/sp.jpg" class="character-detail__logo"> -->
            <h1 class="character-detail__name">Spider Man</h1>
            <p class="character-detail__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni nisi voluptates, odit possimus dolorem hic unde dolore doloribus nam aliquam, ad mollitia rem ducimus aperiam! Rerum doloremque ipsum porro, nisi.</p>
            <div class="character-detail__comics">
                <h2>Related comics:</h2>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing.</div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing.</div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
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

        h2 {
            width: 100%;
        }

        div {
            color: #FFF;
            cursor: pointer;
            background: #F2282E url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADfsAAA37AQt3NZsAAAAHdElNRQfhBQwICgBnBut9AAABSUlEQVRIx+2VvU7CUBSAv4soNsbFRV0MFBMq8Aw6kOhAwuYT8AK+g6/gpL6AA4ubTg46MDm1lMGfuBBGY4wmGo9DL/WWlnAZ3DhdenPO953be5MehUWIww41/axyqG7+cvmJ0LKGqtQokTNSB0wSSAEv7uQmoHdCfHz2aaBMRgukSZsaZRYSUI8AH5+AZyUA4tKgKRv8cKGuzB2cUEx0CvBHUCrq1IE9yqbAAY64nAiZcUdIm5VoYX5nVz1Z4HDLucUtgOQp4VHBo0KRU3WcVZUSiMuuhrZZNBJudpsxgawTUIiXXzwQ0iekT9dKwCvXrMXQo/qediBjAvVJy+IYjcjNVj4XzAVzwb8J8val4uDpf7e9QBw8qnpCjUbNxxRBJhTFGz3uOWMrW9CUVgYEQz1oAl4AWGIz3XUgs8YgeQsdbEaK0ZFO9PILwT+JRd3+CncAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDUtMTJUMDg6MTA6MDArMDI6MDAQqMYzAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA1LTEyVDA4OjEwOjAwKzAyOjAwYfV+jwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=') no-repeat 5px center;
            border-top: 2px solid darken(#F2282E, 20%);
            border-left: 2px solid darken(#F2282E, 20%);
            box-shadow: 2px 2px 1px rgba(0,0,0,.3);
            width: 48%;
            padding: 5px 5px 5px 45px;
            transition: 0.3s;

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
