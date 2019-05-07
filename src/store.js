import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const STORAGE_TODOKEY = 'todos';
const STORAGE_SPORTTIMEKEY = 'sporttime';
const STORAGE_SPORTDAYDKEY = 'sportday';
const STORAGE_RECORDDKEY = 'records';

function getSportDayDataFromLocal(key) {
    let mapData = new Map();
    let jsonStr = localStorage.getItem(key);
    if (jsonStr !== null) {
        let objMap =  JSON.parse(jsonStr);
        for (let k of Object.keys(objMap)) {
            mapData.set(k, objMap[k]);
        }
    }
    return mapData;
}


const state = {
    todos: JSON.parse(localStorage.getItem(STORAGE_TODOKEY) || '[]'),
    sporttime: JSON.parse(localStorage.getItem(STORAGE_SPORTTIMEKEY) || '[]'),
    sportday: getSportDayDataFromLocal(STORAGE_SPORTDAYDKEY),
    records: JSON.parse(localStorage.getItem(STORAGE_RECORDDKEY) || '[]'),
};

const mutations = {
    // 处理代办事项
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

    // 处理钢琴识谱记录
    addRecord (state, record) {
        state.records.push(record);
    },
    removeRecord (state, record) {
        state.records.splice(state.records.indexOf(record), 1)
    },
    editRecord (state, { index, record }) {
        state.records[index].date = record.date;
        state.records[index].content = record.content;
        state.records[index].count = record.count;
        state.records[index].score = record.score;
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
    },

    addRecord ({ commit }, { uuid, date, content, count, score } ) {
        commit('addRecord', { uuid, date, content, count, score })
    },
    removeRecord ({ commit }, record) {
        commit('removeRecord', record)
    },
    editRecord ({ commit }, { index, record }) {
        commit('editRecord', { index, record })
    },
};

// 定义插件函数，可以在每次mutations处理过程中，添加额外处理，如下面的同步到缓存中。
const plugins = [store => {
    store.subscribe((mutation, state) => {
        if (mutation.type.toString().indexOf("Todo") !== -1) {
            window.localStorage.setItem(STORAGE_TODOKEY, JSON.stringify(state.todos));
        } else if (mutation.type.toString().indexOf("Sport") !== -1) {
            let objMap = Object.create(null);
            for (let [k,v] of state.sportday) {
              objMap[k] = v;
            }
            window.localStorage.setItem(STORAGE_SPORTDAYDKEY, JSON.stringify(objMap));
            window.localStorage.setItem(STORAGE_SPORTTIMEKEY, JSON.stringify(state.sporttime));
        } else if (mutation.type.toString().indexOf("Record") !== -1) {
            window.localStorage.setItem(STORAGE_RECORDDKEY, JSON.stringify(state.records));
        }
    })
}];

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins
})
