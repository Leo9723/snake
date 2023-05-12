<script>
import { generate } from '@vue/compiler-core'
import AppGrid from './components/AppGrid.vue'
import { store } from './store.js'

export default {
  data() {
    return {
      store,
      value: 0,
    }
  },
  components: {
    AppGrid,
  },
  methods: {
    retry(){
      this.store.position = [45]
      this.store.snakeLength = 1
      this.store.food = null
      this.store.active = false
      this.store.timeout = undefined
      this.store.loose = false
      this.store.direction = "left"
      this.store.endDirection = "right"
      this.generateFood()
    },
    right(){
      this.store.active = true
      clearTimeout(this.store.timeout)
      this.store.direction = "right"      
      this.store.timeout = setInterval(() => {
          if(this.store.position[0] % 10 == 0){
            this.addCell(this.store.position[0])
            this.store.position[0] -= 9
          }
          else{
            this.addCell(this.store.position[0])
            this.store.position[0] ++
          }
          this.generateMoreFood()  
        }, 250);
    },
    left(){
      this.store.active = true
      clearTimeout(this.store.timeout)
      this.store.direction = "left"
      this.store.timeout = setInterval(() => {
        let splitted
        if(this.store.position[0] == 1){
          this.addCell(this.store.position[0])
          this.store.position[0] += 9
        }
        else{
          splitted = this.store.position[0].toString()
          splitted = splitted.split('');
          splitted = parseInt(splitted[1])
          if(splitted == 1){
            this.addCell(this.store.position[0])
            this.store.position[0] += 9
          }
          else{
            this.addCell(this.store.position[0])
            this.store.position[0] --
          }
        }
        if(this.store.position[this.store.position.length - 1] - 1 == this.store.position[this.store.position.length - 2]){
        this.store.endDirection = 1
        }
        else if(this.store.position[this.store.position.length - 1] + 1 == this.store.position[this.store.position.length - 2]){
          this.store.endDirection = 2
        }
        else if(this.store.position[this.store.position.length - 1] + 10 == this.store.position[this.store.position.length - 2]){
          this.store.endDirection = 3
        }
        else if(this.store.position[this.store.position.length - 1] - 10 == this.store.position[this.store.position.length - 2]){
          this.store.endDirection = 4
        }
        console.log(this.store.endDirection)
        this.generateMoreFood()       
        }, 250);
    },
    up(){
      this.store.active = true
      clearTimeout(this.store.timeout)
      this.store.direction = "up"
      this.store.timeout = setInterval(() => {
        let splitted
        splitted = this.store.position[0].toString()
        splitted = splitted.split('')
        if(splitted.length == 1){
          splitted = parseInt(splitted[0])
          this.addCell(this.store.position[0])
          this.store.position[0] = splitted += 90
        }
        else if(this.store.position[0] == 10){
          this.addCell(this.store.position[0])
          this.store.position[0] = 100
        }
        else{
          this.addCell(this.store.position[0])
          this.store.position[0] -= 10
        }
        if(this.store.position[this.store.position.length - 1] - 1 == this.store.position[this.store.position.length - 2]){
        this.store.endDirection = 1
        }
        else if(this.store.position[this.store.position.length - 1] + 1 == this.store.position[this.store.position.length - 2]){
          this.store.endDirection = 2
        }
        else if(this.store.position[this.store.position.length - 1] + 10 == this.store.position[this.store.position.length - 2]){
          this.store.endDirection = 3
        }
        else if(this.store.position[this.store.position.length - 1] - 10 == this.store.position[this.store.position.length - 2]){
          this.store.endDirection = 4
        }
        console.log(this.store.endDirection)
        this.generateMoreFood()           
          }, 250);
    },
    down(){
      this.store.active = true
      clearTimeout(this.store.timeout)
      this.store.direction = "down"
      this.store.timeout = setInterval(() => {
        let splitted
        splitted = this.store.position[0].toString()
        splitted = splitted.split('')
        if(splitted.length == 2 && splitted[0] == 9 && this.store.position[0] != 90){
          this.addCell(this.store.position[0])
          this.store.position[0] = parseInt(splitted[1])
        }
        else if(this.store.position[0] == 100){
          this.addCell(this.store.position[0])
          this.store.position[0] = 10
        }
        else{
          this.addCell(this.store.position[0])
          this.store.position[0] += 10
        }
        if(this.store.position[this.store.position.length - 1] - 1 == this.store.position[this.store.position.length - 2]){
        this.store.endDirection = 1
        }
        else if(this.store.position[this.store.position.length - 1] + 1 == this.store.position[this.store.position.length - 2]){
          this.store.endDirection = 2
        }
        else if(this.store.position[this.store.position.length - 1] + 10 == this.store.position[this.store.position.length - 2]){
          this.store.endDirection = 3
        }
        else if(this.store.position[this.store.position.length - 1] - 10 == this.store.position[this.store.position.length - 2]){
          this.store.endDirection = 4
        }
        console.log(this.store.endDirection)
        this.generateMoreFood()          
          }, 250);
    },
    generateFood(){
            this.store.food = Math.trunc((Math.random()*100)+1);
        },
    generateMoreFood(){
      let count = 0;
      for (var i = 0; i < this.store.position.length; i++) {
        if (this.store.position[i] === this.store.position[0]) {
            count++;
            if(count == 2){
              this.store.position = 0
              this.store.food = 0
              this.store.loose = true
              clearTimeout(this.store.timeout)
            }
        }
    }
      if(this.store.position[0] == this.store.food){
        if(this.store.position.length == 100){
          alert("hai vinto")
          clearTimeout(this.store.timeout)
        }
        else{
          this.generate()
  
          this.store.snakeLength ++
        }
        }
    },
    generate(){
      this.value = Math.trunc((Math.random() * 100)+1);
      if(this.store.position.includes(this.value)){
        this.number()
      }
      else{
        this.store.food = this.value
      }
    },
    loopGenerate(){
      if(this.store.position.includes(this.value)){
        this.number()
      }
      else{
        this.store.food = this.value
      }
    },
    number(){
      this.value = Math.trunc((Math.random() * 100)+1);
      this.loopGenerate()
    },
    addCell(number){
      if(this.store.position.length < this.store.snakeLength){
        this.store.position.unshift(number)
      }
      else{
        this.store.position.pop()
        this.store.position.unshift(number)

      }
    }    
  },
    mounted(){
        this.generateFood();
    }
}
</script>

