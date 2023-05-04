<script>
import {store} from '../store.js'
export default {
    data() {
        return {
            store
        }
    },
    methods: {
        active(){
            let splitted
            this.store.direction = "left"
            this.store.active = true
            clearTimeout(this.store.timeout)
            this.store.timeout = setInterval(() => {
            if(this.store.position[0] == 1){
                this.store.position[0] += 9
            }
            else{
                splitted = this.store.position[0].toString()
                splitted = splitted.split('');
                splitted = parseInt(splitted[1])
                if(splitted == 1){
                    this.store.position[0] += 9
                }
                else{
                    this.store.position[0] --
                }
            }
        }, 250);
            

        }
    }
}
</script>
<template>
    <div class="grid-container">
        <div class="hover-button" v-show="this.store.active == false" @click="active">
            <span>GIOCA!</span>
        </div>
        <div class="grid">
            <div v-for="(cell, index) in 100" :key="index" :class="(this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'left') ? 'cell bkg-ok left' : (this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'right') ? 'cell bkg-ok right' : (this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'up') ? 'cell bkg-ok up' : (this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'down') ? 'cell bkg-ok down' : (this.store.position.includes(cell)) ? 'cell bkg-ok' :(this.store.food == cell) ? 'cell bkg-food' : 'cell'">
                <div v-if="this.store.position[0] == cell" :class="(this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'left') ? 'eye-left' : (this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'right') ? 'eye-right' : (this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'up') ? 'eye-up' : (this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'down') ? 'eye-down' : ''">
                    <i class="fa-solid fa-circle"></i>
                </div>
                <div v-if="this.store.position[0] == cell" :class="(this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'left') ? 'eye-left' : (this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'right') ? 'eye-right' : (this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'up') ? 'eye-up' : (this.store.position.includes(cell) && this.store.position[0] == cell && this.store.direction == 'down') ? 'eye-down' : ''">
                    <i class="fa-solid fa-circle"></i>
                </div>
            </div>
        </div>
        <div class="score">
            <img src="/apple.png" alt=""> X {{ this.store.snakeLength }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
.score{
    color: white;
    font-size: 40px;
}
img {
    width: 50px;
    height: 50px;
}
span{
    border: 5px solid white;
    border-radius: 30px;
    color: white;
    padding: 30px 50px;
    cursor: pointer;
}
.grid-container{
    width: 600px;
    height: 670px;
    position: relative;
    margin: 0 auto;
    background-color: rgb(121, 67, 17);
}

.hover-button{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.492);
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}
    .cell{
        width: calc(100% / 10);
        height: calc(100% / 10);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(121, 67, 17);
        transition: all 0.10s;
    }
    .bkg-ok{
        background-color: rgb(54, 119, 0);
        position: relative;
    }
    .bkg-food{
        background-image: url(/apple.png);
        background-size: cover;
    }
    .grid{
        width: 600px;
        height: 600px;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        border: 50px solid rgb(71, 26, 0);
    }
    .left{
    border-radius: 50% 0% 0% 50%;
    }
    .right{
    border-radius: 0% 50% 50% 0%;
    }
    .up{
    border-radius: 50% 50% 0% 0%;
    }
    .down{
    border-radius: 0% 0% 50% 50%;
    }
    .eye-left{
        color: black;
        font-size: xx-small;
        padding: 3px 3px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        transition: all 0.10s;
    }
    .eye-left:first-child{
        top: 0px;
        left: 3px;
    }
    .eye-left:last-child{
        bottom: 0px;
        left: 3px;
    }
    .eye-right{
        color: black;
        font-size: xx-small;
        padding: 3px 3px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        transition: all 0.10s;
    }
    .eye-right:first-child{
        top: 0px;
        right: 3px;
    }
    .eye-right:last-child{
        bottom: 0px;
        right: 3px;
    }
    .eye-up{
        color: black;
        font-size: xx-small;
        padding: 3px 3px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        transition: all 0.10s;
    }
    .eye-up:first-child{
        top: 3px;
        left: 0px;
    }
    .eye-up:last-child{
        top: 3px;
        right: 0px;
    }
    .eye-down{
        color: black;
        font-size: xx-small;
        padding: 3px 3px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        transition: all 0.10s;
    }
    .eye-down:first-child{
        bottom: 3px;
        left: 0px;
    }
    .eye-down:last-child{
        bottom: 3px;
        right: 0px;
    }
    @media screen and (max-width: 769px){
        .grid-container{
            width: 95vw;
            height: 115vw;
        }
        .grid{
            width: 95vw;
            height: 95vw;
            border: 5vw solid rgb(71, 26, 0);
        }
  }
</style>