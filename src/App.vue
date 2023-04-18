<script>
import { generate } from '@vue/compiler-core'
import AppGrid from './components/AppGrid.vue'
import { store } from './store.js'

export default {
  data() {
    return {
      store,
      value: 0,
      timeout: undefined,
    }
  },
  components: {
    AppGrid,
  },
  methods: {
    right(){
      clearTimeout(this.timeout)
      this.timeout = setInterval(() => {
          if(this.store.position[0] % 10 == 0){
            this.addCell(this.store.position[0])
            this.store.position[0] -= 9
          }
          else{
            this.addCell(this.store.position[0])
            console.log(this.store.position)
            this.store.position[0] ++
            console.log(this.store.position[0])
          }
          this.generateMoreFood()  
        }, 250);
    },
    left(){
      clearTimeout(this.timeout)
      this.timeout = setInterval(() => {
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
        this.generateMoreFood()       
        }, 250);
    },
    up(){
      clearTimeout(this.timeout)
      this.timeout = setInterval(() => {
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
        this.generateMoreFood()           
          }, 250);
    },
    down(){
      clearTimeout(this.timeout)
      this.timeout = setInterval(() => {
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
              alert("hai perso")
            }
        }
    }
      if(this.store.position[0] == this.store.food){
        if(this.store.position.length == 100){
          alert("hai vinto")
        }
        else{
          this.generate()
  
          this.store.snakeLength ++
          console.log(this.store.snakeLength)
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
  <div tabindex="0" @keyup.right="right" @keyup.left="left" @keyup.up="up" @keyup.down="down" @keyup="generateMoreFood">
    <AppGrid></AppGrid>
  </div>
</template>

<style scoped>
</style>
