<template>
	<section class="real-app">
		<input type="text" class="add-input" autofocus="autofocus" placeholder="接下来做什么"
		@keyup.enter="addTodo">
		<item :todo="todo" v-for="todo in filterTodos" :key="todo.id"></item>
		<tabs :filter="filter" :todos="todos" @deleteAll="deleteAll" @toggle="toggle"></tabs>
	</section>
</template>

<script>
import item from './item.vue'
import tabs from './tabs.vue'
let i = 0
	export default {
		data() {
			return {
				todos: [],
				filter:'all'
			}
		},
		computed: {
			filterTodos() {
				if(this.filter === 'all'){
					return this.todos;
				}
				const state = this.filter ==='completed'
				return this.todos.filter(todo => todo.completed === state)
			}
		},
		methods: {
			addTodo(e) {
				if(!e.target.value.trim()){
					return
				}
				this.todos.unshift({
					id: i++,
					content: e.target.value.trim(),
					completed: false
				})
				e.target.value = ''
			},
			toggle(state) {
				this.filter = state
			},
			deleteAll() {
				this.todos = this.todos.filter(todo => !todo.completed)
			}
		},
		components: {
			item,
			tabs
		}
	}
</script>

<style lang="stylus" scoped="scoped">
.real-app{
    width 600px
    margin :0px  auto
    box-shadow :0px 0px 5px #666
}
.add-input{
    positon:relative;
    margin 0px
    width 100%
    font-size 24px
    font-family  inherit 
    font-weight:inherit
    line-height 1.4rem
    border 0;
    outline none 
    color inherit
    padding 6px
    border 1px solid #999
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
    box-sizing border-box
    font-smoothing:antialiased;
    padding 16px 16px 16px 60px
    border none  
}
</style>