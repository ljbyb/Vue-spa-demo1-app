import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const STORAGE_TODOKEY = 'todos';
const STORAGE_SPORTTIMEKEY = 'sporttime';
const STORAGE_SPORTDAYDKEY = 'sportday';

function getSportDayDataFromLocal() {
    let daydata = new Map();
    let jsonStr = localStorage.getItem(STORAGE_SPORTDAYDKEY);
    if (jsonStr !== null) {
        let objMap =  JSON.parse(jsonStr);
        for (let k of Object.keys(objMap)) {
            daydata.set(k, objMap[k]);
        }
    }
    return daydata;
}

const state = {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_TODOKEY) || '[]'),
    sporttime: JSON.parse(window.localStorage.getItem(STORAGE_SPORTTIMEKEY) || '[]'),
    sportday: getSportDayDataFromLocal(),
};

const mutations = {
    addTodo (state, todo) {
        state.todos.push(todo);
    },
    removeTodo (state, todo) {
        state.todos.splice(state.todos.indexOf(todo), 1)
    },
    editTodo (state, { todo, text = todo.text, done = todo.done }) {
        todo.text = text;
        todo.done = done
    },

    // 处理实时分钟统计行走步数
    addSportTimeData (state, timedata) {
        state.sporttime.push(timedata);
    },
    updateSportTimeData (state, time ) {
        if (time === state.sporttime[state.sporttime.length-1][0]) {
            state.sporttime[state.sporttime.length-1][1]++;
        } else {
            state.sporttime.push([time, 1])
        }
    },
    removeSportTimeData(state) {
        // 通过设置数组长度为0，可以清空数组
        state.sporttime.length = 0;
    },
    // 处理每天统计行走步数
    addSportDayData (state, daydata) {
        state.sportday.set(daydata.date, daydata.count);
    },
    updateSportDayData (state, date ) {
        if (state.sportday.has(date)) {
            let count = state.sportday.get(date);
            state.sportday.set(date, count+1);
        } else {
            state.sportday.set(date, 1);
        }
    },
};

const actions = {
    addTodo ({ commit }, text) {
        commit('addTodo', {
            uid: Date.now(),
            text,
            done: false
        })
    },
    removeTodo ({ commit }, todo) {
        commit('removeTodo', todo)
    },
    toggleTodo ({ commit }, todo) {
        commit('editTodo', { todo, done: !todo.done })
    },
    editTodo ({ commit }, { todo, value }) {
        commit('editTodo', { todo, text: value })
    },
    toggleAll ({ state, commit }, done) {
        state.todos.forEach((todo) => {
            commit('editTodo', { todo, done })
        })
    },
    clearCompleted ({ state, commit }) {
        state.todos.filter(todo => todo.done)
            .forEach(todo => {
                commit('removeTodo', todo)
            })
    },

    addSportTimeData ({ commit }, time) {
        commit('addSportTimeData', [time, 0])
    },
    updateSportTimeData ({ commit }, time) {
        commit('updateSportTimeData', time)
    },
    removeSportTimeData( { commit } ) {
        commit('removeSportTimeData')
    },
    addSportDayData ({ commit }, date) {
        commit('addSportDayData', {
            date: date,
            count: 0,
        })
    },
    updateSportDayData ({ commit }, date ) {
        commit('updateSportDayData', date)
    }
};

// 定义插件函数，可以在每次mutations处理过程中，添加额外处理，如下面的同步到缓存中。
const plugins = [store => {
    store.subscribe((mutation, state) => {
        if (mutation.type.toString().indexOf("Todo") !== -1) {
            window.localStorage.setItem(STORAGE_TODOKEY, JSON.stringify(state.todos));
        }
        if (mutation.type.toString().indexOf("Sport") !== -1) {
            let objMap = Object.create(null);
            for (let [k,v] of state.sportday) {
              objMap[k] = v;
            }
            window.localStorage.setItem(STORAGE_SPORTDAYDKEY, JSON.stringify(objMap));
            window.localStorage.setItem(STORAGE_SPORTTIMEKEY, JSON.stringify(state.sporttime));
        }
    })
}];

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins
})
