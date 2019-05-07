<template>
    <v-layout row wrap>
        <v-flex text-xs-center>
            <!-- header -->
            <h1 class="primary--text display-2 font-weight-medium my-3">代办事项</h1>
            <v-card>
                <v-list class="pa-0">
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-checkbox
                                    :input-value="allChecked"
                                    @change="toggleAll(!allChecked)"
                                    color="primary"
                                    v-if="todos.length > 0"
                            ></v-checkbox>
                            <v-icon
                                    color="primary"
                                    v-else
                            >check</v-icon>
                        </v-list-tile-action>
                        <v-text-field
                                :label="'New todo input'"
                                @keydown.enter="addTodo"
                                autofocus
                                browser-autocomplete="off"
                                clearable
                                color="primary"
                                flat
                                hide-details
                                maxlength="1023"
                                placeholder="要完成什么事情呢？"
                                solo
                                v-model="newTodo"
                        ></v-text-field>
                    </v-list-tile>
                </v-list>
            </v-card>
            <!-- main -->
            <v-card class="mt-3" v-show="todos.length">
                <v-progress-linear class="my-0" v-model="progressPercentage"/>
                <v-card-actions class="px-3" v-show="todos.length">
          <span class="primary--text">
<!--            {{ remaining }} {{ remaining | pluralize('item') }} left-->
                {{ remaining }} 项待处理
          </span>
                    <v-spacer></v-spacer>
                    <v-btn-toggle
                            class="elevation-0"
                            mandatory
                            v-model="visibility"
                            v-show="todos.length"
                    >
                        <v-btn
                                :key="key"
                                :to="key"
                                :value="key"
                                class="mx-0"
                                color="primary"
                                flat
                                small
                                v-for="(val, key) in filters"
                        >
<!--                            {{ key | capitalize }}-->
                            {{ key | stateConvert }}
                        </v-btn>
                    </v-btn-toggle>
                </v-card-actions>
                <v-list class="pa-0">
                    <template v-for="todo in filteredTodos">
                        <v-divider :key="`${todo.uid}-divider`"></v-divider>
                        <TodoItem
                                :key="todo.uid"
                                :todo="todo"
                        />
                    </template>
                </v-list>
            </v-card>
            <v-btn
                    @click="clearCompleted"
                    block
                    class="mt-3"
                    color="primary"
                    depressed
                    round
                    v-show="todos.length > remaining"
            >
                清除已完成事项
            </v-btn>
            <!-- footer -->
<!--            <footer-info></footer-info>-->
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import TodoItem from './../components/TodoItem.vue'
    // import FooterInfo from './../components/FooterInfo.vue'

    const filters = {
        all: todos => todos,
        active: todos => todos.filter(todo => !todo.done),
        completed: todos => todos.filter(todo => todo.done)
    };

    export default {
        props: ['filter'],
        components: {
            TodoItem,
            // FooterInfo
        },
        data () {
            return {
                newTodo: '',
                filters: filters,
                visibility: this.filter
            }
        },
        computed: {
            todos () {
                return this.$store.state.todos
            },
            allChecked () {
                return this.todos.every(todo => todo.done)
            },
            filteredTodos () {
                console.log(this.visibility);
                if (this.visibility !== undefined) {
                    return filters[this.visibility](this.todos);
                }
                return filters['all'](this.todos)
            },
            remaining () {
                return this.todos.filter(todo => !todo.done).length
            },
            progressPercentage () {
                const len = this.todos.length;
                return ((len - this.remaining) * 100) / len
            }
        },
        methods: {
            ...mapActions([
                'toggleAll',
                'clearCompleted'
            ]),
            addTodo () {
                const text = this.newTodo.trim();
                if (text) {
                    this.$store.dispatch('addTodo', text)
                }
                this.newTodo = ''
            }
        },
        // 过滤器，可以不改变数据进行格式处理
        filters: {
            // 在显示的Item上判断是否需要转换为复数形式
            pluralize: (n, w) => n === 1 ? w : (w + 's'),
            // 首字母转换大写
            capitalize: s => s.charAt(0).toUpperCase() + s.slice(1),
            // 状态标题转换为中文
            stateConvert: (s) => {
                switch (s) {
                    case 'all': return '全部';
                    case 'active': return '未完成';
                    case 'completed': return '已完成';
                    default: return s;
                }
            }
        }
    }
</script>

<style lang="stylus">
    h1
        opacity: 0.3
    .v-text-field .v-input__slot
        padding: 0 !important
</style>