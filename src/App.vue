<template>
    <main id="app">
        <!-- HEADER -->
        <div class="row">
            <header class="main-header">
                <div class="main-header__controlls">
                    <input type="text" placeholder="Search character...">
                </div>
            </header>
        </div>

        <!-- MAIN LAYOUT -->
        <div class="row small-collapse">
            <router-view></router-view>
        </div>
    </main>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>
