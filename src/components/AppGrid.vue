<script>
import {store} from '../store.js'
export default {
    data() {
        return {
            store
        }
    },
    methods: {
        increment(){
            this.store.position ++
        }
    }
}
</script>
<template>
    <div class="grid">
        <div v-for="(cell, index) in 100" :key="index" :class="(this.store.position.includes(cell)) ? 'cell bkg-ok' : (this.store.food == cell) ? 'cell bkg-food' : 'cell'">
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .cell{
        width: 50px;
        height: 50px;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(121, 67, 17);
        transition: all 0.25s;
    }
    .bkg-ok{
        background-color: rgb(54, 119, 0);
    }
    .bkg-food{
        background-color: rgb(235, 13, 5);
    }
    .grid{
        width: 520px;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        border: 50px solid rgb(71, 26, 0);
    }
</style>