<template>
  <div class="container">
    <div v-if="this.store.loose" class="end">
        Che peccato <i class="fa-regular fa-face-sad-tear"></i> <br> Hai perso! <br> Il tuo punteggio è {{ this.store.snakeLength }} <br> <span v-if="(this.store.snakeLength <=15)">Sei davvero pessimo...</span> <span v-else>Non male...</span>
        <div>
          <button @click="retry">
            Rigioca!
          </button>
        </div>
    </div>
    <div v-else>
      <div tabindex="0" @keyup.right="right" @keyup.left="left" @keyup.up="up" @keyup.down="down" @keyup="generateMoreFood">
        <AppGrid></AppGrid>
      </div>
      <div class="controller">
        <div class="top">
          <i class="fa-solid fa-chevron-up" @click="up"></i>
        </div>
        <div class="mid">
          <i class="fa-solid fa-chevron-left" @click="left"></i><i class="fa-regular fa-circle"></i><i class="fa-solid fa-chevron-right" @click="right"></i>
        </div>
        <div class="bottom">
          <i class="fa-solid fa-chevron-down" @click="down"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.end{
  text-align: center;
  margin-top: 50px;
  font-size: x-large;
  font-weight: bold;
  button{
    background-color: rgb(121, 67, 17);
    color: white;
    border: 5px solid rgb(54, 119, 0);
    padding: 20px 30px;
    border-radius: 10px;
    margin-top: 50px;
    font-weight: bold;
  }
}
  .controller{
    width: 300px;
    height: 300px;
    margin: 0 auto;
    display: none;
    .top, .mid, .bottom{
      display: flex;
      justify-content: center;
      i{
        border: 5px solid rgb(61, 61, 61);
        padding: 20px;
        margin: 10px;
        transition: all 0.1s;
        &:active{
          background-color: rgba(0, 0, 0, 0.349);
        }
      }
    }
    .top{
      i{
        border-radius: 15px 15px 0px 0px;
      }
    }
    .mid{
      i:first-child{
        border-radius: 15px 0px 0px 15px;
      }
      i:last-child{
        border-radius: 0px 15px 15px 0px;
      }
    }
    .bottom{
      i{
        border-radius: 0px 0px 15px 15px;
      }
    }

  }
  @media screen and (max-width: 769px){
    .controller{
      display: block;
    }
  }
</style>
