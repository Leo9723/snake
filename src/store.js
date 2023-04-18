import { reactive } from 'vue'

export const store = reactive({
    position: [50],
    snakeLength: 1,
    food: null,
})