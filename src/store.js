import { reactive } from 'vue'

export const store = reactive({
    position: [45],
    snakeLength: 1,
    food: null,
    active: false,
    timeout: undefined,
    direction: "left",
})